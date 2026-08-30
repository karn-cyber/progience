import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  experimental: { serverActions: { bodySizeLimit: "2mb" } },
  async redirects() {
    return [{ source: "/why-progience", destination: "/about/why-progience", permanent: true }];
  },
  async headers() {
    // React dev mode uses eval() for debugging features; only relax script-src in development.
    const scriptSrc = `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV !== "production" ? " 'unsafe-eval'" : ""} https://challenges.cloudflare.com`;
    const csp = ["default-src 'self'", scriptSrc, "style-src 'self' 'unsafe-inline'", "img-src 'self' data: blob:", "font-src 'self' data:", "connect-src 'self' https://challenges.cloudflare.com", "frame-src https://challenges.cloudflare.com", "form-action 'self'", "frame-ancestors 'none'", "base-uri 'self'", "object-src 'none'", "upgrade-insecure-requests"].join("; ");
    return [{ source: "/(.*)", headers: [
      { key: "Content-Security-Policy", value: csp },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
      { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
    ] }];
  },
};

export default withPayload(nextConfig);
