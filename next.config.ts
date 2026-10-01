import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/tumbuhan",
        destination: "/aktiviti/tumbuhan",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
