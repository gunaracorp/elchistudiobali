import type { MetadataRoute } from "next";
import { CLASSES } from "@/lib/classes-data";
import { ARTICLES } from "@/lib/blog";
import { LOCALES, ROUTES, SITE_URL, langPath } from "@/lib/seo";

/**
 * XML sitemap — every SEO route (×6 class pages) with trilingual
 * hreflang alternates. English URLs are the clean canonical form.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    ...ROUTES.map((r) => r.path),
    ...CLASSES.map((c) => `/classes/${c.slug}`),
    ...ARTICLES.map((a) => `/blog/${a.slug}`),
  ];
  return paths.map((path) => ({
    url: `${SITE_URL}${langPath(path, "en")}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.8,
    alternates: {
      languages: Object.fromEntries(
        LOCALES.map((l) => [l, `${SITE_URL}${langPath(path, l)}`])
      ),
    },
  }));
}
