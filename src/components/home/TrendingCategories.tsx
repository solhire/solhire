'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const TrendingCategories = () => {
  const categories = [
    {
      id: 1,
      name: 'Video Editing',
      icon: '/icons/video-editing.svg',
      image: '/category-video.jpg',
      description: 'Professional video editing services for content creators',
      count: 120,
      color: 'from-purple-500/20 to-blue-500/20',
      borderColor: 'border-purple-500/30',
      textColor: 'text-purple-400',
      url: '/services?category=video-editing',
    },
    {
      id: 2,
      name: 'Graphic Design',
      icon: '/icons/graphic-design.svg',
      image: '/category-design.jpg',
      description: 'Logo design, branding, and visual identity services',
      count: 95,
      color: 'from-pink-500/20 to-red-500/20',
      borderColor: 'border-pink-500/30',
      textColor: 'text-pink-400',
      url: '/services?category=graphic-design',
    },
    {
      id: 3,
      name: '3D Modeling',
      icon: '/icons/3d-modeling.svg',
      image: '/category-3d.jpg',
      description: 'Character modeling, environments, and 3D assets',
      count: 78,
      color: 'from-blue-500/20 to-cyan-500/20',
      borderColor: 'border-blue-500/30',
      textColor: 'text-blue-400',
      url: '/services?category=3d-modeling',
    },
    {
      id: 4,
      name: 'Web Development',
      icon: '/icons/web-dev.svg',
      image: '/category-web.jpg',
      description: 'Website development, web apps, and frontend services',
      count: 110,
      color: 'from-green-500/20 to-emerald-500/20',
      borderColor: 'border-green-500/30',
      textColor: 'text-green-400',
      url: '/services?category=web-development',
    },
    {
      id: 5,
      name: 'Animation',
      icon: '/icons/animation.svg',
      image: '/category-animation.jpg',
      description: '2D and 3D animation for explainer videos and more',
      count: 65,
      color: 'from-orange-500/20 to-amber-500/20',
      borderColor: 'border-orange-500/30',
      textColor: 'text-orange-400',
      url: '/services?category=animation',
    },
    {
      id: 6,
      name: 'Illustration',
      icon: '/icons/illustration.svg',
      image: '/category-illustration.jpg',
      description: 'Digital illustrations for books, games, and media',
      count: 82,
      color: 'from-indigo-500/20 to-violet-500/20',
      borderColor: 'border-indigo-500/30',
      textColor: 'text-indigo-400',
      url: '/services?category=illustration',
    },
    {
      id: 7,
      name: 'UI/UX Design',
      icon: '/icons/ui-design.svg',
      image: '/category-ui.jpg',
      description: 'User interface and experience design for apps and websites',
      count: 93,
      color: 'from-teal-500/20 to-cyan-500/20',
      borderColor: 'border-teal-500/30',
      textColor: 'text-teal-400',
      url: '/services?category=ui-ux-design',
    },
    {
      id: 8,
      name: 'Music & Audio',
      icon: '/icons/music.svg',
      image: '/category-music.jpg',
      description: 'Music production, sound effects, and voice overs',
      count: 70,
      color: 'from-red-500/20 to-rose-500/20',
      borderColor: 'border-red-500/30',
      textColor: 'text-red-400',
      url: '/services?category=music-audio',
    },
  ];

  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-accent/5 blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Explore Popular Categories
            </h2>
            <p className="text-gray-400 max-w-2xl">
              Browse our most popular creative service categories and find the perfect talent for your project
            </p>
          </div>
          
          <Link href="/services" className="mt-4 md:mt-0 flex items-center text-primary hover:text-primary/80 transition-colors group">
            <span className="mr-2">Browse all categories</span>
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              href={category.url}
              className="group"
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <motion.div 
                className={`relative h-64 rounded-xl overflow-hidden border ${category.borderColor} bg-gradient-to-br ${category.color} transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/50`}
                initial={{ opacity: 0.9, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/70 to-transparent z-10"></div>
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover opacity-40 group-hover:opacity-50 transition-opacity duration-500 group-hover:scale-105 transition-transform"
                  />
                </div>
                
                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-end p-6">
                  <div className="mb-4 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center">
                    <Image
                      src={category.icon}
                      alt={`${category.name} icon`}
                      width={24}
                      height={24}
                      className="opacity-90"
                    />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  
                  <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                    {category.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className={`text-xs ${category.textColor} bg-background/50 backdrop-blur-sm px-3 py-1 rounded-full`}>
                      {category.count}+ services
                    </span>
                    
                    <motion.span 
                      className="text-white text-sm flex items-center"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ 
                        opacity: hoveredCategory === category.id ? 1 : 0,
                        x: hoveredCategory === category.id ? 0 : -10
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      Explore <FiArrowRight className="ml-1" />
                    </motion.span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingCategories; 