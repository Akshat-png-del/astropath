export interface GuideSection {
  heading?: string;
  paragraphs: string[];
}

export interface GuideArticle {
  slug: string;
  title: string;
  description: string;
  updatedAt: string;
  readMinutes: number;
  sections: GuideSection[];
}

export function guideWordCount(guide: GuideArticle): number {
  return guide.sections.reduce(
    (sum, s) => sum + s.paragraphs.join(" ").split(/\s+/).filter(Boolean).length,
    0
  );
}
