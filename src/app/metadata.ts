import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SolHire - Connect with Top Web3 Talent',
  description: 'Find and hire the best Web3 talent or get hired for Web3 projects.',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#8B5CF6', // primary color
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/favicon/safari-pinned-tab.svg',
        color: '#8B5CF6',
      },
    ],
  },
  manifest: '/favicon/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://solhire.net',
    siteName: 'SolHire',
    title: 'SolHire - Connect with Top Web3 Talent',
    description: 'Find and hire the best Web3 talent or get hired for Web3 projects.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SolHire',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SolHire - Connect with Top Web3 Talent',
    description: 'Find and hire the best Web3 talent or get hired for Web3 projects.',
    images: ['/og-image.jpg'],
    creator: '@solhire',
  },
}; 