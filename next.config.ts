import type { NextConfig } from "next";

const isGithubPagesBuild = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isGithubPagesBuild ? "/stage-two" : "",
  assetPrefix: isGithubPagesBuild ? "/stage-two" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
