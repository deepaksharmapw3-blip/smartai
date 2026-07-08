import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for the Docker standalone build (copies server.js + minimal deps)
  output: "standalone",

  // Expose NEXT_PUBLIC_API_URL to the browser bundle.
  // Set it in .env.local for local dev, or via hosting env vars for production.
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000",
  },
};

export default nextConfig;
