'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiExternalLink, FiArrowRight, FiArrowLeft } from 'react-icons/fi';

interface PortfolioItemType {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  category: string;
  clientName?: string;
  projectUrl?: string;
}

interface PortfolioShowcaseProps {
  portfolioItems: PortfolioItemType[];
}

const CreatorPortfolioShowcase = ({ portfolioItems }: PortfolioShowcaseProps) => {
  const [selectedItem, setSelectedItem] = useState<PortfolioItemType | null>(null);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(portfolioItems.map(item => item.category)))];
  
  const filteredItems = filter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === filter);

  const openModal = (item: PortfolioItemType, index: number) => {
    setSelectedItem(item);
    setSelectedItemIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedItem(null);
    setSelectedItemIndex(null);
    document.body.style.overflow = 'auto';
  };

  const navigateItem = (direction: 'prev' | 'next') => {
    if (selectedItemIndex === null) return;
    
    const newIndex = direction === 'next' 
      ? (selectedItemIndex + 1) % filteredItems.length 
      : (selectedItemIndex - 1 + filteredItems.length) % filteredItems.length;
    
    setSelectedItem(filteredItems[newIndex]);
    setSelectedItemIndex(newIndex);
  };

  return (
    <div className="w-full">
      {/* Filter Controls */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === category 
                ? 'bg-primary text-white' 
                : 'bg-background-dark hover:bg-primary/20 text-gray-300'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
      
      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, index) => (
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            key={item.id}
            className="group cursor-pointer rounded-xl overflow-hidden border border-gray-800 hover:border-primary/40 transition-all"
            onClick={() => openModal(item, index)}
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4 w-full">
                  <span className="text-xs font-medium bg-primary/90 text-white px-2 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm line-clamp-2">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* No Items Message */}
      {filteredItems.length === 0 && (
        <div className="text-center p-8 border border-gray-800 rounded-xl bg-background-dark">
          <p className="text-gray-400">No portfolio items found in this category.</p>
        </div>
      )}
      
      {/* Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-background-dark rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 z-10 bg-background/50 hover:bg-background/80 p-2 rounded-full text-white"
                onClick={closeModal}
              >
                <FiX className="w-5 h-5" />
              </button>
              
              <div className="relative w-full aspect-video">
                <Image
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="p-6">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <h2 className="text-2xl font-bold">{selectedItem.title}</h2>
                  
                  {selectedItem.projectUrl && (
                    <a
                      href={selectedItem.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-primary hover:text-primary/80"
                    >
                      <FiExternalLink className="mr-1" /> 
                      <span>View Project</span>
                    </a>
                  )}
                </div>

                {selectedItem.clientName && (
                  <div className="mb-4 text-sm text-gray-400">
                    Client: <span className="text-white">{selectedItem.clientName}</span>
                  </div>
                )}
                
                <p className="text-gray-300 mb-6">
                  {selectedItem.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedItem.tags.map(tag => (
                    <span
                      key={tag}
                      className="bg-background px-3 py-1 rounded-full text-xs text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between pt-4 border-t border-gray-800">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateItem('prev');
                    }}
                    className="flex items-center text-gray-400 hover:text-white transition-colors"
                  >
                    <FiArrowLeft className="mr-2" />
                    Previous
                  </button>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateItem('next');
                    }}
                    className="flex items-center text-gray-400 hover:text-white transition-colors"
                  >
                    Next
                    <FiArrowRight className="ml-2" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CreatorPortfolioShowcase; 