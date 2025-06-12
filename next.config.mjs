const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    domains: ['pbs.twimg.com'],
    unoptimized: true
  },
  webpack: (config, { dev, isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react/jsx-runtime.js': import.meta.resolve('react/jsx-runtime')
    };
    config.resolve.alias.react = 'preact/compat';
    config.resolve.alias['react-dom/test-utils'] = 'preact/test-utils';
    config.resolve.alias['react-dom'] = 'preact/compat';

    return config;
  },
  experimental: {
    mdxRs: true
  }
};

export default nextConfig;
