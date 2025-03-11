'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiStar, FiArrowRight, FiArrowLeft, FiHeart, FiClock } from 'react-icons/fi';
import { motion } from 'framer-motion';

const PopularServices = () => {
  // Mock data for popular services
  const services = [
    {
      id: 1,
      title: 'Professional Video Editing for Content Creators',
      description: 'High-quality video editing with color grading, transitions, and effects.',
      price: 200,
      rating: 4.9,
      reviews: 127,
      image: '/profile.png',
      creator: {
        name: 'VideoWizard',
        image: '/placeholder-avatar.jpg',
        type: 'Freelancer',
        level: 'Top Rated'
      },
      category: 'Video Editing',
      serviceUrl: '/services/video-editing',
      deliveryTime: 3,
      featured: true,
    },
    {
      id: 2,
      title: 'Modern Logo Design with Unlimited Revisions',
      description: 'Custom logo design that captures your brand identity.',
      price: 150,
      rating: 4.8,
      reviews: 98,
      image: '/profile.png',
      creator: {
        name: 'DesignStudio',
        image: '/placeholder-avatar.jpg',
        type: 'Studio',
        level: 'Rising Talent'
      },
      category: 'Graphic Design',
      serviceUrl: '/services/logo-design',
      deliveryTime: 2,
    },
    {
      id: 3,
      title: '3D Character Modeling for Games and Animation',
      description: 'Detailed 3D character models ready for animation and games.',
      price: 350,
      rating: 4.7,
      reviews: 64,
      image: '/profile.png',
      creator: {
        name: '3DArtist',
        image: '/placeholder-avatar.jpg',
        type: 'Freelancer',
        level: 'Professional'
      },
      category: '3D Modeling',
      serviceUrl: '/services/3d-modeling',
      deliveryTime: 7,
    },
    {
      id: 4,
      title: 'Responsive Website Development with Next.js',
      description: 'Modern, fast websites built with Next.js and Tailwind CSS.',
      price: 500,
      rating: 4.9,
      reviews: 112,
      image: '/profile.png',
      creator: {
        name: 'WebDev Pro',
        image: '/placeholder-avatar.jpg',
        type: 'Agency',
        level: 'Top Rated'
      },
      category: 'Web Development',
      serviceUrl: '/services/web-development',
      deliveryTime: 10,
      featured: true,
    },
    {
      id: 5,
      title: 'Animated Explainer Videos for Your Business',
      description: 'Engaging animated videos to explain your products or services.',
      price: 300,
      rating: 4.6,
      reviews: 87,
      image: '/profile.png',
      creator: {
        name: 'AnimationStudio',
        image: '/placeholder-avatar.jpg',
        type: 'Studio',
        level: 'Professional'
      },
      category: 'Animation',
      serviceUrl: '/services/animation',
      deliveryTime: 5,
    },
    {
      id: 6,
      title: 'Custom Illustration for Books and Publications',
      description: 'Unique illustrations for your books, magazines, or digital content.',
      price: 250,
      rating: 4.8,
      reviews: 76,
      image: '/profile.png',
      creator: {
        name: 'IllustrationArt',
        image: '/placeholder-avatar.jpg',
        type: 'Freelancer',
        level: 'Rising Talent'
      },
      category: 'Illustration',
      serviceUrl: '/services/illustration',
      deliveryTime: 4,
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

  const [activeCategory, setActiveCategory] = useState('All Categories');
  const [visibleSlide, setVisibleSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const filteredServices = services.filter(service => 
    activeCategory === 'All Categories' || service.category === activeCategory
  );

  const handlePrev = () => {
    if (visibleSlide > 0) {
      setVisibleSlide(visibleSlide - 1);
    }
  };

  const handleNext = () => {
    if (visibleSlide < Math.ceil(filteredServices.length / 3) - 1) {
      setVisibleSlide(visibleSlide + 1);
    }
  };

  useEffect(() => {
    // Reset visible slide when category changes
    setVisibleSlide(0);
  }, [activeCategory]);

  return (
    <section className="py-20 bg-background-light relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -right-20 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-1/3 -left-20 w-96 h-96 rounded-full bg-accent/5 blur-3xl"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Popular Services</h2>
            <p className="text-gray-400 max-w-2xl">
              Explore our most sought-after creative services with exceptional quality and competitive pricing.
            </p>
          </div>
          
          <Link href="/services" className="mt-4 md:mt-0 flex items-center text-primary hover:text-primary/80 transition-colors group">
            <span className="mr-2">Browse all services</span>
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        {/* Category Navigation */}
        <div className="mb-8 overflow-x-auto scrollbar-hide">
          <div className="flex space-x-2 pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === category
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-background-dark text-gray-300 hover:bg-primary/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Services Slider */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            disabled={visibleSlide === 0}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background-dark border border-zinc-700 flex items-center justify-center text-white ${
              visibleSlide === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/20 hover:border-primary/50'
            }`}
            style={{ transform: 'translate(-50%, -50%)' }}
          >
            <FiArrowLeft />
          </button>
          
          <button
            onClick={handleNext}
            disabled={visibleSlide >= Math.ceil(filteredServices.length / 3) - 1}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background-dark border border-zinc-700 flex items-center justify-center text-white ${
              visibleSlide >= Math.ceil(filteredServices.length / 3) - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/20 hover:border-primary/50'
            }`}
            style={{ transform: 'translate(50%, -50%)' }}
          >
            <FiArrowRight />
          </button>
          
          {/* Services Grid */}
          <div className="overflow-hidden" ref={sliderRef}>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              animate={{ x: -visibleSlide * (sliderRef.current?.offsetWidth || 0) }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{ width: `${Math.ceil(filteredServices.length / 3) * 100}%` }}
            >
              {filteredServices.map((service) => (
                <Link key={service.id} href={service.serviceUrl} className="group">
                  <div className="bg-background-dark rounded-lg overflow-hidden border border-zinc-800 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(147,51,234,0.15)]">
                    {/* Service Image */}
                    <div className="aspect-video relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                      <div className="flex items-center justify-center w-full h-full bg-background-dark">
                        <div className="text-center p-6">
                          <p className="text-gray-400 text-sm">Service preview not available</p>
                        </div>
                      </div>
                      
                      {/* Featured Badge */}
                      {service.featured && (
                        <div className="absolute top-3 left-3 z-20 bg-primary text-white text-xs px-2 py-1 rounded-full">
                          Featured
                        </div>
                      )}
                      
                      {/* Save Button */}
                      <button 
                        className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-primary/80 transition-colors"
                        onClick={(e) => {
                          e.preventDefault();
                          // Add save functionality
                        }}
                      >
                        <FiHeart className="w-4 h-4" />
                      </button>
                    </div>
                    
                    {/* Service Info */}
                    <div className="p-4">
                      {/* Creator Info */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden border border-primary/30">
                          <Image
                            src={service.creator.image}
                            alt={service.creator.name}
                            width={32}
                            height={32}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">
                            {service.creator.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            {service.creator.level}
                          </p>
                        </div>
                      </div>
                      
                      {/* Service Title */}
                      <h3 className="text-base font-semibold mb-2 line-clamp-2 text-white group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-3">
                        <FiStar className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{service.rating.toFixed(1)}</span>
                        <span className="text-sm text-gray-400">({service.reviews})</span>
                      </div>
                    </div>
                    
                    {/* Footer */}
                    <div className="border-t border-zinc-800 p-4 flex flex-col">
                      <div className="flex items-center justify-between w-full mb-2">
                        <div className="flex items-center text-xs text-gray-400">
                          <FiClock className="w-3 h-3 mr-1" />
                          {service.deliveryTime} day{service.deliveryTime > 1 ? 's' : ''} delivery
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between w-full">
                        <div className="text-xs text-gray-400">
                          Starting at
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-white">
                            {service.price} SOL
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularServices; 