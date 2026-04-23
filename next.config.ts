import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "/stage-two",
  assetPrefix: "/stage-two",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
