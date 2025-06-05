const withOptimizedImages = require('next-optimized-images');
const withPlugins = require('next-compose-plugins');

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['next-optimized-images'],
  output: 'export',
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
  // Handle image optimization for next-optimized-images
  optimizePackageImports: ['react-icons'],
  // Enable optimization for external packages
  bundlePagesRouterDependencies: true
};

module.exports = withPlugins(
  [
    [
      withOptimizedImages,
      {
        // next-optimized-images options
        handleImages: ['jpeg', 'png', 'svg', 'webp', 'gif'],
        optimizeImages: true,
        optimizeImagesInDev: false,
        mozjpeg: {
          quality: 80
        },
        optipng: {
          optimizationLevel: 3
        },
        pngquant: false,
        gifsicle: {
          interlaced: true,
          optimizationLevel: 3
        },
        svgo: {
          // enable/disable svgo plugins here
        },
        webp: {
          preset: 'default',
          quality: 75
        }
      }
    ]
  ],
  nextConfig
);
