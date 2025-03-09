'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiArrowRight } from 'react-icons/fi';

const categories = [
  {
    name: 'Video Editing',
    icon: '🎬',
    count: 453,
    color: 'bg-blue-500/10 text-blue-500 border-blue-500/30',
    href: '/services?category=video-editing'
  },
  {
    name: 'Graphic Design',
    icon: '🎨',
    count: 389,
    color: 'bg-purple-500/10 text-purple-500 border-purple-500/30',
    href: '/services?category=graphic-design'
  },
  {
    name: 'NFT Art',
    icon: '🖼️',
    count: 275,
    color: 'bg-pink-500/10 text-pink-500 border-pink-500/30',
    href: '/services?category=nft-art'
  },
  {
    name: 'Web Development',
    icon: '💻',
    count: 312,
    color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30',
    href: '/services?category=web-development'
  },
  {
    name: 'Social Media',
    icon: '📱',
    count: 186,
    color: 'bg-orange-500/10 text-orange-500 border-orange-500/30',
    href: '/services?category=social-media'
  },
  {
    name: 'Blockchain Dev',
    icon: '⛓️',
    count: 143,
    color: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/30',
    href: '/services?category=blockchain-development'
  },
  {
    name: 'Content Writing',
    icon: '✍️',
    count: 208,
    color: 'bg-amber-500/10 text-amber-500 border-amber-500/30',
    href: '/services?category=content-writing'
  },
  {
    name: 'Music & Audio',
    icon: '🎵',
    count: 167,
    color: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/30',
    href: '/services?category=music-audio'
  }
];

const tags = [
  'Smart Contracts', 'Logo Design', 'Video Intros',  
  'Whitepaper', 'Social Media Management', 
  'Discord Moderation', 'Trading Bots', 'UI/UX Design',
  'Animation', 'Solana Development', 'Website Creation'
];

const TrendingCategories = () => {
  return (
    <section className="py-16 bg-background-dark">
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12">
          <div>
            <div className="flex items-center mb-2">
              <FiTrendingUp className="text-primary mr-2" />
              <span className="text-sm text-primary font-medium">Trending on SolHire</span>
            </div>
            <h2 className="text-3xl font-bold">Popular Categories</h2>
          </div>
          <Link 
            href="/services" 
            className="flex items-center text-primary hover:text-primary/80 mt-4 sm:mt-0 group"
          >
            <span className="mr-2">Browse all categories</span>
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link 
                href={category.href}
                className={`block p-4 rounded-xl border ${category.color} hover:scale-105 transition-transform shadow-lg hover:shadow-xl`}
              >
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-2">{category.icon}</span>
                  <h3 className="font-semibold">{category.name}</h3>
                </div>
                <div className="text-sm opacity-70">{category.count} services</div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-6">Popular Tags</h3>
          <div className="flex flex-wrap gap-3">
            {tags.map((tag, index) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Link 
                  href={`/search?q=${tag}`}
                  className="px-4 py-2 bg-background border border-gray-700 rounded-full text-sm hover:border-primary hover:text-primary transition-colors"
                >
                  {tag}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingCategories; 