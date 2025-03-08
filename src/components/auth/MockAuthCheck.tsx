'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useMockAuth } from '@/context/MockAuthContext';

export default function MockAuthCheck({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useMockAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !user && !pathname.includes('/mock-login')) {
      router.push('/mock-login');
    }
  }, [user, isLoading, router, pathname]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return children;
} 