import type { MetadataRoute } from "next";
import { capabilities, industries, insights, solutions } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://progience.com";
  const staticPaths = ["", "/solutions", "/capabilities", "/industries", "/gcc", "/insights", "/case-studies", "/about", "/about/why-progience", "/about/enterprise-readiness", "/careers", "/contact", "/privacy", "/cookie-policy", "/terms", "/accessibility", "/security"];
  const paths = [
    ...staticPaths,
    ...solutions.map(({ slug }) => `/solutions/${slug}`),
    ...capabilities.map(({ slug }) => `/capabilities/${slug}`),
    ...industries.map(({ slug }) => `/industries/${slug}`),
    ...insights.map(({ slug, category }) => `/insights/${category}/${slug}`),
  ];
  return paths.map((path) => ({ url: `${base}${path}`, lastModified: new Date(), changeFrequency: path === "" ? "weekly" : "monthly", priority: path === "" ? 1 : path.split("/").filter(Boolean).length === 1 ? 0.8 : 0.6 }));
}
