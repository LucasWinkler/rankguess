if (!process.env.NEXTAUTH_URL) throw new Error('Please set NEXTAUTH_URL');
if (!process.env.NEXTAUTH_SECRET) throw new Error('Please set NEXTAUTH_SECRET');
if (!process.env.DATABASE_URL) throw new Error('Please set DATABASE_URL');
if (!process.env.GOOGLE_CLIENT_ID)
  throw new Error('Please set GOOGLE_CLIENT_ID');
if (!process.env.GOOGLE_CLIENT_SECRET)
  throw new Error('Please set GOOGLE_CLIENT_SECRET');

const { withPlaiceholder } = require('@plaiceholder/next');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    deviceSizes: [420, 768, 1024, 1280, 1536],
    imageSizes: [25, 33, 50, 100],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.rankguess.com',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
};

module.exports = withPlaiceholder(nextConfig);
