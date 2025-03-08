'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiLock, FiAlertCircle, FiCheckCircle, FiLoader } from 'react-icons/fi';
import { checkPasswordStrength } from '@/lib/password';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, feedback: '' });
  
  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('Invalid reset link. Please request a new password reset.');
    }
  }, [token]);
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(checkPasswordStrength(newPassword));
  };
  
  const validateForm = () => {
    if (!password) {
      setStatus('error');
      setMessage('Please enter a new password');
      return false;
    }
    
    if (password.length < 8) {
      setStatus('error');
      setMessage('Password must be at least 8 characters long');
      return false;
    }
    
    if (passwordStrength.score < 2) {
      setStatus('error');
      setMessage('Password is too weak. ' + passwordStrength.feedback);
      return false;
    }
    
    if (password !== confirmPassword) {
      setStatus('error');
      setMessage('Passwords do not match');
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token) {
      setStatus('error');
      setMessage('Invalid reset link. Please request a new password reset.');
      return;
    }
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setStatus('loading');
    
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setStatus('success');
        setMessage(data.message || 'Your password has been reset successfully!');
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push('/login?message=Password reset successful. You can now log in with your new password.');
        }, 3000);
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to reset password. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Password strength indicator
  const getPasswordStrengthColor = () => {
    switch (passwordStrength.score) {
      case 0: return 'bg-red-500';
      case 1: return 'bg-orange-500';
      case 2: return 'bg-yellow-500';
      case 3: return 'bg-green-500';
      case 4: return 'bg-green-600';
      default: return 'bg-gray-500';
    }
  };
  
  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <span className="text-3xl font-bold text-white">Sol<span className="text-primary">Hire</span></span>
          </Link>
          <h1 className="mt-6 text-3xl font-bold text-white">Reset Password</h1>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card p-8"
        >
          {status === 'loading' && (
            <div className="flex flex-col items-center">
              <FiLoader className="w-16 h-16 text-primary animate-spin mb-4" />
              <p className="text-gray-300">Resetting your password...</p>
            </div>
          )}
          
          {status === 'success' && (
            <div className="text-center">
              <FiCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-4">Password Reset Successful!</h2>
              <p className="text-gray-300 mb-6">{message}</p>
              <p className="text-gray-400 text-sm">Redirecting to login page...</p>
            </div>
          )}
          
          {status === 'error' && !token && (
            <div className="text-center">
              <FiAlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-4">Invalid Reset Link</h2>
              <p className="text-gray-300 mb-6">{message}</p>
              <div className="flex flex-col space-y-4">
                <Link href="/forgot-password" className="btn btn-primary">
                  Request New Reset Link
                </Link>
                <Link href="/login" className="btn btn-outline">
                  Back to Login
                </Link>
              </div>
            </div>
          )}
          
          {(status === 'idle' || (status === 'error' && token)) && (
            <form onSubmit={handleSubmit} className="space-y-6">
              {status === 'error' && (
                <div className="p-3 bg-red-900/20 border border-red-500/50 rounded-lg flex items-center text-red-500">
                  <FiAlertCircle className="mr-2 flex-shrink-0" />
                  <span>{message}</span>
                </div>
              )}
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="input pl-10 w-full"
                    placeholder="••••••••"
                    required
                  />
                </div>
                {password && (
                  <div className="mt-2">
                    <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${getPasswordStrengthColor()}`} 
                        style={{ width: `${(passwordStrength.score + 1) * 20}%` }}
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-400">{passwordStrength.feedback}</p>
                  </div>
                )}
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="input pl-10 w-full"
                    placeholder="••••••••"
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
                  Reset Password
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
    </main>
  );
} 