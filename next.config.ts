import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    HF: process.env.API_KEY,
  },
};

export default nextConfig;
