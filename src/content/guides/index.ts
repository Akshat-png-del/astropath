/** @deprecated Use @/content/education — kept for sitemap backward compatibility */
import { EDUCATION_ARTICLES, getArticleBySlug } from "@/content/education";
import type { GuideArticle } from "./types";

export const GUIDES: GuideArticle[] = EDUCATION_ARTICLES.map((a) => ({
  slug: a.slug,
  title: a.title,
  description: a.description,
  updatedAt: a.updatedAt,
  readMinutes: Math.ceil(
    a.sections.reduce(
      (sum, s) => sum + s.paragraphs.join(" ").split(/\s+/).filter(Boolean).length,
      0
    ) / 200
  ),
  sections: a.sections.map((s) => ({
    heading: s.heading,
    paragraphs: s.paragraphs,
  })),
}));

export function getGuideBySlug(slug: string): GuideArticle | undefined {
  const article = getArticleBySlug(slug);
  if (!article) return undefined;
  return GUIDES.find((g) => g.slug === slug);
}

export type { GuideArticle, GuideSection } from "./types";
export { guideWordCount } from "./types";
