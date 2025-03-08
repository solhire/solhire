'use client';

import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { Providers } from './providers'
import { useState, useEffect } from 'react'
import PasswordProtection from '@/components/auth/PasswordProtection'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isUnlocked, setIsUnlocked] = useState(true) // Start with true to prevent flash

  useEffect(() => {
    // Check if site is unlocked in localStorage
    const unlocked = localStorage.getItem('site_unlocked') === 'true'
    setIsUnlocked(unlocked)
  }, [])

  const handleUnlock = () => {
    setIsUnlocked(true)
  }

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <title>SolHire - Connect with Top Web3 Talent</title>
        <meta name="description" content="Find and hire the best Web3 talent or get hired for Web3 projects." />
      </head>
      <body className={`min-h-screen bg-background ${inter.className}`}>
        <Providers>
          {!isUnlocked && <PasswordProtection onUnlock={handleUnlock} />}
          {children}
        </Providers>
      </body>
    </html>
  )
} 