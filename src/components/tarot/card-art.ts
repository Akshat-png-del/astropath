/** Visual identity per Major Arcana — Rider-Waite inspired palette & symbols */

export interface CardArt {
  symbol: string;
  /** Center motif label for accessibility */
  motif: string;
  /** Parchment tint */
  parchment: string;
  /** Gold accent */
  gold: string;
  /** Deep border / shadow tone */
  ink: string;
}

export const CARD_ART: Record<number, CardArt> = {
  0: { symbol: "☀", motif: "cliff & dog", parchment: "#f0e6d2", gold: "#c9a227", ink: "#3d2914" },
  1: { symbol: "∞", motif: "wand & table", parchment: "#efe8dc", gold: "#d4af37", ink: "#2a1f3d" },
  2: { symbol: "☽", motif: "veil & pillars", parchment: "#e8e4f0", gold: "#b8a9c9", ink: "#1a1530" },
  3: { symbol: "♀", motif: "crown & wheat", parchment: "#f2ebe0", gold: "#c9a227", ink: "#3d2e1a" },
  4: { symbol: "♔", motif: "throne & ram", parchment: "#ebe4d8", gold: "#b8860b", ink: "#2c1810" },
  5: { symbol: "✠", motif: "keys & throne", parchment: "#ede8e0", gold: "#c9a227", ink: "#2a2218" },
  6: { symbol: "♥", motif: "angel & lovers", parchment: "#f5ebe8", gold: "#c9a227", ink: "#3d2020" },
  7: { symbol: "☤", motif: "chariot & sphinx", parchment: "#e8eef5", gold: "#8fa4c4", ink: "#1a2840" },
  8: { symbol: "∞", motif: "lion & maiden", parchment: "#f0ebe5", gold: "#c9a227", ink: "#3d3018" },
  9: { symbol: "✧", motif: "lantern & peak", parchment: "#e8eaf0", gold: "#9aa8c4", ink: "#1e2438" },
  10: { symbol: "☸", motif: "wheel & creatures", parchment: "#f0ece4", gold: "#c9a227", ink: "#2a2218" },
  11: { symbol: "⚖", motif: "sword & scales", parchment: "#ece8f0", gold: "#a89cc4", ink: "#221a30" },
  12: { symbol: "△", motif: "hanged man", parchment: "#ebe8f0", gold: "#8a9cc4", ink: "#1a2038" },
  13: { symbol: "☠", motif: "flag & rose", parchment: "#e8e8ec", gold: "#9090a8", ink: "#181820" },
  14: { symbol: "☯", motif: "angel & cups", parchment: "#f0ece8", gold: "#c9a227", ink: "#2a2820" },
  15: { symbol: "⛓", motif: "chains & throne", parchment: "#1a1218", gold: "#8b4513", ink: "#0a0608" },
  16: { symbol: "⚡", motif: "tower & flame", parchment: "#2a1818", gold: "#c9a227", ink: "#100808" },
  17: { symbol: "✦", motif: "star & pool", parchment: "#e8eef8", gold: "#7eb8e8", ink: "#142038" },
  18: { symbol: "☾", motif: "moon & crayfish", parchment: "#e4e8f0", gold: "#9aa8c8", ink: "#1a2030" },
  19: { symbol: "☉", motif: "sun & child", parchment: "#faf3e0", gold: "#e8b923", ink: "#3d3010" },
  20: { symbol: "♪", motif: "trumpet & rising", parchment: "#f0ece8", gold: "#c9a227", ink: "#2a2420" },
  21: { symbol: "◎", motif: "wreath & dancer", parchment: "#f0ebe5", gold: "#c9a227", ink: "#2a2818" },
};

export function getCardArt(cardId: number): CardArt {
  return CARD_ART[cardId] ?? CARD_ART[0];
}

export type TarotCardSize = "xs" | "sm" | "md" | "lg";

export const TAROT_SIZE: Record<TarotCardSize, { w: string; rounded: string; numeral: string; title: string; symbol: string }> = {
  xs: { w: "w-full", rounded: "rounded-[6px]", numeral: "text-[7px]", title: "text-[6px]", symbol: "text-sm" },
  sm: { w: "w-20 sm:w-24", rounded: "rounded-lg", numeral: "text-[9px]", title: "text-[10px]", symbol: "text-xl" },
  md: { w: "w-20 sm:w-24 md:w-28", rounded: "rounded-xl", numeral: "text-xs", title: "text-xs", symbol: "text-3xl" },
  lg: { w: "w-44 sm:w-52", rounded: "rounded-xl", numeral: "text-sm", title: "text-sm", symbol: "text-5xl" },
};
