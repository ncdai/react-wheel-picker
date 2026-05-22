import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["next-mdx-remote"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "unavatar.io",
        port: "",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/docs/:slug.mdx",
        destination: "/docs.mdx/:slug",
      },
    ];
  },
};

export default nextConfig;
