import type { NextConfig } from "next";

/** Canonical production origin — the vercel.app alias redirects here (ROADMAP Langkah 2). */
const CANONICAL = "https://www.elchistudio.web.id";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    // next/image serves AVIF first with WebP fallback (ROADMAP Langkah 1)
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        // Consolidate SEO on one domain: only the production vercel.app
        // alias redirects; preview deployments are untouched.
        source: "/:path*",
        has: [{ type: "host", value: "elchistudio.vercel.app" }],
        destination: `${CANONICAL}/:path*`,
        permanent: true,
      },
    ];
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
