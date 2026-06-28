import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/brand";
import { EDUCATION_ARTICLES } from "@/content/education";
import { PUBLIC_ROUTES, EDUCATION_CATEGORY_ROUTES } from "@/lib/site-routes";
import { ZODIAC_PILLARS } from "@/content/pillars/zodiac";
import { PLANET_PILLARS } from "@/content/pillars/planets";
import { HOUSE_PILLARS } from "@/content/pillars/houses";
import { TAROT_PILLARS } from "@/content/pillars/tarot";
import { pillarPath } from "@/content/pillars/types";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = PUBLIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const pillarEntries = (
    hub: "zodiac" | "planets" | "houses" | "tarot",
    articles: { slug: string; updatedAt: string }[],
    priority: number
  ): MetadataRoute.Sitemap =>
    articles.map((article) => ({
      url: `${SITE_URL}${pillarPath(hub, article.slug)}`,
      lastModified: new Date(article.updatedAt),
      changeFrequency: "monthly" as const,
      priority,
    }));

  const extraStatic: MetadataRoute.Sitemap = [
    { path: "/tarot/reading", priority: 0.85 },
  ].map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority,
  }));

  const categoryEntries: MetadataRoute.Sitemap = EDUCATION_CATEGORY_ROUTES.map((cat) => ({
    url: `${SITE_URL}/learn/category/${cat}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.88,
  }));

  const learnEntries: MetadataRoute.Sitemap = EDUCATION_ARTICLES.map((article) => ({
    url: `${SITE_URL}/learn/${article.slug}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const blogEntries: MetadataRoute.Sitemap = EDUCATION_ARTICLES.map((article) => ({
    url: `${SITE_URL}/blog/${article.slug}`,
    lastModified: new Date(article.publishedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const legacyGuideEntries: MetadataRoute.Sitemap = EDUCATION_ARTICLES.map((article) => ({
    url: `${SITE_URL}/guides/${article.slug}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [
    ...staticEntries,
    ...extraStatic,
    ...pillarEntries("zodiac", ZODIAC_PILLARS, 0.82),
    ...pillarEntries("planets", PLANET_PILLARS, 0.8),
    ...pillarEntries("houses", HOUSE_PILLARS, 0.8),
    ...pillarEntries("tarot", TAROT_PILLARS, 0.78),
    ...categoryEntries,
    ...learnEntries,
    ...blogEntries,
    ...legacyGuideEntries,
  ];
}
