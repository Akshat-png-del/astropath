import { hasTopicKeyword, scoreTopic, TOPIC_KEYWORDS } from "./message-topics";

export type ChatIntent =
  | "breakup"
  | "relationship"
  | "career"
  | "finance"
  | "health"
  | "spirituality"
  | "emotional_support"
  | "general";

export type EmotionalSituation =
  | "breakup"
  | "career_stress"
  | "anxiety"
  | "loneliness"
  | "grief"
  | "relationship_conflict"
  | "financial_stress"
  | "none";

export interface IntentClassification {
  intent: ChatIntent;
  confidence: number;
  scores: Record<ChatIntent, number>;
}

const BREAKUP_PATTERNS = [
  "left me",
  "broke up",
  "breakup",
  "break up",
  "dumped",
  "dumped me",
  "he left",
  "she left",
  "they left",
  "boyfriend left",
  "girlfriend left",
  "husband left",
  "wife left",
  "partner left",
  "ended things",
  "walked away",
  "separation",
  "divorced",
  "getting divorced",
  "heartbroken",
  "ex left",
];

const VAGUE_FOLLOWUP =
  /\b(future|coming|ahead|expect|in my way|what.?s next|going to happen|outlook|forecast|next few months|this year|soon)\b/i;

const TOPIC_SHIFT_PATTERNS = [
  /\b(now i want to ask|now i want to talk|i want to ask about)\b/i,
  /\b(i am |i'm )talking about\b/i,
  /\blet'?s (discuss|talk about)\b/i,
  /\bchanging topic\b/i,
  /\banother question\b/i,
  /\bcareer question\b/i,
  /\b(job|career|finance|money|health|spiritual) question\b/i,
  /\b(switch|move on) to\b/i,
  /\bdifferent topic\b/i,
  /\bnew topic\b/i,
  /\bforget (that|about)|leave that\b/i,
];

export const INTENT_SWITCH_THRESHOLD = 0.7;

export function isVagueFollowUp(text: string): boolean {
  const t = text.trim();
  if (!t) return false;
  if (!VAGUE_FOLLOWUP.test(t)) return false;
  const hasSpecificDomain =
    scoreTopic(t, TOPIC_KEYWORDS.relationship) > 0 ||
    scoreTopic(t, TOPIC_KEYWORDS.career) > 0 ||
    scoreTopic(t, TOPIC_KEYWORDS.finance) > 0 ||
    scoreTopic(t, TOPIC_KEYWORDS.health) > 0;
  return !hasSpecificDomain || t.split(/\s+/).length < 12;
}

export function detectExplicitTopicShift(message: string): boolean {
  const t = message.trim();
  if (!t) return false;
  return TOPIC_SHIFT_PATTERNS.some((re) => re.test(t));
}

export function detectBreakupInText(text: string): boolean {
  const lower = text.toLowerCase();
  return BREAKUP_PATTERNS.some((p) => lower.includes(p));
}

export function detectEmotionalSituation(messages: string[]): EmotionalSituation {
  const combined = messages.join(" ").toLowerCase();

  if (detectBreakupInText(combined)) return "breakup";
  if (/\b(lonely|loneliness|alone|no one|isolated)\b/.test(combined)) return "loneliness";
  if (/\b(anxious|anxiety|panic|worried|overthinking|can't sleep)\b/.test(combined)) return "anxiety";
  if (/\b(grief|passed away|died|loss|mourning)\b/.test(combined)) return "grief";
  if (/\b(fight|fighting|argument|conflict|cheat|cheating|trust issue)\b/.test(combined)) {
    return "relationship_conflict";
  }
  if (scoreTopic(combined, TOPIC_KEYWORDS.career) >= 2 && hasTopicKeyword(combined, "emotions_negative")) {
    return "career_stress";
  }
  if (scoreTopic(combined, TOPIC_KEYWORDS.finance) >= 1 && hasTopicKeyword(combined, "emotions_negative")) {
    return "financial_stress";
  }
  if (hasTopicKeyword(combined, "emotions_negative") && scoreTopic(combined, TOPIC_KEYWORDS.relationship) === 0) {
    return "anxiety";
  }

  return "none";
}

function scoreIntents(message: string): Record<ChatIntent, number> {
  const t = message.trim();
  const lower = t.toLowerCase();

  const scores: Record<ChatIntent, number> = {
    breakup: 0,
    relationship: 0,
    career: 0,
    finance: 0,
    health: 0,
    spirituality: 0,
    emotional_support: 0,
    general: 0.15,
  };

  if (detectBreakupInText(t)) scores.breakup += 0.92;

  const relScore = scoreTopic(t, TOPIC_KEYWORDS.relationship) + scoreTopic(t, TOPIC_KEYWORDS.marriage);
  if (relScore > 0 && scores.breakup < 0.5) scores.relationship += 0.55 + relScore * 0.15;

  const careerScore = scoreTopic(t, TOPIC_KEYWORDS.career);
  if (careerScore > 0) scores.career += 0.55 + careerScore * 0.2;
  if (/\bcareer question\b/i.test(t)) scores.career += 0.45;
  if (/\b(job|work|promotion|interview|boss|salary)\b/i.test(lower)) scores.career += 0.35;

  const financeScore = scoreTopic(t, TOPIC_KEYWORDS.finance);
  if (financeScore > 0) scores.finance += 0.55 + financeScore * 0.15;

  const healthScore = scoreTopic(t, TOPIC_KEYWORDS.health);
  if (healthScore > 0) scores.health += 0.55 + healthScore * 0.15;

  const spiritualityScore = scoreTopic(t, TOPIC_KEYWORDS.spirituality);
  if (spiritualityScore > 0) scores.spirituality += 0.55 + spiritualityScore * 0.15;

  if (hasTopicKeyword(t, "emotions_negative") && scores.breakup < 0.5 && relScore === 0 && careerScore === 0) {
    scores.emotional_support += 0.5;
  }

  if (detectExplicitTopicShift(t)) {
    const dominant = (Object.entries(scores) as [ChatIntent, number][])
      .filter(([k]) => k !== "general")
      .sort((a, b) => b[1] - a[1])[0];
    if (dominant && dominant[1] > 0) scores[dominant[0]] += 0.25;
  }

  return scores;
}

/** Classify a single message independently with confidence scores. */
export function classifyMessageIntent(message: string): IntentClassification {
  const scores = scoreIntents(message);
  const ranked = (Object.entries(scores) as [ChatIntent, number][]).sort((a, b) => b[1] - a[1]);
  const [intent, rawScore] = ranked[0];
  const confidence = Math.min(1, rawScore);

  return { intent, confidence, scores };
}

/** Classifies latest message only — use resolveConversationState for active topic. */
export function classifyChatIntent(
  _userMessages: string[],
  lastMessage: string
): ChatIntent {
  return classifyMessageIntent(lastMessage).intent;
}

export function intentLabel(intent: ChatIntent): string {
  const labels: Record<ChatIntent, string> = {
    breakup: "breakup / separation",
    relationship: "love / relationships",
    career: "career / work",
    finance: "money / finance",
    health: "health / wellbeing",
    spirituality: "spirituality / meaning",
    emotional_support: "emotional support",
    general: "general guidance",
  };
  return labels[intent];
}

export function emotionalContextLabel(intent: ChatIntent, message: string): string {
  const situation = detectEmotionalSituation([message]);
  if (situation !== "none") return situation;
  return intent;
}
