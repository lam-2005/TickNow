import env from "@/configs/environment";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: `${env.HOSTNAME}`,
        port: env.PORT,
        pathname: "/images/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
