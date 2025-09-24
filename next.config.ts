import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    mdxRs: true,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
};

export default nextConfig;
