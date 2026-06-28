"use client";

import Link from "next/link";
import { EDUCATION_ARTICLES } from "@/content/education";
import { getCategoryById } from "@/content/education/categories";
import { articleReadMinutes } from "@/content/education/types";

interface BlogIndexProps {
  basePath?: string;
}

export function BlogIndex({ basePath = "/blog" }: BlogIndexProps) {
  const sorted = [...EDUCATION_ARTICLES].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <div className="space-y-10">
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-[10px] tracking-[0.35em] uppercase text-silver-faint mb-4">The AstroPath Journal</p>
        <h1 className="font-display text-3xl sm:text-4xl text-silver-bright/85 mb-4">Blog</h1>
        <p className="text-sm text-silver-muted/90 leading-relaxed">
          Long-form astrology education, relationship insights, and thoughtful guides for curious seekers.
        </p>
      </div>

      <div className="space-y-6 max-w-3xl mx-auto">
        {sorted.map((article) => {
          const category = getCategoryById(article.category);
          return (
            <article
              key={article.slug}
              className="rounded-2xl border border-silver/10 bg-silver/5 overflow-hidden hover:border-silver/20 transition-colors"
            >
              <Link href={`${basePath}/${article.slug}`} className="block p-6 sm:p-8 group">
                <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-wider text-silver-faint mb-3">
                  <span>{category?.name}</span>
                  <span>·</span>
                  <span>{article.publishedAt}</span>
                  <span>·</span>
                  <span>{articleReadMinutes(article)} min read</span>
                </div>
                <h2 className="font-display text-xl sm:text-2xl text-silver-bright/85 group-hover:text-silver-bright transition-colors mb-3">
                  {article.title}
                </h2>
                <p className="text-sm text-silver-muted/90 leading-relaxed">{article.description}</p>
                <span className="inline-block mt-4 text-xs text-silver-muted/85 group-hover:text-silver-dim/85 transition-colors">
                  Read article →
                </span>
              </Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}
