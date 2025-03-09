'use client';

import { useState } from 'react';
import { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

export const metadata: Metadata = {
  title: 'FAQ | SolHire',
  description: 'Frequently asked questions about the SolHire platform',
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'What is SolHire?',
      answer: 'SolHire is a Web3 marketplace that connects clients with creative professionals. Our platform allows you to hire top talent and pay securely using Solana cryptocurrency. Whether you need video editing, graphic design, or other creative services, SolHire makes it easy to find and work with the best professionals in the industry.'
    },
    {
      question: 'How do payments work?',
      answer: 'Payments on SolHire are processed through the Solana blockchain. When you hire a creator, funds are held in a secure smart contract escrow until the work is completed to your satisfaction. This protects both clients and creators, ensuring fair transactions. Payments are instant once released, with no waiting periods or processing fees like traditional payment systems.'
    },
    {
      question: 'Do I need to know about crypto to use SolHire?',
      answer: 'No technical knowledge is required to use SolHire. We\'ve designed our platform to be user-friendly for everyone, whether you\'re a crypto expert or complete beginner. You\'ll need a Solana wallet (like Phantom or Solflare) to interact with the platform, but we provide guides to help you get set up quickly.'
    },
    {
      question: 'What is the $HIRE token?',
      answer: 'The $HIRE token is our native utility token that will power various aspects of the SolHire ecosystem. Token holders will receive benefits like reduced platform fees, priority visibility for services, and governance voting rights. The token has not been deployed yet - follow our Twitter for announcements about the official launch.'
    },
    {
      question: 'How do you ensure quality work?',
      answer: 'SolHire maintains high standards through our review and rating system. After each project, clients can rate their experience with creators, building a reputation system that helps the best talent stand out. Additionally, our escrow system ensures clients only pay for work that meets their requirements.'
    },
    {
      question: 'Is my data secure on SolHire?',
      answer: 'We take security and privacy seriously. Your personal information is protected using industry-standard encryption and security practices. Additionally, blockchain transactions provide an extra layer of security and transparency for all financial interactions on the platform.'
    },
    {
      question: 'How do I become a creator on SolHire?',
      answer: 'To become a creator, simply create an account, complete your profile with your skills and portfolio items, and connect your Solana wallet. Once your profile is set up, you can start bidding on projects or create service listings that clients can purchase directly.'
    },
    {
      question: 'What are the fees for using SolHire?',
      answer: 'SolHire charges a small platform fee on each transaction to maintain and improve our services. The exact fee structure will be announced when we fully launch the platform. $HIRE token holders will receive significant discounts on these fees.'
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <MainLayout>
      <section className="pt-32 pb-20 bg-background-light">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Frequently Asked Questions</h1>
            <p className="text-xl text-center text-gray-300 mb-12">
              Find answers to the most common questions about SolHire
            </p>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index}
                  className="bg-background-dark border border-gray-800 rounded-xl overflow-hidden transition-all duration-200"
                >
                  <button
                    className="w-full px-6 py-4 flex items-center justify-between text-left transition-colors"
                    onClick={() => toggleFaq(index)}
                  >
                    <h3 className="text-lg font-semibold">{faq.question}</h3>
                    <span className="text-primary">
                      {openIndex === index ? <FiChevronUp /> : <FiChevronDown />}
                    </span>
                  </button>
                  
                  <div 
                    className={`px-6 transition-all duration-200 overflow-hidden ${
                      openIndex === index ? 'py-4 max-h-96 border-t border-gray-800' : 'max-h-0 py-0'
                    }`}
                  >
                    <p className="text-gray-300">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-gray-300 mb-4">
                Still have questions? Contact our support team.
              </p>
              <a 
                href="mailto:contact@solhire.net"
                className="btn btn-primary px-6 py-2"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
} 