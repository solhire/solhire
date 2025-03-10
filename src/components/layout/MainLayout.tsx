'use client';

import Header from './Header';
import Footer from './Footer';
import DevelopmentBanner from './DevelopmentBanner';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <DevelopmentBanner />
      <Header />
      <main className="flex-1 pt-16 sm:pt-24 md:pt-28">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout; 