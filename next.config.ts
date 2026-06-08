// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Allow images from common archery venue domains in future
  // For now we use no external images — placeholder avatars only
  images: {
    remotePatterns: [],
  },

  // Strict mode helps catch React issues early
  reactStrictMode: true,
};

export default nextConfig;
