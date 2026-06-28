import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { EducationArticle } from "@/content/education/types";
import { getArticlesBySlugs } from "@/content/education";
import { ArticleHero } from "./ArticleHero";
import { TableOfContents } from "./TableOfContents";
import { AuthorBlock } from "./AuthorBlock";
import { ArticleBody } from "./ArticleBody";
import { ArticleFAQ } from "./ArticleFAQ";
import { RelatedArticles } from "./RelatedArticles";
import { AppNav } from "@/components/layout/AppNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/structured-data";
import { FavoriteButton } from "@/components/retention/FavoriteButton";
import { GuideReadTracker } from "@/components/retention/RetentionTrackers";

interface EducationArticlePageProps {
  article: EducationArticle;
  backHref: string;
  backLabel: string;
  canonicalPath: string;
}

export function EducationArticlePage({
  article,
  backHref,
  backLabel,
  canonicalPath,
}: EducationArticlePageProps) {
  const related = getArticlesBySlugs(article.relatedSlugs);
  const sectionLabel = backHref === "/blog" ? "Blog" : "Learn";

  return (
    <>
      <GuideReadTracker slug={article.slug} topics={[article.category]} />
      <JsonLdScript
        data={[
          articleJsonLd({
            title: article.title,
            description: article.description,
            url: canonicalPath,
            datePublished: article.publishedAt,
            dateModified: article.updatedAt,
          }),
          breadcrumbJsonLd([
            { name: "Home", url: "/" },
            { name: sectionLabel, url: backHref },
            { name: article.title, url: canonicalPath },
          ]),
          ...(article.faq.length ? [faqJsonLd(article.faq)] : []),
        ]}
      />
      <AppNav />
      <main className="relative z-10 flex-1 px-4 sm:px-6 py-10 sm:py-14 max-w-3xl mx-auto w-full">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-silver-muted/80 hover:text-silver-dim/80 text-sm mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> {backLabel}
        </Link>

        <ArticleHero article={article} />
        <div className="flex justify-end mb-4 -mt-4">
          <FavoriteButton
            href={canonicalPath}
            title={article.title}
            type="guide"
            meta={article.category}
            compact
          />
        </div>
        <AuthorBlock
          author={article.author}
          updatedAt={article.updatedAt}
          publishedAt={article.publishedAt}
        />
        <TableOfContents sections={article.sections} />
        <ArticleBody sections={article.sections} />
        <ArticleFAQ items={article.faq} />
        <RelatedArticles
          articles={related}
          basePath={backHref === "/blog" ? "/blog" : "/learn"}
        />
      </main>
      <SiteFooter />
    </>
  );
}
