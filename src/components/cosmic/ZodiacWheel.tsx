"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ZODIAC_SIGNS_ORDER, ZODIAC_TRAITS } from "@/lib/astrology/zodiac-traits";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

const SYMBOLS: Record<string, string> = {
  Aries: "♈", Taurus: "♉", Gemini: "♊", Cancer: "♋",
  Leo: "♌", Virgo: "♍", Libra: "♎", Scorpio: "♏",
  Sagittarius: "♐", Capricorn: "♑", Aquarius: "♒", Pisces: "♓",
};

const WHEEL_DIM = 340;
const WHEEL_RADIUS = WHEEL_DIM / 2 - 36;
const BTN_SIZE = 44;
const BTN_OFFSET = BTN_SIZE / 2;

const smoothSpring = { type: "spring" as const, stiffness: 260, damping: 28, mass: 0.8 };
const popSpring = { type: "spring" as const, stiffness: 220, damping: 26, mass: 0.9 };
const fadeEase = [0.22, 1, 0.36, 1] as const;

/** Precomputed integer positions — identical on server & client to avoid hydration mismatch */
const ZODIAC_POSITIONS = ZODIAC_SIGNS_ORDER.map((sign, i) => {
  const angle = (i * 30 - 90) * (Math.PI / 180);
  return {
    sign,
    left: Math.round(WHEEL_DIM / 2 + WHEEL_RADIUS * Math.cos(angle) - BTN_OFFSET),
    top: Math.round(WHEEL_DIM / 2 + WHEEL_RADIUS * Math.sin(angle) - BTN_OFFSET),
  };
});

interface ZodiacWheelProps {
  onSelect?: (sign: string) => void;
  selected?: string | null;
}

