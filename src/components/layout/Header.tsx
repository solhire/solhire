'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { FiMenu, FiX, FiSearch, FiUser, FiBriefcase, FiLogOut } from 'react-icons/fi';

// Define types for navigation links
interface NavLink {
  name: string;
  href: string;
  requiresWallet?: boolean;
}

// Wallet button wrapper component
const WalletButtonWrapper = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-10 w-32 bg-background-dark rounded-full animate-pulse" />
    );
  }

  return (
    <WalletMultiButton className="!bg-primary hover:!bg-primary-dark !rounded-full" />
  );
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { connected } = useWallet();

  // Check authentication status
  useEffect(() => {
    const checkAuth = () => {
      const hasToken = localStorage.getItem('solhire_auth_token');
      setIsAuthenticated(!!hasToken);
      
      const hasWallet = localStorage.getItem('solhire_wallet_connected');
      setIsWalletConnected(!!hasWallet);
    };
    
    checkAuth();
    
    // Listen for storage events (for when another tab logs in/out)
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
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

  const handleLogout = () => {
    localStorage.removeItem('solhire_auth_token');
    localStorage.removeItem('solhire_wallet_connected');
    setIsAuthenticated(false);
    setIsWalletConnected(false);
    router.push('/');
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
    { name: 'Post a Job', href: '/post-a-job', requiresWallet: true },
  ];

  const navLinks = isAuthenticated ? authNavLinks : publicNavLinks;

  const authLinks: NavLink[] = [
    { name: 'Login', href: '/login' },
    { name: 'Register', href: '/register' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-white">Sol<span className="text-primary">Hire</span></span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              // Skip wallet-required links if wallet not connected
              if (link.requiresWallet && !isWalletConnected) return null;
              
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    link.name === 'Become a Creator' || link.name === 'Post a Job'
                      ? 'btn btn-primary btn-sm group relative'
                      : pathname === link.href
                      ? 'text-primary'
                      : 'text-gray-300 hover:text-primary'
                  }`}
                >
                  {link.name}
                  {(link.name === 'Become a Creator' || link.name === 'Post a Job') && (
                    <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Search, Auth & Wallet Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              className="p-2 rounded-full bg-background-light hover:bg-background-light/80 text-gray-300"
              aria-label="Search"
            >
              <FiSearch className="w-5 h-5" />
            </button>
            
            {!isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {authLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-sm font-medium ${
                      link.name === 'Register'
                        ? 'btn btn-primary'
                        : 'text-gray-300 hover:text-primary'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/profile"
                  className="p-2 rounded-full bg-background-light hover:bg-background-light/80 text-gray-300"
                >
                  <FiUser className="w-5 h-5" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-full bg-background-light hover:bg-background-light/80 text-gray-300"
                >
                  <FiLogOut className="w-5 h-5" />
                </button>
              </div>
            )}
            
            {isAuthenticated ? (
              <WalletButtonWrapper />
            ) : (
              null
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-full bg-background-light hover:bg-background-light/80 text-gray-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background-light border-t border-primary/20">
          <div className="container-custom py-4">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => {
                // Skip wallet-required links if wallet not connected
                if (link.requiresWallet && !isWalletConnected) return null;
                
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-base font-medium transition-colors ${
                      link.name === 'Become a Creator' || link.name === 'Post a Job'
                        ? 'btn btn-primary w-full text-center group relative'
                        : pathname === link.href
                        ? 'text-primary'
                        : 'text-gray-300 hover:text-primary'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                    {(link.name === 'Become a Creator' || link.name === 'Post a Job') && (
                      <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    )}
                  </Link>
                );
              })}
              
              <div className="pt-4 border-t border-gray-700">
                <div className="flex flex-col space-y-4">
                  {!isAuthenticated ? (
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
                    {isAuthenticated ? (
                      <WalletButtonWrapper />
                    ) : (
                      null
                    )}
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 