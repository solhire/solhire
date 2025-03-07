/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'res.cloudinary.com'],
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