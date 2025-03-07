import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function ProfileNotFound() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="container-custom pt-24 pb-12">
        <div className="card text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Profile Not Found</h1>
          <p className="text-gray-400 mb-8">
            The profile you're looking for doesn't exist or has been removed.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/" className="btn btn-primary">
              Return Home
            </Link>
            <Link href="/register" className="btn btn-outline">
              Create Account
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
} 