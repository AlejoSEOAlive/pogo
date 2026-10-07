import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Menos variantes = srcset más corto = HTML más liviano
    deviceSizes: [640, 828, 1080, 1440, 1920],
    imageSizes: [320],
    remotePatterns: [
      new URL("https://www.pogo.com/static/**"),
      new URL("https://content.pogo.com/**"),
    ],
  },
  // Sitio de staging/réplica: nunca indexable
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }],
      },
    ];
  },
};

export default nextConfig;
