import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.GITHUB_PAGES
    ? "/Gautier_Gaetan_Projet9_Fisheye"
    : "",
  images: {
    unoptimized: true,
  },
  serverExternalPackages: [
    "@prisma/adapter-better-sqlite3",
    "better-sqlite3",
  ],
};


export default nextConfig;
