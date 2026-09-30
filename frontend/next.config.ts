import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    formats: ["image/avif", "image/webp"], // browser dapat WebP/AVIF jika didukung
  },
};

export default nextConfig;
