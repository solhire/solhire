'use client';

import Link from 'next/link';
import { FiGithub, FiTwitter, FiInstagram, FiLinkedin, FiYoutube, FiDollarSign } from 'react-icons/fi';
import Image from 'next/image';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: 'For Clients',
      links: [
        { name: 'Find Services', href: '/services' },
        { name: 'Post a Job', href: '/post-job' },
        { name: 'How to Hire', href: '/how-to-hire' },
      ],
    },
    {
      title: 'For Creators',
      links: [
        { name: 'Become a Creator', href: '/become-creator' },
        { name: 'Creator Resources', href: '/creator-resources' },
      ],
    },
    {
      title: 'About',
      links: [
        { name: 'About Us', href: '/about' },
      ],
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '/help' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Contact Us', href: '/contact' },
      ],
    },
  ];

  const socialLinks = [
    { name: 'Twitter', icon: <FiTwitter className="w-5 h-5" />, href: 'https://twitter.com/solhire' },
    { name: 'Instagram', icon: <FiInstagram className="w-5 h-5" />, href: 'https://instagram.com/solhireus' },
    { name: 'LinkedIn', icon: <FiLinkedin className="w-5 h-5" />, href: 'https://linkedin.com' },
    { name: 'YouTube', icon: <FiYoutube className="w-5 h-5" />, href: 'https://youtube.com' },
    { name: 'GitHub', icon: <FiGithub className="w-5 h-5" />, href: 'https://github.com' },
  ];

  return (
    <footer className="bg-background-dark border-t border-primary/20">
      <div className="container-custom py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Logo and Description */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-white">Sol<span className="text-primary">Hire</span></span>
            </Link>
            <div className="mt-6 flex items-center space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary transition-colors"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-medium mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-primary text-sm transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <FiDollarSign className="text-primary mr-2 h-4 w-4" />
            <span className="text-sm text-gray-400">
              Powered by Solana Blockchain
            </span>
          </div>
          <div className="text-sm text-gray-400">
            &copy; {currentYear} SolHire. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 