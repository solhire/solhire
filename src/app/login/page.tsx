'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiArrowRight, FiAlertCircle } from 'react-icons/fi';

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const message = searchParams.get('message');
  const redirectTo = searchParams.get('redirectTo') || '/';
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simulate login process
    setTimeout(() => {
      // For demo purposes, any email/password combination works
      // In a real app, you would validate credentials with your backend
      document.cookie = 'solhire_auth_token=demo_token; path=/; max-age=86400';
      localStorage.setItem('solhire_auth_token', 'demo_token');
      
      setIsLoading(false);
      router.push(redirectTo);
    }, 1500);
  };
  
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
            
            {message && (
              <div className="mb-6 p-4 bg-primary/10 border border-primary/30 rounded-lg flex items-start">
                <FiAlertCircle className="text-primary mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300 text-sm">{message}</p>
              </div>
            )}
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-gray-500" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 bg-background border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary text-white"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-gray-500" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 bg-background border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary text-white"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              
              {error && (
                <div className="p-3 bg-red-900/30 border border-red-800 rounded-lg">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}
              
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn btn-primary py-3 flex items-center justify-center group relative overflow-hidden"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 rounded-full border-2 border-t-white/30 border-r-white/30 border-b-white/30 border-l-white animate-spin" />
                  ) : (
                    <>
                      Log In
                      <FiArrowRight className="ml-2" />
                    </>
                  )}
                  <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </div>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                Don't have an account?{' '}
                <Link href="/signup" className="text-primary hover:text-primary-light transition-colors">
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