'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowRight, FiShield, FiDollarSign, FiGlobe, FiTrendingUp } from 'react-icons/fi';

const benefits = [
  {
    title: 'Keep More Earnings',
    description: 'Lower platform fees than traditional marketplaces means you take home more of what you earn.',
    icon: <FiDollarSign className="w-6 h-6" />,
    color: 'bg-green-500/10 text-green-500',
  },
  {
    title: 'Get Paid Instantly',
    description: 'No more waiting for payments to clear. Receive funds directly to your wallet as soon as work is approved.',
    icon: <FiTrendingUp className="w-6 h-6" />,
    color: 'bg-blue-500/10 text-blue-500',
  },
  {
    title: 'Global Opportunities',
    description: 'Connect with clients from around the world without currency conversion fees or payment barriers.',
    icon: <FiGlobe className="w-6 h-6" />,
    color: 'bg-purple-500/10 text-purple-500',
  },
  {
    title: 'Secure Contracts',
    description: 'Smart contracts ensure you get paid for completed work, eliminating payment disputes.',
    icon: <FiShield className="w-6 h-6" />,
    color: 'bg-primary/10 text-primary',
  },
];

const CreatorBenefits = () => {
  return (
    <section className="py-20 bg-background-dark relative">
      {/* Background Elements */}
      <div className="absolute top-1/3 left-0 w-1/2 h-1/2 bg-gradient-to-r from-primary/10 to-blue-500/5 rounded-full blur-3xl opacity-30" />
      
      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="mb-6 md:mb-0">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-3">
              For Creators
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Creators Love <span className="text-primary">SolHire</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-xl">
              Join thousands of creative professionals who are building successful careers and earning more with blockchain-powered freelancing.
            </p>
          </div>
          <Link 
            href="/become-creator" 
            className="btn btn-primary px-6 py-3 text-base flex items-center group"
          >
            <span>Become a Creator</span>
            <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="border border-gray-800 rounded-2xl p-6 hover:border-primary/30 transition-all hover:bg-background/50"
            >
              <div className={`w-12 h-12 rounded-full ${benefit.color} flex items-center justify-center mb-4`}>
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
              <p className="text-gray-400">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 p-8 border border-primary/20 bg-background/50 rounded-2xl">
          <div className="flex flex-col md:flex-row items-center">
            <div className="mb-6 md:mb-0 md:mr-8">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 mx-auto md:mx-0">
                <span className="text-3xl">💎</span>
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold mb-2">$HIRE Token Utility</h3>
              <p className="text-gray-400 mb-4">
                The platform token provides benefits like reduced fees and enhanced features to improve your experience on SolHire.
              </p>
              <Link 
                href="/token" 
                className="text-primary hover:text-primary/80 inline-flex items-center group"
              >
                <span>Learn more about platform tokens</span>
                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreatorBenefits; 