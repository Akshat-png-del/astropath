"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ZODIAC_SIGNS_ORDER, ZODIAC_TRAITS } from "@/lib/astrology/zodiac-traits";
import { getElementTokens, getSignElement } from "@/lib/astrology/zodiac-tokens";
import { ZodiacSignImage } from "@/components/cosmic/ZodiacSignImage";
import { CelestialEmblem, CelestialPattern } from "@/components/zodiac/CelestialPattern";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { BTN_ICON } from "@/lib/ui/button-classes";

const WHEEL_DIM = 340;
const WHEEL_RADIUS = WHEEL_DIM / 2 - 36;
const BTN_SIZE = 44;
const BTN_OFFSET = BTN_SIZE / 2;

const smoothSpring = { type: "spring" as const, stiffness: 260, damping: 28, mass: 0.8 };
const popSpring = { type: "spring" as const, stiffness: 220, damping: 26, mass: 0.9 };
const fadeEase = [0.22, 1, 0.36, 1] as const;

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
        <CelestialPattern className="opacity-50" seed="zodiac-wheel" density={18} />

        {mounted && (
          <motion.div
            className="absolute inset-[-12px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(212,160,83,0.04) 0%, transparent 68%)",
            }}
            animate={{ opacity: [0.3, 0.55, 0.3], scale: [0.98, 1.02, 0.98] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        <div className="absolute inset-0 rounded-full border border-silver/15 pointer-events-none" />
        <div className="absolute inset-6 rounded-full border border-silver/10 pointer-events-none" />
        <div className="absolute inset-12 rounded-full border border-dashed border-silver/10 pointer-events-none" />

        {mounted && (
          <motion.div
            className="absolute inset-3 rounded-full border border-silver/10 pointer-events-none"
            animate={{ rotate: 360 }}
            transition={{ duration: 240, repeat: Infinity, ease: "linear" }}
          />
        )}

        {mounted ? (
          ZODIAC_POSITIONS.map(({ sign, left, top }) => {
            const isActive = activeSign === sign || selected === sign;
            const isHighlighted = hoveredSign === sign || isActive;
            const tokens = getElementTokens(sign);
            const elementClass = `zodiac-element-${getSignElement(sign).toLowerCase()}`;
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
                    backgroundColor: isHighlighted ? tokens.muted : "rgba(196,196,204,0.035)",
                    borderColor: isHighlighted ? tokens.color : "rgba(196,196,204,0.08)",
                    boxShadow: isHighlighted
                      ? `0 0 24px ${tokens.glow}, 0 0 0 1px ${tokens.muted}`
                      : "0 0 0 rgba(196,196,204,0)",
                  }}
                  whileHover={{ scale: isHighlighted ? 1.14 : 1.08 }}
                  whileTap={{ scale: 0.96 }}
                  transition={smoothSpring}
                  className={`zodiac-wheel-btn rounded-full flex items-center justify-center cursor-pointer border backdrop-blur-sm will-change-transform ${elementClass}`}
                  style={{ width: BTN_SIZE, height: BTN_SIZE, ["--zodiac-glow" as string]: tokens.glow }}
                >
                  <ZodiacSignImage sign={sign} size={26} ring={false} interactive shimmer />
                </motion.button>

                <AnimatePresence mode="wait">
                  {isHighlighted && (
                    <motion.span
                      key={`${sign}-label`}
                      initial={{ opacity: 0, y: 4, scale: 0.92, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: 2, scale: 0.96, filter: "blur(2px)" }}
                      transition={{ duration: 0.28, ease: fadeEase }}
                      className="mt-2 px-2.5 py-0.5 rounded-full bg-black/60 border text-[9px] font-medium tracking-[0.16em] uppercase text-silver/80 whitespace-nowrap pointer-events-none backdrop-blur-md"
                      style={{ borderColor: tokens.muted }}
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
            <div className="w-12 h-12 rounded-full border border-silver/10 animate-pulse" />
          </div>
        )}

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
                <motion.div
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="flex justify-center"
                >
                  <ZodiacSignImage sign={displaySign} size={48} interactive shimmer />
                </motion.div>
                <p className="text-[10px] text-silver-muted/85 mt-1 tracking-[0.25em] uppercase">
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
                <div className="w-12 h-12 mx-auto rounded-full border border-silver/15 flex items-center justify-center bg-silver/5 shadow-[inset_0_0_20px_rgba(196,196,204,0.03)]">
                  <CelestialEmblem size={28} />
                </div>
                <p className="text-[8px] text-silver-faint/80 mt-2 tracking-[0.42em] uppercase font-display">
                  Celestial Wheel
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

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
              <div
                className="glass-card rounded-3xl p-8 relative overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
                style={{ borderColor: getElementTokens(activeSign).muted }}
              >
                <CelestialPattern className="opacity-35" seed={activeSign} />
                <div className="absolute inset-0 bg-gradient-to-br from-silver/10 to-transparent pointer-events-none" />
                <button
                  onClick={() => setActiveSign(null)}
                  className={cn(BTN_ICON, "absolute top-4 right-4 w-8 h-8 z-10")}
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06, ...popSpring }}
                  className="relative z-10 text-center mb-6"
                >
                  <motion.div
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.08, ...smoothSpring }}
                    className="flex justify-center mb-2"
                  >
                    <ZodiacSignImage sign={activeSign} size={72} interactive shimmer />
                  </motion.div>
                  <h3 className="font-display text-2xl text-silver-bright/90">{activeSign}</h3>
                  <p className="text-xs text-silver-muted/85 tracking-[0.2em] uppercase mt-1">
                    {traits.archetype} · {traits.element} · {traits.modality}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12, duration: 0.4, ease: fadeEase }}
                  className="relative z-10"
                >
                  <div className="flex flex-wrap gap-1.5 justify-center mb-5">
                    {traits.keywords.map((kw) => (
                      <span
                        key={kw}
                        className="px-2.5 py-1 rounded-full text-[10px] bg-silver/5 border border-silver/15 text-silver-muted tracking-wide"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>

                  <p className="text-sm text-silver-muted leading-relaxed text-center mb-4">
                    {traits.emotional}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="p-3 rounded-xl bg-silver/5 border border-silver/10">
                      <p className="text-[9px] text-silver-faint uppercase tracking-wider mb-1">Strength</p>
                      <p className="text-xs text-silver-dim/80">{traits.strengths[0]}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-silver/5 border border-silver/10">
                      <p className="text-[9px] text-silver-faint uppercase tracking-wider mb-1">Growth Edge</p>
                      <p className="text-xs text-silver-dim/80">{traits.challenges[0]}</p>
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

  const nodes = [
    { x: "12%", y: "18%", delay: 0 },
    { x: "28%", y: "42%", delay: 1.2 },
    { x: "45%", y: "22%", delay: 0.6 },
    { x: "62%", y: "55%", delay: 2 },
    { x: "78%", y: "28%", delay: 1.5 },
    { x: "88%", y: "62%", delay: 0.3 },
  ];

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: -15 }}
      aria-hidden="true"
    >
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
        <line x1="12%" y1="18%" x2="28%" y2="42%" stroke="#f5f0e6" strokeWidth="0.5" />
        <line x1="28%" y1="42%" x2="45%" y2="22%" stroke="#f5f0e6" strokeWidth="0.5" />
        <line x1="45%" y1="22%" x2="62%" y2="55%" stroke="#f5f0e6" strokeWidth="0.5" />
        <line x1="62%" y1="55%" x2="78%" y2="28%" stroke="#f5f0e6" strokeWidth="0.5" />
      </svg>
      {nodes.map((n, i) => (
        <motion.span
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[#f5f0e6]"
          style={{ left: n.x, top: n.y, opacity: 0.1 }}
          animate={{ y: [0, -18, 0], opacity: [0.05, 0.14, 0.05] }}
          transition={{ duration: 10 + n.delay * 2, repeat: Infinity, ease: "easeInOut", delay: n.delay }}
        />
      ))}
    </div>
  );
}
