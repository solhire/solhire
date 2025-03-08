'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiMapPin, FiClock, FiCheck, FiStar, 
  FiBriefcase, FiMail, FiGlobe, 
  FiCalendar, FiTrendingUp, FiShield, FiAward
} from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Mock profile data
const mockProfile = {
  username: 'alexcreative',
  displayName: 'Alex Johnson',
  avatar: '/cz.jpg',
  location: 'San Francisco, CA',
  timeZone: 'PST',
  isVerified: true,
  joinDate: '2023-09',
  completedProjects: 47,
  rating: 4.9,
  isOnline: true,
  bio: 'Creative professional specializing in motion design and 3D animation. Passionate about bringing ideas to life through compelling visual storytelling.',
  skills: ['Motion Design', '3D Animation', 'Video Editing', 'After Effects', 'Cinema 4D'],
  interests: ['Tech Innovation', 'Creative Content', 'Digital Art', 'Emerging Media'],
  languages: ['English', 'Spanish'],
  portfolio: [
    {
      id: 1,
      title: 'Brand Motion Package',
      image: '/placeholder-image.jpg',
      category: 'Motion Design',
      client: 'Tech Startup',
      completionDate: '2024-02'
    },
    {
      id: 2,
      title: '3D Product Animation',
      image: '/placeholder-image.jpg',
      category: '3D Animation',
      client: 'E-commerce Brand',
      completionDate: '2024-01'
    }
  ]
};

export default function Profile() {
  const [activeView, setActiveView] = useState<'creator' | 'buyer'>('creator');
  const [showPortfolio, setShowPortfolio] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState(mockProfile);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="container-custom pt-24 pb-12 flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-400">Loading profile...</p>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="container-custom pt-24 pb-12">
        {/* Profile Header */}
        <div className="relative mb-8">
          {/* Cover Image - Purple Gradient */}
          <div className="h-48 rounded-xl bg-gradient-to-r from-primary/20 via-primary/10 to-background overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          </div>
          
          {/* Profile Info */}
          <div className="relative -mt-16 px-4">
            <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-4 border-background overflow-hidden">
                  <Image
                    src={profileData.avatar}
                    alt={profileData.displayName}
                    width={128}
                    height={128}
                    className="object-cover"
                  />
                </div>
              </div>
              
              {/* Basic Info */}
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-bold">{profileData.displayName}</h1>
                  {profileData.isVerified && (
                    <div className="text-primary" title="Verified User">
                      <FiShield className="w-5 h-5" />
                    </div>
                  )}
                  <div className={`w-3 h-3 rounded-full ${
                    profileData.isOnline ? 'bg-green-500' : 'bg-gray-500'
                  }`} />
                </div>
                <div className="flex flex-wrap items-center gap-4 text-gray-400">
                  <div className="flex items-center">
                    <FiMapPin className="w-4 h-4 mr-2" />
                    {profileData.location}
                  </div>
                  <div className="flex items-center">
                    <FiClock className="w-4 h-4 mr-2" />
                    {profileData.timeZone}
                  </div>
                  <div className="flex items-center">
                    <FiCalendar className="w-4 h-4 mr-2" />
                    Joined {profileData.joinDate}
                  </div>
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="flex space-x-4">
                <div className="text-center px-4 py-2 bg-background-light rounded-xl">
                  <div className="text-2xl font-bold">{profileData.completedProjects}</div>
                  <div className="text-sm text-gray-400">Projects</div>
                </div>
                <div className="text-center px-4 py-2 bg-background-light rounded-xl">
                  <div className="text-2xl font-bold flex items-center justify-center">
                    {profileData.rating}
                    <FiStar className="w-4 h-4 text-yellow-500 ml-1" />
                  </div>
                  <div className="text-sm text-gray-400">Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Role Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-background-light rounded-full p-1">
            <button
              onClick={() => setActiveView('creator')}
              className={`px-6 py-2 rounded-full transition-all ${
                activeView === 'creator'
                  ? 'bg-primary text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Creator Profile
            </button>
            <button
              onClick={() => setActiveView('buyer')}
              className={`px-6 py-2 rounded-full transition-all ${
                activeView === 'buyer'
                  ? 'bg-primary text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Buyer Profile
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio Section */}
            <motion.div
              layout
              className="card"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold">About</h2>
              </div>
              <p className="text-gray-300">{profileData.bio}</p>
              
              {/* Skills/Interests */}
              <div className="mt-6">
                <h3 className="font-semibold mb-3">
                  {activeView === 'creator' ? 'Skills' : 'Interests'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(activeView === 'creator' ? profileData.skills : profileData.interests).map((item, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-background-light rounded-full text-sm text-gray-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Languages */}
              <div className="mt-6">
                <h3 className="font-semibold mb-3">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {profileData.languages.map((language, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-background-light rounded-full text-sm text-gray-300"
                    >
                      {language}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Portfolio Section */}
            {activeView === 'creator' && (
              <motion.div
                layout
                className="card"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Portfolio</h2>
                  <button
                    onClick={() => setShowPortfolio(!showPortfolio)}
                    className="text-gray-400 hover:text-white"
                  >
                    {showPortfolio ? 'Hide' : 'Show'}
                  </button>
                </div>
                
                {showPortfolio && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {profileData.portfolio.map((item) => (
                      <div
                        key={item.id}
                        className="bg-background-light rounded-xl overflow-hidden group cursor-pointer"
                      >
                        <div className="relative h-48">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                            <div>
                              <h3 className="text-white font-medium">{item.title}</h3>
                              <p className="text-gray-300 text-sm">{item.category}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Contact Card */}
            <div className="card">
              <h2 className="text-xl font-bold mb-4">Contact</h2>
              <div className="space-y-4">
                <button className="btn btn-primary w-full">
                  <FiMail className="mr-2" />
                  Send Message
                </button>
                <button className="btn btn-outline w-full">
                  <FiBriefcase className="mr-2" />
                  Hire Me
                </button>
              </div>
            </div>
            
            {/* Availability Card */}
            <div className="card">
              <h2 className="text-xl font-bold mb-4">Availability</h2>
              <div className="flex items-center text-green-500 mb-4">
                <FiCheck className="mr-2" />
                <span>Available for work</span>
              </div>
              <p className="text-gray-400 text-sm">
                Typically responds within 24 hours
              </p>
            </div>
            
            {/* Achievements Card */}
            <div className="card">
              <h2 className="text-xl font-bold mb-4">Achievements</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="p-2 bg-background-light rounded-full mr-3">
                    <FiAward className="w-5 h-5 text-yellow-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">Top Rated</h3>
                    <p className="text-gray-400 text-sm">Consistently high ratings</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="p-2 bg-background-light rounded-full mr-3">
                    <FiTrendingUp className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">Rising Talent</h3>
                    <p className="text-gray-400 text-sm">Growing reputation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
} 