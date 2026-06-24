"use client";

import { motion } from "framer-motion";
import type { TarotSpread } from "@/lib/tarot/types";
import { TAROT_SPREADS } from "@/lib/tarot/spreads";
import { cn } from "@/lib/utils";

interface TarotSpreadGridProps {
  onSelect: (spread: TarotSpread) => void;
}

const SPREAD_ICONS: Record<string, string> = {
  free: "✦",
  love: "♥",
  "yes-no": "?",
  psychic: "☽",
  "celtic-cross": "✧",
  daily: "☀",
  oracle: "◎",
  angel: "✧",
  osho: "☯",
  chinese: "中",
  egyptian: "𓂀",
  "32-cards": "32",
};

export function TarotSpreadGrid({ onSelect }: TarotSpreadGridProps) {
  return (
    <div className="space-y-6">
      <div className="text-center max-w-lg mx-auto">
        <h2 className="font-display text-2xl text-white/80 mb-2">Free tarot readings</h2>
        <p className="text-sm text-white/35">
          A unique divination experience using the Major Arcana. Pick a spread to begin.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {TAROT_SPREADS.map((spread, i) => (
          <motion.button
            key={spread.id}
            type="button"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            onClick={() => onSelect(spread)}
            className={cn(
              "glass-card rounded-xl p-4 text-left transition-all duration-300 relative overflow-hidden",
              "glass-card-hover hover:border-white/20 cursor-pointer"
            )}
          >
            <div className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-lg text-white/50 mb-3">
              {SPREAD_ICONS[spread.id] ?? "✦"}
            </div>
            <h3 className="text-sm font-medium text-white/75 mb-1">{spread.name}</h3>
            <p className="text-[11px] text-white/30 line-clamp-2">{spread.description}</p>
            <p className="text-[10px] text-white/20 mt-2">{spread.cardCount} card{spread.cardCount > 1 ? "s" : ""}</p>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
