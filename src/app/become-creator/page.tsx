'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiArrowRight, FiUsers, FiBriefcase, FiDollarSign, FiStar } from 'react-icons/fi';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

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
    <main className="min-h-screen">
      <Header />
      
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
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark">
                SolHire
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
      <section className="py-20 bg-background-light">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Creator Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="card group hover:border-primary/50 transition-colors"
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                <p className="text-gray-400">{category.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 bg-background">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <div className="card h-full">
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <FiArrowRight className="w-6 h-6 text-primary" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-background-light">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
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

      <Footer />

      <style jsx global>{`
        .bg-grid-pattern {
          background-image: linear-gradient(to right, rgba(139, 92, 246, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(139, 92, 246, 0.1) 1px, transparent 1px);
          background-size: 24px 24px;
        }
      `}</style>
    </main>
  );
} 