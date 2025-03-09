'use client';

import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { Providers } from './providers'
import { useState, useEffect } from 'react'
import PasswordProtection from '@/components/auth/PasswordProtection'
import { ThemeProvider } from '@/components/theme/theme-provider'

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
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className={`min-h-screen bg-background font-sans antialiased ${inter.className}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Providers>
            {!isUnlocked && <PasswordProtection onUnlock={handleUnlock} />}
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
} 