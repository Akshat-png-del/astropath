import Link from "next/link";
import type { EducationCategoryId } from "@/content/education/types";
import { getCategoryBySlug } from "@/content/education/categories";
import { getArticlesByCategory } from "@/content/education";
import { articleReadMinutes } from "@/content/education/types";
import { TopicIcon } from "@/components/education/TopicIcon";

interface CategoryIndexProps {
  categoryId: EducationCategoryId;
  basePath?: string;
}

export function CategoryIndex({ categoryId, basePath = "/learn" }: CategoryIndexProps) {
  const category = getCategoryBySlug(categoryId);
  const articles = getArticlesByCategory(categoryId);

  if (!category) return null;

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <TopicIcon topic={category.id} size={40} className="mx-auto mb-3" />
        <h1 className="font-display text-3xl sm:text-4xl text-silver-bright/85 mb-3">{category.name}</h1>
        <p className="text-sm text-silver-muted/90 leading-relaxed">{category.description}</p>
      </div>

      <ul className="space-y-4 max-w-3xl mx-auto">
        {articles.map((article) => (
          <li key={article.slug}>
            <Link
              href={`${basePath}/${article.slug}`}
              className="block rounded-xl border border-silver/10 bg-silver/5 p-5 hover:border-silver/20 transition-colors group"
            >
              <h2 className="font-display text-lg text-silver/90 group-hover:text-silver-bright transition-colors">
                {article.title}
              </h2>
              <p className="text-sm text-silver-muted/90 mt-2 leading-relaxed">{article.description}</p>
              <p className="text-[10px] text-silver-faint mt-3 uppercase tracking-wider">
                {articleReadMinutes(article)} min read · Updated {article.updatedAt}
              </p>
            </Link>
          </li>
        ))}
      </ul>

      <p className="text-center">
        <Link href={basePath} className="text-sm text-silver-muted/85 hover:text-silver-dim/85 transition-colors">
          ← All topics
        </Link>
      </p>
    </div>
  );
}
