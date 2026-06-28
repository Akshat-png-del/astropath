import type { TarotSpread } from "./types";
import { getSpreadBaseCost, formatCreditCost } from "@/lib/billing/credit-pricing";

export type ReadingDepthBadge = "Quick Insight" | "Detailed Reading" | "Deep Self-Reflection";

export interface SpreadCatalogEntry {
  spreadId: string;
  title: string;
  tagline: string;
  bestFor: string;
  discover: string[];
  depthBadge: ReadingDepthBadge;
  depthLabel: string;
  estimatedMinutes: string;
  creditCost: number;
  creditLabel: string;
  chooserHint?: string;
}

export const READING_CHOOSER = [
  {
    situation: "If you want clarity about today",
    spreadId: "daily",
    spreadName: "Daily Tarot",
  },
  {
    situation: "If you need a quick yes or no",
    spreadId: "yes-no",
    spreadName: "Yes / No Tarot",
  },
  {
    situation: "If you're facing a decision",
    spreadId: "oracle",
    spreadName: "Three Card Spread (Oracle)",
  },
  {
    situation: "If you have relationship questions",
    spreadId: "love",
    spreadName: "Love Tarot",
  },
  {
    situation: "If you're focused on career or purpose",
    spreadId: "psychic",
    spreadName: "Psychic / Career Reading",
  },
  {
    situation: "If you want a complete life overview",
    spreadId: "celtic-cross",
    spreadName: "Celtic Cross",
  },
] as const;

export const TAROT_EDUCATION = [
  {
    id: "spread",
    question: "What is a spread?",
    answer:
      "A spread is the layout of tarot cards — each position represents a part of your question, like past influences, present energy, or possible outcomes.",
  },
  {
    id: "interpret",
    question: "How should I interpret tarot?",
    answer:
      "Treat cards as mirrors for reflection, not fixed predictions. Notice what resonates emotionally and use the reading to ask better questions of yourself.",
  },
  {
    id: "believe",
    question: "Do I need to believe in tarot?",
    answer:
      "No. Many people use tarot as a creative thinking tool. AstroPath readings are designed for self-discovery and entertainment — your interpretation matters most.",
  },
  {
    id: "repeat",
    question: "Can I repeat readings?",
    answer:
      "Yes, but wait until something meaningful shifts. Repeating the same question immediately often produces similar cards — give yourself time to reflect first.",
  },
] as const;

