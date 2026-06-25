/** Premium response constants — natural flow, no rigid templates. */

export const MIN_RESPONSE_WORDS = 80;
export const MAX_RESPONSE_WORDS = 280;
export const FOLLOWUP_EVERY_N_TURNS = 4;
export const SIMILARITY_REGENERATE_THRESHOLD = 0.6;
export const PRIOR_MESSAGES_TO_COMPARE = 10;
export const QUALITY_PASS_THRESHOLD = 40;
export const QUALITY_MAX_SCORE = 60;

export const FORBIDDEN_PHRASES = [
  "i hear how much uncertainty you're carrying",
  "i hear your uncertainty",
  "thank you for sharing",
  "what feels hardest today",
  "what feels like the hardest part",
  "connection and reciprocity",
  "i'm here for you",
  "i hear you",
  "i hear what's on your heart",
  "what you're going through sounds",
  "makes sense that you're looking",
  "completely natural",
  "i want to respond to what you actually said",
  "you're shifting focus",
  "active topic",
  "user wants",
  "dob on file",
  "what you're experiencing maps to",
  "they want",
  "continuing thread",
  "sun sign",
  "gemini energy",
  "capricorn often carries",
  "focus on what is within your control",
  "priority 1",
  "priority 2",
  "deserves a direct answer, not a generic reading",
  "from a chart perspective, venus and the moon",
  "feel safe in love again",
  "whether with him or someone new",
];

export const RESPONSE_PIPELINE = `Write one natural, premium reading shaped entirely to their message.
Let conversation flow — do not follow a fixed template or numbered structure.
Weave astrology where it genuinely illuminates (~30% when chart data exists).
If they ask about the future: answer with may/could/suggests — never refuse, never guarantee.`;

export const PREMIUM_VOICE = `Voice: warm, wise, intuitive, emotionally intelligent — like an experienced astrologer and trusted confidant.
Sound human and specific. Never robotic, scripted, or repetitive.
The user should feel: "This was written for me."`;

export function shouldIncludeFollowUp(turnNumber: number): boolean {
  return turnNumber > 0 && turnNumber % FOLLOWUP_EVERY_N_TURNS === 0;
}

export function countQuestions(text: string): number {
  return (text.match(/\?/g) ?? []).length;
}

export function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function containsForbiddenPhrase(text: string): string | null {
  const lower = text.toLowerCase();
  for (const phrase of FORBIDDEN_PHRASES) {
    if (lower.includes(phrase)) return phrase;
  }
  return null;
}

export function extractUserThemes(message: string): string[] {
  const themes: string[] = [];
  const t = message.toLowerCase();
  if (/\b(closure|closed|never got|no goodbye|without saying)\b/.test(t)) themes.push("lack of closure");
  if (/\b(miss|missing|longing|want (her|him|them) back|come back)\b/.test(t)) themes.push("longing");
  if (/\b(yes|want her|want him|want to reconcile|get back together)\b/.test(t)) themes.push("reconciliation hope");
  if (/\b(fight|conflict|argued|gradual|pattern)\b/.test(t)) themes.push("conflict patterns");
  if (/\b(scared|afraid|abandon|left me|walked away|dumped)\b/.test(t)) themes.push("abandonment fear");
  return themes;
}
