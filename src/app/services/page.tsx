import PopularServices from '@/components/home/PopularServices';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function Services() {
  return (
    <main className="min-h-screen">
      <Header />
      <section className="py-20 bg-background-light">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-lg text-gray-300 mb-8">
            Discover a wide range of services offered by top creative professionals.
          </p>
          <PopularServices />
        </div>
      </section>
      <Footer />
    </main>
  );
} 