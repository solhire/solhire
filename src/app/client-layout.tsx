'use client';

import PasswordProtection from '@/components/auth/PasswordProtection';
import { Providers } from './providers';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <PasswordProtection>
      <Providers>{children}</Providers>
    </PasswordProtection>
  );
} 