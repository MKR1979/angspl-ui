import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8887',
        pathname: '/uploads/**'
      },
      {
        protocol: 'https',
        hostname: 'Adhyayan NextGen Solution Pvt. Ltd.-server.onrender.com',
        port: '',
        pathname: '/uploads/**'
      }
    ]
  }
};

export default nextConfig;
