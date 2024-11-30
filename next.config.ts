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
      {
        protocol: "https",
        hostname: "digitalasset.intuit.com",
        port: "",
        pathname: "/render/content/dam/**",
      },
      // Mailchimp'in kullandığı diğer domainler için
      {
        protocol: "https",
        hostname: "*.mailchimp.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "flagcdn.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
