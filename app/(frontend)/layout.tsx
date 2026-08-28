import type { Metadata } from "next";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/ibm-plex-mono/500.css";
import "lenis/dist/lenis.css";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MotionController } from "@/components/motion-controller";
import { SiteLoader } from "@/components/site-loader";
import { SiteCursor } from "@/components/site-cursor";
import { CinematicScroll } from "@/components/cinematic-scroll";

export const metadata: Metadata = {
  title: {
    default: "Progience | Build. Scale. Evolve Technology Capability.",
    template: "%s | Progience",
  },
  description:
    "Progience connects technology talent, engineering, quality, trust and operations around the outcomes organisations need to move forward.",
  icons: {
    icon: [
      { url: "/assets/brand/progience-favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/brand/progience-favicon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/assets/brand/progience-favicon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/assets/brand/progience-favicon-32.png",
    apple: [{ url: "/assets/brand/progience-apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://progience.com"),
  alternates: { canonical: "/" },
  robots:
    process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production"
      ? { index: false, follow: false }
      : { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "Progience",
    title: "Progience | Build. Scale. Evolve Technology Capability.",
    description: "Connected technology capability built around the outcomes organisations need to move forward.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Progience. Build. Scale. Evolve Technology Capability." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Progience | Build. Scale. Evolve Technology Capability.",
    description: "Connected technology capability built around the outcomes organisations need to move forward.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "Organization", "@id": "https://progience.com/#organization", name: "Progience", url: "https://progience.com", logo: "https://progience.com/assets/brand/progience-logo-primary.png", description: "A Technology Capability Partner connecting people, engineering, quality, trust and operations around customer outcomes." },
            { "@type": "WebSite", "@id": "https://progience.com/#website", url: "https://progience.com", name: "Progience", publisher: { "@id": "https://progience.com/#organization" }, inLanguage: "en" },
          ],
        }).replace(/</g, "\\u003c") }} />
        <SiteLoader />
        <SiteCursor />
        <CinematicScroll />
        <SiteHeader />
        <MotionController />
        <div id="main-content">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
