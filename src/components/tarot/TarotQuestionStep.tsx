"use client";

import { motion } from "framer-motion";
import { CosmicButton } from "@/components/cosmic/CosmicButton";
import type { TarotSpread } from "@/lib/tarot/types";

interface TarotQuestionStepProps {
  spread: TarotSpread;
  question: string;
  onQuestionChange: (q: string) => void;
  onContinue: () => void;
  onBack: () => void;
}

export function TarotQuestionStep({
  spread,
  question,
  onQuestionChange,
  onContinue,
  onBack,
}: TarotQuestionStepProps) {
  const needsQuestion = spread.id !== "daily";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-lg mx-auto space-y-6"
    >
      <div className="text-center">
        <p className="text-[10px] tracking-[0.3em] uppercase text-white/25 mb-2">{spread.name}</p>
        <h2 className="font-display text-2xl text-white/80 mb-2">Focus your question</h2>
        <p className="text-sm text-white/35">
          {needsQuestion
            ? "Before drawing the cards, think about a very precise question. The clearer you are, the sharper the reading."
            : "Take a breath. Today's card will reflect the energy around you right now."}
        </p>
      </div>
      {needsQuestion ? (
        <textarea
          value={question}
          onChange={(e) => onQuestionChange(e.target.value)}
          placeholder="e.g. Will this relationship grow into something lasting?"
          rows={4}
          className="w-full rounded-2xl bg-white/[0.03] border border-white/[0.08] px-4 py-3 text-sm text-white/70 placeholder:text-white/20 focus:outline-none focus:border-white/20 resize-none"
        />
      ) : (
        <div className="glass-card rounded-2xl p-6 text-center text-sm text-white/40">
          No question needed — your daily message awaits after you shuffle and draw.
        </div>
      )}
      <div className="flex gap-3 justify-center">
        <CosmicButton variant="ghost" onClick={onBack}>Back</CosmicButton>
        <CosmicButton
          onClick={onContinue}
          disabled={needsQuestion && question.trim().length < 8}
        >
          Continue to shuffle
        </CosmicButton>
      </div>
    </motion.div>
  );
}
