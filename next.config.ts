import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_BEHOLD_FEED_ID: "KrsfO6srvNtLlVZ3S9jf",
  },
};

export default nextConfig;
