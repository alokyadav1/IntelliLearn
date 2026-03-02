import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      // ── Legacy route redirects (permanent 308) ─────────────────────────────
      {
        source: "/prerequisites",
        destination: "/courses/ai-agents/prerequisites",
        permanent: true,
      },
      {
        source: "/prerequisites/:topicId",
        destination: "/courses/ai-agents/prerequisites/:topicId",
        permanent: true,
      },
      {
        source: "/building-ai-agents",
        destination: "/courses/ai-agents/building-ai-agents",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
