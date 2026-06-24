"use client";

import { motion } from "framer-motion";
import type { MajorArcanaCard } from "@/lib/tarot/types";
import { cn } from "@/lib/utils";
import { getCardArt, TAROT_SIZE, type TarotCardSize } from "./card-art";
import { TarotBackPattern, TarotOrnamentFrame } from "./TarotOrnament";

export interface TarotCardProps {
  face?: "back" | "front";
  card?: MajorArcanaCard;
  reversed?: boolean;
  size?: TarotCardSize;
  selected?: boolean;
  selectionOrder?: number;
  className?: string;
  interactive?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

export function TarotCard({
  face = "back",
  card,
  reversed = false,
  size = "sm",
  selected = false,
  selectionOrder,
  className,
  interactive = false,
  onClick,
  disabled = false,
}: TarotCardProps) {
  const sz = TAROT_SIZE[size];
  const art = card ? getCardArt(card.id) : null;
  const isDarkCard = card && (card.id === 15 || card.id === 16);

  const Wrapper = interactive ? motion.button : motion.div;
  const wrapperProps = interactive
    ? {
        type: "button" as const,
        onClick,
        disabled,
        whileHover: !disabled ? { y: -6, scale: 1.02 } : undefined,
        whileTap: !disabled ? { scale: 0.97 } : undefined,
      }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={cn(
        "relative aspect-[2/3] flex-shrink-0 perspective-[800px]",
        sz.w,
        interactive && !disabled && "cursor-pointer",
        disabled && "opacity-40 cursor-not-allowed",
        className
      )}
    >
      <motion.div
        className={cn(
          "relative w-full h-full tarot-card-shadow transition-shadow duration-300",
          sz.rounded,
          selected && "tarot-card-selected"
        )}
        style={{ transformStyle: "preserve-3d" }}
      >
        {reversed && face === "front" && (
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-20 px-1.5 py-0.5 rounded text-[7px] uppercase tracking-wider bg-black/60 text-amber-200/90 border border-amber-500/40 whitespace-nowrap">
            Reversed
          </div>
        )}
        <div className={cn("relative w-full h-full", reversed && face === "front" && "rotate-180")}>
        {face === "back" ? (
          <div
            className={cn(
              "relative w-full h-full overflow-hidden border border-[#c9a227]/40",
              sz.rounded,
              "bg-[#1a0c18]"
            )}
          >
            <TarotBackPattern />
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-black/30 pointer-events-none" />
            {selected && selectionOrder !== undefined && (
              <span className="absolute -top-1.5 -right-1.5 z-10 w-5 h-5 rounded-full bg-gradient-to-br from-[#f0d78c] to-[#9a7b2a] text-[#1a0c18] text-[10px] font-bold flex items-center justify-center shadow-lg border border-[#f0d78c]/50">
                {selectionOrder}
              </span>
            )}
          </div>
        ) : (
          card &&
          art && (
            <div
              className={cn("relative w-full h-full overflow-hidden border-2", sz.rounded)}
              style={{
                borderColor: `${art.gold}99`,
                background: isDarkCard
                  ? `radial-gradient(ellipse at 50% 30%, ${art.gold}22, transparent 55%), linear-gradient(165deg, #1a1018 0%, #0d0808 100%)`
                  : `radial-gradient(ellipse at 50% 0%, ${art.gold}33, transparent 50%), linear-gradient(175deg, ${art.parchment} 0%, ${art.parchment}dd 45%, ${art.parchment}aa 100%)`,
              }}
            >
              <TarotOrnamentFrame />
              {/* Parchment texture overlay */}
              <div
                className="absolute inset-0 opacity-[0.35] mix-blend-multiply pointer-events-none tarot-parchment-noise"
                aria-hidden
              />
              <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/15 pointer-events-none" />

              {/* Top numeral */}
              <div className="absolute top-[8%] left-0 right-0 flex justify-center">
                <span
                  className={cn("font-display tracking-[0.2em]", sz.numeral)}
                  style={{ color: art.gold }}
                >
                  {card.roman}
                </span>
              </div>

              {/* Central symbol */}
              <div className="absolute inset-0 flex flex-col items-center justify-center px-[12%]">
                <div
                  className={cn(
                    "flex items-center justify-center rounded-full border aspect-square w-[42%]",
                    sz.symbol
                  )}
                  style={{
                    borderColor: `${art.gold}66`,
                    color: art.gold,
                    background: `radial-gradient(circle, ${art.gold}18 0%, transparent 70%)`,
                    boxShadow: `inset 0 0 20px ${art.gold}22`,
                  }}
                >
                  <span className="drop-shadow-sm">{art.symbol}</span>
                </div>
                <p
                  className={cn(
                    "font-display text-center leading-tight mt-[6%] line-clamp-2",
                    sz.title
                  )}
                  style={{ color: art.ink }}
                >
                  {card.name}
                </p>
                {size !== "xs" && (
                  <p
                    className="text-[7px] sm:text-[8px] uppercase tracking-[0.25em] mt-1 opacity-60"
                    style={{ color: art.ink }}
                  >
                    {card.keyword}
                  </p>
                )}
              </div>

              {/* Bottom roman (traditional double marker) */}
              <div className="absolute bottom-[6%] left-0 right-0 flex justify-center rotate-180">
                <span className={cn("font-display opacity-40", sz.numeral)} style={{ color: art.gold }}>
                  {card.roman}
                </span>
              </div>
            </div>
          )
        )}
        </div>
      </motion.div>
    </Wrapper>
  );
}
