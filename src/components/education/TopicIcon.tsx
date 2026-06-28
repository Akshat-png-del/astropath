"use client";

import { cn } from "@/lib/utils";
import { ZodiacIcon } from "@/components/zodiac/ZodiacIcon";
import { CATEGORY_SYMBOL } from "@/lib/symbols";
import type { EducationCategoryId } from "@/content/education/types";

export type TopicIconId = EducationCategoryId | "zodiac";

const ZODIAC_TOPICS = new Set<TopicIconId>(["zodiac", "zodiac-signs"]);

interface TopicIconProps {
  topic: TopicIconId;
  size?: number;
  className?: string;
}

function symbolForTopic(topic: TopicIconId): string {
  if (topic === "zodiac") return CATEGORY_SYMBOL["zodiac-signs"];
  return CATEGORY_SYMBOL[topic];
}

/** Category / hub icon — SVG zodiac glyphs instead of Unicode emoji signs */
export function TopicIcon({ topic, size = 28, className }: TopicIconProps) {
  if (ZODIAC_TOPICS.has(topic)) {
    return (
      <span className={cn("inline-flex items-center justify-center text-silver-dim/85", className)}>
        <ZodiacIcon sign="Aries" size={size} ring={false} />
      </span>
    );
  }

  return (
    <span
      className={cn("inline-flex items-center justify-center text-silver-muted/90 leading-none", className)}
      style={{ fontSize: size * 0.72, width: size, height: size }}
      aria-hidden
    >
      {symbolForTopic(topic)}
    </span>
  );
}
