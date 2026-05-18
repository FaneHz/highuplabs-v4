import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Static export doesn't support API routes, but we keep the config
  // for development and future serverless deployment
};

export default nextConfig;
