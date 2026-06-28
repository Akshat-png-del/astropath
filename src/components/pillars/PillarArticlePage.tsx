import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { PillarArticle, PillarHub, PillarLink } from "@/content/pillars/types";
import { pillarReadMinutes } from "@/content/pillars/types";
import { getAutoRelatedLinks } from "@/content/pillars/linking";
import { PILLAR_REGISTRY } from "@/content/pillars/registry";
import { TableOfContents } from "@/components/education/TableOfContents";
import { ArticleBody } from "@/components/education/ArticleBody";
import { ArticleFAQ } from "@/components/education/ArticleFAQ";
import { AppNav } from "@/components/layout/AppNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { TrustNotice } from "@/components/trust/TrustNotice";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/structured-data";
import { FavoriteButton } from "@/components/retention/FavoriteButton";
import { GuideReadTracker, ZodiacVisitTracker } from "@/components/retention/RetentionTrackers";
import { DEFAULT_AUTHOR } from "@/content/education/author";

const HUB_LABELS: Record<PillarHub, string> = {
  zodiac: "Zodiac Signs",
  planets: "Planets",
  houses: "Houses",
  tarot: "Tarot",
};

interface PillarArticlePageProps {
  article: PillarArticle;
}

function RelatedPillars({ links }: { links: PillarLink[] }) {
  if (!links.length) return null;

  return (
    <section className="mt-12 pt-10 border-t border-silver/10" aria-labelledby="related-pillars-heading">
      <h2 id="related-pillars-heading" className="font-display text-2xl text-silver/90 mb-6">
        Continue exploring
      </h2>
      <div className="grid sm:grid-cols-2 gap-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-xl border border-silver/10 bg-silver/5 p-4 hover:border-silver/20 hover:bg-silver/[0.06] transition-colors group"
          >
            <p className="text-[10px] uppercase tracking-wider text-silver-faint mb-1">
              {link.hub === "learn" ? "Guide" : link.hub}
            </p>
            <h3 className="text-sm font-medium text-silver/80 group-hover:text-silver-bright/90 transition-colors leading-snug">
              {link.title}
            </h3>
            {link.readMinutes && (
              <p className="text-[10px] text-silver-faint mt-2">{link.readMinutes} min read</p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}

export function PillarArticlePage({ article }: PillarArticlePageProps) {
  const hubPath = `/${article.hub}`;
  const canonicalPath = article.hub === "tarot" ? `/tarot/${article.slug}` : `/${article.hub}/${article.slug}`;
  const readMinutes = pillarReadMinutes(article);
  const related = getAutoRelatedLinks(article, PILLAR_REGISTRY);

  const favType =
    article.hub === "zodiac"
      ? "zodiac"
      : article.hub === "planets"
        ? "planet"
        : article.hub === "houses"
          ? "house"
          : "tarot-card";

  return (
    <>
      {article.hub === "zodiac" && <ZodiacVisitTracker slug={article.slug} />}
      {article.hub !== "zodiac" && (
        <GuideReadTracker slug={article.slug} topics={[article.hub]} />
      )}
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
            { name: HUB_LABELS[article.hub], url: hubPath },
            { name: article.title, url: canonicalPath },
          ]),
          ...(article.faq.length ? [faqJsonLd(article.faq)] : []),
        ]}
      />
      <AppNav />
      <main className="relative z-10 flex-1 px-4 sm:px-6 py-10 sm:py-14 max-w-3xl mx-auto w-full">
        <Link
          href={hubPath}
          className="inline-flex items-center gap-2 text-silver-muted/80 hover:text-silver-dim/80 text-sm mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> {HUB_LABELS[article.hub]}
        </Link>

        <header className="mb-10 sm:mb-12">
          <p className="text-[10px] tracking-[0.3em] uppercase text-silver-muted/80 mb-3">
            {HUB_LABELS[article.hub]}
          </p>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] text-silver-bright/90 leading-tight mb-4">
            {article.title}
          </h1>
          <p className="text-base sm:text-lg text-silver-muted/90 leading-relaxed max-w-2xl">
            {article.description}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-6 text-[11px] text-silver-muted/80 uppercase tracking-wider">
            <span>{readMinutes} min read</span>
            <span aria-hidden>·</span>
            <span>{DEFAULT_AUTHOR.name}</span>
            <span aria-hidden>·</span>
            <span>Updated {article.updatedAt}</span>
          </div>
        </header>

        <div className="flex justify-end mb-2">
          <FavoriteButton
            href={canonicalPath}
            title={article.title}
            type={favType}
            compact
          />
        </div>

        <TrustNotice className="mb-8" compact />
        <TableOfContents sections={article.sections} />
        <ArticleBody sections={article.sections} />
        <ArticleFAQ items={article.faq} />
        <RelatedPillars links={related} />
      </main>
      <SiteFooter />
    </>
  );
}
