'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { FiMenu, FiX, FiSearch, FiUser, FiBriefcase, FiLogOut, FiMessageSquare } from 'react-icons/fi';
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
      className={`fixed top-[48px] left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-background/90 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container-custom mx-auto px-4 py-4">
        <div className="flex items-center justify-between min-h-[48px]">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-xl md:text-2xl font-bold text-white">Sol<span className="text-primary">Hire</span></span>
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
            className="md:hidden text-gray-300 hover:text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? (
              <FiX className="w-6 h-6" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background-dark border-t border-gray-800">
          <div className="container-custom mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-base font-medium ${
                    pathname === link.href
                      ? 'text-primary'
                      : 'text-gray-300 hover:text-primary'
                  } ${
                    link.requiresWallet && !connected ? 'opacity-50 pointer-events-none' : ''
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-4 border-t border-gray-700">
                <div className="flex flex-col space-y-4">
                  {mockUser ? (
                    <>
                      <Link
                        href="/profile"
                        className="flex items-center text-gray-300 hover:text-primary"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <FiUser className="mr-2" />
                        Profile
                      </Link>
                      <button
                        onClick={() => {
                          mockLogout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center text-gray-300 hover:text-primary"
                      >
                        <FiLogOut className="mr-2" />
                        Logout
                      </button>
                    </>
                  ) : isLoaded && !isSignedIn ? (
                    authLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className={`text-base font-medium ${
                          link.name === 'Register'
                            ? 'btn btn-primary w-full text-center'
                            : 'text-gray-300 hover:text-primary'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    ))
                  ) : (
                    <>
                      <Link
                        href="/profile"
                        className="flex items-center text-gray-300 hover:text-primary"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <FiUser className="mr-2" />
                        Profile
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center text-gray-300 hover:text-primary"
                      >
                        <FiLogOut className="mr-2" />
                        Logout
                      </button>
                    </>
                  )}
                  
                  <div className="pt-2">
                    {(isLoaded && isSignedIn || mockUser) && (
                      <WalletButtonWrapper />
                    )}
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Global Chat Component */}
      <GlobalChat 
        isOpen={showGlobalChat} 
        onClose={() => setShowGlobalChat(false)} 
      />
    </header>
  );
};

export default Header; 