'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { FiStar, FiArrowRight, FiFilter, FiSearch } from 'react-icons/fi';
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';

export default function ServicesPage() {
  // Mock categories for filtering
  const categories = [
    'All Categories',
    'Video Editing',
    'Graphic Design',
    '3D Modeling',
    'Web Development',
    'Animation',
    'Illustration',
  ];

  // Mock price ranges
  const priceRanges = [
    'Any Price',
    'Under 50 SOL',
    '50-100 SOL',
    '100-200 SOL',
    '200+ SOL',
  ];

  // Mock delivery times
  const deliveryTimes = [
    'Any Time',
    '24 Hours',
    'Up to 3 Days',
    'Up to 7 Days',
    '7+ Days',
  ];

  // Mock placeholder services
  const placeholderServices = [
    {
      id: 1,
      title: 'Professional Video Editing for Content Creators',
      description: 'I will edit your YouTube, TikTok, or Instagram videos with professional transitions, effects, and color grading.',
      price: 75,
      rating: 4.9,
      reviews: 124,
      category: 'Video Editing',
      provider: {
        name: 'Alex Johnson',
        avatar: '/placeholder-avatar.jpg',
        level: 'Top Rated'
      },
      tags: ['YouTube', 'Social Media', 'Motion Graphics']
    },
    {
      id: 2,
      title: 'Modern Logo Design with Unlimited Revisions',
      description: 'I will create a modern, minimalist logo for your brand with unlimited revisions until you are completely satisfied.',
      price: 120,
      rating: 4.8,
      reviews: 98,
      category: 'Graphic Design',
      provider: {
        name: 'Sarah Williams',
        avatar: '/placeholder-avatar.jpg',
        level: 'Rising Talent'
      },
      tags: ['Logo Design', 'Branding', 'Vector Art']
    },
    {
      id: 3,
      title: 'Responsive Website Development with React',
      description: 'I will build a fully responsive website using React, Next.js, and Tailwind CSS with modern design principles.',
      price: 250,
      rating: 5.0,
      reviews: 87,
      category: 'Web Development',
      provider: {
        name: 'Michael Chen',
        avatar: '/placeholder-avatar.jpg',
        level: 'Expert'
      },
      tags: ['React', 'Next.js', 'Tailwind CSS']
    },
    {
      id: 4,
      title: '3D Character Modeling for Games and Animation',
      description: 'I will create detailed 3D character models optimized for games, animation, or other digital media projects.',
      price: 180,
      rating: 4.7,
      reviews: 112,
      category: '3D Modeling',
      provider: {
        name: 'Jessica Lee',
        avatar: '/placeholder-avatar.jpg',
        level: 'Professional'
      },
      tags: ['3D Modeling', 'Character Design', 'Game Assets']
    },
    {
      id: 5,
      title: 'Custom Illustration for Books and Publications',
      description: 'I will create custom illustrations for your book, magazine, or digital publication with a unique artistic style.',
      price: 95,
      rating: 4.9,
      reviews: 76,
      category: 'Illustration',
      provider: {
        name: 'David Rodriguez',
        avatar: '/placeholder-avatar.jpg',
        level: 'Top Rated'
      },
      tags: ['Illustration', 'Book Design', 'Digital Art']
    },
    {
      id: 6,
      title: '2D Animation for Explainer Videos',
      description: 'I will create engaging 2D animations for your explainer videos, advertisements, or social media content.',
      price: 150,
      rating: 4.8,
      reviews: 93,
      category: 'Animation',
      provider: {
        name: 'Emily Thompson',
        avatar: '/placeholder-avatar.jpg',
        level: 'Expert'
      },
      tags: ['2D Animation', 'Motion Graphics', 'Explainer Videos']
    },
  ];

  const [activeCategory, setActiveCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

  // Filter services based on category and search query
  const filteredServices = placeholderServices.filter(service => 
    (activeCategory === 'All Categories' || service.category === activeCategory) &&
    (searchQuery === '' || 
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <MainLayout>
      <div className="min-h-screen bg-background relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 -right-20 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
          <div className="absolute bottom-1/3 -left-20 w-96 h-96 rounded-full bg-accent/5 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-1/2 bg-gradient-radial from-primary/5 to-transparent opacity-50"></div>
        </div>
        
        <div className="container mx-auto px-4 py-12 relative z-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
        <div>
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Services</h1>
              <p className="text-gray-400 max-w-2xl">
                Find and hire talented freelancers for your projects. Browse through our marketplace of skilled professionals.
          </p>
        </div>
            <Link href="/services/create" className="mt-4 md:mt-0">
              <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-6 py-2 rounded-full transition-all duration-300 shadow-lg shadow-primary/20 group">
                <span>Create Service</span>
                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
        </Link>
      </div>

          {/* Search and Filter Bar */}
          <div className="bg-gradient-to-br from-background to-background-dark p-6 rounded-2xl shadow-lg border border-zinc-800 mb-10 relative overflow-hidden group">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="flex flex-col md:flex-row gap-4 relative z-10">
              {/* Search Input */}
              <div className="flex-grow relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-zinc-700 rounded-full bg-background text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  placeholder="Search for services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {/* Filter Toggle Button */}
              <button
                onClick={() => setIsFilterExpanded(!isFilterExpanded)}
                className="flex items-center justify-center px-4 py-2 border border-zinc-700 rounded-full bg-background text-white hover:bg-primary/10 hover:border-primary/50 transition-colors"
              >
                <FiFilter className="mr-2" />
                <span>Filters</span>
                <span className={`ml-2 transition-transform duration-300 ${isFilterExpanded ? 'rotate-180' : ''}`}>↓</span>
              </button>
            </div>
            
            {/* Expanded Filters */}
            {isFilterExpanded && (
              <div className="mt-6 pt-6 border-t border-zinc-800 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn relative z-10">
                {/* Categories */}
                <div>
                  <h3 className="text-sm font-medium text-gray-300 mb-3">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
                          activeCategory === category
                            ? 'bg-gradient-to-r from-primary to-accent text-white shadow-md shadow-primary/20'
                            : 'bg-background text-gray-400 border border-zinc-800 hover:border-primary/50'
                        }`}
                        onClick={() => setActiveCategory(category)}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Price Range */}
                <div>
                  <h3 className="text-sm font-medium text-gray-300 mb-3">Price Range</h3>
                  <div className="flex flex-wrap gap-2">
                    {priceRanges.map((range) => (
                      <button
                        key={range}
                        className="px-3 py-1 rounded-full text-sm bg-background text-gray-400 border border-zinc-800 hover:border-primary/50 transition-all duration-300"
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Delivery Time */}
                <div>
                  <h3 className="text-sm font-medium text-gray-300 mb-3">Delivery Time</h3>
                  <div className="flex flex-wrap gap-2">
                    {deliveryTimes.map((time) => (
                      <button
                        key={time}
                        className="px-3 py-1 rounded-full text-sm bg-background text-gray-400 border border-zinc-800 hover:border-primary/50 transition-all duration-300"
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-300">
              Showing <span className="text-primary font-medium">{filteredServices.length}</span> services
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <Link key={service.id} href={`/services/${service.id}`} className="block group">
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 border border-zinc-800 hover:border-primary/30 bg-gradient-to-br from-background to-background-dark/80 backdrop-blur-sm relative overflow-hidden">
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="p-6 flex flex-col h-full relative z-10">
                    {/* Provider Info */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold mr-2">
                          {service.provider.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{service.provider.name}</p>
                          <p className="text-xs text-primary">{service.provider.level}</p>
                        </div>
                      </div>
                      <Badge className="bg-background-dark/70 text-gray-300 border border-zinc-700">
                        {service.category}
                      </Badge>
                    </div>
                    
                    {/* Service Details */}
                    <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-primary transition-colors duration-300">{service.title}</h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{service.description}</p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {service.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-background-dark/50 rounded-full text-xs text-gray-300 border border-zinc-800">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* Price and Rating */}
                    <div className="mt-auto pt-4 border-t border-zinc-800 flex justify-between items-center">
                      <div className="flex items-center">
                        <FiStar className="text-yellow-400 mr-1" />
                        <span className="text-sm text-gray-300">{service.rating} ({service.reviews})</span>
                      </div>
                      <div className="text-lg font-bold text-primary">{service.price} SOL</div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 