"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { getElementTokens, normalizeSignName, ZODIAC_IVORY, type ZodiacSign } from "@/lib/astrology/zodiac-tokens";

const STROKE = 1.75;

interface GlyphProps {
  stroke: string;
  accent: string;
}

function AriesGlyph({ stroke, accent }: GlyphProps) {
  return (
    <>
      <path
        d="M17 43c5-12 11-17 15-13 4-4 10 1 15 13"
        stroke={stroke}
        strokeWidth={STROKE}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M32 43V27M32 27l-8-9M32 27l8-9"
        stroke={stroke}
        strokeWidth={STROKE}
        strokeLinecap="round"
      />
      <path
        d="M32 12c1.2 2.4 2.4 3.6 2.4 5.4s-1.2 2.4-2.4 3.6c-1.2-1.2-2.4-2-2.4-3.6S30.8 14.4 32 12z"
        stroke={accent}
        strokeWidth={1.4}
        strokeLinejoin="round"
        fill="none"
      />
    </>
  );
}

function TaurusGlyph({ stroke, accent }: GlyphProps) {
  return (
    <>
      <circle cx="32" cy="34" r="11" stroke={stroke} strokeWidth={STROKE} />
      <path
        d="M21 24c-3-5-1-10 4-10 3 0 5 2 7 5M43 24c3-5 1-10-4-10-3 0-5 2-7 5"
        stroke={stroke}
        strokeWidth={STROKE}
        strokeLinecap="round"
      />
      <path
        d="M44 18a6 6 0 0 0-10.5 3"
        stroke={accent}
        strokeWidth={1.4}
        strokeLinecap="round"
        fill="none"
      />
    </>
  );
}

function GeminiGlyph({ stroke, accent }: GlyphProps) {
  return (
    <>
      <path d="M24 18v28M40 18v28" stroke={stroke} strokeWidth={STROKE} strokeLinecap="round" />
      <path d="M20 22h8M36 22h8M20 42h8M36 42h8" stroke={stroke} strokeWidth={STROKE} strokeLinecap="round" />
      <circle cx="22" cy="14" r="1.6" fill={accent} />
      <circle cx="42" cy="14" r="1.6" fill={accent} />
      <path d="M23.6 14h16.8" stroke={accent} strokeWidth={1.2} strokeLinecap="round" opacity={0.85} />
    </>
  );
}

function CancerGlyph({ stroke, accent }: GlyphProps) {
  return (
    <>
      <path
        d="M20 36c8-10 16-10 24 0M44 28c-8 10-16 10-24 0"
        stroke={stroke}
        strokeWidth={STROKE}
        strokeLinecap="round"
      />
      <circle cx="20" cy="36" r="2.2" stroke={stroke} strokeWidth={1.4} />
      <circle cx="44" cy="28" r="2.2" stroke={stroke} strokeWidth={1.4} />
      <path
        d="M28 48c2-3 4-4 4-6s-2-3-4-6"
        stroke={accent}
        strokeWidth={1.3}
        strokeLinecap="round"
        fill="none"
      />
    </>
  );
}

function LeoGlyph({ stroke, accent }: GlyphProps) {
  return (
    <>
      <circle cx="32" cy="34" r="9" stroke={stroke} strokeWidth={STROKE} />
      <path
        d="M32 25c-5-1-9 2-9 7 0 4 3 7 9 8"
        stroke={stroke}
        strokeWidth={STROKE}
        strokeLinecap="round"
        fill="none"
      />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const x1 = 32 + Math.cos(rad) * 14;
        const y1 = 16 + Math.sin(rad) * 14;
        const x2 = 32 + Math.cos(rad) * 18;
        const y2 = 16 + Math.sin(rad) * 18;
        return (
          <path
            key={deg}
            d={`M${x1} ${y1}L${x2} ${y2}`}
            stroke={accent}
            strokeWidth={1.2}
            strokeLinecap="round"
            opacity={0.75}
          />
        );
      })}
    </>
  );
}

function VirgoGlyph({ stroke, accent }: GlyphProps) {
  return (
    <>
      <path
        d="M22 18v22M30 18v22M38 18v14c0 6-3 9-8 9"
        stroke={stroke}
        strokeWidth={STROKE}
        strokeLinecap="round"
      />
      <path
        d="M22 18c0-4 3-6 8-6s8 2 8 6"
        stroke={stroke}
        strokeWidth={STROKE}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M28 46c0-2 1.5-3.5 4-3.5s4 1.5 4 3.5"
        stroke={accent}
        strokeWidth={1.3}
        strokeLinecap="round"
        fill="none"
      />
      <path d="M30 44v-3M34 44v-3" stroke={accent} strokeWidth={1.1} strokeLinecap="round" opacity={0.8} />
    </>
  );
}

function LibraGlyph({ stroke, accent }: GlyphProps) {
  return (
    <>
      <path d="M20 40h24" stroke={stroke} strokeWidth={STROKE} strokeLinecap="round" />
      <path d="M32 40V24" stroke={stroke} strokeWidth={STROKE} strokeLinecap="round" />
      <path d="M22 24h20" stroke={stroke} strokeWidth={STROKE} strokeLinecap="round" />
      <path
        d="M22 28c0 4 3 7 10 7s10-3 10-7"
        stroke={stroke}
        strokeWidth={STROKE}
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="22" cy="28" r="2" stroke={accent} strokeWidth={1.3} />
      <circle cx="42" cy="28" r="2" stroke={accent} strokeWidth={1.3} />
      <path d="M32 16l2 4-2 1.5-2-1.5 2-4z" stroke={accent} strokeWidth={1.1} fill="none" />
    </>
  );
}

