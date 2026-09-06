import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Empêche Turbopack de scanner tout le disque au-dessus de C:\dev\zap
  turbopack: {
    root: projectRoot,
  },
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
  serverExternalPackages: [
    "@react-pdf/renderer",
    "three",
    "@react-three/fiber",
    "@react-three/drei",
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
