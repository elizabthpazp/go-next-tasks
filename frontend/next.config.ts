import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   experimental: {
    turbo: true,
  }, 
  turbopack: {
    root: __dirname,
  }, 
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;
