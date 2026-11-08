import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  async rewrites() {
    return [
      {
        source: "/demos/margin-press",
        destination: "/demos/margin-press/index.html",
      },
      {
        source: "/demos/margin-press/",
        destination: "/demos/margin-press/index.html",
      },
    ];
  },
};

export default nextConfig;
