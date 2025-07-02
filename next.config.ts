import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.node$/,
      use: "raw-loader",
    });
    return config;
  },
};

export default nextConfig;
