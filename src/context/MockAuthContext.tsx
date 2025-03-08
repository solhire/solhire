'use client';

import { createContext, useContext, useState, useEffect } from 'react';

interface MockUser {
  id: string;
  username: string;
  email: string;
  avatar: string;
  role: 'creator' | 'client';
  isVerified: boolean;
  walletAddress?: string;
  displayName?: string;
  bio?: string;
  location?: string;
  timeZone?: string;
  skills?: string[];
  interests?: string[];
  languages?: string[];
}

interface MockAuthContextType {
  user: MockUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (email: string, password: string, username: string) => Promise<void>;
}

const MockAuthContext = createContext<MockAuthContextType | undefined>(undefined);

const MOCK_USER: MockUser = {
  id: 'mock-user-1',
  username: 'demo_user',
  email: 'demo@solhire.com',
  avatar: '/placeholder-avatar.jpg',
  role: 'creator',
  isVerified: true,
  walletAddress: '7xKXVg...3cUb',
  displayName: 'Demo User',
  bio: 'This is a demo account for testing purposes.',
  location: 'Global',
  timeZone: 'UTC',
  skills: ['Web Development', 'UI/UX Design', 'Smart Contracts'],
  interests: ['Blockchain', 'DeFi', 'Web3'],
  languages: ['English']
};

export function MockAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('mockUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock credentials check
    if (email === 'demo@solhire.com' && password === 'demo123') {
      setUser(MOCK_USER);
      localStorage.setItem('mockUser', JSON.stringify(MOCK_USER));
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mockUser');
  };

  const signup = async (email: string, password: string, username: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newUser = {
      ...MOCK_USER,
      email,
      username,
      id: `mock-user-${Date.now()}`
    };

    setUser(newUser);
    localStorage.setItem('mockUser', JSON.stringify(newUser));
  };

  return (
    <MockAuthContext.Provider value={{ user, isLoading, login, logout, signup }}>
      {children}
    </MockAuthContext.Provider>
  );
}

export function useMockAuth() {
  const context = useContext(MockAuthContext);
  if (context === undefined) {
    throw new Error('useMockAuth must be used within a MockAuthProvider');
  }
  return context;
} 