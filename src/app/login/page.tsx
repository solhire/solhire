'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { SignIn } from '@clerk/nextjs';

// Loading fallback
function LoginFormFallback() {
  return (
    <div className="space-y-6">
      <div className="animate-pulse bg-gray-700 h-10 rounded-lg mb-6"></div>
      <div className="animate-pulse bg-gray-700 h-12 rounded-lg mb-6"></div>
      <div className="animate-pulse bg-gray-700 h-12 rounded-lg mb-6"></div>
      <div className="animate-pulse bg-gray-700 h-12 rounded-lg"></div>
    </div>
  );
}

// Component that uses useSearchParams
function LoginForm() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirectTo') || '/';
  
  return (
    <SignIn 
      redirectUrl={redirectUrl}
      appearance={{
        elements: {
          formButtonPrimary: 'bg-primary hover:bg-primary-dark text-white',
          card: 'bg-transparent shadow-none',
          headerTitle: 'hidden',
          headerSubtitle: 'hidden',
          socialButtonsBlockButton: 'bg-background-light border border-gray-700 text-white',
          formFieldInput: 'bg-background border border-gray-700 text-white',
          formFieldLabel: 'text-gray-300',
          footerActionLink: 'text-primary hover:text-primary-light',
          dividerLine: 'bg-gray-700',
          dividerText: 'text-gray-400'
        }
      }}
    />
  );
}

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const message = searchParams.get('message');
  
  useEffect(() => {
    // Redirect to mock login, preserving any message parameter
    const redirectUrl = message 
      ? `/mock-login?message=${encodeURIComponent(message)}`
      : '/mock-login';
    router.replace(redirectUrl);
  }, [router, message]);

  // Return null since we're redirecting
  return null;
} 