import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { createNotification } from '@/lib/notifications';
import { z } from 'zod';

// Input validation schema
const messageSchema = z.object({
  conversationId: z.string().optional(),
  recipientId: z.string(),
  content: z.string(),
  attachments: z.array(z.string()).optional(),
  jobId: z.string().optional(),
});

// Get conversations for the current user
export async function GET(request: Request) {
  try {
    const session = await auth();
    const userId = session?.userId;
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user profile
    const userProfile = await prisma.userProfile.findUnique({
      where: { userId },
    });

    if (!userProfile) {
      return NextResponse.json({ error: 'User profile not found' }, { status: 404 });
    }

    // Get conversations with latest message and unread count
    const conversations = await prisma.conversation.findMany({
      where: {
        participants: {
          some: {
            id: userProfile.id,
          },
        },
      },
      include: {
        participants: {
          select: {
            id: true,
            displayName: true,
            avatar: true,
          },
        },
        messages: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
          include: {
            sender: {
              select: {
                id: true,
                displayName: true,
                avatar: true,
              },
            },
            readBy: {
              where: {
                userId: userProfile.id,
              },
            },
          },
        },
        job: {
          select: {
            id: true,
            title: true,
          },
        },
        _count: {
          select: {
            messages: {
              where: {
                readBy: {
                  none: {
                    userId: userProfile.id,
                  },
                },
                NOT: {
                  senderId: userProfile.id,
                },
              },
            },
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return NextResponse.json(conversations);
  } catch (error) {
    console.error('Error fetching conversations:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Create a new conversation or send a message to an existing one
export async function POST(request: Request) {
  try {
    const session = await auth();
    const userId = session?.userId;
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const validatedData = messageSchema.safeParse(data);

    if (!validatedData.success) {
      return NextResponse.json(
        { error: 'Invalid message data', details: validatedData.error.errors },
        { status: 400 }
      );
    }

    const { conversationId, recipientId, content, attachments = [], jobId } = validatedData.data;

    // Get user profile
    const userProfile = await prisma.userProfile.findUnique({
      where: { userId },
    });

    if (!userProfile) {
      return NextResponse.json({ error: 'User profile not found' }, { status: 404 });
    }

    // Get or create conversation
    let conversation;
    if (conversationId) {
      conversation = await prisma.conversation.findFirst({
        where: {
          id: conversationId,
          participants: {
            some: {
              id: userProfile.id,
            },
          },
        },
        include: {
          participants: true,
        },
      });

      if (!conversation) {
        return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });
      }
    } else {
      conversation = await prisma.conversation.create({
        data: {
          jobId,
          participants: {
            connect: [
              { id: userProfile.id },
              { id: recipientId },
            ],
          },
        },
        include: {
          participants: true,
        },
      });
    }

    // Create message
    const message = await prisma.message.create({
      data: {
        content,
        attachments,
        sender: {
          connect: { id: userProfile.id },
        },
        conversation: {
          connect: { id: conversation.id },
        },
        readBy: {
          create: {
            userId: userProfile.id,
            isRead: true,
            readAt: new Date(),
          },
        },
      },
      include: {
        sender: {
          select: {
            id: true,
            displayName: true,
            avatar: true,
          },
        },
        readBy: true,
      },
    });

    // Update conversation timestamp
    await prisma.conversation.update({
      where: { id: conversation.id },
      data: { updatedAt: new Date() },
    });

    // Create notification for recipient
    const recipient = conversation.participants.find(p => p.id !== userProfile.id);
    if (recipient) {
      await createNotification(
        recipient.userId,
        'message',
        `New message from ${userProfile.displayName}`,
        content.length > 50 ? `${content.substring(0, 50)}...` : content,
        {
          conversationId: conversation.id,
          messageId: message.id,
          senderId: userProfile.id,
        }
      );
    }

    // Emit real-time update via Socket.IO
    const io = global.socketIo;
    if (io && recipient) {
      io.to(recipient.userId).emit('message', {
        conversationId: conversation.id,
        message,
      });
    }

    return NextResponse.json(message);
  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Mark messages as read
export async function PUT(request: Request) {
  try {
    const session = await auth();
    const userId = session?.userId;
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const { conversationId } = data;

    // Get user profile
    const userProfile = await prisma.userProfile.findUnique({
      where: { userId },
    });

    if (!userProfile) {
      return NextResponse.json({ error: 'User profile not found' }, { status: 404 });
    }

    // Get unread messages
    const unreadMessages = await prisma.message.findMany({
      where: {
        conversationId,
        NOT: {
          senderId: userProfile.id,
        },
        readBy: {
          none: {
            userId: userProfile.id,
          },
        },
      },
    });

    // Mark messages as read
    await Promise.all(
      unreadMessages.map(message =>
        prisma.messageStatus.create({
          data: {
            messageId: message.id,
            userId: userProfile.id,
            isRead: true,
            readAt: new Date(),
          },
        })
      )
    );

    // Emit read receipts via Socket.IO
    const io = global.socketIo;
    if (io && unreadMessages.length > 0) {
      const conversation = await prisma.conversation.findUnique({
        where: { id: conversationId },
        include: {
          participants: true,
        },
      });

      const sender = conversation?.participants.find(p => p.id !== userProfile.id);
      if (sender) {
        io.to(sender.userId).emit('read', {
          conversationId,
          userId: userProfile.id,
          messageIds: unreadMessages.map(m => m.id),
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error marking messages as read:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 