const withOptimizedImages = require('next-optimized-images');

module.exports = withOptimizedImages({
  reactStrictMode: true,
  webpack5: true,
  strictPostcssConfiguration: true,
  images: {
    domains: [
      'pbs.twimg.com' // Twitter Profile Picture
    ]
  },
  webpack: (config, {
    dev,
    isServer
  }) => {
    // if (isServer) {
    //   require('./scripts/generate-sitemap.mjs');
    //   require('./scripts/generate-rss');
    // }
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      Object.assign(config.resolve.alias, {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat'
      });
    }
    return config;
  }
});