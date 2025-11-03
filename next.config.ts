import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        // Remove port if it's empty, or specify if needed
        pathname: "/**",
      }
    ]
  }
};

export default nextConfig;