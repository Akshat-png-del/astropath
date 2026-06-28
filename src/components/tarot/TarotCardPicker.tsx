"use client";

import { motion } from "framer-motion";
import { Undo2 } from "lucide-react";
import { CosmicButton } from "@/components/cosmic/CosmicButton";
import { BTN_TEXT } from "@/lib/ui/button-classes";
import { getAvailableDeckIndices } from "@/lib/tarot/deck";
import type { ShuffledDeck } from "@/lib/tarot/deck";
import type { TarotSpread } from "@/lib/tarot/types";
import { TarotCard } from "./TarotCard";

interface TarotCardPickerProps {
  spread: TarotSpread;
  deck: ShuffledDeck;
  selectedIndices: number[];
  costLabel?: string;
  onSelect: (index: number) => void;
  onUndoLast: () => void;
  onReveal: () => void;
  onBack: () => void;
}

export function TarotCardPicker({
  spread,
  deck,
  selectedIndices,
  costLabel,
  onSelect,
  onUndoLast,
  onReveal,
  onBack,
}: TarotCardPickerProps) {
  const needed = spread.cardCount;
  const complete = selectedIndices.length === needed;
  const nextPosition = spread.positions[selectedIndices.length];
  const availableIndices = getAvailableDeckIndices(deck.cards.length, selectedIndices);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="text-center max-w-lg mx-auto">
        <h2 className="font-display text-2xl text-silver/90 mb-2">Drawing the cards</h2>
        {complete ? (
          <p className="text-sm text-silver-muted/85">
            All {needed} card{needed > 1 ? "s" : ""} drawn. Reveal when you&apos;re ready.
          </p>
        ) : (
          <p className="text-sm text-silver-muted/85">
            Draw card{" "}
            <span className="text-[#c9a227]/80">{selectedIndices.length + 1}</span> of{" "}
            <span className="text-[#c9a227]/80">{needed}</span>
            {nextPosition && (
              <>
                {" "}
                for{" "}
                <span className="text-silver-dim/80 italic">{nextPosition}</span>
              </>
            )}
            . Tap one card from the deck below.
          </p>
        )}
        <p className="text-xs text-silver-faint mt-2">
          Drawn: {selectedIndices.length} / {needed}
        </p>
      </div>

      {selectedIndices.length > 0 && (
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between gap-3 mb-3 px-1">
            <p className="text-[10px] tracking-[0.2em] uppercase text-silver-faint">Your spread</p>
            <button
              type="button"
              onClick={onUndoLast}
              className={BTN_TEXT}
            >
              <Undo2 className="w-3 h-3" />
              Undo last card
            </button>
          </div>
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
            {selectedIndices.map((deckIndex, slot) => (
              <div key={`${deckIndex}-${slot}`} className="flex flex-col items-center gap-1.5 max-w-[4.5rem]">
                <TarotCard
                  face="back"
                  size="xs"
                  selected
                  selectionOrder={slot + 1}
                />
                <p className="text-[9px] text-silver-muted/80 text-center leading-tight line-clamp-2">
                  {spread.positions[slot]}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {!complete && (
        <>
          <p className="text-center text-[10px] tracking-[0.2em] uppercase text-silver-faint/90">
            Remaining deck · {availableIndices.length} cards
          </p>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2.5 sm:gap-3 max-w-4xl mx-auto px-1">
            {availableIndices.map((index) => (
              <TarotCard
                key={index}
                face="back"
                size="xs"
                interactive
                onClick={() => onSelect(index)}
              />
            ))}
          </div>
        </>
      )}

      <div className="flex flex-col items-center gap-3 justify-center pt-4">
        {costLabel && (
          <p className="text-[11px] text-silver-muted/80">
            {costLabel} · deducted only when your reading is ready
          </p>
        )}
        <div className="flex gap-3">
          <CosmicButton variant="ghost" onClick={onBack}>Back</CosmicButton>
          <CosmicButton onClick={onReveal} disabled={!complete}>
            Reveal my reading
          </CosmicButton>
        </div>
      </div>
    </motion.div>
  );
}
