'use client';

import { Providers } from './providers';
import { PasswordProtection } from '@/components/PasswordProtection';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <PasswordProtection>
        {children}
      </PasswordProtection>
    </Providers>
  );
} 