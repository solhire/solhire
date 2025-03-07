'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiHome, FiSearch, FiArrowLeft } from 'react-icons/fi';

export default function NotFound() {
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
        <div className="max-w-2xl mx-auto text-center">
          {/* Logo */}
          <div className="mb-8">
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

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-br from-purple-400 to-purple-900 text-transparent bg-clip-text [text-shadow:0_0_25px_rgba(168,85,247,0.4)]">
                Page Under Construction
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              We're working hard to bring you something amazing. This feature will be available soon!
            </p>

            {/* Navigation Options */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Link 
                href="/"
                className="flex items-center px-6 py-3 rounded-full bg-background/50 backdrop-blur-sm border border-primary/30 text-gray-300 hover:text-white hover:border-primary/50 transition-all"
              >
                <FiHome className="mr-2" />
                Home
              </Link>
              <Link 
                href="/services"
                className="flex items-center px-6 py-3 rounded-full bg-background/50 backdrop-blur-sm border border-primary/30 text-gray-300 hover:text-white hover:border-primary/50 transition-all"
              >
                <FiSearch className="mr-2" />
                Explore Services
              </Link>
            </div>

            {/* CTA Button */}
            <Link 
              href="/"
              className="btn btn-primary px-8 py-3 text-lg inline-flex items-center group relative overflow-hidden"
            >
              <FiArrowLeft className="mr-2" />
              Back to Homepage
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </motion.div>

          {/* Animated Element */}
          <motion.div
            className="mt-12 flex justify-center"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <div className="w-16 h-16 rounded-full border-4 border-t-primary border-r-primary/50 border-b-primary/30 border-l-primary/10" />
          </motion.div>
        </div>
      </div>
    </main>
  );
} 