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
      image: '/placeholder-avatar.jpg',
      skills: ['Video Editing', 'Motion Graphics', 'Color Grading'],
      profileUrl: '/creatives/alex-johnson',
    },
    {
      id: 2,
      name: 'Sarah Williams',
      title: 'Graphic Designer & Illustrator',
      rating: 4.8,
      reviews: 98,
      image: '/placeholder-avatar.jpg',
      skills: ['Branding', 'Illustration', 'UI/UX'],
      profileUrl: '/creatives/sarah-williams',
    },
    {
      id: 3,
      name: 'Michael Chen',
      title: '3D Artist & Animator',
      rating: 5.0,
      reviews: 87,
      image: '/placeholder-avatar.jpg',
      skills: ['3D Modeling', 'Animation', 'Rendering'],
      profileUrl: '/creatives/michael-chen',
    },
    {
      id: 4,
      name: 'Jessica Lee',
      title: 'Web Developer & Designer',
      rating: 4.7,
      reviews: 112,
      image: '/placeholder-avatar.jpg',
      skills: ['React', 'Next.js', 'UI Design'],
      profileUrl: '/creatives/jessica-lee',
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Creatives</h2>
            <p className="text-gray-400 max-w-2xl">
              Discover top-rated creative professionals ready to bring your vision to life with exceptional skills and proven track records.
            </p>
          </div>
          <Link href="/creatives" className="mt-4 md:mt-0 flex items-center text-primary hover:text-primary-light transition-colors">
            View All Creatives
            <FiArrowRight className="ml-2" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {creatives.map((creative) => (
            <Link key={creative.id} href={creative.profileUrl} className="block">
              <div className="card hover:border-primary/50 transition-all duration-300 h-full flex flex-col">
                <div className="relative w-20 h-20 mx-auto mb-4">
                  <div className="w-full h-full rounded-full bg-primary/20 flex items-center justify-center text-primary text-xl font-bold">
                    {creative.name.charAt(0)}
                  </div>
                </div>
                <div className="text-center mb-4">
                  <h3 className="text-xl font-semibold text-white">{creative.name}</h3>
                  <p className="text-gray-400 text-sm">{creative.title}</p>
                </div>
                <div className="flex items-center justify-center mb-4">
                  <div className="flex items-center text-yellow-400">
                    <FiStar className="fill-current" />
                    <span className="ml-1 text-white">{creative.rating}</span>
                  </div>
                  <span className="mx-2 text-gray-600">•</span>
                  <span className="text-gray-400 text-sm">{creative.reviews} reviews</span>
                </div>
                <div className="mt-auto">
                  <div className="flex flex-wrap gap-2 justify-center">
                    {creative.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-background rounded-full text-xs text-gray-300 border border-primary/30"
                      >
                        {skill}
                      </span>
                    ))}
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

export default FeaturedCreatives; 