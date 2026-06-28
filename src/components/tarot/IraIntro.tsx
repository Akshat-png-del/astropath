"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { CosmicButton } from "@/components/cosmic/CosmicButton";
import { SYMBOL } from "@/lib/symbols";

interface IraIntroProps {
  onContinue: () => void;
}

export function IraIntro({ onContinue }: IraIntroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-xl mx-auto text-center space-y-8"
    >
      <div className="w-20 h-20 mx-auto rounded-full border border-silver/25 bg-silver/[0.06] flex items-center justify-center text-3xl">
        {SYMBOL.star}
      </div>
      <div>
        <p className="text-[10px] tracking-[0.35em] uppercase text-silver-faint mb-3">
          Tarot on AstroPath
        </p>
        <h1 className="font-display text-3xl sm:text-4xl text-silver-bright/85 mb-2">
          Meet IRA
        </h1>
        <p className="text-sm text-silver-muted/90">Your tarot guide · Major Arcana · Rider-Waite tradition</p>
      </div>
      <div className="glass-card rounded-2xl p-6 sm:p-8 text-left space-y-4 text-sm text-silver-dim/80 leading-relaxed">
        <p>
          IRA interprets your chosen spread — each reading type explores a different depth, from a
          quick daily card to a full Celtic Cross overview.
        </p>
        <p>
          Pick a spread that matches your question, focus on what you want clarity about, shuffle
          the deck, and choose your cards intuitively. You&apos;ll see costs upfront; credits apply
          only after your reading completes successfully.
        </p>
        <p className="text-silver-muted/85 text-xs border-t border-silver/10 pt-4">
          New here? Use the guide below each spread to see what it&apos;s best for and what
          you&apos;ll discover before you begin.
        </p>
      </div>
      <CosmicButton size="lg" onClick={onContinue} className="gap-2">
        <Sparkles className="w-4 h-4" />
        Browse readings
      </CosmicButton>
    </motion.div>
  );
}
