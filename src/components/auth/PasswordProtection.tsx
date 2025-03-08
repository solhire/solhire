import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface PasswordProtectionProps {
  onUnlock: () => void;
}

export default function PasswordProtection({ onUnlock }: PasswordProtectionProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'solhire888') {
      localStorage.setItem('site_unlocked', 'true');
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <main className="fixed inset-0 z-[100] overflow-hidden flex items-center justify-center">
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
      <div className="relative z-10 max-w-md w-full mx-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-background-dark/80 backdrop-blur-xl rounded-2xl p-8 border border-primary/20"
        >
          {/* Logo */}
          <div className="mb-8 text-center">
            <Image
              src="/logo.svg"
              alt="SolHire"
              width={150}
              height={40}
              className="mx-auto"
            />
          </div>

          <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            <span className="bg-gradient-to-br from-purple-400 to-purple-900 text-transparent bg-clip-text">
              Enter Password
            </span>
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl bg-background/50 border ${
                  error ? 'border-red-500' : 'border-primary/30'
                } text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors`}
                placeholder="Enter password to unlock"
                autoFocus
              />
              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2 text-sm text-red-500"
                >
                  Incorrect password
                </motion.p>
              )}
            </div>
            <button
              type="submit"
              className="w-full btn btn-primary py-3 relative group overflow-hidden"
            >
              Unlock Site
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </form>
        </motion.div>
      </div>
    </main>
  );
} 