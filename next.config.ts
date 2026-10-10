import type { NextConfig } from "next";

// Static export: `npm run build` writes a plain HTML site to out/, so it can be
// hosted anywhere the old index.html was.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
