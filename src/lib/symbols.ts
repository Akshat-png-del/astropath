/**
 * Celestial text symbols used across AstroPath UI.
 * Astrological / geometric glyphs only — no emoji.
 */
export const SYMBOL = {
  star: "✦",
  starAlt: "✧",
  moon: "☽",
  sun: "☉",
  circle: "◎",
  yinYang: "☯",
  ankh: "☥",
  diamond: "◈",
  constellation: "✦",
  house: "⌂",
  mercury: "☿",
  venus: "♀",
  aspect: "△",
  question: "?",
  check: "✓",
} as const;

/** Tarot spread picker icons */
export const TAROT_SPREAD_SYMBOL: Record<string, string> = {
  free: SYMBOL.star,
  love: SYMBOL.venus,
  "yes-no": SYMBOL.question,
  psychic: SYMBOL.moon,
  "celtic-cross": SYMBOL.starAlt,
  daily: SYMBOL.sun,
  oracle: SYMBOL.circle,
  angel: SYMBOL.starAlt,
  osho: SYMBOL.yinYang,
  chinese: SYMBOL.diamond,
  egyptian: SYMBOL.ankh,
  "32-cards": "32",
};

/** Achievement badge icons */
export const ACHIEVEMENT_SYMBOL = {
  firstReading: SYMBOL.star,
  birthChart: SYMBOL.sun,
  tarotSpread: SYMBOL.starAlt,
  streak7: SYMBOL.sun,
  readGuides: SYMBOL.mercury,
  zodiacExplorer: SYMBOL.constellation,
  streak30: SYMBOL.moon,
  savedFirst: SYMBOL.starAlt,
} as const;

/** Learn hub reference guide icons */
export const GUIDE_HUB_SYMBOL = {
  zodiac: SYMBOL.constellation,
  planets: SYMBOL.sun,
  houses: SYMBOL.house,
  tarot: SYMBOL.star,
} as const;

/** Education category icons */
export const CATEGORY_SYMBOL = {
  "astrology-basics": SYMBOL.sun,
  "zodiac-signs": SYMBOL.constellation,
  "birth-charts": SYMBOL.circle,
  planets: SYMBOL.mercury,
  houses: SYMBOL.house,
  aspects: SYMBOL.aspect,
  tarot: SYMBOL.star,
  compatibility: SYMBOL.venus,
} as const;

/** Brand mark used in nav, auth, and empty states */
export const BRAND_MARK = SYMBOL.moon;
