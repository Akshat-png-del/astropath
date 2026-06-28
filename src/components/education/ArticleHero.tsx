import type { EducationArticle } from "@/content/education/types";
import { getCategoryById } from "@/content/education/categories";
import { articleReadMinutes } from "@/content/education/types";
import { TopicIcon } from "@/components/education/TopicIcon";

interface ArticleHeroProps {
  article: EducationArticle;
}

export function ArticleHero({ article }: ArticleHeroProps) {
  const category = getCategoryById(article.category);
  const readMinutes = articleReadMinutes(article);

  return (
    <header className="mb-10 sm:mb-12">
      {category && (
        <p className="text-[10px] tracking-[0.3em] uppercase text-silver-muted/80 mb-3 inline-flex items-center gap-2">
          <TopicIcon topic={category.id} size={18} />
          <span>{category.name}</span>
        </p>
      )}
      <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] text-silver-bright/90 leading-tight mb-4">
        {article.title}
      </h1>
      <p className="text-base sm:text-lg text-silver-muted/90 leading-relaxed max-w-2xl">
        {article.description}
      </p>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-6 text-[11px] text-silver-muted/80 uppercase tracking-wider">
        <span>{readMinutes} min read</span>
        <span aria-hidden>·</span>
        <span>Updated {article.updatedAt}</span>
      </div>
    </header>
  );
}
