import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.yelpcdn.com",
      },
    ],
  },
};

export default nextConfig;
