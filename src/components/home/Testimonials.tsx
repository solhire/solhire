'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar, FiArrowLeft, FiArrowRight, FiUser, FiMapPin, FiCalendar } from 'react-icons/fi';
import { ServiceImage } from '@/components/ui/service-image';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const testimonials = [
    {
      id: 1,
      name: 'John Smith',
      avatar: '/placeholder-avatar.jpg',
      location: 'San Francisco, CA',
      text: 'Working with SolHire was a game-changer for my crypto project. The video editor I found created amazing promotional content that helped us stand out in a crowded market. The payment process with SOL was smooth and secure.',
      rating: 5,
      service: 'Video Editing',
      serviceImage: null,
      date: 'March 5, 2025',
    },
    {
      id: 2,
      name: 'Emily Johnson',
      avatar: '/placeholder-avatar.jpg',
      location: 'London, UK',
      text: 'I needed a new logo for my token launch and found the perfect designer on SolHire. They captured exactly what I was looking for and delivered multiple variations. The platform made collaboration easy and secure.',
      rating: 5,
      service: 'Logo Design',
      serviceImage: null,
      date: 'February 28, 2025',
    },
    {
      id: 3,
      name: 'Michael Rodriguez',
      avatar: '/placeholder-avatar.jpg',
      location: 'Miami, FL',
      text: 'The 3D animations created for my NFT project exceeded all expectations. The creator understood the Web3 space perfectly and delivered high-quality work ahead of schedule. Will definitely use SolHire again for future projects.',
      rating: 4,
      service: '3D Animation',
      serviceImage: null,
      date: 'February 22, 2025',
    },
    {
      id: 4,
      name: 'Sophia Chen',
      avatar: '/placeholder-avatar.jpg',
      location: 'Singapore',
      text: 'Found an exceptional web developer who built my token dashboard with all the features I needed. The escrow payment system gave me peace of mind, and communication was seamless throughout the project.',
      rating: 5,
      service: 'Web Development',
      serviceImage: null,
      date: 'February 15, 2025',
    },
  ];

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-rotate testimonials
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      nextTestimonial();
    }, 8000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Reset interval when manually navigating
  const handleNavigation = (callback: () => void) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    callback();
    intervalRef.current = setInterval(() => {
      nextTestimonial();
    }, 8000);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-accent/5 blur-3xl"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            What Our Clients Say
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Hear from clients who have found the perfect creative professionals on SolHire
          </p>
        </div>
        
        <div className="relative max-w-5xl mx-auto">
          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -left-4 md:-left-12 transform -translate-y-1/2 z-20">
            <button
              onClick={() => handleNavigation(prevTestimonial)}
              className="w-10 h-10 rounded-full bg-background-dark border border-zinc-700 flex items-center justify-center text-white hover:bg-primary/20 hover:border-primary/50 transition-all"
              aria-label="Previous testimonial"
            >
              <FiArrowLeft />
            </button>
          </div>
          
          <div className="absolute top-1/2 -right-4 md:-right-12 transform -translate-y-1/2 z-20">
            <button
              onClick={() => handleNavigation(nextTestimonial)}
              className="w-10 h-10 rounded-full bg-background-dark border border-zinc-700 flex items-center justify-center text-white hover:bg-primary/20 hover:border-primary/50 transition-all"
              aria-label="Next testimonial"
            >
              <FiArrowRight />
            </button>
          </div>
          
          {/* Testimonial Slider */}
          <div className="overflow-hidden rounded-xl">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="grid grid-cols-1 md:grid-cols-2 bg-background-dark border border-zinc-800 rounded-xl overflow-hidden"
              >
                {/* Service Image */}
                <div className="relative h-64 md:h-auto">
                  <ServiceImage 
                    src={testimonials[currentIndex].serviceImage}
                    alt={testimonials[currentIndex].service}
                  />
                  <div className="absolute bottom-4 left-4 z-20 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-primary">
                    {testimonials[currentIndex].service}
                  </div>
                </div>
                
                {/* Testimonial Content */}
                <div className="p-8 flex flex-col justify-between">
                  <div>
                    {/* Rating */}
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className={`w-5 h-5 ${
                            i < testimonials[currentIndex].rating
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    
                    {/* Testimonial Text */}
                    <blockquote className="text-lg text-gray-300 mb-6 italic">
                      "{testimonials[currentIndex].text}"
                    </blockquote>
                  </div>
                  
                  {/* User Info */}
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/30 mr-4">
                      <Image
                        src={testimonials[currentIndex].avatar}
                        alt={testimonials[currentIndex].name}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">
                        {testimonials[currentIndex].name}
                      </h4>
                      <div className="flex flex-col text-sm text-gray-400">
                        <span className="flex items-center">
                          <FiMapPin className="w-3 h-3 mr-1" />
                          {testimonials[currentIndex].location}
                        </span>
                        <span className="flex items-center">
                          <FiCalendar className="w-3 h-3 mr-1" />
                          {testimonials[currentIndex].date}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Pagination Dots */}
          <div className="flex justify-center mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`w-3 h-3 mx-1 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-primary w-6'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 