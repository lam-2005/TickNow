import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ticknow-be.onrender.com",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
