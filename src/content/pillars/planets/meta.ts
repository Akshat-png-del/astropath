export interface PlanetMeta {
  slug: string;
  name: string;
  symbol: string;
  type: "luminary" | "personal" | "social" | "outer";
  rulesSigns: string[];
  exaltation?: string;
  detriment?: string;
  fall?: string;
  keywords: string[];
}

export const PLANET_SLUGS = [
  "sun",
  "moon",
  "mercury",
  "venus",
  "mars",
  "jupiter",
  "saturn",
  "uranus",
  "neptune",
  "pluto",
] as const;

export type PlanetSlug = (typeof PLANET_SLUGS)[number];

export const PLANET_META: Record<PlanetSlug, PlanetMeta> = {
  sun: {
    slug: "sun",
    name: "Sun",
    symbol: "☉",
    type: "luminary",
    rulesSigns: ["Leo"],
    exaltation: "Aries",
    detriment: "Aquarius",
    fall: "Libra",
    keywords: ["identity", "vitality", "purpose", "ego", "conscious will"],
  },
  moon: {
    slug: "moon",
    name: "Moon",
    symbol: "☽",
    type: "luminary",
    rulesSigns: ["Cancer"],
    exaltation: "Taurus",
    detriment: "Capricorn",
    fall: "Scorpio",
    keywords: ["emotions", "habits", "memory", "needs", "instinct"],
  },
  mercury: {
    slug: "mercury",
    name: "Mercury",
    symbol: "☿",
    type: "personal",
    rulesSigns: ["Gemini", "Virgo"],
    exaltation: "Virgo",
    detriment: "Sagittarius",
    fall: "Pisces",
    keywords: ["communication", "thinking", "learning", "curiosity", "logic"],
  },
  venus: {
    slug: "venus",
    name: "Venus",
    symbol: "♀",
    type: "personal",
    rulesSigns: ["Taurus", "Libra"],
    exaltation: "Pisces",
    detriment: "Aries",
    fall: "Virgo",
    keywords: ["love", "beauty", "values", "pleasure", "attraction"],
  },
  mars: {
    slug: "mars",
    name: "Mars",
    symbol: "♂",
    type: "personal",
    rulesSigns: ["Aries"],
    exaltation: "Capricorn",
    detriment: "Libra",
    fall: "Cancer",
    keywords: ["drive", "action", "desire", "conflict", "courage"],
  },
  jupiter: {
    slug: "jupiter",
    name: "Jupiter",
    symbol: "♃",
    type: "social",
    rulesSigns: ["Sagittarius"],
    exaltation: "Cancer",
    detriment: "Gemini",
    fall: "Capricorn",
    keywords: ["expansion", "faith", "growth", "luck", "wisdom"],
  },
  saturn: {
    slug: "saturn",
    name: "Saturn",
    symbol: "♄",
    type: "social",
    rulesSigns: ["Capricorn"],
    exaltation: "Libra",
    detriment: "Cancer",
    fall: "Aries",
    keywords: ["discipline", "limits", "maturity", "structure", "karma"],
  },
  uranus: {
    slug: "uranus",
    name: "Uranus",
    symbol: "♅",
    type: "outer",
    rulesSigns: ["Aquarius"],
    keywords: ["innovation", "rebellion", "freedom", "sudden change", "awakening"],
  },
  neptune: {
    slug: "neptune",
    name: "Neptune",
    symbol: "♆",
    type: "outer",
    rulesSigns: ["Pisces"],
    keywords: ["dreams", "spirituality", "illusion", "compassion", "dissolution"],
  },
  pluto: {
    slug: "pluto",
    name: "Pluto",
    symbol: "♇",
    type: "outer",
    rulesSigns: ["Scorpio"],
    keywords: ["transformation", "power", "death", "rebirth", "shadow"],
  },
};
