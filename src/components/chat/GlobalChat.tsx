'use client';

import { useState, useEffect, useRef } from 'react';
import { database } from '@/lib/firebase';
import { ref, push, onValue, query, limitToLast } from 'firebase/database';
import { FiX, FiSend } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  text: string;
  timestamp: number;
  color: string; // Random color for each message sender
}

export default function GlobalChat({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [userColor] = useState(() => {
    // Generate random color for this user session
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#D4A5A5', '#9B59B6', '#3498DB'];
    return colors[Math.floor(Math.random() * colors.length)];
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Subscribe to last 50 messages
    const messagesRef = query(ref(database, 'messages'), limitToLast(50));
    
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

    return () => unsubscribe();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const messagesRef = ref(database, 'messages');
      await push(messagesRef, {
        text: newMessage,
        timestamp: Date.now(),
        color: userColor
      });
      setNewMessage('');
      inputRef.current?.focus();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: 600, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 600, opacity: 0 }}
          transition={{ type: 'spring', damping: 20 }}
          className="fixed bottom-0 right-4 w-96 h-[600px] bg-background-dark border border-primary/20 rounded-t-xl shadow-lg flex flex-col"
        >
          {/* Chat Header */}
          <div className="p-4 border-b border-primary/20 flex items-center justify-between">
            <h3 className="font-semibold">Global Chat</h3>
            <button
              onClick={onClose}
              className="p-1 hover:text-primary transition-colors"
              aria-label="Close chat"
            >
              <FiX className="w-5 h-5" />
            </button>
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
      )}
    </AnimatePresence>
  );
} 