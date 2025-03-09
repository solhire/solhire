'use client';

import React, { useState } from 'react';
import { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiSearch } from 'react-icons/fi';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | SolHire',
  description: 'Find answers to common questions about using SolHire, payments, creator services, and more.',
};

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  name: string;
  icon: string;
  faqs: FAQItem[];
}

const faqCategories: FAQCategory[] = [
  {
    name: 'Getting Started',
    icon: '🚀',
    faqs: [
      {
        question: 'What is SolHire?',
        answer: 'SolHire is a decentralized marketplace that connects clients with creative professionals. Our platform leverages Solana blockchain technology to provide secure, fast, and low-fee transactions for freelance services.'
      },
      {
        question: 'How do I create an account?',
        answer: 'To create an account, click on the "Register" button in the top right corner of the homepage. You can sign up using your email address or connect with your existing Solana wallet. Complete your profile information to get started.'
      },
      {
        question: 'Do I need a Solana wallet to use SolHire?',
        answer: 'Yes, both clients and creators need a Solana wallet to transact on SolHire. We support popular wallets like Phantom, Solflare, and others. If you don\'t have a wallet yet, we provide guides to help you set one up quickly and easily.'
      },
      {
        question: 'Is SolHire available worldwide?',
        answer: 'Yes, SolHire is available globally. Since we use Solana cryptocurrency for payments, you can work with clients and creators from anywhere in the world without worrying about currency conversion or international payment fees.'
      }
    ]
  },
  {
    name: 'For Clients',
    icon: '👨‍💼',
    faqs: [
      {
        question: 'How do I find the right creator for my project?',
        answer: 'You can browse creators by category, search for specific skills, or post a job and receive proposals. Each creator has a profile with their portfolio, reviews, and ratings to help you make an informed decision. Our advanced search filters allow you to narrow down creators based on experience, rating, and price range.'
      },
      {
        question: 'How do I pay for services?',
        answer: 'Payments are made in SOL (Solana\'s native cryptocurrency). When you hire a creator, the funds are held in a secure smart contract escrow until the work is completed to your satisfaction. This protects both you and the creator throughout the process.'
      },
      {
        question: 'What if I\'m not satisfied with the work?',
        answer: 'If you\'re not satisfied with the delivered work, you can request revisions based on the package terms. If issues persist, our dispute resolution system can help mediate. In cases where the work doesn\'t meet the agreed requirements, you may be eligible for a refund according to our terms of service.'
      },
      {
        question: 'Can I request custom services not listed?',
        answer: 'Yes, you can contact creators directly to discuss custom projects. Alternatively, you can post a job with your specific requirements and receive proposals from interested creators.'
      }
    ]
  },
  {
    name: 'For Creators',
    icon: '👩‍🎨',
    faqs: [
      {
        question: 'How do I become a creator on SolHire?',
        answer: 'To become a creator, register an account and then visit the "Become a Creator" page. You\'ll need to complete your profile, verify your identity, and showcase your portfolio. Once approved, you can create service listings and start receiving client requests.'
      },
      {
        question: 'How much does it cost to be a creator?',
        answer: 'Creating an account and becoming a creator is free. SolHire charges a 5% fee on completed transactions, which is significantly lower than traditional freelance platforms. $HIRE token holders can get reduced fees based on their token holdings and platform activity.'
      },
      {
        question: 'When and how do I get paid?',
        answer: 'Once a client approves your delivered work, the payment is automatically released from escrow to your connected Solana wallet. This typically happens within minutes, unlike traditional platforms that may take days or weeks to process payments.'
      },
      {
        question: 'How do I get more clients?',
        answer: 'Complete your profile with high-quality portfolio items, encourage satisfied clients to leave reviews, respond promptly to inquiries, and maintain high-quality work. Participating in the SolHire community and holding $HIRE tokens can also increase your visibility in search results.'
      }
    ]
  },
  {
    name: 'Payments & Security',
    icon: '🔒',
    faqs: [
      {
        question: 'How does payment work on SolHire?',
        answer: 'Payments on SolHire are handled through smart contracts on the Solana blockchain. When a client posts a job, the funds are locked in an escrow smart contract. Once the work is completed and approved, the payment is automatically released to the creator\'s wallet. This ensures security for both parties.'
      },
      {
        question: 'Are my transactions secure?',
        answer: 'Yes, all transactions on SolHire are secured by Solana blockchain technology. Smart contracts ensure that funds are only released when both parties fulfill their obligations. Additionally, our platform uses encryption to protect your personal information and communications.'
      },
      {
        question: 'What fees does SolHire charge?',
        answer: 'SolHire charges a 5% fee on completed transactions, which is significantly lower than traditional freelance platforms. $HIRE token holders can get reduced fees based on their token holdings and platform activity.'
      },
      {
        question: 'How are disputes handled?',
        answer: 'We have a comprehensive dispute resolution system. If there\'s a disagreement between a client and creator, our team will review the case and mediate a fair solution. For complex disputes, we also have a community-driven dispute resolution mechanism powered by $HIRE token holders.'
      }
    ]
  },
  {
    name: '$HIRE Token',
    icon: '💎',
    faqs: [
      {
        question: 'What is the $HIRE token?',
        answer: 'The $HIRE token is SolHire\'s native utility token built on the Solana blockchain. It provides various benefits to holders, including reduced platform fees, access to premium features, participation in governance, and staking rewards.'
      },
      {
        question: 'How do I get $HIRE tokens?',
        answer: 'You can acquire $HIRE tokens by purchasing them on supported exchanges, earning them through platform activities (completing projects, receiving positive reviews, etc.), or participating in promotional events and referral programs.'
      },
      {
        question: 'What benefits do $HIRE tokens provide?',
        answer: 'The $HIRE token provides multiple benefits on our platform, including reduced transaction fees, access to premium features, participation in platform governance, and staking rewards. Token holders also get priority visibility in search results and special creator badges.'
      },
      {
        question: 'Can I stake my $HIRE tokens?',
        answer: 'Yes, you can stake your $HIRE tokens to earn additional rewards and gain platform benefits. Staking demonstrates your commitment to the ecosystem and grants you voting rights in platform governance decisions.'
      }
    ]
  }
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
                            <span className="mr-2">{category.icon}</span>
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
                      <span className="text-2xl mr-3">{category.icon}</span>
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