'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { FiSearch, FiCheckCircle, FiDollarSign, FiStar } from 'react-icons/fi';

const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const steps = [
    {
      id: 1,
      title: 'Browse Services',
      description: 'Explore thousands of creative services from talented professionals around the world.',
      icon: <FiSearch className="w-6 h-6" />,
      color: 'bg-purple-500',
      image: '/browse-services.jpg',
    },
    {
      id: 2,
      title: 'Choose & Connect',
      description: 'Find the perfect match for your project and connect with the creator directly.',
      icon: <FiCheckCircle className="w-6 h-6" />,
      color: 'bg-blue-500',
      image: '/choose-connect.jpg',
    },
    {
      id: 3,
      title: 'Pay Securely',
      description: 'Make payments with SOL cryptocurrency through our secure escrow system.',
      icon: <FiDollarSign className="w-6 h-6" />,
      color: 'bg-green-500',
      image: '/pay-securely.jpg',
    },
    {
      id: 4,
      title: 'Receive & Review',
      description: 'Get your completed work and leave a review to help the community.',
      icon: <FiStar className="w-6 h-6" />,
      color: 'bg-amber-500',
      image: '/receive-review.jpg',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-20 bg-background-light relative overflow-hidden" ref={ref}>
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -left-20 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-1/3 -right-20 w-96 h-96 rounded-full bg-accent/5 blur-3xl"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            How SolHire Works
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our platform makes it easy to connect with creative professionals and pay with SOL cryptocurrency
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {steps.map((step) => (
            <motion.div 
              key={step.id}
              className="relative"
              variants={itemVariants}
            >
              {/* Step number with connecting line */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-20">
                <div className={`w-12 h-12 rounded-full ${step.color} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                  {step.id}
                </div>
                
                {step.id < steps.length && (
                  <div className="absolute top-6 left-12 w-[calc(100vw/4-3rem)] h-0.5 bg-gradient-to-r from-primary/50 to-transparent hidden lg:block"></div>
                )}
              </div>
              
              <div className="pt-16 h-full">
                <div className="bg-background-dark border border-zinc-800 rounded-xl overflow-hidden h-full hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-background-dark to-transparent z-10"></div>
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Icon */}
                    <div className="absolute bottom-4 right-4 z-20 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-primary">
                      {step.icon}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-gray-400">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* CTA Button */}
        <div className="text-center mt-12">
          <a 
            href="/services" 
            className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-white font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-1"
          >
            Get Started Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks; 