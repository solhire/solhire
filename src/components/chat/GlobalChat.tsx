'use client';

import { useState, useEffect, useRef } from 'react';
import { database } from '@/lib/firebase';
import { ref, push, onValue, query, limitToLast, remove } from 'firebase/database';
import { FiX, FiSend, FiMaximize2, FiMinimize2 } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface Message {
  id: string;
  text: string;
  timestamp: number;
  color: string; // Random color for each message sender
}

export default function GlobalChat({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  const [userColor] = useState(() => {
    // Generate random color for this user session
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#D4A5A5', '#9B59B6', '#3498DB'];
    return colors[Math.floor(Math.random() * colors.length)];
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const messagesRef = query(ref(database, 'temp_messages'), limitToLast(50));
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const messagesData: Message[] = [];
      snapshot.forEach((childSnapshot) => {
        messagesData.push({
          id: childSnapshot.key as string,
          ...childSnapshot.val()
        });
      });
      setMessages(messagesData);
      scrollToBottom();
    });

    return () => {
      unsubscribe();
    };
  }, [isOpen]);

  // Clean old messages periodically
  useEffect(() => {
    if (!isOpen) return;

    const cleanup = setInterval(() => {
      const oneHourAgo = Date.now() - 3600000; // 1 hour in milliseconds
      const messagesRef = ref(database, 'temp_messages');
      
      onValue(messagesRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const message = childSnapshot.val();
          if (message.timestamp < oneHourAgo) {
            remove(childSnapshot.ref);
          }
        });
      }, { onlyOnce: true });
    }, 300000); // Run every 5 minutes

    return () => clearInterval(cleanup);
  }, [isOpen]);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || isSending) return;

    try {
      setIsSending(true);
      const messagesRef = ref(database, 'temp_messages');
      await push(messagesRef, {
        text: newMessage.trim(),
        timestamp: Date.now(),
        color: userColor
      });
      setNewMessage('');
      scrollToBottom();
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSending(false);
      inputRef.current?.focus();
    }
  };

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const containerVariants = {
    mobile: {
      initial: { y: '100%' },
      animate: { y: 0 },
      exit: { y: '100%' },
    },
    desktop: {
      initial: { y: 600, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: 600, opacity: 0 },
    },
  };

  const minimizedChat = (
    <motion.div
      initial={{ y: 600, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-4 right-4 bg-background-dark border border-primary/20 rounded-full shadow-lg p-4 cursor-pointer z-50"
      onClick={() => setIsMinimized(false)}
    >
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 rounded-full bg-green-500" />
        <span className="text-sm font-medium">Global Chat</span>
      </div>
    </motion.div>
  );

  const chatContent = (
    <motion.div
      initial={isMobile ? 'mobile.initial' : 'desktop.initial'}
      animate={isMobile ? 'mobile.animate' : 'desktop.animate'}
      exit={isMobile ? 'mobile.exit' : 'desktop.exit'}
      variants={containerVariants}
      transition={{ type: 'spring', damping: 20 }}
      className={`fixed bg-background-dark border border-primary/20 shadow-lg flex flex-col z-50 ${
        isMobile
          ? 'inset-0'
          : 'bottom-0 right-4 w-96 h-[600px] rounded-t-xl'
      }`}
    >
      {/* Chat Header */}
      <div className="p-4 border-b border-primary/20 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h3 className="font-semibold">Global Chat</h3>
          <div className="w-2 h-2 rounded-full bg-green-500" />
        </div>
        <div className="flex items-center space-x-2">
          {!isMobile && (
            <button
              onClick={() => setIsMinimized(true)}
              className="p-1 hover:text-primary transition-colors"
              aria-label="Minimize chat"
            >
              <FiMinimize2 className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 hover:text-primary transition-colors"
            aria-label="Close chat"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="flex flex-col space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-400">
                {formatTimestamp(message.timestamp)}
              </span>
            </div>
            <p 
              className="text-sm px-3 py-2 rounded-lg max-w-[85%] break-words"
              style={{ 
                backgroundColor: `${message.color}15`,
                color: message.color 
              }}
            >
              {message.text}
            </p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={sendMessage} className="p-4 border-t border-primary/20">
        <div className="flex items-center space-x-2">
          <input
            ref={inputRef}
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-background rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary border border-primary/20"
            maxLength={500}
          />
          <button
            type="submit"
            className="p-2 bg-primary rounded-lg text-white hover:bg-primary-dark transition-colors"
            disabled={!newMessage.trim()}
          >
            <FiSend className="w-5 h-5" />
          </button>
        </div>
      </form>
    </motion.div>
  );

  return (
    <AnimatePresence>
      {isOpen && (isMinimized ? minimizedChat : chatContent)}
    </AnimatePresence>
  );
} 