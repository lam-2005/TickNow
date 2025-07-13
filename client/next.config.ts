import env from "@/configs/environment";
import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";
const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

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

export default withAnalyzer(nextConfig);