const CATALOG: SpreadCatalogEntry[] = [
  {
    spreadId: "daily",
    title: "Daily Tarot",
    tagline: "One card capturing today's energy and gentle guidance.",
    bestFor: "Morning intention-setting, checking in with yourself, or a quick daily reflection ritual.",
    discover: [
      "Today's central theme",
      "Energy to lean into or soften",
      "A mindful focus for the day",
    ],
    depthBadge: "Quick Insight",
    depthLabel: "Light",
    estimatedMinutes: "1–2 minutes",
    creditCost: 0,
    creditLabel: "Free · once daily",
    chooserHint: "Clarity about today",
  },
  {
    spreadId: "yes-no",
    title: "Yes / No Tarot",
    tagline: "One clear card for a direct question.",
    bestFor: "Simple decisions when you want a straightforward symbolic answer — not a full life reading.",
    discover: [
      "A lean toward yes, no, or pause",
      "The energy behind your question",
      "What to consider before acting",
    ],
    depthBadge: "Quick Insight",
    depthLabel: "Light",
    estimatedMinutes: "1–2 minutes",
    creditCost: 1,
    creditLabel: "1 credit",
    chooserHint: "A quick yes or no",
  },
  {
    spreadId: "oracle",
    title: "Oracle Wisdom",
    tagline: "Three cards for message, lesson, and blessing.",
    bestFor: "Crossroads, new chapters, or when you need perspective without a heavy spread.",
    discover: [
      "Core message for your situation",
      "Lesson the moment is teaching you",
      "A blessing or supportive energy",
    ],
    depthBadge: "Detailed Reading",
    depthLabel: "Moderate",
    estimatedMinutes: "3–4 minutes",
    creditCost: 2,
    creditLabel: "2 credits",
    chooserHint: "Facing a decision",
  },
  {
    spreadId: "angel",
    title: "Angel Tarot",
    tagline: "Comforting three-card guidance — protection, direction, and blessing.",
    bestFor: "Emotional reassurance, grief, anxiety, or when you need gentle support.",
    discover: [
      "Protective or stabilizing energy",
      "Guidance for your next step",
      "A blessing to carry forward",
    ],
    depthBadge: "Detailed Reading",
    depthLabel: "Moderate",
    estimatedMinutes: "3–4 minutes",
    creditCost: 2,
    creditLabel: "2 credits",
  },
  {
    spreadId: "osho",
    title: "Osho Tarot",
    tagline: "Zen-inspired awareness, transformation, and celebration.",
    bestFor: "Inner work, mindfulness, and understanding how a situation is changing you.",
    discover: [
      "What to become aware of now",
      "How transformation is unfolding",
      "What deserves celebration",
    ],
    depthBadge: "Detailed Reading",
    depthLabel: "Moderate",
    estimatedMinutes: "3–4 minutes",
    creditCost: 2,
    creditLabel: "2 credits",
  },
  {
    spreadId: "love",
    title: "Love & Relationships Reading",
    tagline: "Seven cards focused on connection, emotion, and romantic path.",
    bestFor: "Understanding romantic dynamics, emotional blocks, and future possibilities.",
    discover: [
      "Current relationship energies",
      "Emotional challenges between you",
      "Hidden influences affecting love",
      "Guidance for moving forward",
    ],
    depthBadge: "Detailed Reading",
    depthLabel: "Detailed",
    estimatedMinutes: "3–5 minutes",
    creditCost: 3,
    creditLabel: "3 credits",
    chooserHint: "Relationship questions",
  },
  {
    spreadId: "psychic",
    title: "Career & Purpose Reading",
    tagline: "Five cards revealing hidden influences and practical direction.",
    bestFor: "Career crossroads, purpose questions, and situations where something feels blocked or unseen.",
    discover: [
      "Root energy of your situation",
      "Hidden influences at play",
      "Present momentum",
      "Guidance and likely outcome",
    ],
    depthBadge: "Detailed Reading",
    depthLabel: "Detailed",
    estimatedMinutes: "3–5 minutes",
    creditCost: 3,
    creditLabel: "3 credits",
    chooserHint: "Career or purpose focus",
  },
  {
    spreadId: "free",
    title: "Classic Ten-Card Reading",
    tagline: "A wide-angle view of your situation across ten positions.",
    bestFor: "Complex questions where you want past, present, and future layers in one sitting.",
    discover: [
      "Present situation and core challenge",
      "Past influences still active",
      "Near and far possibilities",
      "Your approach and external forces",
      "Hopes, fears, and final outlook",
    ],
    depthBadge: "Deep Self-Reflection",
    depthLabel: "Deep",
    estimatedMinutes: "5–8 minutes",
    creditCost: 4,
    creditLabel: "4 credits",
  },
  {
    spreadId: "celtic-cross",
    title: "Celtic Cross",
    tagline: "The classic ten-card spread for deep situational insight.",
    bestFor: "Major life questions when you want a thorough, layered reading — not a quick answer.",
    discover: [
      "Heart of the matter and crossing tension",
      "Foundation and recent past",
      "Best possible outcome and near future",
      "Your role, environment, and final direction",
    ],
    depthBadge: "Deep Self-Reflection",
    depthLabel: "Deep",
    estimatedMinutes: "5–8 minutes",
    creditCost: 5,
    creditLabel: "5 credits",
    chooserHint: "Complete life overview",
  },
  {
    spreadId: "chinese",
    title: "Chinese Tarot",
    tagline: "Five elements — earth, water, fire, wood, metal — as symbolic lenses.",
    bestFor: "Balance, timing, and understanding how different forces interact in your life.",
    discover: [
      "Elemental themes in your situation",
      "Where energy is stable or shifting",
      "Practical balance to restore",
    ],
    depthBadge: "Detailed Reading",
    depthLabel: "Detailed",
    estimatedMinutes: "4–5 minutes",
    creditCost: 3,
    creditLabel: "3 credits",
  },
  {
    spreadId: "egyptian",
    title: "Egyptian Tarot",
    tagline: "Ancient symbolism through five sacred archetypes.",
    bestFor: "Mystery, transformation, and questions about destiny or soul-level patterns.",
    discover: [
      "Archetypal forces at work",
      "Hidden wisdom in your situation",
      "Path toward integration",
    ],
    depthBadge: "Detailed Reading",
    depthLabel: "Detailed",
    estimatedMinutes: "4–5 minutes",
    creditCost: 3,
    creditLabel: "3 credits",
  },
  {
    spreadId: "32-cards",
    title: "32 Cards Fortune",
    tagline: "Traditional five-card fortune layout — past to outcome.",
    bestFor: "Timing questions, practical outcomes, and straightforward fortune-style readings.",
    discover: [
      "Past and present threads",
      "Hidden factor in the situation",
      "Advice and likely outcome",
    ],
    depthBadge: "Detailed Reading",
    depthLabel: "Detailed",
    estimatedMinutes: "3–5 minutes",
    creditCost: 3,
    creditLabel: "3 credits",
  },
];

export function getSpreadCatalog(spreadId: string): SpreadCatalogEntry | undefined {
  const entry = CATALOG.find((c) => c.spreadId === spreadId);
  if (entry) return entry;
  const base = getSpreadBaseCost(spreadId);
  return {
    spreadId,
    title: spreadId,
    tagline: "Tarot reading",
    bestFor: "Personal reflection and guidance.",
    discover: ["Symbolic insight for your question"],
    depthBadge: "Detailed Reading",
    depthLabel: "Moderate",
    estimatedMinutes: "3–5 minutes",
    creditCost: base,
    creditLabel: formatCreditCost(base),
  };
}

export function enrichSpread(spread: TarotSpread): SpreadCatalogEntry & { spread: TarotSpread } {
  const catalog = getSpreadCatalog(spread.id)!;
  return { ...catalog, spread };
}

export function depthBadgeClass(_badge: ReadingDepthBadge): string {
  return "btn btn-secondary btn-chip uppercase tracking-wider";
}
