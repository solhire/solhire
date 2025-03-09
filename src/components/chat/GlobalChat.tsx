'use client';

import { useState, useEffect, useRef } from 'react';
import { database } from '@/lib/firebase';
import { ref, push, onValue, query, limitToLast, remove, serverTimestamp } from 'firebase/database';
import { FiX, FiSend, FiMaximize2, FiMinimize2, FiMessageCircle } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface Message {
  id: string;
  text: string;
  timestamp: number;
  color: string; // Random color for each message sender
  username?: string; // Optional username
}

export default function GlobalChat({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [username, setUsername] = useState('');
  const [isUsernameSet, setIsUsernameSet] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  const [userColor] = useState(() => {
    // Generate random color for this user session
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#D4A5A5', '#9B59B6', '#3498DB'];
    return colors[Math.floor(Math.random() * colors.length)];
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const usernameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Try to get username from localStorage
    const savedUsername = localStorage.getItem('chat_username');
    if (savedUsername) {
      setUsername(savedUsername);
      setIsUsernameSet(true);
    }

    const messagesRef = query(ref(database, 'global_chat_messages'), limitToLast(50));
    
    try {
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
    } catch (error) {
      console.error("Error connecting to Firebase:", error);
      // Show a user-friendly error message
      setMessages([{
        id: 'error',
        text: 'Unable to connect to chat. Please try again later.',
        timestamp: Date.now(),
        color: '#FF6B6B'
      }]);
    }
  }, [isOpen]);

  // Clean old messages periodically
  useEffect(() => {
    if (!isOpen) return;

    const cleanup = setInterval(() => {
      const sixHoursAgo = Date.now() - 21600000; // 6 hours in milliseconds
      const messagesRef = ref(database, 'global_chat_messages');
      
      try {
        onValue(messagesRef, (snapshot) => {
          snapshot.forEach((childSnapshot) => {
            const message = childSnapshot.val();
            if (message.timestamp < sixHoursAgo) {
              remove(childSnapshot.ref);
            }
          });
        }, { onlyOnce: true });
      } catch (error) {
        console.error("Error cleaning up old messages:", error);
      }
    }, 1800000); // Run every 30 minutes

    return () => clearInterval(cleanup);
  }, [isOpen]);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSetUsername = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      localStorage.setItem('chat_username', username.trim());
      setIsUsernameSet(true);
      inputRef.current?.focus();
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || isSending || !isUsernameSet) return;

    try {
      setIsSending(true);
      const messagesRef = ref(database, 'global_chat_messages');
      await push(messagesRef, {
        text: newMessage.trim(),
        timestamp: Date.now(),
        color: userColor,
        username: username.trim()
      });
      setNewMessage('');
      scrollToBottom();
    } catch (error) {
      console.error('Error sending message:', error);
      // Show error to user
      alert('Failed to send message. Please try again.');
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
      className="fixed bottom-4 right-4 bg-gradient-to-br from-background-dark to-background border border-primary/20 rounded-full shadow-lg p-4 cursor-pointer z-50 hover:border-primary/50 transition-all duration-300 group"
      onClick={() => setIsMinimized(false)}
    >
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-sm font-medium text-white group-hover:text-primary transition-colors duration-300">Global Chat</span>
      </div>
    </motion.div>
  );

  const usernameForm = (
    <div className="flex-1 flex flex-col items-center justify-center p-6">
      <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
        <FiMessageCircle className="w-8 h-8 text-primary" />
      </div>
      <h3 className="text-xl font-semibold mb-6 text-white">Join the Global Chat</h3>
      <form onSubmit={handleSetUsername} className="w-full max-w-sm">
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-400 mb-2">
            Choose a username
          </label>
          <input
            ref={usernameInputRef}
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="w-full bg-background rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary border border-primary/20"
            maxLength={20}
            autoFocus
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-primary to-accent text-white py-2 rounded-lg hover:from-primary/90 hover:to-accent/90 transition-all duration-300 font-medium"
          disabled={!username.trim()}
        >
          Join Chat
        </button>
      </form>
    </div>
  );

  const chatContent = (
    <motion.div
      initial={isMobile ? 'mobile.initial' : 'desktop.initial'}
      animate={isMobile ? 'mobile.animate' : 'desktop.animate'}
      exit={isMobile ? 'mobile.exit' : 'desktop.exit'}
      variants={containerVariants}
      transition={{ type: 'spring', damping: 20 }}
      className={`fixed bg-gradient-to-br from-background-dark to-background border border-primary/20 shadow-lg flex flex-col z-50 ${
        isMobile
          ? 'inset-0'
          : 'bottom-0 right-4 w-96 h-[600px] rounded-t-xl'
      }`}
    >
      {/* Chat Header */}
      <div className="p-4 border-b border-primary/20 flex items-center justify-between bg-background-dark/50">
        <div className="flex items-center space-x-2">
          <h3 className="font-semibold text-white">Global Chat</h3>
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
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

      {!isUsernameSet ? (
        usernameForm
      ) : (
        <>
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-400 text-center">No messages yet. Be the first to say hello!</p>
              </div>
            ) : (
              messages.map((message) => (
                <div key={message.id} className="flex flex-col space-y-1">
                  <div className="flex items-center space-x-2">
                    {message.username && (
                      <span 
                        className="text-xs font-medium"
                        style={{ color: message.color }}
                      >
                        {message.username}
                      </span>
                    )}
                    <span className="text-xs text-gray-400">
                      {formatTimestamp(message.timestamp)}
                    </span>
                  </div>
                  <div className="flex">
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
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <form onSubmit={sendMessage} className="p-4 border-t border-primary/20 bg-background-dark/30">
            <div className="flex items-center space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-background rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary border border-primary/20"
                maxLength={500}
              />
              <button
                type="submit"
                className="p-2 bg-gradient-to-r from-primary to-accent rounded-lg text-white hover:from-primary/90 hover:to-accent/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!newMessage.trim() || isSending}
              >
                <FiSend className="w-5 h-5" />
              </button>
            </div>
          </form>
        </>
      )}
    </motion.div>
  );

  return (
    <AnimatePresence>
      {isOpen && (isMinimized ? minimizedChat : chatContent)}
    </AnimatePresence>
  );
} 