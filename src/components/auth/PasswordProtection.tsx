'use client';

import { useState, useEffect } from 'react';

interface PasswordProtectionProps {
  children: React.ReactNode;
}

export default function PasswordProtection({ children }: PasswordProtectionProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const auth = localStorage.getItem('solhire-auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'solhire888') {
      setIsAuthenticated(true);
      localStorage.setItem('solhire-auth', 'true');
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-background-dark p-8 rounded-xl border border-primary/30">
          <h1 className="text-2xl font-bold mb-6 text-center">SolHire Access</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password Required
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-background border border-primary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Enter password"
                autoFocus
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
            <button
              type="submit"
              className="w-full btn btn-primary py-2"
            >
              Access Site
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 