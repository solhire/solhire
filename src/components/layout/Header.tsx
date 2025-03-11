'use client';

import { useState, useEffect } from 'react';
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
  { name: 'Login', href: '/login' },
  { name: 'Register', href: '/register' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [showGlobalChat, setShowGlobalChat] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { connected } = useWallet();
  const { isLoaded, isSignedIn, user: clerkUser } = useUser();
  const { user: mockUser, logout: mockLogout } = useMockAuth();

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
    { name: 'Profile', href: '/profile' },
    { name: 'Post a Job', href: '/post-a-job', requiresWallet: true },
  ];

  // Use the appropriate nav links based on authentication status
  const navLinks = (isLoaded && isSignedIn) || mockUser ? authNavLinks : publicNavLinks;

  return (
    <header
      className={`fixed top-0 sm:top-[48px] left-0 right-0 z-[90] transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-lg shadow-lg' : 'bg-background/80 backdrop-blur-sm sm:bg-transparent'
      }`}
    >
      <div className="container-custom mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between min-h-[48px]">
          {/* Logo */}
          <Link href="/" className="flex items-center z-50 relative">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/70 to-indigo-600/70 rounded-lg blur-md opacity-75 group-hover:opacity-100 animate-pulse"></div>
              <svg
                className="relative w-10 h-10 md:w-12 md:h-12"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#9333EA">
                      <animate attributeName="stop-color" values="#9333EA; #A855F7; #9333EA" dur="4s" repeatCount="indefinite" />
                    </stop>
                    <stop offset="50%" stopColor="#8B5CF6">
                      <animate attributeName="stop-color" values="#8B5CF6; #6366F1; #8B5CF6" dur="4s" repeatCount="indefinite" />
                    </stop>
                    <stop offset="100%" stopColor="#4F46E5">
                      <animate attributeName="stop-color" values="#4F46E5; #818CF8; #4F46E5" dur="4s" repeatCount="indefinite" />
                    </stop>
                  </linearGradient>
                  <linearGradient id="logoGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#A855F7">
                      <animate attributeName="stop-color" values="#A855F7; #C084FC; #A855F7" dur="4s" repeatCount="indefinite" />
                    </stop>
                    <stop offset="100%" stopColor="#6366F1">
                      <animate attributeName="stop-color" values="#6366F1; #818CF8; #6366F1" dur="4s" repeatCount="indefinite" />
                    </stop>
                  </linearGradient>
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                  <filter id="innerShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
                    <feOffset in="blur" dx="1" dy="1" result="offsetBlur" />
                    <feComposite in="SourceGraphic" in2="offsetBlur" operator="over" />
                  </filter>
                  <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feFlood floodColor="#A855F7" floodOpacity="0.5" result="flood" />
                    <feComposite in="flood" in2="SourceGraphic" operator="in" result="mask" />
                    <feGaussianBlur in="mask" stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                {/* Background Circle */}
                <circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  fill="black" 
                  stroke="url(#logoGradient)" 
                  strokeWidth="2"
                >
                  <animate attributeName="r" values="40; 41; 40" dur="3s" repeatCount="indefinite" />
                </circle>
                
                {/* Outer Glow */}
                <circle 
                  cx="50" 
                  cy="50" 
                  r="42" 
                  stroke="url(#logoGradient)" 
                  strokeWidth="1"
                  strokeOpacity="0.5"
                  fill="none"
                >
                  <animate attributeName="r" values="42; 44; 42" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="stroke-opacity" values="0.5; 0.8; 0.5" dur="3s" repeatCount="indefinite" />
                </circle>
                
                {/* S Shape */}
                <path
                  d="M35 35C35 32.24 37.24 30 40 30H55C57.76 30 60 32.24 60 35V40C60 42.76 57.76 45 55 45H45C42.24 45 40 47.24 40 50V50C40 52.76 42.24 55 45 55H60C62.76 55 65 57.24 65 60V65C65 67.76 62.76 70 60 70H45C42.24 70 40 67.76 40 65V60"
                  stroke="url(#logoGradient)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  filter="url(#neonGlow)"
                >
                  <animate attributeName="stroke-width" values="4; 4.5; 4" dur="3s" repeatCount="indefinite" />
                </path>
                
                {/* H Shape */}
                <path
                  d="M30 30V70M70 30V70M30 50H70"
                  stroke="url(#logoGradient2)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  filter="url(#neonGlow)"
                >
                  <animate attributeName="stroke-width" values="4; 4.5; 4" dur="3s" repeatCount="indefinite" />
                </path>
                
                {/* Decorative Elements */}
                <circle cx="30" cy="30" r="3" fill="url(#logoGradient)" filter="url(#glow)">
                  <animate attributeName="r" values="3; 3.5; 3" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="70" cy="30" r="3" fill="url(#logoGradient2)" filter="url(#glow)">
                  <animate attributeName="r" values="3; 3.5; 3" dur="2.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="30" cy="70" r="3" fill="url(#logoGradient2)" filter="url(#glow)">
                  <animate attributeName="r" values="3; 3.5; 3" dur="2.2s" repeatCount="indefinite" />
                </circle>
                <circle cx="70" cy="70" r="3" fill="url(#logoGradient)" filter="url(#glow)">
                  <animate attributeName="r" values="3; 3.5; 3" dur="1.8s" repeatCount="indefinite" />
                </circle>
                
                {/* Solana Symbol */}
                <path
                  d="M50 20L53 23H47L50 20Z"
                  fill="url(#logoGradient)"
                  filter="url(#glow)"
                >
                  <animate attributeName="fill-opacity" values="1; 0.8; 1" dur="2s" repeatCount="indefinite" />
                </path>
                <path
                  d="M50 80L53 77H47L50 80Z"
                  fill="url(#logoGradient2)"
                  filter="url(#glow)"
                >
                  <animate attributeName="fill-opacity" values="1; 0.8; 1" dur="2s" repeatCount="indefinite" />
                </path>
              </svg>
            </div>
            <span className="ml-2 text-lg md:text-xl lg:text-2xl font-bold text-white">Sol<span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-500 animate-gradient">Hire</span></span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-primary'
                    : 'text-gray-300 hover:text-primary'
                } ${
                  link.requiresWallet && !connected ? 'opacity-50 pointer-events-none' : ''
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Token Button */}
            <Link
              href="/token"
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full blur-md opacity-70 group-hover:opacity-100 animate-token-pulse"></div>
              <button className="relative px-4 py-2 bg-gradient-to-r from-purple-500/90 to-blue-600/90 text-white font-bold rounded-full flex items-center shadow-[0_0_10px_rgba(124,58,237,0.5)] animate-glow">
                <FiDollarSign className="mr-1" />
                $HIRE Token
              </button>
            </Link>

            {/* Global Chat Button */}
            <button
              onClick={() => setShowGlobalChat(!showGlobalChat)}
              className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors relative"
              aria-label="Global Chat"
            >
              <FiMessageSquare className="w-5 h-5" />
            </button>

            {/* Search Button */}
            <Link
              href="/search"
              className="p-2 text-gray-300 hover:text-primary transition-colors"
              aria-label="Search"
            >
              <FiSearch className="w-5 h-5" />
            </Link>

            {/* Auth Buttons or User Menu */}
            {mockUser ? (
              <div className="flex items-center space-x-4">
                <Link 
                  href="/profile"
                  className="flex items-center space-x-2 text-gray-300 hover:text-primary transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <FiUser className="w-4 h-4" />
                  </div>
                  <span>{mockUser.username}</span>
                </Link>
                <button onClick={mockLogout} className="btn btn-outline">
                  Logout
                </button>
              </div>
            ) : isLoaded && isSignedIn ? (
              <div className="flex items-center space-x-4">
                <Link 
                  href="/profile"
                  className="flex items-center space-x-2 text-gray-300 hover:text-primary transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <FiUser className="w-4 h-4" />
                  </div>
                  <span>{clerkUser?.username}</span>
                </Link>
                <button onClick={handleLogout} className="btn btn-outline">
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/mock-login" className="btn btn-primary">
                Login
              </Link>
            )}

            {/* Wallet Button - Only show when authenticated */}
            {(isLoaded && isSignedIn || mockUser) && (
              <WalletButtonWrapper />
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-full bg-gray-800/50 hover:bg-primary/20 text-gray-300 hover:text-primary transition-all duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? (
              <FiX className="w-5 h-5" />
            ) : (
              <FiMenu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden fixed inset-x-0 top-[48px] bottom-0 z-[100] bg-gradient-to-b from-background-dark to-black/95 backdrop-blur-md border-t border-gray-800/50 overflow-y-auto transition-all duration-300 ease-in-out shadow-2xl ${
          isMobileMenuOpen 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        style={{ height: 'calc(100vh - 48px)' }}
      >
        <div className="container-custom mx-auto px-4 py-6">
          <nav className="flex flex-col">
            {/* Token Button for Mobile */}
            <Link
              href="/token"
              className="relative inline-block"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full blur-md opacity-70 group-hover:opacity-100 animate-token-pulse"></div>
              <button className="relative px-6 py-3 bg-gradient-to-r from-purple-500/90 to-blue-600/90 text-white font-bold rounded-full flex items-center text-lg shadow-[0_0_10px_rgba(124,58,237,0.5)] animate-glow">
                <FiDollarSign className="mr-2" />
                $HIRE Token
              </button>
            </Link>

            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-base font-medium py-3 px-4 rounded-lg mb-2 transition-all duration-200 ${
                  pathname === link.href
                    ? 'bg-primary/10 text-primary border-l-4 border-primary pl-3'
                    : 'text-gray-300 hover:bg-gray-800/50 hover:text-primary'
                } ${
                  link.requiresWallet && !connected ? 'opacity-50 pointer-events-none' : ''
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <div className="mt-6 pt-6 border-t border-gray-800/50">
              <div className="flex flex-col space-y-2">
                {mockUser ? (
                  <>
                    <Link
                      href="/profile"
                      className="flex items-center text-gray-300 hover:text-primary bg-gray-800/30 hover:bg-gray-800/50 py-3 px-4 rounded-lg transition-all duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="bg-primary/10 p-2 rounded-full mr-3">
                        <FiUser className="w-5 h-5 text-primary" />
                      </div>
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        mockLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center text-gray-300 hover:text-primary bg-gray-800/30 hover:bg-gray-800/50 py-3 px-4 rounded-lg transition-all duration-200"
                    >
                      <div className="bg-primary/10 p-2 rounded-full mr-3">
                        <FiLogOut className="w-5 h-5 text-primary" />
                      </div>
                      Logout
                    </button>
                  </>
                ) : isLoaded && !isSignedIn ? (
                  <div className="space-y-3">
                    {authLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className={`block text-base font-medium transition-all duration-200 ${
                          link.name === 'Register'
                            ? 'btn btn-primary w-full text-center'
                            : 'bg-gray-800/30 hover:bg-gray-800/50 text-gray-300 hover:text-primary py-3 px-4 rounded-lg'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <>
                    <Link
                      href="/profile"
                      className="flex items-center text-gray-300 hover:text-primary bg-gray-800/30 hover:bg-gray-800/50 py-3 px-4 rounded-lg transition-all duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="bg-primary/10 p-2 rounded-full mr-3">
                        <FiUser className="w-5 h-5 text-primary" />
                      </div>
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center text-gray-300 hover:text-primary bg-gray-800/30 hover:bg-gray-800/50 py-3 px-4 rounded-lg transition-all duration-200"
                    >
                      <div className="bg-primary/10 p-2 rounded-full mr-3">
                        <FiLogOut className="w-5 h-5 text-primary" />
                      </div>
                      Logout
                    </button>
                  </>
                )}
                
                <div className="pt-4 flex justify-center">
                  {(isLoaded && isSignedIn || mockUser) && (
                    <WalletButtonWrapper />
                  )}
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* Global Chat Component */}
      <GlobalChat 
        isOpen={showGlobalChat} 
        onClose={() => setShowGlobalChat(false)} 
      />
    </header>
  );
};

export default Header; 