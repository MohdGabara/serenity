import type { MetadataRoute } from "next";
import { experiences } from "@/lib/catalog";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return ["en", "de", "ar"].flatMap(locale => [
    { url: `${base}/${locale}`, lastModified: new Date() },
    ...experiences.map(experience => ({ url: `${base}/${locale}/experiences/${experience.slug}`, lastModified: new Date() })),
  ]);
}
