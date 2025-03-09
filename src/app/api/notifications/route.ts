import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Input validation schema
const notificationSchema = z.object({
  type: z.enum(['message', 'proposal', 'job_update', 'mention']),
  title: z.string(),
  content: z.string(),
  data: z.record(z.any()).optional(),
});

// Get user notifications
export async function GET(request: Request) {
  try {
    const session = await auth();
    const userId = session?.userId;
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 20;
    const skip = (page - 1) * limit;

    // Get user profile
    const userProfile = await prisma.userProfile.findUnique({
      where: { userId },
    });

    if (!userProfile) {
      return NextResponse.json({ error: 'User profile not found' }, { status: 404 });
    }

    // Get notifications with pagination
    const [notifications, total] = await Promise.all([
      prisma.notification.findMany({
        where: {
          userId: userProfile.id,
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      }),
      prisma.notification.count({
        where: {
          userId: userProfile.id,
        },
      }),
    ]);

    return NextResponse.json({
      notifications,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      hasMore: page < Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch notifications' },
      { status: 500 }
    );
  }
}

// Create a notification
export async function POST(request: Request) {
  try {
    const session = await auth();
    const userId = session?.userId;
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const validatedData = notificationSchema.safeParse(data);

    if (!validatedData.success) {
      return NextResponse.json(
        { error: 'Invalid notification data', details: validatedData.error.errors },
        { status: 400 }
      );
    }

    // Get user profile
    const userProfile = await prisma.userProfile.findUnique({
      where: { userId },
    });

    if (!userProfile) {
      return NextResponse.json({ error: 'User profile not found' }, { status: 404 });
    }

    // Create notification
    const notification = await prisma.notification.create({
      data: {
        ...validatedData.data,
        user: {
          connect: { id: userProfile.id },
        },
      },
    });

    // If socket server is available, emit notification
    const io = global.socketIo;
    if (io) {
      io.to(userId).emit('notification', notification);
    }

    return NextResponse.json(notification);
  } catch (error) {
    console.error('Error creating notification:', error);
    return NextResponse.json(
      { error: 'Failed to create notification' },
      { status: 500 }
    );
  }
}

// Mark notification as read
export async function PUT(request: Request) {
  try {
    const session = await auth();
    const userId = session?.userId;
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const { notificationId } = data;

    if (!notificationId) {
      return NextResponse.json(
        { error: 'Notification ID is required' },
        { status: 400 }
      );
    }

    // Get user profile
    const userProfile = await prisma.userProfile.findUnique({
      where: { userId },
    });

    if (!userProfile) {
      return NextResponse.json({ error: 'User profile not found' }, { status: 404 });
    }

    // Update notification
    const notification = await prisma.notification.update({
      where: {
        id: notificationId,
        userId: userProfile.id,
      },
      data: {
        isRead: true,
      },
    });

    return NextResponse.json(notification);
  } catch (error) {
    console.error('Error updating notification:', error);
    return NextResponse.json(
      { error: 'Failed to update notification' },
      { status: 500 }
    );
  }
}

// Delete a notification
export async function DELETE(request: Request) {
  try {
    const session = await auth();
    const userId = session?.userId;
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const notificationId = searchParams.get('id');

    if (!notificationId) {
      return NextResponse.json(
        { error: 'Notification ID is required' },
        { status: 400 }
      );
    }

    // Get user profile
    const userProfile = await prisma.userProfile.findUnique({
      where: { userId },
    });

    if (!userProfile) {
      return NextResponse.json({ error: 'User profile not found' }, { status: 404 });
    }

    // Delete notification
    await prisma.notification.delete({
      where: {
        id: notificationId,
        userId: userProfile.id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting notification:', error);
    return NextResponse.json(
      { error: 'Failed to delete notification' },
      { status: 500 }
    );
  }
} 