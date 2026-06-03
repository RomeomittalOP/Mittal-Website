import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  eslint: {
    // Don't let a stray lint rule fail the production/Vercel build.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
