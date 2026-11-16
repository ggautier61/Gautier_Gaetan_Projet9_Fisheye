import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.GITHUB_PAGES
    ? "/Gautier_Gaetan_Projet9_Fisheye"
    : "",
  images: {
    unoptimized: true,
  },
};


export default nextConfig;
