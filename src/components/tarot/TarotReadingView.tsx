"use client";

import { motion } from "framer-motion";
import { CosmicButton } from "@/components/cosmic/CosmicButton";
import type { TarotReadingResult } from "@/lib/tarot/types";
import { TarotCard } from "./TarotCard";

interface TarotReadingViewProps {
  result: TarotReadingResult;
  onNewReading: () => void;
}

export function TarotReadingView({ result, onNewReading }: TarotReadingViewProps) {
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
        <h2 className="font-display text-2xl sm:text-3xl text-white/85 mb-4">Your reading</h2>
        {result.question && (
          <p className="text-sm text-white/40 italic max-w-md mx-auto font-display">
            &ldquo;{result.question}&rdquo;
          </p>
        )}
      </div>

      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-[#c9a227]/10">
        <p className="text-sm text-white/55 leading-relaxed font-display">{result.summary}</p>
      </div>

      <div className="space-y-5">
        {result.cards.map((drawn, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16, rotateY: -40 }}
            animate={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="glass-card rounded-xl p-4 sm:p-5 flex gap-4 sm:gap-5 border border-white/[0.06]"
            style={{ perspective: 1000 }}
          >
            <TarotCard
              face="front"
              card={drawn.card}
              reversed={drawn.reversed}
              size="md"
              className="!w-[88px] sm:!w-[104px] flex-shrink-0"
            />
            <div className="min-w-0 flex-1 pt-1">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#c9a227]/50 mb-2">
                {drawn.position}
                {drawn.reversed && " · reversed"}
              </p>
              <p className="text-sm text-white/55 leading-relaxed">
                {result.positionReadings[i]?.text}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="text-center text-xs text-white/25 max-w-md mx-auto">
        Our free tarot reading offers unique insight into your future — face it with more serenity.
        This is guidance, not certainty.
      </p>

      <div className="flex justify-center gap-3">
        <CosmicButton variant="secondary" onClick={onNewReading}>
          New reading
        </CosmicButton>
        <CosmicButton href="/chat">Ask IRA in chat</CosmicButton>
      </div>
    </motion.div>
  );
}
