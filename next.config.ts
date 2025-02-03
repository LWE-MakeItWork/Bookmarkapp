import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ["www.w3schools.com", "www.javatpoint.com"],
  },
};

export default nextConfig;
