/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    deviceSizes: [420, 768, 1024, 1280, 1536],
    imageSizes: [25, 33, 50, 100],
  },
};

module.exports = nextConfig;
