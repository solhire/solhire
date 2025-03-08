'use client';

import { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiMail, FiAlertCircle, FiCheckCircle, FiLoader } from 'react-icons/fi';

// Loading fallback component
function ForgotPasswordLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px]">
      <FiLoader className="w-16 h-16 text-primary animate-spin mb-4" />
      <p className="text-gray-300">Loading...</p>
    </div>
  );
}

// Component that uses useRouter
function ForgotPasswordForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setStatus('error');
      setMessage('Please enter your email address');
      return;
    }
    
    setIsLoading(true);
    setStatus('idle');
    setMessage('');
    
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setStatus('success');
        setMessage(data.message || 'Password reset email sent. Please check your inbox.');
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to send reset email. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="max-w-md w-full">
      <div className="text-center mb-8">
        <Link href="/" className="inline-block">
          <span className="text-3xl font-bold text-white">Sol<span className="text-primary">Hire</span></span>
        </Link>
        <h1 className="mt-6 text-3xl font-bold text-white">Reset Password</h1>
        <p className="mt-2 text-gray-400">
          Enter your email address and we'll send you a link to reset your password
        </p>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card p-8"
      >
        {status === 'success' ? (
          <div className="text-center">
            <FiCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-4">Check Your Email</h2>
            <p className="text-gray-300 mb-6">{message}</p>
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => {
                  setEmail('');
                  setStatus('idle');
                  setMessage('');
                }}
                className="btn btn-outline"
              >
                Send Another Email
              </button>
              <Link href="/login" className="btn btn-primary">
                Back to Login
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {status === 'error' && (
              <div className="p-3 bg-red-900/20 border border-red-500/50 rounded-lg flex items-center text-red-500">
                <FiAlertCircle className="mr-2 flex-shrink-0" />
                <span>{message}</span>
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input pl-10 w-full"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>
            
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn btn-primary"
              >
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </div>
            
            <div className="text-center">
              <Link href="/login" className="text-primary hover:text-primary-light text-sm">
                Back to Login
              </Link>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}

// Main page component with Suspense boundary
export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <Suspense fallback={<ForgotPasswordLoading />}>
        <ForgotPasswordForm />
      </Suspense>
    </main>
  );
} 