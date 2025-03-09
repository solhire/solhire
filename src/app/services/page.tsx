import { Suspense } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ServiceGrid from '@/components/ServiceGrid';
import ServiceFilters from '@/components/ServiceFilters';
import { Skeleton } from '@/components/ui/skeleton';

export const metadata = {
  title: 'Services - Find Expert Freelancers',
  description: 'Browse and hire talented freelancers offering professional services across various categories.',
};

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Services</h1>
          <p className="text-gray-600 mt-2">
            Find and hire talented freelancers for your projects
          </p>
        </div>
        <Link href="/services/create">
          <Button>Create Service</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <Suspense fallback={<Skeleton className="h-[400px]" />}>
            <ServiceFilters />
          </Suspense>
        </aside>

        <main className="lg:col-span-3">
          <Suspense fallback={<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array(6).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-[300px]" />
            ))}
          </div>}>
            <ServiceGrid />
          </Suspense>
        </main>
      </div>
    </div>
  );
} 