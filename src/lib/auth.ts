'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Mock authentication state - in a real app, this would come from your auth provider
export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isWalletConnected, setIsWalletConnected] = useState<boolean>(false);
  
  // Simulate checking auth state
  useEffect(() => {
    // Check localStorage or cookies for auth token
    const hasToken = localStorage.getItem('solhire_auth_token');
    setIsAuthenticated(!!hasToken);
    
    // Check if wallet is connected
    const hasWallet = localStorage.getItem('solhire_wallet_connected');
    setIsWalletConnected(!!hasWallet);
  }, []);
  
  return {
    isAuthenticated,
    isWalletConnected,
    login: () => {
      localStorage.setItem('solhire_auth_token', 'mock_token');
      setIsAuthenticated(true);
    },
    logout: () => {
      localStorage.removeItem('solhire_auth_token');
      localStorage.removeItem('solhire_wallet_connected');
      setIsAuthenticated(false);
      setIsWalletConnected(false);
    },
    connectWallet: () => {
      localStorage.setItem('solhire_wallet_connected', 'true');
      setIsWalletConnected(true);
    },
    disconnectWallet: () => {
      localStorage.removeItem('solhire_wallet_connected');
      setIsWalletConnected(false);
    }
  };
};

// Protected route wrapper
export function withAuth(Component: React.ComponentType) {
  return function ProtectedRoute(props: any) {
    const router = useRouter();
    const { isAuthenticated } = useAuth();
    
    useEffect(() => {
      // If not authenticated, redirect to login
      if (isAuthenticated === false) {
        router.push('/login?message=Please log in to access this page');
      }
    }, [isAuthenticated, router]);
    
    // Show nothing while checking auth
    if (isAuthenticated === null) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border-4 border-t-primary border-r-primary/50 border-b-primary/30 border-l-primary/10 animate-spin" />
        </div>
      );
    }
    
    // If authenticated, render the component
    return isAuthenticated ? <Component {...props} /> : null;
  };
}

// Wallet connection required wrapper
export function withWallet(Component: React.ComponentType) {
  return function WalletRequiredRoute(props: any) {
    const router = useRouter();
    const { isAuthenticated, isWalletConnected } = useAuth();
    
    useEffect(() => {
      // First check if user is authenticated
      if (isAuthenticated === false) {
        router.push('/login?message=Please log in to access this page');
        return;
      }
      
      // Then check if wallet is connected
      if (isAuthenticated && isWalletConnected === false) {
        router.push('/connect-wallet?message=Please connect your wallet to access this page');
      }
    }, [isAuthenticated, isWalletConnected, router]);
    
    // Show loading while checking
    if (isAuthenticated === null || (isAuthenticated && isWalletConnected === false)) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border-4 border-t-primary border-r-primary/50 border-b-primary/30 border-l-primary/10 animate-spin" />
        </div>
      );
    }
    
    // If authenticated and wallet connected, render the component
    return (isAuthenticated && isWalletConnected) ? <Component {...props} /> : null;
  };
}

// List of features that require authentication
export const PROTECTED_FEATURES = [
  '/post-a-job',
  '/dashboard',
  '/profile',
  '/messages',
  '/settings',
  '/my-services',
  '/my-jobs',
  '/earnings',
];

// List of features that require wallet connection
export const WALLET_REQUIRED_FEATURES = [
  '/post-a-job',
  '/earnings',
  '/withdraw',
];

// Function to check if a path requires authentication
export const requiresAuth = (path: string): boolean => {
  return PROTECTED_FEATURES.some(feature => path.startsWith(feature));
};

// Function to check if a path requires wallet connection
export const requiresWallet = (path: string): boolean => {
  return WALLET_REQUIRED_FEATURES.some(feature => path.startsWith(feature));
}; 