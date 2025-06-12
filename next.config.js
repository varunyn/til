/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  experimental: {
    viewTransition: true
  },
  images: {
    domains: [
      'pbs.twimg.com' // Twitter Profile Picture
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
        pathname: '/**'
      }
    ],
    unoptimized: true // For static export with Next.js 15
  },
  // Enable optimization for external packages
  bundlePagesRouterDependencies: true
};

module.exports = nextConfig;
