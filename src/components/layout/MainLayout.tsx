'use client';

import Header from './Header';
import Footer from './Footer';
import DevelopmentBanner from './DevelopmentBanner';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <DevelopmentBanner />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout; 