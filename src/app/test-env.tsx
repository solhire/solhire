'use client';

export default function TestEnv() {
  return (
    <div>
      <p>Clerk Key Available: {process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? 'Yes' : 'No'}</p>
      <p>Key value: {process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}</p>
    </div>
  );
} 