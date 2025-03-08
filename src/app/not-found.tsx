'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiHome, FiSearch, FiArrowLeft } from 'react-icons/fi';
import MainLayout from '@/components/layout/MainLayout';

export default function NotFound() {
  return (
    <MainLayout>
      <div className="container-custom pt-24 pb-12">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">404 - Page Not Found</h1>
          <p className="text-lg text-gray-300 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/" className="btn btn-primary">
              Return Home
            </Link>
            <Link href="/contact" className="btn btn-outline">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 