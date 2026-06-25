import type { ChatIntent } from "./intent-classifier";

/** Planet/house themes per intent — principles only, never sign trait templates. */
export function planetThemeForIntent(intent: ChatIntent): string {
  const themes: Record<ChatIntent, string> = {
    breakup: "Venus and the Moon — love patterns, emotional cycles, and healing timing",
    relationship: "Venus — connection, reciprocity, and relationship timing",
    career: "Saturn and Jupiter — discipline, opportunity, and career cycles",
    finance: "Jupiter and the 2nd house — stability, growth, and practical planning",
    health: "the Moon and 6th house — rest, stress rhythms, and energy (not medical advice)",
    spirituality: "Neptune and the 12th house — meaning, intuition, and inner growth",
    emotional_support: "the Moon — emotional processing and what brings steadiness",
    general: "the Sun — core identity and life direction",
  };
  return themes[intent];
}

/** One-line dynamic astro hint for prompts — no per-sign templates. */
export function getDynamicAstroHint(intent: ChatIntent): string {
  const planet = planetThemeForIntent(intent);
  return `Weave ${planet.toLowerCase()} as supporting context (~30%) — one insight tied to their situation, not sign trait lists.`;
}
