'use client';

import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { FiUsers, FiCheck, FiBriefcase, FiDollarSign } from 'react-icons/fi';

const stats = [
  {
    title: 'Verified Creators',
    value: 1250,
    icon: <FiUsers className="w-6 h-6" />,
    formatter: (value: number) => `${value}+`,
    color: 'bg-blue-500/10 text-blue-500',
  },
  {
    title: 'Completed Projects',
    value: 8750,
    icon: <FiCheck className="w-6 h-6" />,
    formatter: (value: number) => `${value}+`,
    color: 'bg-green-500/10 text-green-500',
  },
  {
    title: 'Active Jobs',
    value: 320,
    icon: <FiBriefcase className="w-6 h-6" />,
    formatter: (value: number) => value,
    color: 'bg-purple-500/10 text-purple-500',
  },
  {
    title: 'SOL Transacted',
    value: 42500,
    icon: <FiDollarSign className="w-6 h-6" />,
    formatter: (value: number) => `${value}+`,
    color: 'bg-primary/10 text-primary',
  }
];

const StatsSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-background-dark">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-3">
            Growing Fast
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            The Leading Web3 Marketplace <br className="hidden md:block" />
            for Creative Professionals
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Join thousands of clients and creators who trust SolHire to connect, collaborate, and transact securely on the Solana blockchain.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-background-dark border border-gray-800 rounded-2xl p-6 hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/5"
            >
              <div className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center mb-4`}>
                {stat.icon}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-2">
                <CountUp 
                  end={stat.value} 
                  duration={2.5} 
                  separator="," 
                  formattingFn={stat.formatter} 
                  enableScrollSpy 
                  scrollSpyDelay={200}
                />
              </h3>
              <p className="text-gray-400">{stat.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection; 