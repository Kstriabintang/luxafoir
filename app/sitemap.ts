import type { MetadataRoute } from "next";
import { PRODUCTS, CATEGORIES, COLLECTIONS } from "@/lib/mock-data";
import { JOURNAL_ARTICLES } from "@/lib/journal-data";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://luxafoir.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    "",
    "/shop",
    "/shop/sale",
    "/collections",
    "/journal",
    "/about",
    "/contact",
    "/faq",
    "/shipping",
    "/returns",
    "/size-guide",
    "/privacy-policy",
    "/terms",
  ].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const products = PRODUCTS.map((p) => ({
    url: `${BASE}/product/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const categories = CATEGORIES.map((c) => ({
    url: `${BASE}/shop/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const collections = COLLECTIONS.map((c) => ({
    url: `${BASE}/collections/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const journal = JOURNAL_ARTICLES.map((a) => ({
    url: `${BASE}/journal/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...products, ...categories, ...collections, ...journal];
}
