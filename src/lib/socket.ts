import { Server as NetServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { NextApiResponse } from 'next';

export type NextApiResponseWithSocket = NextApiResponse & {
  socket: {
    server: NetServer & {
      io?: SocketIOServer;
    };
  };
};

export const initSocket = (res: NextApiResponseWithSocket) => {
  if (!res.socket.server.io) {
    const io = new SocketIOServer(res.socket.server);
    res.socket.server.io = io;

    io.on('connection', (socket) => {
      // Join user to their personal room for private messages
      socket.on('join', (userId: string) => {
        socket.join(userId);
      });

      // Handle real-time messaging
      socket.on('message', (data: { 
        conversationId: string;
        message: any;
        recipientId: string;
      }) => {
        // Emit to conversation participants
        socket.to(data.recipientId).emit('message', {
          conversationId: data.conversationId,
          message: data.message
        });
      });

      // Handle typing indicators
      socket.on('typing', (data: {
        conversationId: string;
        userId: string;
        recipientId: string;
      }) => {
        socket.to(data.recipientId).emit('typing', {
          conversationId: data.conversationId,
          userId: data.userId
        });
      });

      // Handle read receipts
      socket.on('read', (data: {
        conversationId: string;
        userId: string;
        recipientId: string;
      }) => {
        socket.to(data.recipientId).emit('read', {
          conversationId: data.conversationId,
          userId: data.userId
        });
      });
    });
  }
  return res.socket.server.io;
}; 