"use client";

import Link from "next/link";
import { EDUCATION_CATEGORIES } from "@/content/education/categories";
import {
  getArticlesByCategory,
  EDUCATION_ARTICLES,
} from "@/content/education";
import { articleReadMinutes } from "@/content/education/types";
import { CosmicButton } from "@/components/cosmic/CosmicButton";
import { TopicIcon } from "@/components/education/TopicIcon";

interface LearnHubProps {
  basePath?: string;
  title?: string;
  subtitle?: string;
  showHeader?: boolean;
}

export function LearnHub({
  basePath = "/learn",
  title = "Learn Astrology",
  subtitle = "Premium educational guides — beginner-friendly, professionally written, and free to read.",
  showHeader = true,
}: LearnHubProps) {
  return (
    <div className="flex flex-col gap-16 sm:gap-20">
      {showHeader && (
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-[10px] tracking-[0.35em] uppercase text-silver-faint mb-4">AstroPath Academy</p>
          <h1 className="font-display text-3xl sm:text-4xl text-silver-bright/85 mb-4">{title}</h1>
          <p className="text-sm sm:text-base text-silver-muted/90 leading-relaxed">{subtitle}</p>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <CosmicButton href="/tarot/reading" variant="secondary" size="sm">
              Try tarot
            </CosmicButton>
            <CosmicButton href="/blog" variant="ghost" size="sm">
              Read the blog
            </CosmicButton>
          </div>
        </div>
      )}

      <section>
        <div className="mb-8 sm:mb-10">
          <h2 className="font-display text-xl sm:text-2xl text-silver/90 mb-2">Reference guides</h2>
          <p className="text-sm text-silver-muted/85 max-w-xl">
            Evergreen encyclopedias — zodiac signs, planets, houses, and tarot cards.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {[
            { href: "/zodiac", label: "Zodiac Signs", desc: "All 12 signs in depth", topic: "zodiac" as const },
            { href: "/planets", label: "Planets", desc: "Sun through Pluto", topic: "planets" as const },
            { href: "/houses", label: "Houses", desc: "First through twelfth", topic: "houses" as const },
            { href: "/tarot", label: "Tarot", desc: "Major Arcana meanings", topic: "tarot" as const },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl border border-silver/10 bg-silver/5 p-5 sm:p-6 hover:border-silver/20 hover:bg-silver/5 transition-colors group text-center"
            >
              <TopicIcon topic={item.topic} size={32} className="mx-auto mb-3" />
              <h3 className="text-sm font-medium text-silver/85 group-hover:text-silver-bright/90">{item.label}</h3>
              <p className="text-[11px] text-silver-muted/80 mt-1.5">{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-8 sm:mb-10">
          <h2 className="font-display text-xl sm:text-2xl text-silver/90 mb-2">Browse by topic</h2>
          <p className="text-sm text-silver-muted/85 max-w-xl">
            Pick a category to explore articles at your level.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {EDUCATION_CATEGORIES.map((cat) => {
            const count = getArticlesByCategory(cat.id).length;
            return (
              <Link
                key={cat.id}
                href={`${basePath}/category/${cat.slug}`}
                className="rounded-xl border border-silver/10 bg-silver/5 p-5 sm:p-6 hover:border-silver/20 hover:bg-silver/5 transition-colors group"
              >
                <TopicIcon topic={cat.id} size={32} className="mb-3" />
                <h2 className="text-sm font-medium text-silver/85 group-hover:text-silver-bright/90 transition-colors">
                  {cat.name}
                </h2>
                <p className="text-[11px] text-silver-muted/80 mt-1.5 line-clamp-2 leading-relaxed">{cat.description}</p>
                <p className="text-[10px] text-silver-faint/90 mt-3">{count} articles</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section>
        <div className="mb-8 sm:mb-10">
          <h2 className="font-display text-xl sm:text-2xl text-silver/90 mb-2">Featured guides</h2>
          <p className="text-sm text-silver-muted/85">Popular starting points for beginners.</p>
        </div>
        <ul className="space-y-4 max-w-3xl">
          {EDUCATION_ARTICLES.slice(0, 6).map((article) => (
            <li key={article.slug}>
              <Link
                href={`${basePath}/${article.slug}`}
                className="block rounded-xl border border-silver/10 bg-silver/5 p-5 sm:p-6 hover:border-silver/20 hover:bg-silver/5 transition-colors group"
              >
                <h3 className="font-display text-lg text-silver/90 group-hover:text-silver-bright transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-silver-muted/90 mt-2 leading-relaxed line-clamp-2">{article.description}</p>
                <p className="text-[10px] text-silver-faint mt-3 uppercase tracking-wider">
                  {articleReadMinutes(article)} min read
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
