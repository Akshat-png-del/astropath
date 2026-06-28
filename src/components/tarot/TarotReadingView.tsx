"use client";

import { motion } from "framer-motion";
import { Bookmark } from "lucide-react";
import { CosmicButton } from "@/components/cosmic/CosmicButton";
import type { TarotReadingResult } from "@/lib/tarot/types";
import { TarotCard } from "./TarotCard";

interface TarotReadingViewProps {
  result: TarotReadingResult;
  onNewReading: () => void;
  onSave?: () => void;
  saved?: boolean;
}

export function TarotReadingView({ result, onNewReading, onSave, saved }: TarotReadingViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto space-y-8"
    >
      <div className="text-center">
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#c9a227]/40 mb-2">
          {result.spread.name}
        </p>
        <h2 className="font-display text-2xl sm:text-3xl text-silver-bright/85 mb-4">Your reading</h2>
        {result.question && (
          <p className="text-sm text-silver-muted/90 italic max-w-md mx-auto font-display">
            &ldquo;{result.question}&rdquo;
          </p>
        )}
      </div>

      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-[#c9a227]/10">
        <p className="text-sm text-silver-dim/85 leading-relaxed font-display">{result.summary}</p>
      </div>

      <div className="space-y-5">
        {result.cards.map((drawn, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16, rotateY: -40 }}
            animate={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="glass-card rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row gap-3 sm:gap-5 border border-silver/10"
            style={{ perspective: 1000 }}
          >
            <TarotCard
              face="front"
              card={drawn.card}
              reversed={drawn.reversed}
              size="sm"
              className="mx-auto sm:mx-0 flex-shrink-0"
            />
            <div className="min-w-0 flex-1 pt-1">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#c9a227]/50 mb-2">
                {drawn.position}
                {drawn.reversed && " · reversed"}
              </p>
              <p className="text-sm text-silver-dim/85 leading-relaxed">
                {result.positionReadings[i]?.text}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="text-center text-xs text-silver-faint max-w-md mx-auto">
        Our free tarot reading offers unique insight into your future — face it with more serenity.
        This is guidance, not certainty.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-3 px-2">
        {onSave && (
          <CosmicButton variant="ghost" onClick={onSave}>
            <Bookmark className={`w-3.5 h-3.5 mr-1.5 ${saved ? "fill-current" : ""}`} />
            {saved ? "Saved" : "Save reading"}
          </CosmicButton>
        )}
        <CosmicButton variant="secondary" onClick={onNewReading}>
          New reading
        </CosmicButton>
        <CosmicButton variant="ghost" href="/learn">
          Explore guides
        </CosmicButton>
      </div>
    </motion.div>
  );
}