function ScorpioGlyph({ stroke, accent }: GlyphProps) {
  return (
    <>
      <path
        d="M22 18v22M30 18v22M38 18v14c0 6-3 9-8 9"
        stroke={stroke}
        strokeWidth={STROKE}
        strokeLinecap="round"
      />
      <path
        d="M38 41l6 5M38 41l-1 6"
        stroke={stroke}
        strokeWidth={STROKE}
        strokeLinecap="round"
      />
      <path d="M43.5 46.5l2.5 3" stroke={accent} strokeWidth={1.5} strokeLinecap="round" />
    </>
  );
}

function SagittariusGlyph({ stroke, accent }: GlyphProps) {
  return (
    <>
      <path d="M20 44l24-24" stroke={stroke} strokeWidth={STROKE} strokeLinecap="round" />
      <path d="M34 20h10v10" stroke={stroke} strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M18 38l6-6"
        stroke={accent}
        strokeWidth={1.4}
        strokeLinecap="round"
      />
      <path d="M16 36l4 2-2 4" stroke={accent} strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  );
}

function CapricornGlyph({ stroke, accent }: GlyphProps) {
  return (
    <>
      <path
        d="M22 18v22M30 18v22M38 18v10c0 5-2 8-6 10"
        stroke={stroke}
        strokeWidth={STROKE}
        strokeLinecap="round"
      />
      <path
        d="M38 38c4-2 7-6 7-11"
        stroke={stroke}
        strokeWidth={STROKE}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M16 46l6-4 4 2 6-6"
        stroke={accent}
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </>
  );
}

function AquariusGlyph({ stroke, accent }: GlyphProps) {
  return (
    <>
      <path
        d="M18 26c4-3 8-3 12 0s8 3 12 0M18 36c4-3 8-3 12 0s8 3 12 0"
        stroke={stroke}
        strokeWidth={STROKE}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M24 18c2 2 4 2 6 0M34 18c2 2 4 2 6 0"
        stroke={accent}
        strokeWidth={1.3}
        strokeLinecap="round"
        opacity={0.85}
      />
    </>
  );
}

function PiscesGlyph({ stroke, accent }: GlyphProps) {
  return (
    <>
      <path
        d="M22 22c-6 6-6 14 0 20M42 22c6 6 6 14 0 20"
        stroke={stroke}
        strokeWidth={STROKE}
        strokeLinecap="round"
        fill="none"
      />
      <path d="M26 32h12" stroke={stroke} strokeWidth={STROKE} strokeLinecap="round" />
      <path
        d="M20 46c3-1 5-1 8 0M36 46c3-1 5-1 8 0"
        stroke={accent}
        strokeWidth={1.2}
        strokeLinecap="round"
        opacity={0.8}
      />
    </>
  );
}

const GLYPHS: Record<ZodiacSign, (props: GlyphProps) => ReactNode> = {
  Aries: AriesGlyph,
  Taurus: TaurusGlyph,
  Gemini: GeminiGlyph,
  Cancer: CancerGlyph,
  Leo: LeoGlyph,
  Virgo: VirgoGlyph,
  Libra: LibraGlyph,
  Scorpio: ScorpioGlyph,
  Sagittarius: SagittariusGlyph,
  Capricorn: CapricornGlyph,
  Aquarius: AquariusGlyph,
  Pisces: PiscesGlyph,
};

export interface ZodiacIconProps {
  sign: string;
  size?: number;
  className?: string;
  /** Show outer celestial ring */
  ring?: boolean;
  /** Enable hover shimmer class (parent should be interactive) */
  shimmer?: boolean;
  /** Override element accent color */
  accentColor?: string;
}

export function ZodiacIcon({
  sign,
  size = 32,
  className,
  ring = true,
  shimmer = false,
  accentColor,
}: ZodiacIconProps) {
  const normalized = normalizeSignName(sign) ?? "Aries";
  const tokens = getElementTokens(normalized);
  const accent = accentColor ?? tokens.color;
  const Glyph = GLYPHS[normalized];

  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      aria-hidden={!sign}
      role="img"
      aria-label={sign ? `${sign} zodiac sign` : undefined}
      className={cn(
        "zodiac-icon shrink-0",
        shimmer && "zodiac-icon-shimmer",
        className
      )}
      style={
        {
          "--zodiac-stroke": ZODIAC_IVORY,
          "--zodiac-accent": accent,
          "--zodiac-glow": tokens.glow,
        } as React.CSSProperties
      }
    >
      {ring && (
        <circle
          cx="32"
          cy="32"
          r="29"
          stroke={accent}
          strokeWidth={1}
          opacity={0.28}
          fill="none"
        />
      )}
      <circle cx="32" cy="32" r="29" stroke="rgba(245,240,230,0.06)" strokeWidth={0.75} fill="none" />
      <g className="zodiac-icon-glyphs">
        <Glyph stroke={ZODIAC_IVORY} accent={accent} />
      </g>
    </svg>
  );
}

export function ZodiacIconPair({
  sign1,
  sign2,
  size = 36,
  className,
}: {
  sign1: string;
  sign2: string;
  size?: number;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <ZodiacIcon sign={sign1} size={size} shimmer />
      <span className="text-silver-faint/90 text-xs font-display">×</span>
      <ZodiacIcon sign={sign2} size={size} shimmer />
    </div>
  );
}
