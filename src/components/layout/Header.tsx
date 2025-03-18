'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { FiMenu, FiX, FiSearch, FiUser, FiBriefcase, FiLogOut, FiMessageSquare, FiDollarSign } from 'react-icons/fi';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import GlobalChat from '@/components/chat/GlobalChat';
import { useMockAuth } from '@/context/MockAuthContext';

// Define types for navigation links
interface NavLink {
  name: string;
  href: string;
  requiresWallet?: boolean;
}

// Category dropdown data
const categories = [
  {
    name: 'Video Editing',
    subcategories: [
      'Video Post-Production',
      'Visual Effects',
      'Video Intros',
      'Color Grading',
      'Video Transitions',
    ],
    icon: '🎬',
    href: '/services?category=video-editing',
  },
  {
    name: 'Graphic Design',
    subcategories: [
      'Logo Design',
      'Brand Identity',
      'Social Media Graphics',
      'Packaging Design',
      'Illustration',
    ],
    icon: '🎨',
    href: '/services?category=graphic-design',
  },
  {
    name: '3D Modeling',
    subcategories: [
      'Character Modeling',
      'Environment Design',
      '3D Animation',
      'Product Visualization',
      'Architectural Visualization',
    ],
    icon: '🧊',
    href: '/services?category=3d-modeling',
  },
  {
    name: 'Web Development',
    subcategories: [
      'Frontend Development',
      'Backend Development',
      'Full-Stack Development',
      'E-commerce',
      'Web Applications',
    ],
    icon: '💻',
    href: '/services?category=web-development',
  },
  {
    name: 'Animation',
    subcategories: [
      '2D Animation',
      '3D Animation',
      'Motion Graphics',
      'Explainer Videos',
      'Character Animation',
    ],
    icon: '🎭',
    href: '/services?category=animation',
  },
  {
    name: 'Music & Audio',
    subcategories: [
      'Music Production',
      'Voice Over',
      'Sound Effects',
      'Audio Editing',
      'Podcast Production',
    ],
    icon: '🎵',
    href: '/services?category=music-audio',
  },
];

// Wallet button wrapper to handle styling
const WalletButtonWrapper = () => {
  return (
    <div className="wallet-adapter-button-wrapper">
      <WalletMultiButton className="wallet-adapter-button" />
    </div>
  );
};

