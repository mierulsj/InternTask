import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/tumbuhan",
        destination: "/aktiviti/tumbuhan",
        permanent: true,
      },
      {
        source: "/aktiviti/sifir",
        destination: "/pertandingan/sifir",
        permanent: true,
      },
      {
        source: "/aktiviti/spelling-bee",
        destination: "/pertandingan/spelling-bee",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
