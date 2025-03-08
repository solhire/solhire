'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiAlertCircle, FiArrowRight, FiCheck } from 'react-icons/fi';

// Component to handle wallet connection
function WalletConnector() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const message = searchParams.get('message');
  const redirectTo = searchParams.get('redirectTo') || '/';
  
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState('');
  
  const handleConnectWallet = () => {
    setIsConnecting(true);
    setError('');
    
    // Simulate wallet connection process
    setTimeout(() => {
      // For demo purposes, we'll just set a cookie
      document.cookie = 'solhire_wallet_connected=true; path=/; max-age=86400';
      localStorage.setItem('solhire_wallet_connected', 'true');
      
      setIsConnecting(false);
      setIsConnected(true);
      
      // Redirect after a short delay to show success state
      setTimeout(() => {
        router.push(redirectTo);
      }, 1500);
    }, 2000);
  };

  return (
    <>
      {message && (
        <div className="mb-6 p-4 bg-primary/10 border border-primary/30 rounded-lg flex items-start">
          <FiAlertCircle className="text-primary mr-3 mt-0.5 flex-shrink-0" />
          <p className="text-gray-300 text-sm">{message}</p>
        </div>
      )}
      
      <div className="text-center mb-8">
        <p className="text-gray-300">
          Connect your Solana wallet to access premium features, post jobs, and make secure payments.
        </p>
      </div>
      
      <div className="space-y-6">
        {isConnected ? (
          <div className="p-4 bg-green-900/30 border border-green-800 rounded-lg flex items-center">
            <FiCheck className="text-green-400 mr-3 flex-shrink-0" />
            <p className="text-green-400">Wallet connected successfully!</p>
          </div>
        ) : (
          <>
            {error && (
              <div className="p-3 bg-red-900/30 border border-red-800 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}
            
            <button
              onClick={handleConnectWallet}
              disabled={isConnecting}
              className="w-full btn btn-primary py-3 flex items-center justify-center group relative overflow-hidden"
            >
              {isConnecting ? (
                <div className="w-5 h-5 rounded-full border-2 border-t-white/30 border-r-white/30 border-b-white/30 border-l-white animate-spin" />
              ) : (
                <>
                  Connect Solana Wallet
                  <FiArrowRight className="ml-2" />
                </>
              )}
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </>
        )}
      </div>
    </>
  );
}

// Loading fallback
function WalletConnectorFallback() {
  return (
    <div className="space-y-6">
      <div className="animate-pulse bg-gray-700 h-10 rounded-lg mb-6"></div>
      <div className="animate-pulse bg-gray-700 h-12 rounded-lg mb-6"></div>
      <div className="animate-pulse bg-gray-700 h-12 rounded-lg"></div>
    </div>
  );
}

export default function ConnectWallet() {
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

          {/* Connect Wallet Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="card p-8"
          >
            <h1 className="text-3xl font-bold mb-6 text-center">
              <span className="bg-gradient-to-br from-purple-400 to-purple-900 text-transparent bg-clip-text [text-shadow:0_0_25px_rgba(168,85,247,0.4)]">
                Connect Your Wallet
              </span>
            </h1>
            
            <Suspense fallback={<WalletConnectorFallback />}>
              <WalletConnector />
            </Suspense>
            
            <div className="pt-4 border-t border-gray-800">
              <h3 className="text-lg font-medium text-white mb-4">Supported Wallets</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-3 bg-background-light rounded-lg flex flex-col items-center">
                  <div className="w-10 h-10 bg-primary/20 rounded-full mb-2 flex items-center justify-center">
                    <span className="text-primary text-xs">P</span>
                  </div>
                  <span className="text-xs text-gray-400">Phantom</span>
                </div>
                <div className="p-3 bg-background-light rounded-lg flex flex-col items-center">
                  <div className="w-10 h-10 bg-primary/20 rounded-full mb-2 flex items-center justify-center">
                    <span className="text-primary text-xs">S</span>
                  </div>
                  <span className="text-xs text-gray-400">Solflare</span>
                </div>
                <div className="p-3 bg-background-light rounded-lg flex flex-col items-center">
                  <div className="w-10 h-10 bg-primary/20 rounded-full mb-2 flex items-center justify-center">
                    <span className="text-primary text-xs">B</span>
                  </div>
                  <span className="text-xs text-gray-400">Backpack</span>
                </div>
              </div>
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