import { prisma } from './prisma';
import { Server as SocketIOServer } from 'socket.io';

declare global {
  var socketIo: SocketIOServer | undefined;
}

export type NotificationType = 'message' | 'proposal' | 'job_update' | 'mention';

interface NotificationData {
  conversationId?: string;
  jobId?: string;
  proposalId?: string;
  messageId?: string;
  [key: string]: any;
}

export async function createNotification(
  userId: string,
  type: NotificationType,
  title: string,
  content: string,
  data?: NotificationData
) {
  try {
    const notification = await prisma.userProfile.update({
      where: { userId },
      data: {
        notifications: {
          create: {
            type,
            title,
            content,
            data: data || {},
          },
        },
      },
      include: {
        notifications: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
        },
      },
    });

    const newNotification = notification.notifications[0];

    // If socket server is available, emit notification
    if (global.socketIo) {
      global.socketIo.to(userId).emit('notification', {
        id: newNotification.id,
        type,
        title,
        content,
        data,
        createdAt: newNotification.createdAt,
      });
    }

    return newNotification;
  } catch (error) {
    console.error('Error creating notification:', error);
    throw error;
  }
}

export async function markNotificationAsRead(notificationId: string, userId: string) {
  try {
    const notification = await prisma.userProfile.update({
      where: { userId },
      data: {
        notifications: {
          update: {
            where: { id: notificationId },
            data: { isRead: true },
          },
        },
      },
      include: {
        notifications: {
          where: { id: notificationId },
        },
      },
    });

    return notification.notifications[0];
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
}

export async function markAllNotificationsAsRead(userId: string) {
  try {
    await prisma.userProfile.update({
      where: { userId },
      data: {
        notifications: {
          updateMany: {
            where: { isRead: false },
            data: { isRead: true },
          },
        },
      },
    });
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    throw error;
  }
}

export async function getUnreadNotificationsCount(userId: string) {
  try {
    const user = await prisma.userProfile.findUnique({
      where: { userId },
      select: {
        _count: {
          select: {
            notifications: {
              where: { isRead: false },
            },
          },
        },
      },
    });

    return user?._count.notifications || 0;
  } catch (error) {
    console.error('Error getting unread notifications count:', error);
    throw error;
  }
}

export async function getUserNotifications(
  userId: string,
  page: number = 1,
  limit: number = 20
) {
  try {
    const skip = (page - 1) * limit;

    const user = await prisma.userProfile.findUnique({
      where: { userId },
      select: {
        notifications: {
          orderBy: { createdAt: 'desc' },
          skip,
          take: limit,
        },
        _count: {
          select: {
            notifications: true,
          },
        },
      },
    });

    const notifications = user?.notifications || [];
    const total = user?._count.notifications || 0;

    return {
      notifications,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      hasMore: page < Math.ceil(total / limit),
    };
  } catch (error) {
    console.error('Error getting user notifications:', error);
    throw error;
  }
}

export async function deleteNotification(notificationId: string, userId: string) {
  try {
    await prisma.userProfile.update({
      where: { userId },
      data: {
        notifications: {
          delete: {
            id: notificationId,
          },
        },
      },
    });
  } catch (error) {
    console.error('Error deleting notification:', error);
    throw error;
  }
} 