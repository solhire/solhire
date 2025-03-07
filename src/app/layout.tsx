import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { Providers } from './providers'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata = {
  title: 'SolHire - Connect with Top Web3 Talent',
  description: 'Find and hire the best Web3 talent or get hired for Web3 projects.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`min-h-screen bg-background ${inter.className}`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
} 