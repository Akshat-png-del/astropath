/** Ornate corner flourishes for tarot card frames */

import { useId } from "react";

export function TarotOrnamentFrame({ className = "" }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const goldId = `tarot-gold-${uid}`;

  return (
    <svg
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      viewBox="0 0 100 150"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id={goldId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f0d78c" />
          <stop offset="50%" stopColor="#c9a227" />
          <stop offset="100%" stopColor="#8b6914" />
        </linearGradient>
      </defs>
      <rect x="3" y="3" width="94" height="144" fill="none" stroke={`url(#${goldId})`} strokeWidth="0.6" rx="2" />
      <rect x="6" y="6" width="88" height="138" fill="none" stroke={`url(#${goldId})`} strokeWidth="0.3" opacity="0.6" rx="1.5" />
      <path d="M6 6 Q6 14 14 14 M6 6 Q14 6 14 14" fill="none" stroke={`url(#${goldId})`} strokeWidth="0.5" />
      <path d="M86 6 Q86 14 94 14 M86 6 Q94 6 94 14" fill="none" stroke={`url(#${goldId})`} strokeWidth="0.5" />
      <path d="M6 136 Q6 144 14 144 M6 136 Q14 136 14 144" fill="none" stroke={`url(#${goldId})`} strokeWidth="0.5" />
      <path d="M86 136 Q86 144 94 144 M86 136 Q94 136 94 144" fill="none" stroke={`url(#${goldId})`} strokeWidth="0.5" />
      {[20, 40, 60, 80, 100, 120].map((y) => (
        <circle key={`l${y}`} cx="4.5" cy={y} r="0.4" fill={`url(#${goldId})`} opacity="0.5" />
      ))}
      {[20, 40, 60, 80, 100, 120].map((y) => (
        <circle key={`r${y}`} cx="95.5" cy={y} r="0.4" fill={`url(#${goldId})`} opacity="0.5" />
      ))}
    </svg>
  );
}

export function TarotBackPattern() {
  const uid = useId().replace(/:/g, "");
  const deepId = `back-deep-${uid}`;
  const goldId = `back-gold-${uid}`;
  const diamondId = `back-diamond-${uid}`;

  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 100 150"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <linearGradient id={deepId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1a0c18" />
          <stop offset="50%" stopColor="#2a1428" />
          <stop offset="100%" stopColor="#120810" />
        </linearGradient>
        <linearGradient id={goldId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e8c86a" />
          <stop offset="100%" stopColor="#9a7b2a" />
        </linearGradient>
        <pattern id={diamondId} width="8" height="8" patternUnits="userSpaceOnUse">
          <path d="M4 0 L8 4 L4 8 L0 4 Z" fill="none" stroke={`url(#${goldId})`} strokeWidth="0.15" opacity="0.25" />
        </pattern>
      </defs>
      <rect width="100" height="150" fill={`url(#${deepId})`} />
      <rect width="100" height="150" fill={`url(#${diamondId})`} />
      <rect x="4" y="4" width="92" height="142" fill="none" stroke={`url(#${goldId})`} strokeWidth="0.8" rx="2" />
      <rect x="8" y="8" width="84" height="134" fill="none" stroke={`url(#${goldId})`} strokeWidth="0.35" opacity="0.5" rx="1.5" />
      <circle cx="50" cy="75" r="28" fill="none" stroke={`url(#${goldId})`} strokeWidth="0.4" opacity="0.7" />
      <circle cx="50" cy="75" r="20" fill="none" stroke={`url(#${goldId})`} strokeWidth="0.3" opacity="0.5" />
      <circle cx="50" cy="75" r="12" fill="none" stroke={`url(#${goldId})`} strokeWidth="0.25" opacity="0.4" />
      <path d="M50 55 L50 95 M35 75 L65 75" stroke={`url(#${goldId})`} strokeWidth="0.35" opacity="0.6" />
      <path d="M50 62 L43 75 L50 88 L57 75 Z" fill="none" stroke={`url(#${goldId})`} strokeWidth="0.3" opacity="0.5" />
      {[[18, 22], [82, 22], [18, 128], [82, 128]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x},${y})`}>
          <path
            d="M0 -5 L1.2 -1.2 L5 0 L1.2 1.2 L0 5 L-1.2 1.2 L-5 0 L-1.2 -1.2 Z"
            fill={`url(#${goldId})`}
            opacity="0.55"
          />
        </g>
      ))}
      <path d="M42 18 Q50 12 58 18" fill="none" stroke={`url(#${goldId})`} strokeWidth="0.3" opacity="0.45" />
      <path d="M42 132 Q50 138 58 132" fill="none" stroke={`url(#${goldId})`} strokeWidth="0.3" opacity="0.45" />
    </svg>
  );
}
