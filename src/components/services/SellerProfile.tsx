'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiStar, FiMapPin, FiClock, FiCheckCircle, FiMessageSquare, FiHeart, FiFlag } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SellerStats {
  rating: number;
  reviewCount: number;
  completedProjects: number;
  responseTime: string;
  memberSince: string;
  lastDelivery: string;
}

interface SellerProfileProps {
  id: string;
  name: string;
  username: string;
  avatar: string;
  level: string;
  location: string;
  description: string;
  languages: { language: string; proficiency: string }[];
  skills: string[];
  stats: SellerStats;
  isOnline?: boolean;
}

export default function SellerProfile({
  id,
  name,
  username,
  avatar,
  level,
  location,
  description,
  languages,
  skills,
  stats,
  isOnline = false,
}: SellerProfileProps) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  
  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  return (
    <div className="border border-zinc-800 rounded-xl overflow-hidden bg-background-dark">
      {/* Header */}
      <div className="p-6 border-b border-zinc-800">
        <div className="flex items-start">
          {/* Avatar */}
          <div className="relative mr-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/30">
              <Image
                src={avatar}
                alt={name}
                width={64}
                height={64}
                className="object-cover"
              />
            </div>
            {isOnline && (
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-background-dark"></div>
            )}
          </div>
          
          {/* Seller Info */}
          <div className="flex-grow">
            <div className="flex items-center mb-1">
              <h3 className="text-lg font-bold mr-2">{name}</h3>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 text-xs">
                {level}
              </Badge>
            </div>
            
            <div className="text-sm text-gray-400 mb-2">@{username}</div>
            
            <div className="flex items-center text-sm text-gray-400">
              <FiMapPin className="mr-1 w-3 h-3" />
              <span>{location}</span>
            </div>
          </div>
          
          {/* Rating */}
          <div className="flex flex-col items-end">
            <div className="flex items-center mb-1">
              <FiStar className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
              <span className="font-bold">{stats.rating.toFixed(1)}</span>
              <span className="text-gray-400 text-sm ml-1">({stats.reviewCount})</span>
            </div>
            
            <div className="text-xs text-gray-400">
              {stats.completedProjects} projects completed
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-3 border-b border-zinc-800">
        <div className="p-4 text-center border-r border-zinc-800">
          <div className="text-sm text-gray-400 mb-1">Response Time</div>
          <div className="flex items-center justify-center">
            <FiClock className="w-3 h-3 text-primary mr-1" />
            <span className="font-medium">{stats.responseTime}</span>
          </div>
        </div>
        
        <div className="p-4 text-center border-r border-zinc-800">
          <div className="text-sm text-gray-400 mb-1">Member Since</div>
          <div className="font-medium">{stats.memberSince}</div>
        </div>
        
        <div className="p-4 text-center">
          <div className="text-sm text-gray-400 mb-1">Last Delivery</div>
          <div className="font-medium">{stats.lastDelivery}</div>
        </div>
      </div>
      
      {/* Description */}
      <div className="p-6 border-b border-zinc-800">
        <h4 className="font-semibold mb-3">About Me</h4>
        <div className={`text-gray-300 text-sm ${!isDescriptionExpanded && 'line-clamp-3'}`}>
          {description}
        </div>
        
        {description.length > 150 && (
          <button
            onClick={toggleDescription}
            className="text-primary hover:text-primary/80 text-sm mt-2 font-medium"
          >
            {isDescriptionExpanded ? 'Show less' : 'Show more'}
          </button>
        )}
      </div>
      
      {/* Languages */}
      <div className="p-6 border-b border-zinc-800">
        <h4 className="font-semibold mb-3">Languages</h4>
        <div className="space-y-2">
          {languages.map((lang, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span>{lang.language}</span>
              <span className="text-gray-400">{lang.proficiency}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Skills */}
      <div className="p-6 border-b border-zinc-800">
        <h4 className="font-semibold mb-3">Skills</h4>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <Badge key={index} variant="secondary" className="bg-background border border-zinc-700 text-gray-300">
              {skill}
            </Badge>
          ))}
        </div>
      </div>
      
      {/* Actions */}
      <div className="p-6 flex flex-col space-y-3">
        <Button className="w-full bg-primary hover:bg-primary/90 text-white">
          <FiMessageSquare className="mr-2" /> Contact Me
        </Button>
        
        <div className="flex space-x-2">
          <Button variant="outline" className="flex-1 border-zinc-700 hover:bg-background hover:text-primary">
            <FiHeart className="mr-2" /> Save
          </Button>
          <Button variant="outline" className="border-zinc-700 hover:bg-background hover:text-red-500">
            <FiFlag className="mr-2" /> Report
          </Button>
        </div>
      </div>
    </div>
  );
}

// Example usage:
export function SellerProfileExample() {
  const exampleSeller = {
    id: 'seller-1',
    name: 'Alex Johnson',
    username: 'alexcreates',
    avatar: '/profile.png',
    level: 'Top Rated',
    location: 'New York, USA',
    description: 'Professional video editor with over 5 years of experience. Specialized in creating engaging content for YouTube, social media, and corporate videos. I work with Adobe Premiere Pro, After Effects, and DaVinci Resolve to deliver high-quality videos that meet your specific needs. My goal is to help you tell your story through compelling visual content.',
    languages: [
      { language: 'English', proficiency: 'Native' },
      { language: 'Spanish', proficiency: 'Conversational' },
    ],
    skills: [
      'Video Editing',
      'Color Grading',
      'Motion Graphics',
      'Sound Design',
      'Visual Effects',
      'Storytelling',
    ],
    stats: {
      rating: 4.9,
      reviewCount: 127,
      completedProjects: 156,
      responseTime: '1 hour',
      memberSince: 'Jan 2022',
      lastDelivery: '2 days ago',
    },
    isOnline: true,
  };

  return <SellerProfile {...exampleSeller} />;
} 