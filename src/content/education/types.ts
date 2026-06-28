export type EducationCategoryId =
  | "astrology-basics"
  | "zodiac-signs"
  | "birth-charts"
  | "planets"
  | "houses"
  | "aspects"
  | "tarot"
  | "compatibility";

export interface EducationSection {
  id: string;
  heading: string;
  paragraphs: string[];
  example?: string;
}

export interface EducationFAQ {
  question: string;
  answer: string;
}

export interface EducationAuthor {
  name: string;
  role: string;
}

export interface EducationArticle {
  slug: string;
  title: string;
  description: string;
  category: EducationCategoryId;
  updatedAt: string;
  publishedAt: string;
  author: EducationAuthor;
  sections: EducationSection[];
  faq: EducationFAQ[];
  relatedSlugs: string[];
  keywords?: string[];
}

export function articleWordCount(article: EducationArticle): number {
  return article.sections.reduce((sum, section) => {
    const body = section.paragraphs.join(" ") + (section.example ?? "");
    return sum + body.split(/\s+/).filter(Boolean).length;
  }, 0);
}

export function articleReadMinutes(article: EducationArticle): number {
  return Math.max(5, Math.ceil(articleWordCount(article) / 200));
}
