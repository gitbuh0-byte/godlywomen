import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    domains: ["localhost", "cdn.example.com"],
    unoptimized: process.env.NODE_ENV === "development",
  },
  env: {
    NEXT_PUBLIC_BACKEND_API: process.env.NEXT_PUBLIC_BACKEND_API || "http://localhost:8000",
  },
  outputFileTracingRoot: path.join(__dirname, ".."),
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: /(^|[\\/])(?:node_modules|\.git|\.next|pagefile\.sys|hiberfil\.sys|swapfile\.sys|DumpStack\.log\.tmp|System Volume Information)(?:[\\/]|$)/i,
      };
    }
    return config;
  },
};

export default nextConfig;
