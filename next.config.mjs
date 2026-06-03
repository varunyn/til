import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  output: "export",
  reactStrictMode: true,
  turbopack: {
    root: __dirname,
  },
  transpilePackages: ["react-tweet"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "abs.twimg.com",
        pathname: "/**",
      },
    ],
    unoptimized: true,
  },
  experimental: {
    mdxRs: true,
    viewTransition: true,
  },
  bundlePagesRouterDependencies: true,
};

export default nextConfig;
