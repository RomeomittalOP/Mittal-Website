import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // three.js ships ESM that some bundlers choke on during CI/Vercel builds.
  transpilePackages: ["three"],
  eslint: {
    // Don't let a stray lint rule fail the production/Vercel build.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
