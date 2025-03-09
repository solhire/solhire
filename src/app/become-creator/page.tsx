'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiArrowRight, FiUsers, FiBriefcase, FiDollarSign, FiStar } from 'react-icons/fi';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';

// Creator categories with icons and descriptions
const categories = [
  {
    title: 'Video Editors',
    description: 'Edit and produce high-quality video content for clients worldwide',
    icon: '🎬',
  },
  {
    title: 'Designers',
    description: 'Create stunning visuals, logos, and brand identities',
    icon: '🎨',
  },
  {
    title: 'Developers',
    description: 'Build and maintain web applications and digital solutions',
    icon: '💻',
  },
];

// Steps to become a creator
const steps = [
  {
    title: 'Create Your Profile',
    description: 'Set up your professional profile and showcase your skills',
    icon: '👤',
  },
  {
    title: 'Verify Your Skills',
    description: 'Complete skill assessments to demonstrate your expertise',
    icon: '✅',
  },
  {
    title: 'Build Your Portfolio',
    description: 'Upload your best work to attract potential clients',
    icon: '📁',
  },
  {
    title: 'Start Earning',
    description: 'Connect with clients and receive payments in SOL',
    icon: '💰',
  },
];

// Platform statistics
const stats = [
  { label: 'Active Creators', value: '10,000+', icon: FiUsers },
  { label: 'Jobs Completed', value: '50,000+', icon: FiBriefcase },
  { label: 'Total Earnings', value: '$5M+', icon: FiDollarSign },
  { label: 'Client Satisfaction', value: '98%', icon: FiStar },
];

// FAQ items
const faqs = [
  {
    question: 'How do I get started as a creator?',
    answer: 'Simply create an account, complete your profile, and verify your skills. Once approved, you can start bidding on projects and building your portfolio.',
  },
  {
    question: 'What are the payment terms?',
    answer: 'Payments are made in SOL (Solana) with funds held in escrow until project completion. This ensures both creators and clients are protected.',
  },
  {
    question: 'How do skill verifications work?',
    answer: 'Our skill verification process includes technical assessments, portfolio reviews, and client feedback to ensure quality standards.',
  },
  {
    question: 'What support do creators receive?',
    answer: 'Creators have access to our support team, community forums, and educational resources to help them succeed on the platform.',
  },
];

export default function BecomeCreator() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/20 via-primary/10 to-background">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container-custom relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-bold mb-6"
            >
              Become a Creator on{' '}
              <span className="relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-700 [text-shadow:0_0_25px_rgba(168,85,247,0.4)]">
                  SolHire
                </span>
                {/* Light swipe animation */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shine"></span>
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-300 mb-8"
            >
              Join our community of talented creatives and start earning in SOL.
              Showcase your skills, build your portfolio, and connect with clients worldwide.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Link href="/register">
                <button className="btn btn-primary btn-lg group relative">
                  Get Started
                  <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-background-light relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 -right-20 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
          <div className="absolute bottom-1/3 -left-20 w-96 h-96 rounded-full bg-accent/5 blur-3xl"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Creator Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="card group hover:border-primary/50 transition-all duration-300 h-full flex flex-col items-center p-8 bg-gradient-to-br from-background to-background-dark border border-zinc-800 group-hover:shadow-lg group-hover:shadow-primary/10 relative overflow-hidden"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="text-5xl mb-6 relative z-10 group-hover:scale-110 transition-transform duration-300">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span>{category.icon}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white relative z-10 group-hover:text-primary transition-colors duration-300">{category.title}</h3>
                <p className="text-gray-400 text-center relative z-10">{category.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 bg-background relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-primary/5 blur-3xl"></div>
          <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-accent/5 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-1/2 bg-gradient-radial from-primary/5 to-transparent opacity-50"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="relative group"
              >
                {/* Step number */}
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm z-20 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
                  {index + 1}
                </div>
                
                <div className="card h-full flex flex-col items-center text-center p-8 border border-zinc-800 bg-gradient-to-br from-background to-background-dark/80 backdrop-blur-sm group-hover:border-primary/30 transition-all duration-300 relative overflow-hidden">
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="text-5xl mb-6 relative z-10 group-hover:scale-110 transition-transform duration-300">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <span>{step.icon}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white relative z-10 group-hover:text-primary transition-colors duration-300">{step.title}</h3>
                  <p className="text-gray-400 relative z-10">{step.description}</p>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <div className="w-8 h-0.5 bg-gradient-to-r from-primary/50 to-accent/30"></div>
                    <FiArrowRight className="w-6 h-6 text-primary absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-background-light relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="relative w-16 h-16 mx-auto mb-4">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-background to-background-dark border border-zinc-800 group-hover:border-primary/30 flex items-center justify-center relative z-10">
                    <stat.icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>
                <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left flex justify-between items-center"
                >
                  <h3 className="text-lg font-semibold">{faq.question}</h3>
                  <FiArrowRight
                    className={`w-5 h-5 transform transition-transform ${
                      expandedFaq === index ? 'rotate-90' : ''
                    }`}
                  />
                </button>
                {expandedFaq === index && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 text-gray-400"
                  >
                    {faq.answer}
                  </motion.p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/20 via-primary/10 to-background">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join our community of talented creators and start earning in SOL today.
          </p>
          <Link href="/register">
            <button className="btn btn-primary btn-lg group relative">
              Get Started Now
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </Link>
        </div>
      </section>
    </MainLayout>
  );
} 