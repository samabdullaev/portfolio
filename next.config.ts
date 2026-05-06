import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Custom loader routes Sanity-CDN images through Sanity's own image
    // transform API and passes through external URLs (YouTube/Vimeo
    // preview frames) unchanged. See src/lib/sanity-image-loader.ts.
    loader: "custom",
    loaderFile: "./src/lib/sanity-image-loader.ts",
  },
};

export default nextConfig;
