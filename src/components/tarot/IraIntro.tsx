"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { CosmicButton } from "@/components/cosmic/CosmicButton";

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
      <div className="w-20 h-20 mx-auto rounded-full border border-white/15 bg-white/[0.04] flex items-center justify-center text-3xl">
        ✦
      </div>
      <div>
        <p className="text-[10px] tracking-[0.35em] uppercase text-white/25 mb-3">
          Free tarot reading
        </p>
        <h1 className="font-display text-3xl sm:text-4xl text-white/85 mb-2">
          Meet IRA
        </h1>
        <p className="text-sm text-white/40">Your tarot guide · Major Arcana · Rider-Waite tradition</p>
      </div>
      <div className="glass-card rounded-2xl p-6 sm:p-8 text-left space-y-4 text-sm text-white/50 leading-relaxed">
        <p>
          My name is <span className="text-white/70">IRA</span>. I&apos;m here to interpret your tarot
          readings and help you gain greater clarity about your situation.
        </p>
        <p>
          Inspired by the manuscripts of the mage Edmond, I use the{" "}
          <span className="text-white/60">22 Major Arcana</span> to give you keys to approach your
          future with confidence and peace of mind.
        </p>
        <p className="text-white/35 text-xs border-t border-white/[0.06] pt-4">
          Before drawing cards, focus on a precise question. Shuffle the deck yourself, then choose
          your cards from the spread below.
        </p>
      </div>
      <CosmicButton size="lg" onClick={onContinue} className="gap-2">
        <Sparkles className="w-4 h-4" />
        Choose your reading
      </CosmicButton>
    </motion.div>
  );
}
