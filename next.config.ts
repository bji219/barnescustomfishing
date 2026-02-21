import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for simple Vercel deployment
  output: "export",
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BEHOLD_FEED_ID: "KrsfO6srvNtLlVZ3S9jf",
  },
};

export default nextConfig;
