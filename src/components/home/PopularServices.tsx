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
    <section className="py-20 bg-background-light">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Services</h2>
            <p className="text-gray-400 max-w-2xl">
              Explore our most sought-after creative services with exceptional quality and competitive pricing.
            </p>
          </div>
          <Link href="/services" className="mt-4 md:mt-0 flex items-center text-primary hover:text-primary-light transition-colors">
            View All Services
            <FiArrowRight className="ml-2" />
          </Link>
        </div>

        {/* Enhanced Filter Section */}
        <div className="bg-background-dark p-6 rounded-2xl shadow-lg border border-gray-800 mb-10">
          <div className="flex flex-wrap justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-white">Filter Services</h3>
            <button 
              onClick={() => setIsFilterExpanded(!isFilterExpanded)}
              className="text-primary hover:text-primary-light transition-colors text-sm"
            >
              {isFilterExpanded ? 'Show Less' : 'Show More Filters'}
            </button>
          </div>
          
          {/* Basic Filters - Always visible */}
          <div className="mb-6">
            <p className="text-gray-300 mb-3 text-sm font-medium">Categories</p>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === category
                      ? 'bg-primary text-white'
                      : 'bg-background text-gray-400 hover:text-white'
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
            <div className="space-y-6">
              {/* Creator Type Filter */}
              <div>
                <p className="text-gray-300 mb-3 text-sm font-medium">Creator Type</p>
                <div className="flex flex-wrap gap-3">
                  {creatorTypes.map((type) => (
                    <button
                      key={type}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        activeCreatorType === type
                          ? 'bg-primary text-white'
                          : 'bg-background text-gray-400 hover:text-white'
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
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        activeLevel === level
                          ? 'bg-primary text-white'
                          : 'bg-background text-gray-400 hover:text-white'
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
                    className="w-full h-2 bg-background rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-white font-medium">{priceRange[0]} - {priceRange[1]} SOL</span>
                </div>
              </div>
            </div>
          )}
          
          {/* Sort Options */}
          <div className="mt-6 pt-6 border-t border-gray-800">
            <div className="flex justify-between items-center">
              <p className="text-gray-300 text-sm font-medium">Sort By</p>
              <select
                className="px-4 py-2 rounded-full text-sm font-medium bg-background text-gray-400 hover:text-white"
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
            <Link key={service.id} href={service.serviceUrl} className="block">
              <div className="card hover:border-primary/50 transition-all duration-300 h-full flex flex-col">
                <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden bg-background">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-background-dark/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-primary">
                    {service.category}
                  </div>
                </div>
                <div className="mb-2">
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
                  <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">{service.description}</p>
                </div>
                <div className="flex items-center text-yellow-400 mb-3">
                  <FiStar className="fill-current" />
                  <span className="ml-1 text-white">{service.rating}</span>
                  <span className="mx-1 text-gray-600">•</span>
                  <span className="text-gray-400 text-sm">{service.reviews} reviews</span>
                </div>
                <div className="mt-auto pt-3 border-t border-gray-800 flex justify-between items-center">
                  <span className="text-sm text-gray-400">Starting at</span>
                  <span className="text-lg font-bold text-white">{service.price} SOL</span>
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