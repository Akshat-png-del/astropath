"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";

/** Subtle constellation texture for cards and wheel backgrounds */
export function CelestialPattern({
  className,
  seed = "default",
  density = 12,
}: {
  className?: string;
  seed?: string;
  density?: number;
}) {
  const stars = useMemo(() => {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) hash = (hash << 5) - hash + seed.charCodeAt(i);
    const pts: { x: number; y: number; r: number; o: number }[] = [];
    for (let i = 0; i < density; i++) {
      hash = (hash * 1664525 + 1013904223) >>> 0;
      pts.push({
        x: 8 + (hash % 840) / 10,
        y: 8 + ((hash >> 8) % 840) / 10,
        r: 0.4 + (hash % 3) * 0.25,
        o: 0.15 + (hash % 5) * 0.06,
      });
    }
    return pts;
  }, [seed, density]);

  const lines = useMemo(() => {
    const pairs: [number, number][] = [];
    for (let i = 0; i < Math.min(5, stars.length - 1); i++) {
      pairs.push([i, (i + 3) % stars.length]);
    }
    return pairs;
  }, [stars]);

  return (
    <svg
      className={cn("absolute inset-0 w-full h-full pointer-events-none", className)}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      {lines.map(([a, b], i) => (
        <line
          key={i}
          x1={stars[a].x}
          y1={stars[a].y}
          x2={stars[b].x}
          y2={stars[b].y}
          stroke="rgba(245,240,230,0.06)"
          strokeWidth={0.35}
        />
      ))}
      {stars.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.r} fill={`rgba(245,240,230,${s.o})`} />
      ))}
    </svg>
  );
}

/** Center emblem for birth chart / wheel default state */
export function CelestialEmblem({ size = 48, className }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={cn("text-white/35", className)}
      aria-hidden
    >
      <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth={1} opacity={0.25} fill="none" />
      <circle cx="32" cy="32" r="20" stroke="currentColor" strokeWidth={0.75} opacity={0.15} fill="none" strokeDasharray="3 4" />
      <path
        d="M32 14c2 4 2 8 0 12-2-4-2-8 0-12z"
        stroke="currentColor"
        strokeWidth={1.5}
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="32" cy="38" r="6" stroke="currentColor" strokeWidth={1.5} fill="none" />
      <path d="M26 44c2 3 5 4 6 4s4-1 6-4" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" fill="none" />
    </svg>
  );
}
