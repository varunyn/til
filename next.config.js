/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  transpilePackages: ['react-tweet'],
  experimental: {
    viewTransition: true
  },
  images: {
    domains: [
      'pbs.twimg.com', // Twitter Profile Picture
      'abs.twimg.com' // Twitter Media
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'abs.twimg.com',
        pathname: '/**'
      }
    ],
    unoptimized: true // For static export with Next.js 15
  },
  // Enable optimization for external packages
  bundlePagesRouterDependencies: true
};

module.exports = nextConfig;
