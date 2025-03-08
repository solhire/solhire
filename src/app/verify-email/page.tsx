'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiAlertCircle, FiLoader } from 'react-icons/fi';

// Loading fallback component
function VerifyEmailLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px]">
      <FiLoader className="w-16 h-16 text-primary animate-spin mb-4" />
      <p className="text-gray-300">Loading verification...</p>
    </div>
  );
}

// Component that uses useSearchParams
function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');
  
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Verifying your email...');
  
  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('Invalid verification link. Please request a new verification email.');
      return;
    }
    
    const verifyEmail = async () => {
      try {
        const response = await fetch(`/api/auth/verify-email?token=${token}`);
        const data = await response.json();
        
        if (response.ok) {
          setStatus('success');
          setMessage(data.message || 'Your email has been verified successfully!');
          
          // Redirect to login after 3 seconds
          setTimeout(() => {
            router.push('/login?message=Email verified successfully. You can now log in.');
          }, 3000);
        } else {
          setStatus('error');
          setMessage(data.error || 'Failed to verify email. Please try again.');
        }
      } catch (error) {
        setStatus('error');
        setMessage('An error occurred while verifying your email. Please try again.');
      }
    };
    
    verifyEmail();
  }, [token, router]);
  
  return (
    <div className="max-w-md w-full">
      <div className="text-center mb-8">
        <Link href="/" className="inline-block">
          <span className="text-3xl font-bold text-white">Sol<span className="text-primary">Hire</span></span>
        </Link>
        <h1 className="mt-6 text-3xl font-bold text-white">Email Verification</h1>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card p-8 text-center"
      >
        {status === 'loading' && (
          <div className="flex flex-col items-center">
            <FiLoader className="w-16 h-16 text-primary animate-spin mb-4" />
            <p className="text-gray-300">{message}</p>
          </div>
        )}
        
        {status === 'success' && (
          <div className="flex flex-col items-center">
            <FiCheckCircle className="w-16 h-16 text-green-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Email Verified!</h2>
            <p className="text-gray-300 mb-6">{message}</p>
            <p className="text-gray-400 text-sm">Redirecting to login page...</p>
          </div>
        )}
        
        {status === 'error' && (
          <div className="flex flex-col items-center">
            <FiAlertCircle className="w-16 h-16 text-red-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Verification Failed</h2>
            <p className="text-gray-300 mb-6">{message}</p>
            <div className="flex space-x-4">
              <Link href="/login" className="btn btn-primary">
                Go to Login
              </Link>
              <Link href="/" className="btn btn-outline">
                Back to Home
              </Link>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

// Main page component with Suspense boundary
export default function VerifyEmailPage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <Suspense fallback={<VerifyEmailLoading />}>
        <VerifyEmailContent />
      </Suspense>
    </main>
  );
} 