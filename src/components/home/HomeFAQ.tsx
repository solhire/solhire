'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiChevronDown } from 'react-icons/fi';

const faqs = [
  {
    question: 'How does payment work on SolHire?',
    answer: 'Payments on SolHire are handled through smart contracts on the Solana blockchain. When a client posts a job, the funds are locked in an escrow smart contract. Once the work is completed and approved, the payment is automatically released to the creator\'s wallet. This ensures security for both parties.'
  },
  {
    question: 'Do I need a Solana wallet to use SolHire?',
    answer: 'Yes, both clients and creators need a Solana wallet to transact on SolHire. We support popular wallets like Phantom, Solflare, and others. If you don\'t have a wallet yet, we provide guides to help you set one up quickly and easily.'
  },
  {
    question: 'What fees does SolHire charge?',
    answer: 'SolHire charges a 5% fee on completed transactions, which is significantly lower than traditional freelance platforms. The platform offers options to reduce fees for long-term users and active community members.'
  },
  {
    question: 'How are disputes handled?',
    answer: 'We have a comprehensive dispute resolution system. If there\'s a disagreement between a client and creator, our team will review the case and mediate a fair solution. For complex disputes, we also have a community-driven resolution mechanism to ensure fairness.'
  },
  {
    question: 'What is the $HIRE token used for?',
    answer: 'The $HIRE token is a utility token that enables various platform functions, including reduced transaction fees and access to advanced features. The token plays an important role in the platform\'s ecosystem and governance.'
  },
  {
    question: 'How do I become a verified creator?',
    answer: 'To become a verified creator, you need to complete your profile, pass our identity verification process, and showcase your portfolio of work. Verification gives you a special badge, improves your visibility in search results, and increases client trust.'
  }
];

const FAQItem = ({ question, answer, isOpen, onClick }: { question: string; answer: string; isOpen: boolean; onClick: () => void }) => {
  return (
    <div className="border-b border-gray-800 last:border-0">
      <button
        className="flex justify-between items-center w-full py-4 text-left focus:outline-none"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-medium">{question}</h3>
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
            <div className="pb-4 text-gray-400">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const HomeFAQ = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section className="py-20 bg-background-dark">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-3">
            Common Questions
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Get quick answers to the most common questions about how SolHire works.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-background border border-gray-800 rounded-2xl p-6">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFAQ === index}
                onClick={() => toggleFAQ(index)}
              />
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link 
              href="/faq" 
              className="inline-flex items-center text-primary hover:text-primary/80 group"
            >
              <span>View all FAQs</span>
              <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeFAQ; 