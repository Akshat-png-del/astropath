import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticleBySlug, EDUCATION_ARTICLES } from "@/content/education";
import { EducationArticlePage } from "@/components/education/EducationArticlePage";
import { pageMetadata } from "@/lib/brand";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return EDUCATION_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return pageMetadata("Article Not Found", "Article not found.", "/blog");
  return pageMetadata(article.title, article.description, `/blog/${article.slug}`);
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <EducationArticlePage
      article={article}
      backHref="/blog"
      backLabel="Blog"
      canonicalPath={`/blog/${article.slug}`}
    />
  );
}
