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
  return (
    <main className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-background-dark to-background/90" />
        <div className="absolute top-0 left-0 w-full h-full bg-background/40" />
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-accent/20 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10">
        <div className="max-w-md mx-auto">
          {/* Logo */}
          <div className="mb-8 text-center">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.svg"
                alt="SolHire Logo"
                width={150}
                height={40}
                className="mx-auto"
              />
            </Link>
          </div>

          {/* Login Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="card p-8"
          >
            <h1 className="text-3xl font-bold mb-6 text-center">
              <span className="bg-gradient-to-br from-purple-400 to-purple-900 text-transparent bg-clip-text">
                Log In to SolHire
              </span>
            </h1>
            
            <Suspense fallback={<LoginFormFallback />}>
              <LoginForm />
            </Suspense>
            
            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                Don't have an account?{' '}
                <Link href="/sign-up" className="text-primary hover:text-primary-light transition-colors">
                  Sign Up
                </Link>
              </p>
            </div>
          </motion.div>
          
          <div className="mt-8 text-center">
            <Link href="/" className="text-gray-400 hover:text-white text-sm transition-colors">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
} 