import type { EducationAuthor } from "@/content/education/types";
import { APP_NAME } from "@/lib/brand";
import { BRAND_MARK } from "@/lib/symbols";

interface AuthorBlockProps {
  author: EducationAuthor;
  updatedAt: string;
  publishedAt: string;
}

export function AuthorBlock({ author, updatedAt, publishedAt }: AuthorBlockProps) {
  return (
    <aside className="flex items-start gap-4 rounded-xl border border-silver/10 bg-silver/5 p-5 mb-10">
      <div
        className="w-11 h-11 shrink-0 rounded-full border border-silver/20 bg-silver/[0.06] flex items-center justify-center text-lg text-silver-dim/80"
        aria-hidden
      >
        {BRAND_MARK}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-medium text-silver/85">{author.name}</p>
        <p className="text-xs text-silver-muted/85 mt-0.5">{author.role}</p>
        <p className="text-[11px] text-silver-faint mt-2 leading-relaxed">
          Published {publishedAt} · Last updated {updatedAt} · Reviewed by the {APP_NAME} education team
        </p>
      </div>
    </aside>
  );
}
