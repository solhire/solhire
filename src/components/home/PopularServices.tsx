'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiStar, FiArrowRight } from 'react-icons/fi';

const PopularServices = () => {
  // Mock data for popular services
  const services = [
    {
      id: 1,
      title: 'Placeholder Service',
      description: 'This is a placeholder for a new service.',
      price: 200,
      rating: 4.5,
      reviews: 12,
      image: '/cz.jpg',
      creator: {
        name: 'Creative Studio',
        image: '/placeholder-avatar.jpg',
        type: 'Studio',
        level: 'Rising Talent'
      },
      category: 'Placeholder',
      serviceUrl: '/services/placeholder-service',
      datePosted: new Date('2023-10-10'),
    },
  ];

  // Categories for filtering
  const categories = [
    'All Categories',
    'Video Editing',
    'Graphic Design',
    '3D Modeling',
    'Web Development',
    'Animation',
    'Illustration',
  ];

  // Creator types for filtering
  const creatorTypes = [
    'All Creators',
    'Freelancer',
    'Agency',
    'Studio',
  ];

  // Experience levels
  const experienceLevels = [
    'All Levels',
    'Rising Talent',
    'Professional',
    'Expert',
  ];

  const [activeCategory, setActiveCategory] = useState('All Categories');
  const [activeCreatorType, setActiveCreatorType] = useState('All Creators');
  const [activeLevel, setActiveLevel] = useState('All Levels');
  const [sortBy, setSortBy] = useState('datePosted');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

  const filteredServices = services
    .filter(service => 
      (activeCategory === 'All Categories' || service.category === activeCategory) &&
      (activeCreatorType === 'All Creators' || service.creator.type === activeCreatorType) &&
      (activeLevel === 'All Levels' || service.creator.level === activeLevel) &&
      (service.price >= priceRange[0] && service.price <= priceRange[1])
    )
    .sort((a, b) => {
      if (sortBy === 'datePosted') {
        return (b.datePosted?.getTime() || 0) - (a.datePosted?.getTime() || 0);
      } else if (sortBy === 'rating') {
        return b.rating - a.rating;
      } else if (sortBy === 'priceAsc') {
        return a.price - b.price;
      } else if (sortBy === 'priceDesc') {
        return b.price - a.price;
      }
      return 0;
    });

  return (
    <section className="py-20 bg-background-light relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -right-20 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-1/3 -left-20 w-96 h-96 rounded-full bg-accent/5 blur-3xl"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Popular Services</h2>
            <p className="text-gray-400 max-w-2xl">
              Explore our most sought-after creative services with exceptional quality and competitive pricing.
            </p>
          </div>
          <Link href="/services" className="mt-4 md:mt-0 flex items-center text-primary hover:text-primary-light transition-colors group">
            <span>View All Services</span>
            <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        {/* Enhanced Filter Section */}
        <div className="bg-gradient-to-br from-background to-background-dark p-6 rounded-2xl shadow-lg border border-zinc-800 mb-10 relative overflow-hidden group">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="flex flex-wrap justify-between items-center mb-4 relative z-10">
            <h3 className="text-xl font-semibold text-white">Filter Services</h3>
            <button 
              onClick={() => setIsFilterExpanded(!isFilterExpanded)}
              className="text-primary hover:text-primary-light transition-colors text-sm flex items-center"
            >
              {isFilterExpanded ? 'Show Less' : 'Show More Filters'}
              <span className={`ml-1 transition-transform duration-300 ${isFilterExpanded ? 'rotate-180' : ''}`}>↓</span>
            </button>
          </div>
          
          {/* Basic Filters - Always visible */}
          <div className="mb-6 relative z-10">
            <p className="text-gray-300 mb-3 text-sm font-medium">Categories</p>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-gradient-to-r from-primary to-accent text-white shadow-md shadow-primary/20'
                      : 'bg-background text-gray-400 hover:text-white hover:bg-background-dark'
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          {/* Advanced Filters - Expandable */}
          {isFilterExpanded && (
            <div className="space-y-6 relative z-10 animate-fadeIn">
              {/* Creator Type Filter */}
              <div>
                <p className="text-gray-300 mb-3 text-sm font-medium">Creator Type</p>
                <div className="flex flex-wrap gap-3">
                  {creatorTypes.map((type) => (
                    <button
                      key={type}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        activeCreatorType === type
                          ? 'bg-gradient-to-r from-primary to-accent text-white shadow-md shadow-primary/20'
                          : 'bg-background text-gray-400 hover:text-white hover:bg-background-dark'
                      }`}
                      onClick={() => setActiveCreatorType(type)}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Experience Level Filter */}
              <div>
                <p className="text-gray-300 mb-3 text-sm font-medium">Experience Level</p>
                <div className="flex flex-wrap gap-3">
                  {experienceLevels.map((level) => (
                    <button
                      key={level}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        activeLevel === level
                          ? 'bg-gradient-to-r from-primary to-accent text-white shadow-md shadow-primary/20'
                          : 'bg-background text-gray-400 hover:text-white hover:bg-background-dark'
                      }`}
                      onClick={() => setActiveLevel(level)}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Price Range Filter */}
              <div>
                <p className="text-gray-300 mb-3 text-sm font-medium">Price Range (SOL)</p>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="50"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-background rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <span className="text-white font-medium bg-background-dark px-3 py-1 rounded-full text-sm">
                    {priceRange[0]} - {priceRange[1]} SOL
                  </span>
                </div>
              </div>
            </div>
          )}
          
          {/* Sort Options */}
          <div className="mt-6 pt-6 border-t border-zinc-800 relative z-10">
            <div className="flex justify-between items-center">
              <p className="text-gray-300 text-sm font-medium">Sort By</p>
              <select
                className="px-4 py-2 rounded-full text-sm font-medium bg-background text-gray-400 hover:text-white border border-zinc-800 focus:outline-none focus:border-primary/50 transition-colors"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="datePosted">Newest First</option>
                <option value="rating">Highest Rated</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-300">
            Showing <span className="text-primary font-medium">{filteredServices.length}</span> services
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredServices.map((service) => (
            <Link key={service.id} href={service.serviceUrl} className="block group">
              <div className="card hover:border-primary/50 transition-all duration-300 h-full flex flex-col bg-gradient-to-br from-background to-background-dark border border-zinc-800 group-hover:shadow-lg group-hover:shadow-primary/10">
                <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden bg-background">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10"></div>
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 bg-background-dark/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-primary z-20">
                    {service.category}
                  </div>
                </div>
                <div className="p-5 flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold mr-2">
                        {service.creator.name.charAt(0)}
                      </div>
                      <span className="text-sm text-gray-400">{service.creator.name}</span>
                    </div>
                    <span className="text-xs bg-background px-2 py-1 rounded-full text-gray-400">
                      {service.creator.type}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">{service.description}</p>
                </div>
                <div className="p-5 pt-0 mt-auto">
                  <div className="flex justify-between items-center border-t border-zinc-800 pt-4">
                    <div className="flex items-center">
                      <FiStar className="text-yellow-400 mr-1" />
                      <span className="text-sm text-gray-300">{service.rating} ({service.reviews})</span>
                    </div>
                    <div className="text-lg font-bold text-primary">{service.price} SOL</div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularServices; 