export type PillarHub = "zodiac" | "planets" | "houses" | "tarot";

export interface PillarSection {
  id: string;
  heading: string;
  paragraphs: string[];
  example?: string;
}

export interface PillarFAQ {
  question: string;
  answer: string;
}

export interface PillarLink {
  href: string;
  title: string;
  hub: PillarHub | "learn";
  readMinutes?: number;
}

export interface PillarArticle {
  hub: PillarHub;
  slug: string;
  title: string;
  description: string;
  updatedAt: string;
  publishedAt: string;
  keywords?: string[];
  sections: PillarSection[];
  faq: PillarFAQ[];
  /** Manual related links; auto-links merged at render time */
  relatedLinks?: PillarLink[];
}

export function pillarWordCount(article: PillarArticle): number {
  const sectionWords = article.sections.reduce((sum, section) => {
    const body = section.paragraphs.join(" ") + (section.example ?? "");
    return sum + body.split(/\s+/).filter(Boolean).length;
  }, 0);
  const faqWords = article.faq.reduce(
    (sum, item) => sum + (item.question + " " + item.answer).split(/\s+/).filter(Boolean).length,
    0
  );
  return sectionWords + faqWords;
}

export function pillarReadMinutes(article: PillarArticle): number {
  return Math.max(5, Math.ceil(pillarWordCount(article) / 200));
}

export function pillarPath(hub: PillarHub, slug: string): string {
  if (hub === "tarot") return `/tarot/${slug}`;
  return `/${hub}/${slug}`;
}
