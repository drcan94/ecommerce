import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.seekpng.com",
        port: "",
        pathname: "/png/**",
      },
      {
        protocol: "https",
        hostname: "www.pngarts.com",
        port: "",
        pathname: "/files/**",
      },
    ],
  },
};

export default nextConfig;
