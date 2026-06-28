import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticleBySlug, EDUCATION_ARTICLES } from "@/content/education";
import { EducationArticlePage } from "@/components/education/EducationArticlePage";
import { pageMetadata } from "@/lib/brand";

interface GuidePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return EDUCATION_ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return pageMetadata("Guide Not Found", "Guide not found.", "/guides");
  return pageMetadata(article.title, article.description, `/guides/${article.slug}`);
}

export default async function GuideArticlePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <EducationArticlePage
      article={article}
      backHref="/learn"
      backLabel="All guides"
      canonicalPath={`/guides/${article.slug}`}
    />
  );
}
