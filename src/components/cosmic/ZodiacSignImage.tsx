"use client";

import { cn } from "@/lib/utils";
import { ZodiacIcon } from "@/components/zodiac/ZodiacIcon";
import { getElementTokens, isKnownSign } from "@/lib/astrology/zodiac-tokens";

interface ZodiacSignImageProps {
  sign: string;
  size?: number;
  className?: string;
  priority?: boolean;
  ring?: boolean;
  interactive?: boolean;
  shimmer?: boolean;
}

/** Unified zodiac sign renderer — handcrafted line-art icons with element accents */
export function ZodiacSignImage({
  sign,
  size = 28,
  className,
  ring = true,
  interactive = false,
  shimmer = false,
}: ZodiacSignImageProps) {
  if (!isKnownSign(sign)) {
    return (
      <span
        className={cn("inline-flex items-center justify-center rounded-full border border-silver/20 text-silver-muted/80", className)}
        style={{ width: size, height: size, fontSize: size * 0.35 }}
      >
        ·
      </span>
    );
  }

  const tokens = getElementTokens(sign);

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center",
        interactive && "zodiac-icon-interactive",
        className
      )}
      style={{ filter: interactive ? undefined : `drop-shadow(0 0 10px ${tokens.glow})` }}
    >
      <ZodiacIcon sign={sign} size={size} ring={ring} shimmer={shimmer || interactive} />
    </span>
  );
}
