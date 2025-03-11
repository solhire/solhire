import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import FeaturedCreatives from '@/components/home/FeaturedCreatives';
import PopularServices from '@/components/home/PopularServices';
import HowItWorks from '@/components/home/HowItWorks';
import Testimonials from '@/components/home/Testimonials';
import TrendingCategories from '@/components/home/TrendingCategories';
import StatsSection from '@/components/home/StatsSection';
import SecurityFeatures from '@/components/home/SecurityFeatures';
import CreatorBenefits from '@/components/home/CreatorBenefits';
import ClientBenefits from '@/components/home/ClientBenefits';
import HomeFAQ from '@/components/home/HomeFAQ';
import { FiArrowRight, FiShield, FiZap, FiExternalLink } from 'react-icons/fi';

export const metadata: Metadata = {
  title: 'SolHire | Home',
  description: 'Find and hire top creative professionals and pay with SOL cryptocurrency',
};

export default function Home() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background-dark to-background/90 z-10" />
          <div className="absolute top-0 left-0 w-full h-full bg-background/40 z-0" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/20 blur-3xl z-0" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-accent/20 blur-3xl z-0" />
        </div>
        
        <div className="container-custom relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="pt-10 sm:pt-0">
              <div className="flex items-center mb-4">
                <span className="bg-primary/20 text-primary text-sm font-medium py-1 px-3 rounded-full">Web3 Marketplace</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-white">Hire Top Creatives with </span>
                <span className="relative inline-flex items-center">
                  {/* Solana Logo */}
                  <svg className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 mr-2" viewBox="0 0 397 311" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7zM64.6 3.8C67.1 1.4 70.4 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1L64.6 3.8zM333.1 120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1l-62.7-62.7z"
                      fill="url(#solana-logo-gradient)"
                    />
                    <defs>
                      <linearGradient id="solana-logo-gradient" x1="0" y1="0" x2="397" y2="311" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#9333EA" /> {/* purple-600 */}
                        <stop offset="100%" stopColor="#2563EB" /> {/* blue-600 */}
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="bg-gradient-to-br from-purple-500 to-blue-600 text-transparent bg-clip-text [text-shadow:0_0_25px_rgba(124,58,237,0.6)] animate-pulse">
                    SOL
                  </span>
                  {/* Light swipe animation */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-300/30 to-transparent -skew-x-12 animate-shine"></span>
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8">
                Connect with skilled video editors, graphic designers, and other creative professionals. Pay securely with SOL cryptocurrency.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/services" className="btn btn-primary px-8 py-3 text-lg">
                  Find Services
                </Link>
                <Link href="/become-creator" className="btn btn-outline px-8 py-3 text-lg group relative">
                  Become a Creator
                  <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </div>
              
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/token" className="flex items-center text-purple-500 hover:text-blue-500 group transition-all">
                  <span className="mr-2">Learn about $HIRE token</span>
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <a 
                  href="https://pump.fun/profile/SolHire?include-nsfw=true" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm hover:bg-cyan-500/20 transition-colors"
                >
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="mr-1"
                  >
                    <path 
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                    <path 
                      d="M14 12L11 10V14L14 12Z" 
                      fill="currentColor"
                    />
                  </svg>
                  SolHire on PumpFun
                </a>
              </div>
            </div>
            
            {/* Hero Image */}
            <div className="relative h-[500px] w-full rounded-2xl overflow-hidden border border-primary/30 mt-8 sm:mt-0">
              <div className="absolute -bottom-20 -left-20 -right-20 h-60 bg-gradient-to-t from-primary/40 via-primary/20 to-transparent blur-3xl z-0" />
              <div className="absolute -bottom-10 -left-10 -right-10 h-40 bg-primary/30 blur-2xl z-0" />
              <Image
                src="/placeholder-image.jpg"
                alt="SolHire Platform Preview"
                fill
                className="object-cover relative z-10"
                priority
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Quick Features - New Section */}
      <section className="py-16 bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-background-dark p-6 rounded-xl border border-primary/20 hover:border-primary/40 transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <FiZap className="text-primary text-xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Lightning Fast Payments</h3>
              <p className="text-gray-400">Instant payments with SOL. No waiting for bank transfers or dealing with payment processors.</p>
            </div>
            
            <div className="bg-background-dark p-6 rounded-xl border border-primary/20 hover:border-primary/40 transition-all">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                <FiShield className="text-purple-500 text-xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Escrow</h3>
              <p className="text-gray-400">Funds held in secure smart contracts until work is completed, protecting both clients and creators.</p>
            </div>
            
            <div className="bg-background-dark p-6 rounded-xl border border-primary/20 hover:border-primary/40 transition-all">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                <svg className="text-accent" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14.31 8L20.05 17.94" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9.69 8H21.17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7.38 12.0001L13.12 2.06006" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9.69 16.0001L3.95 6.06006" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14.31 16H2.82996" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16.62 12L10.88 21.94" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Web3 Native</h3>
              <p className="text-gray-400">Built for the decentralized web. Connect with your favorite SOL wallet and start working immediately.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* New Stats Section */}
      <StatsSection />
      
      {/* Featured Sections */}
      <PopularServices />
      <TrendingCategories />
      <FeaturedCreatives />
      
      {/* Client Benefits Section */}
      <ClientBenefits />
      
      {/* Security Features Section */}
      <SecurityFeatures />
      
      {/* Creator Benefits Section */}
      <CreatorBenefits />
      
      {/* How It Works */}
      <HowItWorks />
      
      {/* Testimonials */}
      <Testimonials />
      
      {/* FAQ Section */}
      <HomeFAQ />
      
      {/* CTA Section */}
      <section className="py-20 bg-background-light">
        <div className="container-custom">
          <div className="card bg-gradient-to-r from-background to-background-light border-primary/30">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Creative Projects?</h2>
              <p className="text-lg text-gray-300 mb-8">
                Join thousands of clients and creatives already using SolHire to bring their visions to life.
              </p>
              <Link href="/register" className="btn btn-primary px-8 py-3 text-lg">
                Get Started Today
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
} 