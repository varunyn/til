const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  transpilePackages: ['react-tweet'],
  images: {
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
    unoptimized: true
  },
  experimental: {
    mdxRs: true,
    viewTransition: true
  },
  bundlePagesRouterDependencies: true
};

export default nextConfig;
