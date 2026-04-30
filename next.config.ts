import withPWA from "next-pwa";
import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  experimental: {},
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ofkuuwrztpqjgfsqzvwa.supabase.co",
      },
      {
        protocol: "https",
        hostname: "url.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/sw.js",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
    ];
  },
};

// Оборачиваем только в продакшене
const withPWAConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: isDev, // 💥 отключает PWA в dev
});

export default withNextIntl(withPWAConfig(nextConfig));