// Auth links for login/register
const authLinks = [
  { name: 'Login', href: '/mock-login' },
  { name: 'Register', href: '/register' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [showGlobalChat, setShowGlobalChat] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { connected } = useWallet();
  const { isLoaded, isSignedIn, user: clerkUser } = useUser();
  const { user: mockUser, logout: mockLogout } = useMockAuth();
  
  const categoryDropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Check wallet connection status
  useEffect(() => {
    const checkWallet = () => {
      const hasWallet = localStorage.getItem('solhire_wallet_connected');
      setIsWalletConnected(!!hasWallet);
    };
    
    checkWallet();
    
    // Listen for storage events (for when another tab connects/disconnects wallet)
    window.addEventListener('storage', checkWallet);
    return () => window.removeEventListener('storage', checkWallet);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close category dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target as Node)) {
        setShowCategoryDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      // Call the logout API endpoint
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      // Clear local storage items
      localStorage.removeItem('solhire_wallet_connected');
      setIsWalletConnected(false);
      
      // Redirect to home page
      router.push('/');
      
      // Reload the page to ensure Clerk session is cleared
      window.location.reload();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsSearchFocused(false);
    }
  };

  const publicNavLinks: NavLink[] = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Become a Creator', href: '/become-creator' },
  ];

  const authNavLinks: NavLink[] = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Messages', href: '/messages' },
    { name: 'Post a Job', href: '/post-a-job', requiresWallet: true },
  ];

  // Use the appropriate nav links based on authentication status
  const navLinks = (isLoaded && isSignedIn) || mockUser ? authNavLinks : publicNavLinks;

  return (
    <>
      {/* Updated announcement bar */}
      <div className="bg-background-dark/80 backdrop-blur-sm border-b border-zinc-800/50 py-2 text-center text-xs font-medium">
        <div className="container-custom flex flex-col sm:flex-row items-center justify-center gap-2">
          <span className="text-gray-400">Service creation is temporarily disabled while we finalize our payment system</span>
          <span className="text-yellow-400 font-semibold">• Official contract address will be posted first @solhire on X</span>
        </div>
      </div>
      
      <header
        className={`fixed top-0 sm:top-[24px] left-0 right-0 z-[90] transition-all duration-300 ${
          isScrolled ? 'bg-background/95 backdrop-blur-lg shadow-lg' : 'bg-background/80 backdrop-blur-sm sm:bg-transparent'
        }`}
      >
        <div className="container-custom mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between min-h-[48px]">
            {/* Logo */}
            <Link href="/" className="flex items-center z-50 relative">
              <span className="text-xl font-bold bg-gradient-to-r from-purple-500 to-blue-600 text-transparent bg-clip-text">
                SolHire
              </span>
            </Link>
            
            {/* Category Dropdown Button - Desktop */}
            <div className="hidden md:block relative" ref={categoryDropdownRef}>
              <button
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                className="flex items-center px-4 py-2 rounded-full bg-background-dark border border-zinc-700 text-white hover:border-primary/50 transition-colors"
              >
                <span className="mr-2">Categories</span>
                <svg 
                  className={`w-4 h-4 transition-transform ${showCategoryDropdown ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Category Dropdown Menu */}
              {showCategoryDropdown && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-background-dark border border-zinc-700 rounded-xl shadow-xl z-50 overflow-hidden">
                  <div className="max-h-[70vh] overflow-y-auto py-2">
                    {categories.map((category) => (
                      <div key={category.name} className="group">
                        <Link 
                          href={category.href}
                          className="flex items-center px-4 py-3 hover:bg-primary/10 transition-colors"
                          onClick={() => setShowCategoryDropdown(false)}
                        >
                          <span className="text-xl mr-3">{category.icon}</span>
                          <div>
                            <div className="font-medium text-white group-hover:text-primary transition-colors">
                              {category.name}
                            </div>
                            <div className="text-xs text-gray-400 mt-1">
                              {category.subcategories.slice(0, 3).join(', ')}...
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Search Bar - Desktop */}
            <div className="hidden md:block flex-grow max-w-xl mx-4 relative">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  ref={searchInputRef}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                  placeholder="Search for services..."
                  className="w-full px-4 py-2 pl-10 pr-4 rounded-full bg-background-dark border border-zinc-700 text-white placeholder-gray-400 focus:outline-none focus:border-primary/50 transition-colors"
                />
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 rounded-full bg-primary/20 text-primary text-sm hover:bg-primary/30 transition-colors"
                >
                  Search
                </button>
              </form>
              
              {/* Search Suggestions */}
              {isSearchFocused && searchQuery.trim() && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-background-dark border border-zinc-700 rounded-xl shadow-xl z-50 py-2">
                  <div className="px-4 py-2 text-sm text-gray-400">
                    Popular searches:
                  </div>
                  {['video editing', 'logo design', '3d modeling', 'animation'].map((term) => (
                    <div 
                      key={term}
                      className="px-4 py-2 hover:bg-primary/10 cursor-pointer transition-colors"
                      onClick={() => {
                        setSearchQuery(term);
                        searchInputRef.current?.focus();
                      }}
                    >
                      <div className="flex items-center">
                        <FiSearch className="mr-2 text-gray-400" />
                        <span>{term}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => {
                // Skip rendering if the link requires a wallet and the wallet is not connected
                if (link.requiresWallet && !isWalletConnected) return null;
                
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      pathname === link.href
                        ? 'text-primary bg-primary/10'
                        : 'text-gray-300 hover:text-white hover:bg-background-dark/60'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              
              {/* Wallet Button or Auth Links */}
              {(isLoaded && isSignedIn) || mockUser ? (
                <div className="flex items-center ml-2">
                  {/* Wallet Button */}
                  {!isWalletConnected && <WalletButtonWrapper />}
                  
                  {/* User Menu */}
                  <div className="relative ml-2 group">
                    <button className="flex items-center space-x-1 p-1 rounded-full hover:bg-background-dark/60 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        {clerkUser?.firstName?.[0] || mockUser?.username?.[0] || 'U'}
                      </div>
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {/* Dropdown Menu */}
                    <div className="absolute right-0 mt-2 w-48 bg-background-dark border border-zinc-700 rounded-xl shadow-xl z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2">
                      <div className="py-2">
                        <Link href="/profile" className="flex items-center px-4 py-2 hover:bg-primary/10 transition-colors">
                          <FiUser className="mr-2" />
                          <span>Profile</span>
                        </Link>
                        <Link href="/dashboard" className="flex items-center px-4 py-2 hover:bg-primary/10 transition-colors">
                          <FiBriefcase className="mr-2" />
                          <span>Dashboard</span>
                        </Link>
                        <Link href="/messages" className="flex items-center px-4 py-2 hover:bg-primary/10 transition-colors">
                          <FiMessageSquare className="mr-2" />
                          <span>Messages</span>
                        </Link>
                        <Link href="/earnings" className="flex items-center px-4 py-2 hover:bg-primary/10 transition-colors">
                          <FiDollarSign className="mr-2" />
                          <span>Earnings</span>
                        </Link>
                        <div className="border-t border-zinc-700 my-1"></div>
                        <button
                          onClick={handleLogout}
                          className="flex items-center px-4 py-2 w-full text-left hover:bg-primary/10 transition-colors text-red-400 hover:text-red-300"
                        >
                          <FiLogOut className="mr-2" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-2 ml-2">
                  {authLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        link.name === 'Register'
                          ? 'bg-primary text-white hover:bg-primary/90'
                          : 'border border-zinc-700 hover:border-primary/50 text-white'
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-background-dark/60 transition-colors focus:outline-none"
            >
              {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search - Shown below header on mobile */}
        <div className="md:hidden px-4 py-2 bg-background-dark/90 border-t border-zinc-800">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for services..."
              className="w-full px-4 py-2 pl-10 rounded-full bg-background border border-zinc-700 text-white placeholder-gray-400 focus:outline-none focus:border-primary/50 transition-colors"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 rounded-full bg-primary/20 text-primary text-sm hover:bg-primary/30 transition-colors"
            >
              Search
            </button>
          </form>
        </div>
        
        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 bg-background z-40 transition-transform duration-300 ease-in-out transform ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } md:hidden`}
        >
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center p-4 border-b border-zinc-800">
              <Link href="/" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
                <span className="text-xl font-bold text-white">Sol<span className="text-primary">Hire</span></span>
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-background-dark/60 transition-colors focus:outline-none"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-grow overflow-y-auto py-4">
              <div className="px-4 py-2 text-sm text-gray-400 uppercase tracking-wider">Categories</div>
              <div className="mb-4">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    href={category.href}
                    className="flex items-center px-4 py-3 hover:bg-primary/10 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="text-xl mr-3">{category.icon}</span>
                    <span className="font-medium">{category.name}</span>
                  </Link>
                ))}
              </div>
              
              <div className="border-t border-zinc-800 my-2"></div>
              
              <div className="px-4 py-2 text-sm text-gray-400 uppercase tracking-wider">Navigation</div>
              <div className="mb-4">
                {navLinks.map((link) => {
                  // Skip rendering if the link requires a wallet and the wallet is not connected
                  if (link.requiresWallet && !isWalletConnected) return null;
                  
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`block px-4 py-3 ${
                        pathname === link.href
                          ? 'text-primary bg-primary/10'
                          : 'text-gray-300 hover:text-white hover:bg-background-dark/60'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>
              
              {/* Wallet or Auth in Mobile Menu */}
              <div className="border-t border-zinc-800 my-2"></div>
              
              <div className="px-4 py-2 text-sm text-gray-400 uppercase tracking-wider">
                {(isLoaded && isSignedIn) || mockUser ? 'Account' : 'Join SolHire'}
              </div>
              
              <div className="px-4 py-2">
                {(isLoaded && isSignedIn) || mockUser ? (
                  <div className="space-y-2">
                    <Link
                      href="/profile"
                      className="block px-4 py-3 rounded-lg bg-background-dark hover:bg-primary/10 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="flex items-center">
                        <FiUser className="mr-2" />
                        <span>Profile</span>
                      </div>
                    </Link>
                    
                    <Link
                      href="/dashboard"
                      className="block px-4 py-3 rounded-lg bg-background-dark hover:bg-primary/10 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="flex items-center">
                        <FiBriefcase className="mr-2" />
                        <span>Dashboard</span>
                      </div>
                    </Link>
                    
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        handleLogout();
                      }}
                      className="w-full text-left px-4 py-3 rounded-lg bg-background-dark hover:bg-red-900/20 transition-colors text-red-400"
                    >
                      <div className="flex items-center">
                        <FiLogOut className="mr-2" />
                        <span>Logout</span>
                      </div>
                    </button>
                    
                    {!isWalletConnected && (
                      <div className="mt-4">
                        <div className="px-4 py-2 text-sm text-gray-400">Connect Wallet</div>
                        <div className="px-4">
                          <WalletButtonWrapper />
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {authLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className={`block px-4 py-3 rounded-lg text-center ${
                          link.name === 'Register'
                            ? 'bg-primary text-white'
                            : 'bg-background-dark text-white border border-zinc-700'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Global Chat */}
      {showGlobalChat && <GlobalChat isOpen={true} onClose={() => setShowGlobalChat(false)} />}
    </>
  );
};

export default Header; 