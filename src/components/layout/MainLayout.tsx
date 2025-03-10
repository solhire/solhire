'use client';

import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import PasswordProtection from '../auth/PasswordProtection';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <PasswordProtection>
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </PasswordProtection>
  );
} 