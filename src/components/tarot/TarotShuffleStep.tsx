"use client";

import { motion } from "framer-motion";
import { CosmicButton } from "@/components/cosmic/CosmicButton";
import { TarotCard } from "./TarotCard";

const MIN_SHUFFLES = 1;

interface TarotShuffleStepProps {
  shuffleCount: number;
  onShuffle: () => void;
  onContinue: () => void;
  onBack: () => void;
}

export function TarotShuffleStep({
  shuffleCount,
  onShuffle,
  onContinue,
  onBack,
}: TarotShuffleStepProps) {
  const ready = shuffleCount >= MIN_SHUFFLES;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-lg mx-auto text-center space-y-8"
    >
      <div>
        <h2 className="font-display text-2xl text-white/80 mb-2">Shuffling the cards</h2>
        <p className="text-sm text-white/35 max-w-md mx-auto">
          The cards must be shuffled by you before the draw. This step governs how they are arranged.
          Tap shuffle once with your question in mind, then draw your cards.
        </p>
      </div>

      <motion.button
        type="button"
        onClick={onShuffle}
        className="relative mx-auto block focus:outline-none"
        whileTap={{ scale: 0.96 }}
      >
        <motion.div
          animate={{
            rotate: shuffleCount * 8,
            x: shuffleCount % 2 === 0 ? 0 : 6,
          }}
          transition={{ type: "spring", stiffness: 180, damping: 16 }}
          className="relative"
        >
          {/* Stacked deck behind */}
          <div className="absolute left-2 top-2 opacity-60">
            <TarotCard face="back" size="md" className="!w-28" />
          </div>
          <div className="absolute left-1 top-1 opacity-80">
            <TarotCard face="back" size="md" className="!w-28" />
          </div>
          <TarotCard face="back" size="md" className="!w-32 relative z-10" />
        </motion.div>
        <p className="text-xs text-[#c9a227]/50 mt-6 font-display tracking-wider">Tap to shuffle</p>
        <p className="text-[10px] text-white/20 mt-1">
          {shuffleCount} / {MIN_SHUFFLES} shuffles
        </p>
      </motion.button>

      <div className="flex gap-3 justify-center">
        <CosmicButton variant="ghost" onClick={onBack}>Back</CosmicButton>
        <CosmicButton onClick={onContinue} disabled={!ready}>
          Draw your cards
        </CosmicButton>
      </div>
    </motion.div>
  );
}