export function ZodiacWheel({ onSelect, selected }: ZodiacWheelProps) {
  const [activeSign, setActiveSign] = useState<string | null>(null);
  const [hoveredSign, setHoveredSign] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSelect = (sign: string) => {
    setActiveSign(sign);
    onSelect?.(sign);
  };

  const traits = activeSign ? ZODIAC_TRAITS[activeSign] : null;
  const displaySign = activeSign || selected;

  return (
    <>
      <div
        className="relative mx-auto select-none overflow-visible"
        style={{ width: WHEEL_DIM, height: WHEEL_DIM }}
      >
        {/* Soft ambient glow */}
        {mounted && (
          <motion.div
            className="absolute inset-[-12px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 68%)",
            }}
            animate={{ opacity: [0.35, 0.65, 0.35], scale: [0.98, 1.02, 0.98] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        {/* Static rings */}
        <div className="absolute inset-0 rounded-full border border-white/[0.07] pointer-events-none" />
        <div className="absolute inset-6 rounded-full border border-white/[0.04] pointer-events-none" />
        <div className="absolute inset-12 rounded-full border border-dashed border-white/[0.05] pointer-events-none" />

        {/* Slow rotating ring */}
        {mounted && (
          <motion.div
            className="absolute inset-3 rounded-full border border-white/[0.05] pointer-events-none"
            animate={{ rotate: 360 }}
            transition={{ duration: 240, repeat: Infinity, ease: "linear" }}
          />
        )}

        {/* Zodiac icons */}
        {mounted ? (
          ZODIAC_POSITIONS.map(({ sign, left, top }) => {
            const isActive = activeSign === sign || selected === sign;
            const isHighlighted = hoveredSign === sign || isActive;
            const centerX = left + BTN_OFFSET;
            const centerY = top + BTN_OFFSET;

            return (
              <div
                key={sign}
                className="absolute flex flex-col items-center"
                style={{
                  left: centerX,
                  top: centerY,
                  transform: "translate(-50%, -50%)",
                  zIndex: isHighlighted ? 30 : 20,
                }}
                onMouseEnter={() => setHoveredSign(sign)}
                onMouseLeave={() => setHoveredSign(null)}
              >
                <motion.button
                  type="button"
                  onClick={() => handleSelect(sign)}
                  onFocus={() => setHoveredSign(sign)}
                  onBlur={() => setHoveredSign(null)}
                  aria-label={`Select ${sign}`}
                  initial={false}
                  animate={{
                    scale: isHighlighted ? 1.12 : 1,
                    backgroundColor: isHighlighted ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.035)",
                    borderColor: isHighlighted ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.08)",
                    color: isHighlighted ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.42)",
                    boxShadow: isHighlighted
                      ? "0 0 24px rgba(255,255,255,0.12), 0 0 0 1px rgba(255,255,255,0.06)"
                      : "0 0 0 rgba(255,255,255,0)",
                  }}
                  whileHover={{ scale: isHighlighted ? 1.14 : 1.08 }}
                  whileTap={{ scale: 0.96 }}
                  transition={smoothSpring}
                  className="rounded-full flex items-center justify-center text-xl cursor-pointer border backdrop-blur-sm will-change-transform"
                  style={{ width: BTN_SIZE, height: BTN_SIZE }}
                >
                  <motion.span
                    animate={{ y: isHighlighted ? -1 : 0 }}
                    transition={{ duration: 0.35, ease: fadeEase }}
                    className="leading-none"
                  >
                    {SYMBOLS[sign]}
                  </motion.span>
                </motion.button>

                <AnimatePresence mode="wait">
                  {isHighlighted && (
                    <motion.span
                      key={`${sign}-label`}
                      initial={{ opacity: 0, y: 4, scale: 0.92, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: 2, scale: 0.96, filter: "blur(2px)" }}
                      transition={{ duration: 0.28, ease: fadeEase }}
                      className="mt-2 px-2.5 py-0.5 rounded-full bg-black/60 border border-white/[0.08] text-[9px] font-medium tracking-[0.16em] uppercase text-white/70 whitespace-nowrap pointer-events-none backdrop-blur-md"
                    >
                      {sign}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border border-white/[0.06] animate-pulse" />
          </div>
        )}

        {/* Center emblem */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <AnimatePresence mode="wait">
            {displaySign && !hoveredSign ? (
              <motion.div
                key={displaySign}
                initial={{ opacity: 0, scale: 0.88, filter: "blur(6px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.94, filter: "blur(4px)" }}
                transition={{ duration: 0.4, ease: fadeEase }}
                className="text-center"
              >
                <motion.p
                  className="text-3xl"
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  {SYMBOLS[displaySign]}
                </motion.p>
                <p className="text-[10px] text-white/35 mt-1 tracking-[0.25em] uppercase">
                  {displaySign}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="default-center"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: fadeEase }}
                className="text-center"
              >
                <div className="w-12 h-12 mx-auto rounded-full border border-white/[0.08] flex items-center justify-center bg-white/[0.03] shadow-[inset_0_0_20px_rgba(255,255,255,0.03)]">
                  <span className="text-xl text-white/30">☽</span>
                </div>
                <p className="text-[8px] text-white/18 mt-2 tracking-[0.42em] uppercase font-display">
                  Celestial Wheel
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Sign detail pop-up */}
      <AnimatePresence>
        {mounted && activeSign && traits && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: fadeEase }}
              className="fixed inset-0 z-50 bg-black/55 backdrop-blur-md"
              onClick={() => setActiveSign(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.97, y: 8, filter: "blur(4px)" }}
              transition={popSpring}
              className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-sm"
            >
              <div className="glass-card rounded-3xl p-8 relative overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none" />
                <button
                  onClick={() => setActiveSign(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-white/40 hover:text-white/70 hover:bg-white/[0.1] transition-all duration-300 z-10"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06, ...popSpring }}
                  className="text-center mb-6"
                >
                  <motion.span
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.08, ...smoothSpring }}
                    className="text-6xl block mb-2"
                  >
                    {SYMBOLS[activeSign]}
                  </motion.span>
                  <h3 className="font-display text-2xl text-white/90">{activeSign}</h3>
                  <p className="text-xs text-white/35 tracking-[0.2em] uppercase mt-1">
                    {traits.archetype} · {traits.element} · {traits.modality}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12, duration: 0.4, ease: fadeEase }}
                >
                  <div className="flex flex-wrap gap-1.5 justify-center mb-5">
                    {traits.keywords.map((kw) => (
                      <span
                        key={kw}
                        className="px-2.5 py-1 rounded-full text-[10px] bg-white/[0.05] border border-white/[0.08] text-white/45 tracking-wide"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>

                  <p className="text-sm text-white/45 leading-relaxed text-center mb-4">
                    {traits.emotional}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                      <p className="text-[9px] text-white/25 uppercase tracking-wider mb-1">Strength</p>
                      <p className="text-xs text-white/50">{traits.strengths[0]}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                      <p className="text-[9px] text-white/25 uppercase tracking-wider mb-1">Growth Edge</p>
                      <p className="text-xs text-white/50">{traits.challenges[0]}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export function FloatingConstellations() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const symbols = ["✦", "✧", "⋆", "◇", "✦", "☽"];
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: -15 }}
      aria-hidden="true"
    >
      {symbols.map((s, i) => (
        <motion.span
          key={i}
          className="absolute text-white/[0.07] text-sm"
          style={{ left: `${10 + i * 15}%`, top: `${15 + (i % 4) * 20}%` }}
          animate={{ y: [0, -24, 0], opacity: [0.04, 0.12, 0.04] }}
          transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {s}
        </motion.span>
      ))}
    </div>
  );
}
