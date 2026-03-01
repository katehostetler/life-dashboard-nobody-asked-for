import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "epic.gsfc.nasa.gov",
      },
    ],
  },
};

export default nextConfig;
