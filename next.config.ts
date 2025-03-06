import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: {
    appIsrStatus: false,
    buildActivity: true,
  },
  output: 'standalone',
};

export default nextConfig;
