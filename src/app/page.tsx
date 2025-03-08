import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import FeaturedCreatives from '@/components/home/FeaturedCreatives';
import PopularServices from '@/components/home/PopularServices';
import HowItWorks from '@/components/home/HowItWorks';
import Testimonials from '@/components/home/Testimonials';

export const metadata: Metadata = {
  title: 'SolHire | Home',
  description: 'Find and hire top creative professionals and pay with Solana cryptocurrency',
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
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-white">Hire Top Creatives with </span>
                <span className="bg-gradient-to-br from-purple-400 to-purple-900 text-transparent bg-clip-text [text-shadow:0_0_25px_rgba(168,85,247,0.4)]">Solana</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8">
                Connect with skilled video editors, graphic designers, and other creative professionals. Pay securely with Solana cryptocurrency.
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
            </div>
            
            {/* Hero Image */}
            <div className="relative h-[500px] w-full rounded-2xl overflow-hidden border border-primary/30">
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
      
      {/* Featured Sections */}
      <PopularServices />
      <FeaturedCreatives />
      <HowItWorks />
      <Testimonials />
      
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