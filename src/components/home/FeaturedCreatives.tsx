'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiStar, FiArrowRight } from 'react-icons/fi';

const FeaturedCreatives = () => {
  // Mock data for featured creatives
  const creatives = [
    {
      id: 1,
      name: 'Alex Johnson',
      title: 'Video Editor & Motion Designer',
      rating: 4.9,
      reviews: 124,
      image: '/profile.png',
      skills: ['Video Editing', 'Motion Graphics', 'Color Grading'],
      profileUrl: '/creatives/alex-johnson',
    },
    {
      id: 2,
      name: 'Sarah Williams',
      title: 'Graphic Designer & Illustrator',
      rating: 4.8,
      reviews: 98,
      image: '/profile.png',
      skills: ['Branding', 'Illustration', 'UI/UX'],
      profileUrl: '/creatives/sarah-williams',
    },
    {
      id: 3,
      name: 'Michael Chen',
      title: '3D Artist & Animator',
      rating: 5.0,
      reviews: 87,
      image: '/profile.png',
      skills: ['3D Modeling', 'Animation', 'Rendering'],
      profileUrl: '/creatives/michael-chen',
    },
    {
      id: 4,
      name: 'Jessica Lee',
      title: 'Web Developer & Designer',
      rating: 4.7,
      reviews: 112,
      image: '/profile.png',
      skills: ['React', 'Next.js', 'UI Design'],
      profileUrl: '/creatives/jessica-lee',
    },
  ];

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-accent/5 blur-3xl"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Featured Creatives</h2>
            <p className="text-gray-400 max-w-2xl">
              Discover top-rated creative professionals ready to bring your vision to life with exceptional skills and proven track records.
            </p>
          </div>
          <Link href="/creatives" className="mt-4 md:mt-0 flex items-center text-primary hover:text-primary-light transition-colors group">
            <span>View All Creatives</span>
            <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {creatives.map((creative) => (
            <Link key={creative.id} href={creative.profileUrl} className="block group">
              <div className="card hover:border-primary/50 transition-all duration-300 h-full flex flex-col items-center p-6 bg-gradient-to-br from-background to-background-dark border border-zinc-800 group-hover:shadow-lg group-hover:shadow-primary/10 relative overflow-hidden">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative w-24 h-24 mx-auto mb-6 z-10">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-primary text-2xl font-bold relative z-10 group-hover:scale-110 transition-transform duration-300">
                    {creative.name.charAt(0)}
                  </div>
                </div>
                
                <div className="text-center mb-4 z-10">
                  <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors duration-300">{creative.name}</h3>
                  <p className="text-gray-400 text-sm">{creative.title}</p>
                </div>
                
                <div className="flex items-center justify-center mb-6 z-10">
                  <div className="flex items-center bg-background-dark/70 px-3 py-1 rounded-full">
                    <FiStar className="text-yellow-400 fill-current" />
                    <span className="ml-1 text-white">{creative.rating}</span>
                    <span className="mx-2 text-gray-600">•</span>
                    <span className="text-gray-400 text-sm">{creative.reviews} reviews</span>
                  </div>
                </div>
                
                <div className="mt-auto w-full z-10">
                  <div className="flex flex-wrap gap-2 justify-center">
                    {creative.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-background-dark/50 rounded-full text-xs text-gray-300 border border-primary/20 hover:border-primary/50 transition-colors duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* View profile button that appears on hover */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary to-primary/80 py-3 text-center text-white font-medium translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  View Profile
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCreatives; 