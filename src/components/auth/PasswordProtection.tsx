'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// This is a simple password protection component that protects the entire site
export default function PasswordProtection({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // The correct password - in a real app, this would be stored securely on the server
  const CORRECT_PASSWORD = 'SolHire2024!'; // Updated password

  useEffect(() => {
    // Check if already authenticated
    const authenticated = localStorage.getItem('solhire_authenticated');
    const authExpiry = localStorage.getItem('solhire_auth_expiry');
    
    // Check if authentication has expired (24 hours)
    if (authenticated === 'true' && authExpiry) {
      const expiryTime = parseInt(authExpiry);
      if (Date.now() < expiryTime) {
        setIsAuthenticated(true);
      } else {
        // Clear expired authentication
        localStorage.removeItem('solhire_authenticated');
        localStorage.removeItem('solhire_auth_expiry');
      }
    }
    setIsLoading(false);
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === CORRECT_PASSWORD) {
      // Set authentication with 24-hour expiry
      localStorage.setItem('solhire_authenticated', 'true');
      localStorage.setItem('solhire_auth_expiry', (Date.now() + 24 * 60 * 60 * 1000).toString());
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
      // Optional: clear password field on error
      setPassword('');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-background-dark p-8 rounded-2xl border border-gray-800 shadow-2xl"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">
              <span className="text-white">Sol</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-600">Hire</span>
            </h1>
            <p className="text-gray-400">This site is password protected</p>
          </div>

          <form onSubmit={handlePasswordSubmit}>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-background border border-gray-700 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none"
                placeholder="Enter site password"
                required
              />
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-900/20 border border-red-800/40 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-purple-600 hover:to-blue-700 transition-all"
            >
              Enter Site
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
} 