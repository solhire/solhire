'use client';

import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiSearch, FiHelpCircle, FiBriefcase, FiEdit, FiSettings } from 'react-icons/fi';
import Link from 'next/link';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  faqs: FAQItem[];
}

const faqCategories: FAQCategory[] = [
  {
    name: 'General',
    icon: FiHelpCircle,
    faqs: [
      {
        question: 'What is SolHire?',
        answer: 'SolHire is a decentralized marketplace connecting creative professionals with clients, operating on the Solana blockchain. Our platform enables secure, fast, and low-cost transactions for creative work.',
      },
      {
        question: 'How is SolHire different from traditional freelance platforms?',
        answer: 'SolHire leverages blockchain technology to offer lower fees, faster payments, and enhanced security through smart contracts. We eliminate intermediaries and provide a truly decentralized platform for freelance work.',
      },
      {
        question: 'What types of services are available on SolHire?',
        answer: 'SolHire focuses on creative services including graphic design, video editing, animation, content writing, music production, and more. Our specialized focus ensures high-quality work from talented professionals.',
      },
      {
        question: 'How do I contact support?',
        answer: 'You can reach our support team through the help center in your dashboard, or by emailing support@solhire.com. We strive to respond to all inquiries within 24 hours.',
      },
    ],
  },
  {
    name: 'For Clients',
    icon: FiBriefcase,
    faqs: [
      {
        question: 'How do I hire a creative professional on SolHire?',
        answer: 'You can either browse through available services and purchase directly, or post a custom job with your specific requirements. After connecting your Solana wallet, you can place funds in escrow and work directly with your chosen professional.',
      },
      {
        question: 'How secure is my payment?',
        answer: 'All payments on SolHire are secured through smart contracts on the Solana blockchain. Your funds are held in escrow and only released to the creator once you approve the completed work, ensuring you only pay for satisfactory results.',
      },
      {
        question: 'What if I\'m not satisfied with the work?',
        answer: 'If you\'re not satisfied with the delivered work, you can request revisions based on your initial requirements. If issues persist, our dispute resolution system helps mediate a fair solution between you and the creator.',
      },
      {
        question: 'What fees do clients pay?',
        answer: 'Clients pay a 5% platform fee on top of the agreed service price. This fee is significantly lower than traditional platforms and covers the costs of maintaining the platform, escrow services, and dispute resolution.',
      },
    ],
  },
  {
    name: 'For Creators',
    icon: FiEdit,
    faqs: [
      {
        question: 'How do I become a creator on SolHire?',
        answer: 'To become a creator, create an account, connect your Solana wallet, complete your profile with portfolio samples, and set up your service offerings. Once approved, your services will be visible to potential clients.',
      },
      {
        question: 'How do I get paid for my work?',
        answer: 'When a client approves your delivered work, the payment is automatically released from escrow to your connected Solana wallet. The process is quick, transparent, and has minimal fees compared to traditional payment methods.',
      },
      {
        question: 'What fees are charged to creators?',
        answer: 'Creators pay a 5% platform fee on completed transactions. This is significantly lower than traditional platforms which often charge 20% or more, allowing you to keep more of your earnings.',
      },
      {
        question: 'How do I handle client communication?',
        answer: 'All client communication happens through our integrated messaging system. This keeps your conversations, file sharing, and payment milestones organized in one place, creating a seamless workflow.',
      },
    ],
  },
  {
    name: 'Technical',
    icon: FiSettings,
    faqs: [
      {
        question: 'What blockchain does SolHire use?',
        answer: 'SolHire is built on the Solana blockchain, chosen for its high speed, low transaction costs, and energy efficiency. This allows us to provide a seamless experience with near-instant payments and minimal environmental impact.',
      },
      {
        question: 'Which wallets are supported?',
        answer: 'We support popular Solana wallets including Phantom, Solflare, Slope, and others. We recommend Phantom or Solflare for the best user experience on our platform.',
      },
      {
        question: 'Is my data secure on SolHire?',
        answer: 'Yes, we implement industry-standard security practices to protect your data. While transaction data is publicly visible on the blockchain for transparency, personal information is protected and encrypted using modern security protocols.',
      },
      {
        question: 'What happens if I lose access to my wallet?',
        answer: 'If you lose access to your wallet, you'll need to recover it using your seed phrase. SolHire cannot recover wallets or funds for you, so it's crucial to store your recovery phrase in a safe place. We provide educational resources on wallet security for all users.',
      },
    ],
  },
];

const FAQPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>(faqCategories[0].name);
  const [openFAQs, setOpenFAQs] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState<string>('');

  const toggleFAQ = (categoryName: string, index: number) => {
    const key = `${categoryName}-${index}`;
    setOpenFAQs(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const filteredCategories = searchQuery
    ? faqCategories.map(category => ({
        ...category,
        faqs: category.faqs.filter(faq => 
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.faqs.length > 0)
    : faqCategories;

  return (
    <MainLayout>
      <div className="py-16 bg-background">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Find answers to common questions about SolHire, or reach out to our support team if you need more help.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-500" />
              </div>
              <input
                type="text"
                className="bg-background-dark border border-gray-700 text-white rounded-lg block w-full pl-10 p-4 focus:border-primary focus:ring-1 focus:ring-primary/50 outline-none"
                placeholder="Search for questions or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Category Navigation */}
            {!searchQuery && (
              <div className="lg:col-span-1">
                <div className="bg-background-dark rounded-xl border border-gray-800 p-4 sticky top-24">
                  <h3 className="font-bold mb-4 px-2">Categories</h3>
                  <nav>
                    <ul className="space-y-1">
                      {faqCategories.map((category) => (
                        <li key={category.name}>
                          <button
                            onClick={() => setActiveCategory(category.name)}
                            className={`w-full text-left px-3 py-2 rounded-lg flex items-center ${
                              activeCategory === category.name
                                ? 'bg-primary/20 text-primary'
                                : 'hover:bg-background text-gray-400 hover:text-white'
                            }`}
                          >
                            <span className="mr-2">
                              {React.createElement(category.icon, { className: "w-5 h-5" })}
                            </span>
                            {category.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </div>
            )}

            {/* FAQ Content */}
            <div className={`${searchQuery ? 'lg:col-span-4' : 'lg:col-span-3'}`}>
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category) => (
                  <div 
                    key={category.name} 
                    className={`mb-10 ${!searchQuery && activeCategory !== category.name ? 'hidden' : ''}`}
                  >
                    <div className="flex items-center mb-6">
                      <span className="text-2xl mr-3">
                        {React.createElement(category.icon, { className: "w-6 h-6" })}
                      </span>
                      <h2 className="text-2xl font-bold">{category.name}</h2>
                    </div>

                    <div className="bg-background-dark rounded-xl border border-gray-800 overflow-hidden">
                      {category.faqs.map((faq, index) => {
                        const key = `${category.name}-${index}`;
                        const isOpen = openFAQs[key] || false;

                        return (
                          <div key={index} className="border-b border-gray-800 last:border-0">
                            <button
                              className="flex justify-between items-center w-full py-4 px-6 text-left focus:outline-none"
                              onClick={() => toggleFAQ(category.name, index)}
                              aria-expanded={isOpen}
                            >
                              <h3 className="text-lg font-medium">{faq.question}</h3>
                              <FiChevronDown 
                                className={`ml-2 w-5 h-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} 
                              />
                            </button>
                            
                            <AnimatePresence>
                              {isOpen && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden"
                                >
                                  <div className="px-6 pb-4 text-gray-400">
                                    {faq.answer}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center p-12 bg-background-dark rounded-xl border border-gray-800">
                  <p className="text-gray-400 mb-4">No FAQs found matching your search.</p>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-primary hover:text-primary/80"
                  >
                    Clear search
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Contact Support */}
          <div className="mt-16 p-8 bg-background-dark rounded-xl border border-gray-800 text-center">
            <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              If you couldn't find the answer to your question, our support team is here to help. Reach out to us and we'll get back to you as soon as possible.
            </p>
            <Link href="/contact" className="btn btn-primary px-8 py-3">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default FAQPage; 