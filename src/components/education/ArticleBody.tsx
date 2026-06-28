import type { EducationSection } from "@/content/education/types";

interface ArticleBodyProps {
  sections: EducationSection[];
}

export function ArticleBody({ sections }: ArticleBodyProps) {
  return (
    <article className="prose-custom space-y-10">
      {sections.map((section) => (
        <section key={section.id} id={section.id} className="scroll-mt-24 space-y-4">
          <h2 className="font-display text-xl sm:text-2xl text-silver/90">{section.heading}</h2>
          {section.paragraphs.map((paragraph, idx) => (
            <p key={idx} className="text-sm sm:text-[15px] text-silver-dim/80 leading-relaxed">
              {paragraph}
            </p>
          ))}
          {section.example && (
            <div className="rounded-xl border border-violet-500/15 bg-violet-500/[0.06] px-4 py-3 text-sm text-silver-dim/85 leading-relaxed">
              <p className="text-[10px] uppercase tracking-wider text-violet-300/50 mb-2">Example</p>
              {section.example}
            </div>
          )}
        </section>
      ))}
    </article>
  );
}
