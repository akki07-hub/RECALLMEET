import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath: '/RECALLMEET',
  assetPrefix: '/RECALLMEET/',
};

export default nextConfig;
