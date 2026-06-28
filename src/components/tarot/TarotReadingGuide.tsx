"use client";

import { READING_CHOOSER } from "@/lib/tarot/spread-catalog";
import { getSpreadById } from "@/lib/tarot/spreads";
import { BTN_SEGMENT_BLOCK } from "@/lib/ui/button-classes";

interface TarotReadingGuideProps {
  onPickSpread?: (spreadId: string) => void;
}

export function TarotReadingGuide({ onPickSpread }: TarotReadingGuideProps) {
  return (
    <section className="rounded-2xl border border-silver/15 bg-silver/5 p-5 sm:p-6 mb-8">
      <h2 className="font-display text-lg sm:text-xl text-silver/90 mb-1 text-center">
        Not sure which reading to choose?
      </h2>
      <p className="text-xs text-silver-muted/85 text-center mb-5 max-w-md mx-auto">
        Match your question to a spread — each reading type explores a different depth.
      </p>
      <ul className="space-y-2.5 max-w-xl mx-auto">
        {READING_CHOOSER.map((item) => {
          const spread = getSpreadById(item.spreadId);
          if (!spread) return null;
          return (
            <li key={item.spreadId}>
              <button
                type="button"
                onClick={() => onPickSpread?.(item.spreadId)}
                className={BTN_SEGMENT_BLOCK}
              >
                <span className="text-xs text-silver-muted/90 block mb-0.5">{item.situation}</span>
                <span className="text-sm text-silver/80 group-hover:text-silver-bright/85 transition-colors">
                  → {item.spreadName}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
