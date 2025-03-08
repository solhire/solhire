/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'res.cloudinary.com', 'solhire.net'],
  },
  // Skip type checking during build
  typescript: {
    ignoreBuildErrors: true,
  },
  // Skip ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Configure server components
  serverExternalPackages: ['@prisma/client'],
  // Disable static generation for client components
  staticPageGenerationTimeout: 300,
  // Domain configuration
  async redirects() {
    return [
      // Redirect HTTP to HTTPS
      {
        source: '/:path*',
        has: [
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: 'http',
          },
        ],
        destination: 'https://:host/:path*',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ];
  },
  webpack: (config) => {
    config.resolve.fallback = { 
      fs: false, 
      path: false, 
      os: false,
      net: false,
      tls: false,
      'rpc-websockets/dist/lib/client': require.resolve('rpc-websockets'),
      'rpc-websockets': require.resolve('rpc-websockets'),
    };
    
    // Add alias for browser-specific version
    config.resolve.alias = {
      ...config.resolve.alias,
      '@solana/web3.js': require.resolve('@solana/web3.js'),
    };
    
    return config;
  },
};

module.exports = nextConfig; 