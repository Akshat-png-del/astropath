"use client";

import { motion } from "framer-motion";
import { CosmicButton } from "@/components/cosmic/CosmicButton";
import type { ShuffledDeck } from "@/lib/tarot/deck";
import type { TarotSpread } from "@/lib/tarot/types";
import { TarotCard } from "./TarotCard";

interface TarotCardPickerProps {
  spread: TarotSpread;
  deck: ShuffledDeck;
  selectedIndices: number[];
  onToggle: (index: number) => void;
  onReveal: () => void;
  onBack: () => void;
}

export function TarotCardPicker({
  spread,
  deck,
  selectedIndices,
  onToggle,
  onReveal,
  onBack,
}: TarotCardPickerProps) {
  const needed = spread.cardCount;
  const complete = selectedIndices.length === needed;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="text-center max-w-lg mx-auto">
        <h2 className="font-display text-2xl text-white/80 mb-2">Drawing the cards</h2>
        <p className="text-sm text-white/35">
          Choose <span className="text-[#c9a227]/80">{needed}</span> card{needed > 1 ? "s" : ""} from the
          Major Arcana deck below. Trust your intuition.
        </p>
        <p className="text-xs text-white/25 mt-2">
          Selected: {selectedIndices.length} / {needed}
        </p>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2.5 sm:gap-3 max-w-4xl mx-auto px-1">
        {deck.cards.map((_, index) => {
          const selected = selectedIndices.includes(index);
          const order = selectedIndices.indexOf(index);
          const disabled = !selected && selectedIndices.length >= needed;

          return (
            <TarotCard
              key={index}
              face="back"
              size="xs"
              interactive
              disabled={disabled}
              selected={selected}
              selectionOrder={selected ? order + 1 : undefined}
              onClick={() => onToggle(index)}
            />
          );
        })}
      </div>

      <div className="flex gap-3 justify-center pt-4">
        <CosmicButton variant="ghost" onClick={onBack}>Back</CosmicButton>
        <CosmicButton onClick={onReveal} disabled={!complete}>
          Reveal my reading
        </CosmicButton>
      </div>
    </motion.div>
  );
}
