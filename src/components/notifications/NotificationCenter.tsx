import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBell, FiX, FiCheck } from 'react-icons/fi';
import { useAuth } from '@clerk/nextjs';
import { io, Socket } from 'socket.io-client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

interface Notification {
  id: string;
  type: 'message' | 'proposal' | 'job_update' | 'mention';
  title: string;
  content: string;
  data?: Record<string, any>;
  isRead: boolean;
  createdAt: string;
}

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'connecting' | 'error'>('connecting');
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { userId } = useAuth();
  const router = useRouter();

  // Initialize Socket.IO connection
  useEffect(() => {
    if (!userId) return;

    const connectSocket = () => {
      setConnectionStatus('connecting');
      const socketInstance = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL || '', {
        auth: { userId },
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        timeout: 10000,
      });

      socketInstance.on('connect', () => {
        console.log('Connected to notification service');
        setConnectionStatus('connected');
        socketInstance.emit('join', userId);
      });

      socketInstance.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
        setConnectionStatus('error');
        // Clear any existing retry timeout
        if (retryTimeoutRef.current) {
          clearTimeout(retryTimeoutRef.current);
        }
        // Try to reconnect after 5 seconds
        retryTimeoutRef.current = setTimeout(() => {
          socketInstance.connect();
        }, 5000);
      });

      socketInstance.on('disconnect', (reason) => {
        console.log('Socket disconnected:', reason);
        setConnectionStatus('disconnected');
        // If the disconnection was initiated by the server, try to reconnect
        if (reason === 'io server disconnect') {
          // Clear any existing retry timeout
          if (retryTimeoutRef.current) {
            clearTimeout(retryTimeoutRef.current);
          }
          // Try to reconnect after 5 seconds
          retryTimeoutRef.current = setTimeout(() => {
            socketInstance.connect();
          }, 5000);
        }
      });

      socketInstance.on('notification', (notification: Notification) => {
        setNotifications(prev => [notification, ...prev]);
        setUnreadCount(prev => prev + 1);
        toast.success(`New notification: ${notification.title}`);
      });

      setSocket(socketInstance);

      return socketInstance;
    };

    const socketInstance = connectSocket();

    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
      socketInstance.disconnect();
    };
  }, [userId]);

  // Fetch initial notifications
  useEffect(() => {
    if (!userId) return;

    const fetchNotifications = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch('/api/notifications', {
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch notifications: ${response.status}`);
        }
        
        const data = await response.json();
        setNotifications(data.notifications);
        setUnreadCount(data.notifications.filter((n: Notification) => !n.isRead).length);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        
        if (error instanceof Error) {
          if (error.name === 'AbortError') {
            toast.error('Notification request timed out. Retrying...');
          } else {
            toast.error(error.message);
          }
        } else {
          toast.error('Failed to load notifications');
        }
        
        // Retry after 5 seconds
        setTimeout(fetchNotifications, 5000);
      }
    };

    fetchNotifications();
  }, [userId]);

  const handleNotificationClick = async (notification: Notification) => {
    try {
      // Mark as read
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch('/api/notifications', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notificationId: notification.id }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`Failed to mark notification as read: ${response.status}`);
      }

      // Update local state
      setNotifications(prev =>
        prev.map(n =>
          n.id === notification.id ? { ...n, isRead: true } : n
        )
      );
      setUnreadCount(prev => Math.max(0, prev - 1));

      // Handle navigation based on notification type
      switch (notification.type) {
        case 'message':
          if (notification.data?.conversationId) {
            router.push(`/messages?conversation=${notification.data.conversationId}`);
          }
          break;
        case 'proposal':
          if (notification.data?.proposalId) {
            router.push(`/proposals/${notification.data.proposalId}`);
          }
          break;
        case 'job_update':
          if (notification.data?.jobId) {
            router.push(`/jobs/${notification.data.jobId}`);
          }
          break;
        default:
          break;
      }

      setIsOpen(false);
    } catch (error) {
      console.error('Error handling notification:', error);
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          toast.error('Request timed out. Please try again.');
        } else {
          toast.error(error.message);
        }
      } else {
        toast.error('Failed to process notification');
      }
    }
  };

  const markAllAsRead = async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch('/api/notifications/mark-all-read', {
        method: 'PUT',
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`Failed to mark all notifications as read: ${response.status}`);
      }

      setNotifications(prev =>
        prev.map(n => ({ ...n, isRead: true }))
      );
      setUnreadCount(0);
      toast.success('All notifications marked as read');
    } catch (error) {
      console.error('Error marking all as read:', error);
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          toast.error('Request timed out. Please try again.');
        } else {
          toast.error(error.message);
        }
      } else {
        toast.error('Failed to mark notifications as read');
      }
    }
  };

  const deleteNotification = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch(`/api/notifications?id=${id}`, {
        method: 'DELETE',
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`Failed to delete notification: ${response.status}`);
      }

      setNotifications(prev =>
        prev.filter(n => n.id !== id)
      );
      if (!notifications.find(n => n.id === id)?.isRead) {
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
      toast.success('Notification deleted');
    } catch (error) {
      console.error('Error deleting notification:', error);
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          toast.error('Request timed out. Please try again.');
        } else {
          toast.error(error.message);
        }
      } else {
        toast.error('Failed to delete notification');
      }
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else if (days < 7) {
      return `${days}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-background-dark transition-colors"
      >
        <FiBell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
        {connectionStatus === 'error' && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
        )}
        {connectionStatus === 'connecting' && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-yellow-500 rounded-full"></span>
        )}
      </button>

      {/* Notification Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 mt-2 w-96 bg-background border border-primary/20 rounded-lg shadow-lg overflow-hidden z-50"
          >
            {/* Header */}
            <div className="p-4 border-b border-primary/20 flex items-center justify-between">
              <h3 className="font-semibold">Notifications</h3>
              <div className="flex items-center space-x-2">
                {connectionStatus === 'error' && (
                  <span className="text-xs text-red-500">Offline</span>
                )}
                {connectionStatus === 'connecting' && (
                  <span className="text-xs text-yellow-500">Connecting...</span>
                )}
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-sm text-primary hover:text-primary-dark transition-colors"
                  >
                    Mark all as read
                  </button>
                )}
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-[400px] overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map(notification => (
                  <div
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification)}
                    className={`p-4 border-b border-primary/20 cursor-pointer hover:bg-background-dark transition-colors ${
                      !notification.isRead ? 'bg-primary/5' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium">{notification.title}</h4>
                        <p className="text-sm text-gray-400 mt-1">
                          {notification.content}
                        </p>
                        <span className="text-xs text-gray-400 mt-2 block">
                          {formatTimestamp(notification.createdAt)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {!notification.isRead && (
                          <div className="w-2 h-2 rounded-full bg-primary" />
                        )}
                        <button
                          onClick={(e) => deleteNotification(notification.id, e)}
                          className="p-1 hover:text-red-500 transition-colors"
                        >
                          <FiX className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-400">
                  No notifications
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 