"use client";

import { cn } from "@/lib/utils";
import { ZODIAC_TRAITS, ZODIAC_SIGNS_ORDER } from "@/lib/astrology/zodiac-traits";
import { getElementTokens } from "@/lib/astrology/zodiac-tokens";
import { ZodiacSignImage } from "@/components/cosmic/ZodiacSignImage";
import { CelestialPattern } from "@/components/zodiac/CelestialPattern";

interface ZodiacCardProps {
  sign: string;
  className?: string;
  compact?: boolean;
  onClick?: () => void;
}

/** Reusable sign card with element accent and premium styling */
export function ZodiacCard({ sign, className, compact = false, onClick }: ZodiacCardProps) {
  const traits = ZODIAC_TRAITS[sign];
  const tokens = getElementTokens(sign);
  if (!traits) return null;

  const Tag = onClick ? "button" : "div";

  return (
    <Tag
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={cn(
        "relative overflow-hidden rounded-2xl border text-left transition-all duration-500",
        "bg-white/[0.03] backdrop-blur-md",
        onClick && "cursor-pointer hover:scale-[1.02] zodiac-icon-interactive",
        compact ? "p-4" : "p-6",
        className
      )}
      style={{
        borderColor: tokens.muted,
        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.04), 0 0 32px ${tokens.muted}`,
      }}
    >
      <CelestialPattern className="opacity-40" seed={sign} />
      <div className="relative z-10 flex flex-col items-center text-center">
        <ZodiacSignImage sign={sign} size={compact ? 40 : 56} interactive shimmer ring />
        <h3 className={cn("font-display text-white/90", compact ? "text-lg mt-3" : "text-2xl mt-4")}>
          {sign}
        </h3>
        <p className="text-[10px] text-white/35 tracking-[0.2em] uppercase mt-1">
          {traits.archetype} · {traits.element}
        </p>
        {!compact && (
          <p className="text-sm text-white/45 leading-relaxed mt-4">{traits.emotional}</p>
        )}
      </div>
    </Tag>
  );
}

export { ZODIAC_SIGNS_ORDER };
