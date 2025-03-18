'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';

interface PasswordProtectionProps {
  children: React.ReactNode;
}

export function PasswordProtection({ children }: PasswordProtectionProps) {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isError, setIsError] = useState(false);
  const correctPassword = 'shjungle'; // This is not secure - in a real app use env variables and proper auth

  // Check if user has already been authenticated
  useEffect(() => {
    const authenticated = localStorage.getItem('site-authenticated');
    if (authenticated === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
      setIsError(false);
      localStorage.setItem('site-authenticated', 'true');
    } else {
      setIsError(true);
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-8 bg-background-dark rounded-xl border border-zinc-800 shadow-lg">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
            <Lock className="h-8 w-8 text-primary" />
          </div>
          <h2 className="mt-6 text-2xl font-bold text-white">Password Protected</h2>
          <p className="mt-2 text-sm text-gray-400">Enter the password to access this site</p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className={`w-full ${isError ? 'border-red-500' : ''}`}
              placeholder="Enter password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setIsError(false);
              }}
            />
            {isError && (
              <p className="mt-2 text-sm text-red-500">Invalid password. Please try again.</p>
            )}
          </div>

          <div>
            <Button type="submit" className="w-full">
              Access Site
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
} 