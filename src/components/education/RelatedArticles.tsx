import Link from "next/link";
import type { EducationArticle } from "@/content/education/types";
import { getCategoryById } from "@/content/education/categories";
import { articleReadMinutes } from "@/content/education/types";

interface RelatedArticlesProps {
  articles: EducationArticle[];
  basePath?: string;
}

export function RelatedArticles({ articles, basePath = "/learn" }: RelatedArticlesProps) {
  if (!articles.length) return null;

  return (
    <section className="mt-12 pt-10 border-t border-silver/10" aria-labelledby="related-articles-heading">
      <h2 id="related-articles-heading" className="font-display text-2xl text-silver/90 mb-6">
        Continue learning
      </h2>
      <div className="grid sm:grid-cols-2 gap-3">
        {articles.map((article) => {
          const category = getCategoryById(article.category);
          return (
            <Link
              key={article.slug}
              href={`${basePath}/${article.slug}`}
              className="rounded-xl border border-silver/10 bg-silver/5 p-4 hover:border-silver/20 hover:bg-silver/[0.06] transition-colors group"
            >
              <p className="text-[10px] uppercase tracking-wider text-silver-faint mb-1">
                {category?.name}
              </p>
              <h3 className="text-sm font-medium text-silver/80 group-hover:text-silver-bright/90 transition-colors leading-snug">
                {article.title}
              </h3>
              <p className="text-[10px] text-silver-faint mt-2">{articleReadMinutes(article)} min read</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
