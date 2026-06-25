/** Word-boundary keyword matching — avoids false hits like "glove" for "love" */

export const TOPIC_KEYWORDS = {
  emotions_negative: [
    "depressed", "sad", "down", "low", "unhappy", "hopeless", "empty", "lonely",
    "anxious", "anxiety", "stressed", "overwhelmed", "tired", "exhausted", "worthless",
    "crying", "hurt", "heartbroken", "miserable", "scared", "worried", "panic",
  ],
  emotions_positive: ["good", "great", "happy", "excited", "wonderful", "better", "grateful", "relieved"],
  career: [
    "job", "career", "work", "boss", "promotion", "business", "money", "interview",
    "fired", "salary", "office", "colleague", "unemployed", "layoff", "startup",
  ],
  relationship: [
    "relationship", "partner", "love", "dating", "marriage", "friend", "family", "breakup",
    "boyfriend", "girlfriend", "husband", "wife", "crush", "cheating", "divorce", "affair",
    "soulmate", "engaged", "fiancé", "fiance", "ex-boyfriend", "ex-girlfriend",
    "left me", "broke up", "dumped", "walked away", "ended things", "separation",
  ],
  self_worth: [
    "not good enough", "failure", "insecure", "confidence", "self-esteem", "doubt myself",
    "useless", "pathetic", "hate myself",
  ],
  goals: ["goal", "dream", "future", "purpose", "direction", "ambition", "life path"],
  marriage: ["marriage", "married", "wedding", "husband", "wife", "in-laws", "marry"],
  health: ["health", "sick", "illness", "pregnancy", "pregnant", "doctor", "wellbeing", "well-being", "mental health"],
  family: ["family", "parent", "mother", "father", "mom", "dad", "sibling", "brother", "sister", "in-laws", "children", "child", "son", "daughter"],
  finance: ["finance", "financial", "debt", "loan", "invest", "savings", "broke", "afford", "expenses", "budget", "wealth"],
  spirituality: ["spiritual", "spirituality", "soul", "karma", "meditation", "universe", "destiny", "faith", "purpose", "awakening"],
  astrology: ["birth chart", "natal chart", "horoscope", "zodiac", "rising sign", "moon sign", "sun sign", "astrology", "chart reading"],
} as const;

export type ConversationTopic =
  | "emotions"
  | "career"
  | "relationships"
  | "goals"
  | "self_worth"
  | "marriage"
  | "health"
  | "family"
  | "finance"
  | "spirituality"
  | "astrology";

const CONTEXT_TOPIC_MAP: Record<ConversationTopic, readonly string[]> = {
  emotions: [...TOPIC_KEYWORDS.emotions_negative, ...TOPIC_KEYWORDS.emotions_positive, "feeling", "feel", "mood"],
  career: TOPIC_KEYWORDS.career,
  relationships: TOPIC_KEYWORDS.relationship,
  goals: TOPIC_KEYWORDS.goals,
  self_worth: TOPIC_KEYWORDS.self_worth,
  marriage: TOPIC_KEYWORDS.marriage,
  health: TOPIC_KEYWORDS.health,
  family: TOPIC_KEYWORDS.family,
  finance: TOPIC_KEYWORDS.finance,
  spirituality: TOPIC_KEYWORDS.spirituality,
  astrology: TOPIC_KEYWORDS.astrology,
};

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function matchKeyword(text: string, word: string): boolean {
  const lower = text.toLowerCase();
  if (word.includes(" ")) return lower.includes(word);
  return new RegExp(`\\b${escapeRegex(word)}\\b`, "i").test(lower);
}

export function hasTopicKeyword(text: string, key: keyof typeof TOPIC_KEYWORDS): boolean {
  return TOPIC_KEYWORDS[key].some((w) => matchKeyword(text, w));
}

export function scoreTopic(text: string, words: readonly string[]): number {
  return words.reduce((n, w) => n + (matchKeyword(text, w) ? 1 : 0), 0);
}

export function detectConversationTopics(messages: string[]): ConversationTopic[] {
  const last = messages.at(-1) ?? "";
  const vagueFollowUp =
    /\b(future|coming|ahead|expect|outlook|in my way)\b/i.test(last) && messages.length > 1;
  const combined = vagueFollowUp ? messages.join(" ") : messages.slice(-4).join(" ");
  const scored = (Object.entries(CONTEXT_TOPIC_MAP) as [ConversationTopic, readonly string[]][])
    .map(([topic, words]) => ({ topic, score: scoreTopic(combined, words) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);
  return scored.map((x) => x.topic);
}

export type ReadingTopic = "love" | "career" | "general";

export function detectReadingTopic(text: string): ReadingTopic {
  const loveScore =
    scoreTopic(text, TOPIC_KEYWORDS.relationship) +
    scoreTopic(text, TOPIC_KEYWORDS.marriage);
  const careerScore = scoreTopic(text, TOPIC_KEYWORDS.career);
  if (loveScore > careerScore && loveScore > 0) return "love";
  if (careerScore > 0) return "career";
  return "general";
}

export function detectPrimaryTopicFromMessages(messages: string[]): ReadingTopic {
  const last = messages.at(-1) ?? "";
  const vagueFuture = /\b(future|coming|ahead|expect|outlook|in my way)\b/i.test(last) &&
    scoreTopic(last, TOPIC_KEYWORDS.relationship) === 0 &&
    scoreTopic(last, TOPIC_KEYWORDS.career) === 0;

  const source = vagueFuture ? messages.join(" ") : messages.slice(-3).join(" ");
  return detectReadingTopic(source);
}
