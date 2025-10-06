import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true,
  },

  webpack: (config, { nextRuntime }) => {
    if (nextRuntime === "nodejs") {
      config.resolve.alias.canvas = false;
    }
    return config;
  },
};

export default nextConfig;
