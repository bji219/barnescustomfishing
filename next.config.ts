import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for simple Vercel deployment
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
