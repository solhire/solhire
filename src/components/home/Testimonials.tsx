'use client';

import { useState, useEffect } from 'react';
import { FiStar } from 'react-icons/fi';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'David Chen',
      role: 'Marketing Director',
      company: 'TechStart',
      content: "SolHire has completely transformed how we find creative talent. The quality of work we've received has been exceptional, and the Solana payment system makes transactions seamless and secure.",
      rating: 5,
      image: '/placeholder-avatar.jpg',
    },
    {
      id: 2,
      name: 'Emily Rodriguez',
      role: 'Indie Filmmaker',
      company: 'Rodriguez Productions',
      content: "As an independent filmmaker, finding reliable video editors was always a challenge until I discovered SolHire. The platform connected me with top-tier talent, and the escrow system gave me peace of mind.",
      rating: 5,
      image: '/placeholder-avatar.jpg',
    },
    {
      id: 3,
      name: 'Michael Thompson',
      role: 'Graphic Designer',
      company: 'Freelance',
      content: "SolHire has been a game-changer for my freelance design career. The platform brings me high-quality clients, and getting paid in Solana has been both convenient and profitable as the currency has grown.",
      rating: 4,
      image: '/placeholder-avatar.jpg',
    },
    {
      id: 4,
      name: 'Sarah Johnson',
      role: 'CEO',
      company: 'CreativeHub',
      content: "We've hired multiple professionals through SolHire for various projects. The quality of talent on the platform is outstanding, and the project management tools make collaboration effortless.",
      rating: 5,
      image: '/placeholder-avatar.jpg',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="py-20 bg-background-light relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-accent/5 blur-3xl"></div>
      
      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">What Our Users Say</h2>
          <p className="text-gray-400">
            Hear from clients and creatives who have experienced the benefits of our platform.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Testimonial Slider */}
          <div className="relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out" 
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                    <div className="card border-primary/30 p-8 md:p-10">
                      {/* Rating */}
                      <div className="flex mb-6">
                        {[...Array(5)].map((_, i) => (
                          <FiStar 
                            key={i} 
                            className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} 
                          />
                        ))}
                      </div>
                      
                      {/* Content */}
                      <blockquote className="text-lg md:text-xl text-gray-300 italic mb-8">
                        "{testimonial.content}"
                      </blockquote>
                      
                      {/* Author */}
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold mr-4">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-white">{testimonial.name}</div>
                          <div className="text-sm text-gray-400">
                            {testimonial.role}, {testimonial.company}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation Dots */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    activeIndex === index ? 'bg-primary scale-125' : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 