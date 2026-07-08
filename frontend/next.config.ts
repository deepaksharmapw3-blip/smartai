import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Expose NEXT_PUBLIC_API_URL to the browser bundle.
  // Set it in .env.local for local dev, or via Docker environment for production.
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000",
  },
};

export default nextConfig;
