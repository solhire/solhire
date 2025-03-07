'use client';

import { FiSearch, FiCheckCircle, FiDollarSign, FiStar } from 'react-icons/fi';
import { FaCoins } from 'react-icons/fa';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: 'Find the Perfect Creative',
      description: 'Browse through our marketplace of skilled professionals or post your project requirements.',
      icon: <FiSearch className="w-8 h-8" />,
    },
    {
      id: 2,
      title: 'Secure Payment with Solana',
      description: 'Pay using Solana cryptocurrency with our secure escrow system that protects both parties.',
      icon: <FaCoins className="w-8 h-8" />,
    },
    {
      id: 3,
      title: 'Collaborate & Approve',
      description: 'Work directly with your creative, provide feedback, and approve the final deliverables.',
      icon: <FiCheckCircle className="w-8 h-8" />,
    },
    {
      id: 4,
      title: 'Release Payment & Review',
      description: 'Release the payment once satisfied and leave a review to help the community.',
      icon: <FiStar className="w-8 h-8" />,
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">How SolHire Works</h2>
          <p className="text-gray-400">
            Our platform makes it easy to connect with creative professionals and pay securely using Solana cryptocurrency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.id} className="relative">
              {/* Step number */}
              <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
                {step.id}
              </div>
              
              {/* Step card */}
              <div className="card h-full flex flex-col items-center text-center p-8">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
              
              {/* Connector line (except for the last item) */}
              {step.id !== steps.length && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary/30"></div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-background-light border border-primary/30 rounded-xl p-6">
            <p className="text-lg text-gray-300 mb-4">
              Ready to get started with SolHire?
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="/post-job" className="btn btn-primary">Post a Job</a>
              <a href="/services" className="btn btn-outline">Browse Services</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks; 