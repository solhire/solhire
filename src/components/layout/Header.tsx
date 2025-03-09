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
      className={`fixed top-0 sm:top-[48px] left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-lg shadow-lg' : 'bg-background/80 backdrop-blur-sm sm:bg-transparent'
      }`}
    >
      <div className="container-custom mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between min-h-[48px]">
          {/* Logo */}
          <Link href="/" className="flex items-center z-50 relative">
            <span className="text-lg md:text-xl lg:text-2xl font-bold text-white">Sol<span className="text-primary">Hire</span></span>
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
              <div className="absolute -inset-1 bg-gradient-to-r from-[#FF9900] to-[#FFCC66] rounded-full blur-md opacity-70 group-hover:opacity-100 animate-token-pulse"></div>
              <button className="relative px-4 py-2 bg-gradient-to-r from-[#FF9900]/90 to-[#FFCC66]/90 text-black font-bold rounded-full flex items-center shadow-[0_0_10px_rgba(255,153,0,0.5)] animate-glow">
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
        className={`md:hidden fixed inset-x-0 top-[48px] bottom-0 z-50 bg-gradient-to-b from-background-dark to-black/95 backdrop-blur-md border-t border-gray-800/50 overflow-y-auto transition-all duration-300 ease-in-out shadow-2xl ${
          isMobileMenuOpen 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="container-custom mx-auto px-4 py-6">
          <nav className="flex flex-col">
            {/* Token Button for Mobile */}
            <Link
              href="/token"
              className="relative group mb-6 mx-auto"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-[#FF9900] to-[#FFCC66] rounded-full blur-md opacity-70 group-hover:opacity-100 animate-token-pulse"></div>
              <button className="relative px-6 py-3 bg-gradient-to-r from-[#FF9900]/90 to-[#FFCC66]/90 text-black font-bold rounded-full flex items-center text-lg shadow-[0_0_10px_rgba(255,153,0,0.5)] animate-glow">
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