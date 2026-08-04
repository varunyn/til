import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  bundlePagesRouterDependencies: true,
  experimental: {
    mdxRs: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "pbs.twimg.com",
        pathname: "/**",
        protocol: "https",
      },
      {
        hostname: "abs.twimg.com",
        pathname: "/**",
        protocol: "https",
      },
    ],
    unoptimized: true,
  },
  output: "export",
  reactStrictMode: true,
  transpilePackages: ["react-tweet"],
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
