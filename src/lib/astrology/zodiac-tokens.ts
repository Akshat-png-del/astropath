import { ZODIAC_TRAITS, ZODIAC_SIGNS_ORDER } from "./zodiac-traits";

export type ZodiacSign = (typeof ZODIAC_SIGNS_ORDER)[number];
export type ZodiacElement = "Fire" | "Earth" | "Air" | "Water";

export const ZODIAC_IVORY = "#f5f0e6";
export const ZODIAC_GOLD = "#d4a053";

export const ELEMENT_TOKENS: Record<
  ZodiacElement,
  { color: string; glow: string; muted: string; label: string }
> = {
  Fire: {
    color: "#d4a053",
    glow: "rgba(212, 160, 83, 0.42)",
    muted: "rgba(212, 160, 83, 0.18)",
    label: "Fire",
  },
  Earth: {
    color: "#a8845a",
    glow: "rgba(139, 154, 107, 0.38)",
    muted: "rgba(168, 132, 90, 0.18)",
    label: "Earth",
  },
  Air: {
    color: "#9eb4c9",
    glow: "rgba(158, 180, 201, 0.38)",
    muted: "rgba(158, 180, 201, 0.16)",
    label: "Air",
  },
  Water: {
    color: "#7a9ea8",
    glow: "rgba(122, 158, 168, 0.4)",
    muted: "rgba(122, 158, 168, 0.18)",
    label: "Water",
  },
};

export function normalizeSignName(sign: string): ZodiacSign | null {
  const match = ZODIAC_SIGNS_ORDER.find((s) => s.toLowerCase() === sign.trim().toLowerCase());
  return match ?? null;
}

export function getSignElement(sign: string): ZodiacElement {
  const normalized = normalizeSignName(sign);
  const element = normalized ? ZODIAC_TRAITS[normalized]?.element : undefined;
  if (element === "Fire" || element === "Earth" || element === "Air" || element === "Water") {
    return element;
  }
  return "Air";
}

export function getElementTokens(sign: string) {
  return ELEMENT_TOKENS[getSignElement(sign)];
}

export function isKnownSign(sign: string): boolean {
  return normalizeSignName(sign) !== null;
}
