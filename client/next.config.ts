import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1001",
        pathname: "/images/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
