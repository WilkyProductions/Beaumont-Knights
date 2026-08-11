import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Sanity Studio (embedded at /studio) throws a dev-only console error
  // under React Strict Mode's double-render check — a third-party library
  // quirk, not our code. Strict Mode has no effect on production builds
  // either way, so disabling it is a safe fix, not a real tradeoff here.
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
