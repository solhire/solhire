import type { Metadata } from 'next';
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import ClientLayout from './client-layout'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'SolHire',
  description: 'Find and hire top creative professionals and pay with SOL cryptocurrency',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`min-h-screen bg-black font-sans antialiased ${inter.className}`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
} 