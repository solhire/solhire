'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiEdit2, FiMapPin, FiClock, FiCheck, FiStar, 
  FiBriefcase, FiMail, FiGlobe, FiEye, FiEyeOff,
  FiMessageSquare, FiSettings, FiImage, FiLink,
  FiCalendar, FiTrendingUp, FiShield, FiAward,
  FiCopy, FiLoader
} from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';

// Mock data - Replace with API calls
const mockProfile = {
  username: '',
  displayName: '',
  avatar: '/placeholder-avatar.jpg',
  location: '',
  timeZone: '',
  isVerified: false,
  joinDate: new Date().toISOString().slice(0, 7),
  completedProjects: 0,
  rating: 0,
  isOnline: true,
  bio: '',
  skills: [],
  interests: [],
  languages: [],
  portfolio: [],
  reviews: [],
  recentActivity: [],
  walletAddress: ''
};

// Profile content component
function ProfileContent() {
  const { username } = useParams();
  const router = useRouter();
  const [activeView, setActiveView] = useState<'creator' | 'buyer'>('creator');
  const [showPortfolio, setShowPortfolio] = useState(true);
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState<number | null>(null);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profileData, setProfileData] = useState(mockProfile);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // For now, simulate API call with mock data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (username !== 'alexcreative') {
          throw new Error('Profile not found');
        }
        
        setProfileData(mockProfile);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load profile');
        console.error('Error loading profile:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (username) {
      fetchProfile();
    }
  }, [username]);

  if (isLoading) {
    return (
      <div className="container-custom pt-24 pb-12 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <FiLoader className="w-8 h-8 text-primary animate-spin" />
          <p className="text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-custom pt-24 pb-12">
        <div className="card text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Profile Not Found</h1>
          <p className="text-gray-400 mb-8">The profile you're looking for doesn't exist or has been removed.</p>
          <Link href="/" className="btn btn-primary">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <MainLayout>
      <div className="container-custom pt-24 pb-12">
        {/* Profile Header */}
        <div className="relative mb-8">
          {/* Cover Image - Purple Gradient */}
          <div className="h-48 rounded-xl bg-gradient-to-r from-primary/20 via-primary/10 to-background overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          </div>
          
          {/* Profile Info */}
          <div className="relative -mt-16 px-6">
            <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-4 border-background overflow-hidden">
                  <Image
                    src={profileData.avatar}
                    alt={profileData.displayName}
                    fill
                    className="object-cover"
                  />
                </div>
                <button className="absolute bottom-2 right-2 p-2 rounded-full bg-background text-primary hover:text-white transition-colors">
                  <FiEdit2 className="w-4 h-4" />
                </button>
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
              <div className="flex flex-wrap gap-4">
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
                <button
                  onClick={() => setIsEditingBio(!isEditingBio)}
                  className="p-2 rounded-full bg-background-light text-gray-400 hover:text-white"
                >
                  <FiEdit2 className="w-4 h-4" />
                </button>
              </div>
              {isEditingBio ? (
                <textarea
                  className="w-full bg-background-light rounded-xl p-4 text-white resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={5}
                  defaultValue={profileData.bio}
                />
              ) : (
                <p className="text-gray-300">{profileData.bio}</p>
              )}
              
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

            {/* Portfolio/Work History */}
            {activeView === 'creator' && (
              <motion.div layout className="card">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Portfolio</h2>
                  <button
                    onClick={() => setShowPortfolio(!showPortfolio)}
                    className="p-2 rounded-full bg-background-light text-gray-400 hover:text-white"
                  >
                    {showPortfolio ? (
                      <FiEyeOff className="w-4 h-4" />
                    ) : (
                      <FiEye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                
                <AnimatePresence>
                  {showPortfolio && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      {profileData.portfolio.map((item) => (
                        <div
                          key={item.id}
                          className="relative group rounded-xl overflow-hidden cursor-pointer"
                          onClick={() => setSelectedPortfolioItem(item.id)}
                        >
                          <div className="aspect-video relative">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                              <h3 className="font-semibold text-white">{item.title}</h3>
                              <p className="text-sm text-gray-300">{item.category}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Reviews */}
            <motion.div layout className="card">
              <h2 className="text-xl font-bold mb-6">Reviews</h2>
              <div className="space-y-6">
                {profileData.reviews
                  .filter(review => review.role === activeView)
                  .map((review) => (
                    <div key={review.id} className="border-b border-gray-800 pb-6 last:border-0 last:pb-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-semibold">{review.from}</span>
                            <div className="flex items-center text-yellow-500">
                              <FiStar className="w-4 h-4 fill-current" />
                              <span className="ml-1 text-white">{review.rating}</span>
                            </div>
                          </div>
                          <p className="text-gray-300">{review.comment}</p>
                        </div>
                        <span className="text-sm text-gray-400">{review.date}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        {Object.entries(review.categories).map(([key, value]) => (
                          <div key={key} className="text-center">
                            <div className="text-sm text-gray-400 capitalize">{key}</div>
                            <div className="font-semibold">{value}/5</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Contact Card */}
            <motion.div layout className="card">
              <h2 className="text-xl font-bold mb-6">Contact</h2>
              <button className="btn btn-primary w-full mb-4 group relative">
                Send Message
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-gray-400">
                  <div className="flex items-center">
                    <FiClock className="w-4 h-4 mr-2" />
                    Response Time
                  </div>
                  <span>~2 hours</span>
                </div>
                <div className="flex items-center justify-between text-gray-400">
                  <div className="flex items-center">
                    <FiGlobe className="w-4 h-4 mr-2" />
                    Time Zone
                  </div>
                  <span>{profileData.timeZone}</span>
                </div>
              </div>
            </motion.div>

            {/* Wallet Info */}
            <motion.div layout className="card">
              <h2 className="text-xl font-bold mb-6">Wallet</h2>
              <div className="bg-background-light rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between text-gray-400 mb-2">
                  <span>Address</span>
                  <button className="hover:text-white">
                    <FiCopy className="w-4 h-4" />
                  </button>
                </div>
                <div className="font-mono text-sm">{profileData.walletAddress}</div>
              </div>
              <div className="flex items-center justify-between text-gray-400">
                <div className="flex items-center">
                  <FiShield className="w-4 h-4 mr-2" />
                  Verification
                </div>
                <span className="text-green-500">Verified</span>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div layout className="card">
              <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {profileData.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="p-2 rounded-full bg-background-light text-primary">
                      <FiTrendingUp className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-300">{activity.title}</p>
                      <span className="text-xs text-gray-400">{activity.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Portfolio Item Modal */}
        <AnimatePresence>
          {selectedPortfolioItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedPortfolioItem(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-background-light rounded-xl p-6 max-w-2xl w-full"
                onClick={e => e.stopPropagation()}
              >
                {/* Modal content */}
                {profileData.portfolio.find(item => item.id === selectedPortfolioItem) && (
                  <div>
                    <div className="relative aspect-video mb-4 rounded-lg overflow-hidden">
                      <Image
                        src={profileData.portfolio.find(item => item.id === selectedPortfolioItem)!.image}
                        alt="Portfolio item"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-2">
                      {profileData.portfolio.find(item => item.id === selectedPortfolioItem)!.title}
                    </h3>
                    <div className="flex items-center justify-between text-gray-400">
                      <span>{profileData.portfolio.find(item => item.id === selectedPortfolioItem)!.category}</span>
                      <span>{profileData.portfolio.find(item => item.id === selectedPortfolioItem)!.completionDate}</span>
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <style jsx global>{`
          .bg-grid-pattern {
            background-image: linear-gradient(to right, rgba(139, 92, 246, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(139, 92, 246, 0.1) 1px, transparent 1px);
            background-size: 24px 24px;
          }
        `}</style>
      </div>
    </MainLayout>
  );
}

// Loading fallback
function ProfileFallback() {
  return (
    <MainLayout>
      <div className="container-custom pt-24 pb-12 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-32 h-32 rounded-full bg-background-light animate-pulse"></div>
          <div className="w-48 h-8 bg-background-light animate-pulse rounded-md"></div>
          <div className="w-64 h-6 bg-background-light animate-pulse rounded-md"></div>
          <div className="w-full max-w-4xl mt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="col-span-2 space-y-4">
                <div className="w-full h-12 bg-background-light animate-pulse rounded-md"></div>
                <div className="w-full h-64 bg-background-light animate-pulse rounded-md"></div>
              </div>
              <div className="space-y-4">
                <div className="w-full h-12 bg-background-light animate-pulse rounded-md"></div>
                <div className="w-full h-48 bg-background-light animate-pulse rounded-md"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default function Profile() {
  return (
    <Suspense fallback={<ProfileFallback />}>
      <ProfileContent />
    </Suspense>
  );
} 