'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiShield, FiLock, FiCheckCircle, FiTrendingUp } from 'react-icons/fi';

const features = [
  {
    icon: <FiShield className="w-6 h-6" />,
    title: 'Smart Contract Escrow',
    description: 'All payments are held in secure, audited smart contracts until work is completed and approved.',
    color: 'text-blue-500 bg-blue-500/10',
  },
  {
    icon: <FiLock className="w-6 h-6" />,
    title: 'Blockchain Verification',
    description: 'Every transaction and review is verified on the Solana blockchain, creating an immutable record.',
    color: 'text-green-500 bg-green-500/10',
  },
  {
    icon: <FiCheckCircle className="w-6 h-6" />,
    title: 'Verified Creators',
    description: 'Creators undergo a thorough verification process to ensure quality and reliability.',
    color: 'text-purple-500 bg-purple-500/10',
  },
  {
    icon: <FiTrendingUp className="w-6 h-6" />,
    title: 'Low Transaction Fees',
    description: 'Benefit from Solana\'s low gas fees and lightning-fast transaction speeds.',
    color: 'text-primary bg-primary/10',
  },
];

const SecurityFeatures = () => {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-blue-500/5 rounded-full blur-3xl opacity-50" />
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-3">
              Built for Security
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Your Transactions are 
              <span className="text-primary ml-2">
                Safe & Secure
              </span>
            </h2>
            <p className="text-lg text-gray-400 mb-8">
              We leverage the power of Solana blockchain technology to ensure that every transaction on SolHire is secure, transparent, and efficient.
            </p>
            
            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div 
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="border border-gray-800 rounded-xl p-5 hover:border-primary/30 transition-all"
                >
                  <div className={`w-10 h-10 rounded-full ${feature.color} flex items-center justify-center mb-4`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative h-[500px] w-full rounded-2xl overflow-hidden border border-primary/20 bg-background-dark p-6"
          >
            {/* Transaction Demo Interface */}
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <FiShield className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-semibold text-white">Live Transaction Demo</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm text-green-500">Connected to Solana</span>
                </div>
              </div>

              {/* Transaction Flow */}
              <div className="flex-1 space-y-4">
                {/* Transaction Steps */}
                <div className="bg-background/40 rounded-xl p-4 border border-primary/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Step 1: Escrow Created</span>
                    <FiCheckCircle className="text-green-500" />
                  </div>
                  <div className="text-sm font-mono bg-background/40 p-2 rounded">
                    Contract: 8x4n...j29m
                  </div>
                </div>

                <div className="bg-background/40 rounded-xl p-4 border border-primary/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Step 2: Payment Locked</span>
                    <FiCheckCircle className="text-green-500" />
                  </div>
                  <div className="text-sm font-mono bg-background/40 p-2 rounded">
                    Amount: 3.5 SOL
                  </div>
                </div>

                <div className="bg-background/40 rounded-xl p-4 border border-primary/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Step 3: Work Delivered</span>
                    <div className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                  </div>
                  <div className="text-sm font-mono bg-background/40 p-2 rounded">
                    Status: In Progress
                  </div>
                </div>
              </div>

              {/* Transaction Status */}
              <div className="mt-4">
                <div className="bg-green-500/10 text-green-500 p-4 rounded-xl border border-green-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Transaction Protected</span>
                    <FiShield className="w-5 h-5" />
                  </div>
                  <p className="text-sm opacity-90">
                    Funds are securely held in escrow until work is completed and approved
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SecurityFeatures; 