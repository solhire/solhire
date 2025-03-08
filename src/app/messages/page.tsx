'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import { FiSearch, FiSend, FiPaperclip, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

interface Message {
  id: string;
  content: string;
  senderId: string;
  createdAt: string;
  attachments: string[];
  isRead: boolean;
  sender: {
    displayName: string;
    avatar: string;
  };
}

interface Conversation {
  id: string;
  participants: {
    id: string;
    displayName: string;
    avatar: string;
  }[];
  messages: Message[];
  job?: {
    id: string;
    title: string;
  };
  _count: {
    messages: number;
  };
  updatedAt: string;
}

export default function MessagesPage() {
  const router = useRouter();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch conversations
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await fetch('/api/messages');
        if (!response.ok) throw new Error('Failed to fetch conversations');
        const data = await response.json();
        setConversations(data);
      } catch (error) {
        console.error('Error fetching conversations:', error);
        toast.error('Failed to load conversations');
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  // Fetch messages for selected conversation
  useEffect(() => {
    if (!selectedConversation) return;

    const fetchMessages = async () => {
      try {
        const response = await fetch(`/api/messages/${selectedConversation.id}`);
        if (!response.ok) throw new Error('Failed to fetch messages');
        const data = await response.json();
        setMessages(data);
        scrollToBottom();
      } catch (error) {
        console.error('Error fetching messages:', error);
        toast.error('Failed to load messages');
      }
    };

    fetchMessages();

    // Mark messages as read
    fetch('/api/messages', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conversationId: selectedConversation.id }),
    }).catch(console.error);
  }, [selectedConversation]);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedConversation || (!newMessage.trim() && !attachments.length) || sending) return;

    try {
      setSending(true);

      // Upload attachments first if any
      const attachmentUrls = [];
      if (attachments.length > 0) {
        for (const file of attachments) {
          const formData = new FormData();
          formData.append('file', file);
          
          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });
          
          if (!response.ok) {
            throw new Error('Failed to upload attachment');
          }
          
          const data = await response.json();
          attachmentUrls.push(data.url);
        }
      }

      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationId: selectedConversation.id,
          content: newMessage.trim(),
          attachments: attachmentUrls,
        }),
      });

      if (!response.ok) throw new Error('Failed to send message');

      const message = await response.json();
      setMessages(prev => [...prev, message]);
      setNewMessage('');
      setAttachments([]);
      scrollToBottom();
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    } finally {
      setSending(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const validFiles = newFiles.filter(file => {
        if (file.size > 10 * 1024 * 1024) { // 10MB limit
          toast.error(`File ${file.name} exceeds 10MB limit`);
          return false;
        }
        return true;
      });
      setAttachments(prev => [...prev, ...validFiles]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <MainLayout>
      <section className="py-20 bg-background-light min-h-screen">
        <div className="container-custom">
          <div className="bg-background rounded-xl shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 min-h-[600px]">
              {/* Conversations List */}
              <div className="border-r border-primary/20">
                <div className="p-4 border-b border-primary/20">
                  <div className="relative">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search conversations..."
                      className="input w-full pl-12"
                    />
                  </div>
                </div>
                <div className="overflow-y-auto h-[calc(100vh-16rem)]">
                  {loading ? (
                    <div className="p-4 space-y-4">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex items-center space-x-4 animate-pulse">
                          <div className="w-12 h-12 bg-background-dark rounded-full" />
                          <div className="flex-1 space-y-2">
                            <div className="h-4 bg-background-dark rounded w-3/4" />
                            <div className="h-3 bg-background-dark rounded w-1/2" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : conversations.length > 0 ? (
                    conversations.map((conversation) => {
                      const otherParticipant = conversation.participants.find(
                        p => p.id !== selectedConversation?.participants[0].id
                      );
                      const lastMessage = conversation.messages[0];

                      return (
                        <button
                          key={conversation.id}
                          onClick={() => setSelectedConversation(conversation)}
                          className={`w-full p-4 text-left hover:bg-primary/5 transition-colors ${
                            selectedConversation?.id === conversation.id ? 'bg-primary/10' : ''
                          }`}
                        >
                          <div className="flex items-center space-x-4">
                            <img
                              src={otherParticipant?.avatar || '/default-avatar.png'}
                              alt={otherParticipant?.displayName}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium truncate">
                                {otherParticipant?.displayName}
                              </h3>
                              {conversation.job && (
                                <p className="text-sm text-primary truncate">
                                  Re: {conversation.job.title}
                                </p>
                              )}
                              {lastMessage && (
                                <p className="text-sm text-gray-400 truncate">
                                  {lastMessage.content}
                                </p>
                              )}
                            </div>
                            {conversation._count.messages > 0 && (
                              <div className="flex flex-col items-end space-y-1">
                                <span className="text-xs text-gray-400">
                                  {formatTimestamp(conversation.updatedAt)}
                                </span>
                                {conversation._count.messages > 0 && (
                                  <span className="px-2 py-1 bg-primary text-white text-xs rounded-full">
                                    {conversation._count.messages}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </button>
                      );
                    })
                  ) : (
                    <div className="p-8 text-center text-gray-400">
                      No conversations yet
                    </div>
                  )}
                </div>
              </div>

              {/* Chat Area */}
              <div className="col-span-2 lg:col-span-3 flex flex-col">
                {selectedConversation ? (
                  <>
                    {/* Chat Header */}
                    <div className="p-4 border-b border-primary/20">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <img
                            src={selectedConversation.participants[1]?.avatar || '/default-avatar.png'}
                            alt={selectedConversation.participants[1]?.displayName}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <h3 className="font-medium">
                              {selectedConversation.participants[1]?.displayName}
                            </h3>
                            {selectedConversation.job && (
                              <p className="text-sm text-primary">
                                Re: {selectedConversation.job.title}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${
                            message.senderId === selectedConversation.participants[0].id
                              ? 'justify-end'
                              : 'justify-start'
                          }`}
                        >
                          <div
                            className={`max-w-[70%] ${
                              message.senderId === selectedConversation.participants[0].id
                                ? 'bg-primary text-white'
                                : 'bg-background-dark'
                            } rounded-lg p-3`}
                          >
                            <p className="text-sm">{message.content}</p>
                            {message.attachments.length > 0 && (
                              <div className="mt-2 space-y-1">
                                {message.attachments.map((url, index) => (
                                  <a
                                    key={index}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block text-xs underline"
                                  >
                                    Attachment {index + 1}
                                  </a>
                                ))}
                              </div>
                            )}
                            <span className="block text-xs mt-1 opacity-75">
                              {formatTimestamp(message.createdAt)}
                            </span>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Message Input */}
                    <div className="p-4 border-t border-primary/20">
                      {attachments.length > 0 && (
                        <div className="mb-4 flex flex-wrap gap-2">
                          {attachments.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center bg-background-dark rounded-lg px-3 py-1"
                            >
                              <span className="text-sm truncate max-w-[200px]">
                                {file.name}
                              </span>
                              <button
                                onClick={() => removeAttachment(index)}
                                className="ml-2 text-red-500 hover:text-red-400"
                              >
                                <FiX className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                      <form onSubmit={handleSendMessage} className="flex items-center space-x-4">
                        <input
                          type="file"
                          multiple
                          className="hidden"
                          id="file-upload"
                          onChange={handleFileChange}
                        />
                        <label
                          htmlFor="file-upload"
                          className="p-2 hover:bg-background-dark rounded-lg cursor-pointer transition-colors"
                        >
                          <FiPaperclip className="w-5 h-5" />
                        </label>
                        <input
                          type="text"
                          placeholder="Type a message..."
                          className="flex-1 input"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <button
                          type="submit"
                          className="btn btn-primary p-2"
                          disabled={(!newMessage.trim() && !attachments.length) || sending}
                        >
                          <FiSend className="w-5 h-5" />
                        </button>
                      </form>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <h3 className="text-xl font-medium mb-2">Select a Conversation</h3>
                      <p className="text-gray-400">
                        Choose a conversation from the list to start chatting
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
} 