import remarkToc from 'remark-toc';
import remarkAutolinkHeadings from 'remark-autolink-headings';
import withMDX from '@next/mdx';

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'pbs.twimg.com' // Twitter Profile Picture
    ]
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
    mdxRs: true,
  },
};

// MDX configuration
const withMDXConfig = withMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkToc, [remarkAutolinkHeadings, {}]],
    rehypePlugins: [],
  },
});

// Merge MDX config with nextConfig
export default withMDXConfig(nextConfig);
