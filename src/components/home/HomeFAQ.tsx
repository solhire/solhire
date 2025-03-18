'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiChevronDown } from 'react-icons/fi';

const faqs = [
  {
    question: 'How does SolHire work?',
    answer: 'SolHire connects clients with creative professionals through a decentralized marketplace. Clients post job requirements, creators submit proposals, and once agreed, funds are held in smart contract escrow until the work is approved.',
  },
  {
    question: 'How are payments processed?',
    answer: 'Payments are processed through the Solana blockchain, offering fast and low-cost transactions. Funds are held in escrow until work is completed and approved, ensuring security for both parties.',
  },
  {
    question: 'What are the fees for using SolHire?',
    answer: 'SolHire charges a competitive platform fee of 5% per transaction, significantly lower than traditional freelance platforms which often charge 20% or more.',
  },
  {
    question: 'How do I get started as a creator?',
    answer: 'To get started as a creator, connect your SOL wallet, create your professional profile highlighting your skills and portfolio, and start bidding on relevant projects or list your services.',
  },
  {
    question: 'Is my payment secure?',
    answer: 'Yes, all payments on SolHire are secured through smart contracts. Funds are held in escrow and only released to the creator after the client approves the completed work.',
  },
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