import Link from "next/link";
import { BTN_SEGMENT_BLOCK, BTN_SEGMENT_PRIMARY } from "@/lib/ui/button-classes";
import { cn } from "@/lib/utils";
import type { PillarArticle, PillarHub } from "@/content/pillars/types";
import { pillarPath, pillarReadMinutes } from "@/content/pillars/types";
import { PageShell } from "@/components/layout/PageShell";
import { TrustNotice } from "@/components/trust/TrustNotice";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { breadcrumbJsonLd } from "@/lib/structured-data";

const HUB_COPY: Record<
  PillarHub,
  { title: string; description: string; learnHref: string; learnLabel: string }
> = {
  zodiac: {
    title: "Zodiac Signs",
    description:
      "In-depth guides to all twelve zodiac signs — personality, love, career, compatibility, and FAQs.",
    learnHref: "/learn/category/zodiac-signs",
    learnLabel: "Zodiac guides in Learn",
  },
  planets: {
    title: "Planets in Astrology",
    description:
      "The Sun, Moon, and planets — what each symbolizes and how to read them in your birth chart.",
    learnHref: "/learn/category/planets",
    learnLabel: "Planet guides in Learn",
  },
  houses: {
    title: "Astrological Houses",
    description:
      "The twelve houses map life arenas from identity to spirituality. Learn what each house governs.",
    learnHref: "/learn/category/houses",
    learnLabel: "House guides in Learn",
  },
  tarot: {
    title: "Tarot Card Meanings",
    description:
      "Major Arcana encyclopedia — upright and reversed meanings for all 22 cards.",
    learnHref: "/learn/category/tarot",
    learnLabel: "Tarot guides in Learn",
  },
};

interface PillarHubPageProps {
  hub: PillarHub;
  articles: PillarArticle[];
  extraLinks?: { href: string; label: string; description: string; highlight?: boolean }[];
}

export function PillarHubPage({ hub, articles, extraLinks = [] }: PillarHubPageProps) {
  const copy = HUB_COPY[hub];
  const hubPath = `/${hub}`;

  return (
    <>
      <JsonLdScript
        data={breadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: copy.title, url: hubPath },
        ])}
      />
      <PageShell
        width="lg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: copy.title },
        ]}
        title={copy.title}
        subtitle={copy.description}
        stack={false}
      >
        <Link
          href={copy.learnHref}
          className="inline-block text-sm text-silver-muted hover:text-silver-dim mb-8 underline-offset-2 hover:underline"
        >
          {copy.learnLabel} →
        </Link>

        <TrustNotice className="mb-10 max-w-2xl" compact />

        {extraLinks.length > 0 && (
          <div className="mb-12 space-y-4">
            {extraLinks
              .filter((link) => link.highlight)
              .map((link) => (
                <Link key={link.href} href={link.href} className={BTN_SEGMENT_PRIMARY}>
                  <span className="block text-base font-medium">{link.label}</span>
                  <span className="block text-xs mt-1.5 opacity-75">{link.description}</span>
                </Link>
              ))}
            {extraLinks.some((link) => !link.highlight) && (
              <div className="flex flex-col sm:flex-row gap-4">
                {extraLinks
                  .filter((link) => !link.highlight)
                  .map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(BTN_SEGMENT_BLOCK, "flex-1")}
                    >
                      <span className="text-sm text-silver/80">{link.label}</span>
                      <span className="block text-xs text-silver-muted/85 mt-1">{link.description}</span>
                    </Link>
                  ))}
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={pillarPath(hub, article.slug)}
              className="glass-card rounded-xl p-6 hover:bg-silver/[0.06] transition-colors group"
            >
              <h2 className="font-display text-lg text-silver/90 group-hover:text-silver-bright transition-colors leading-snug">
                {article.title.replace(/:.*$/, "").replace(/ —.*$/, "")}
              </h2>
              <p className="text-sm text-silver-muted/90 mt-3 line-clamp-3 leading-relaxed">
                {article.description}
              </p>
              <p className="text-[10px] text-silver-faint mt-4 uppercase tracking-wider">
                {pillarReadMinutes(article)} min read
              </p>
            </Link>
          ))}
        </div>
      </PageShell>
    </>
  );
}
