"use client";

import { motion } from "framer-motion";
import { CosmicButton } from "@/components/cosmic/CosmicButton";
import type { TarotSpread } from "@/lib/tarot/types";

const QUESTION_EXAMPLES: Partial<Record<string, string>> = {
  love: "e.g. Will he come back, or should I move on?",
  "yes-no": "e.g. Should I take this job offer?",
  career: "e.g. Will I get the promotion this year?",
  psychic: "e.g. What am I not seeing about this situation?",
  "celtic-cross": "e.g. What is blocking me from moving forward in love?",
  free: "e.g. What do I need to understand about my relationship right now?",
};

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
  const placeholder = QUESTION_EXAMPLES[spread.id] ?? "e.g. What should I focus on in the next three months?";

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
            ? "Ask one clear question — love, career, yes/no, or timing. IRA will read the cards against what you actually mean."
            : "Take a breath. Today's card will reflect the energy around you right now."}
        </p>
      </div>
      {needsQuestion ? (
        <>
          <textarea
            value={question}
            onChange={(e) => onQuestionChange(e.target.value)}
            placeholder={placeholder}
            rows={4}
            className="w-full rounded-2xl bg-white/[0.03] border border-white/[0.08] px-4 py-3 text-sm text-white/70 placeholder:text-white/20 focus:outline-none focus:border-white/20 resize-none"
          />
          <p className="text-[11px] text-white/20 text-center">
            Tip: &quot;Will we get back together?&quot; · &quot;Is this the right career move?&quot; · &quot;When will things improve?&quot;
          </p>
        </>
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
