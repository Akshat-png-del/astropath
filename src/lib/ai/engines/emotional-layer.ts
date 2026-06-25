/** Emotional intelligence — tone adaptation (private guidance only). */

import type { ProductTopic } from "../topic-detector";

export type EmotionalState =
  | "heartbreak"
  | "grief"
  | "anxiety"
  | "loneliness"
  | "confusion"
  | "hope"
  | "excitement"
  | "uncertainty"
  | "stress"
  | "longing"
  | "neutral";

const EMOTION_PATTERNS: [RegExp, EmotionalState][] = [
  [/\b(broke up|breakup|left me|dumped|heartbreak|heart broken)\b/i, "heartbreak"],
  [/\b(grief|grieving|mourning|passed away|died|loss)\b/i, "grief"],
  [/\b(anxious|anxiety|panic|worried|nervous|scared)\b/i, "anxiety"],
  [/\b(lonely|alone|isolated|no one)\b/i, "loneliness"],
  [/\b(confus|don't understand|unclear|lost)\b/i, "confusion"],
  [/\b(hope|maybe|wish|pray|optimis)\b/i, "hope"],
  [/\b(excited|thrilled|happy|great news|amazing)\b/i, "excitement"],
  [/\b(uncertain|unsure|don't know|conflicted)\b/i, "uncertainty"],
  [/\b(stress|overwhelm|pressure|burned out|exhausted)\b/i, "stress"],
  [/\b(miss|longing|want (her|him|them) back)\b/i, "longing"],
];

const TONE_GUIDANCE: Record<EmotionalState, string> = {
  heartbreak:
    "Lead with compassion. Acknowledge the specific loss before offering insight. Do not rush to fix.",
  grief:
    "Hold space for what was lost. Validate that grief is not linear. Avoid toxic positivity.",
  anxiety:
    "Ground the response. Offer clarity and steadiness without dismissing their fear.",
  loneliness:
    "Name the ache of disconnection. Offer warmth without platitudes.",
  confusion:
    "Help them sort signal from noise. Be clear and structured without being clinical.",
  hope:
    "Honour their hope while keeping expectations nuanced — possibility, not certainty.",
  excitement:
    "Match their energy while adding thoughtful perspective they may not have considered.",
  uncertainty:
    "Normalise not having answers yet. Offer frameworks for deciding rather than one verdict.",
  stress:
    "Acknowledge the weight. Prioritise one actionable step over comprehensive advice.",
  longing:
    "Validate the depth of feeling. Separate longing from whether reunion would be healthy.",
  neutral:
    "Be warm and direct. Let their words set the emotional temperature.",
};

export function detectEmotionalState(message: string, tone: "negative" | "positive" | "neutral"): EmotionalState {
  for (const [re, state] of EMOTION_PATTERNS) {
    if (re.test(message)) return state;
  }
  if (tone === "negative") return "uncertainty";
  if (tone === "positive") return "excitement";
  return "neutral";
}

export function toneGuidanceFor(state: EmotionalState, topic: ProductTopic): string {
  const base = TONE_GUIDANCE[state];
  if (topic === "career" && (state === "stress" || state === "anxiety")) {
    return `${base} Focus on professional context — do not reference unrelated personal history.`;
  }
  if ((topic === "breakup" || topic === "reconciliation") && state === "longing") {
    return `${base} Address reconciliation outlook directly if they asked — use may/could, never guarantee.`;
  }
  return base;
}
