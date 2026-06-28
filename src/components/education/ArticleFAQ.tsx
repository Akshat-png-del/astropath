import type { EducationFAQ } from "@/content/education/types";
import { GlassCard } from "@/components/cosmic/GlassCard";

interface ArticleFAQProps {
  items: EducationFAQ[];
}

export function ArticleFAQ({ items }: ArticleFAQProps) {
  if (!items.length) return null;

  return (
    <section className="mt-12 pt-10 border-t border-silver/10" aria-labelledby="article-faq-heading">
      <h2 id="article-faq-heading" className="font-display text-2xl text-silver/90 mb-6">
        Frequently asked questions
      </h2>
      <div className="space-y-3">
        {items.map((item) => (
          <GlassCard key={item.question} padding="sm" className="text-left">
            <h3 className="text-sm font-medium text-silver/80 mb-2">{item.question}</h3>
            <p className="text-sm text-silver-muted leading-relaxed">{item.answer}</p>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
