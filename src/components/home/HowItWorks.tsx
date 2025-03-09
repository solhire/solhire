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
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-accent/5 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-1/2 bg-gradient-radial from-primary/5 to-transparent opacity-50"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">How SolHire Works</h2>
          <p className="text-gray-400">
            Our platform makes it easy to connect with creative professionals and pay securely using Solana cryptocurrency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.id} className="relative group">
              {/* Step number */}
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm z-20 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
                {step.id}
              </div>
              
              {/* Step card */}
              <div className="card h-full flex flex-col items-center text-center p-8 border border-zinc-800 bg-gradient-to-br from-background to-background-dark/80 backdrop-blur-sm group-hover:border-primary/30 transition-all duration-300 relative overflow-hidden">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-primary mb-6 relative z-10 group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white relative z-10">{step.title}</h3>
                <p className="text-gray-400 relative z-10">{step.description}</p>
              </div>
              
              {/* Connector line (except for the last item) */}
              {step.id !== steps.length && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary/50 to-accent/30"></div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-gradient-to-br from-background to-background-dark border border-primary/30 rounded-xl p-8 shadow-lg shadow-primary/5 relative overflow-hidden group">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <p className="text-lg text-gray-300 mb-4 relative z-10">
              Ready to get started with SolHire?
            </p>
            <div className="flex flex-wrap gap-4 justify-center relative z-10">
              <a href="/post-job" className="btn btn-primary px-6 py-3 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300">Post a Job</a>
              <a href="/services" className="btn btn-outline px-6 py-3 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">Browse Services</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks; 