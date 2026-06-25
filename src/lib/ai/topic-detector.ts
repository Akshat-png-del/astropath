/** Expanded product topics — latest message always wins. */

export type ProductTopic =
  | "love"
  | "breakup"
  | "reconciliation"
  | "marriage"
  | "career"
  | "education"
  | "money"
  | "family"
  | "friendship"
  | "health"
  | "spirituality"
  | "astrology"
  | "tarot"
  | "self_growth"
  | "general";

const TOPIC_PATTERNS: { topic: ProductTopic; patterns: RegExp[]; weight: number }[] = [
  { topic: "reconciliation", patterns: [/\b(reconcile|get back together|come back|want (her|him|them) back|take me back|second chance)\b/i], weight: 3 },
  { topic: "breakup", patterns: [/\b(breakup|broke up|left me|dumped|ex-|separation|walked away|ended things)\b/i], weight: 3 },
  { topic: "marriage", patterns: [/\b(marriage|married|wedding|fiancé|fiance|divorce)\b/i], weight: 2 },
  { topic: "love", patterns: [/\b(love|relationship|partner|boyfriend|girlfriend|crush|dating)\b/i], weight: 2 },
  { topic: "career", patterns: [/\b(career|job|work|boss|promotion|interview|salary|startup)\b/i], weight: 2 },
  { topic: "education", patterns: [/\b(college|university|school|study|exam|degree|course|learning)\b/i], weight: 2 },
  { topic: "money", patterns: [/\b(money|finance|debt|loan|invest|savings|broke|wealth|budget)\b/i], weight: 2 },
  { topic: "family", patterns: [/\b(family|parent|mother|father|mom|dad|sibling|in-laws|children)\b/i], weight: 2 },
  { topic: "friendship", patterns: [/\b(friend|friendship|best friend|roommate)\b/i], weight: 2 },
  { topic: "health", patterns: [/\b(health|sick|wellbeing|mental health|anxiety|stress|energy)\b/i], weight: 2 },
  { topic: "spirituality", patterns: [/\b(spiritual|soul|karma|meditation|destiny|faith|awakening)\b/i], weight: 2 },
  { topic: "astrology", patterns: [/\b(birth chart|natal|horoscope|zodiac|rising|moon sign|transit|retrograde)\b/i], weight: 2 },
  { topic: "tarot", patterns: [/\b(tarot|card reading|spread|major arcana)\b/i], weight: 3 },
  { topic: "self_growth", patterns: [/\b(self.?worth|confidence|purpose|life path|grow|healing journey|who am i)\b/i], weight: 2 },
];

export interface TopicDetectionResult {
  topic: ProductTopic;
  previousTopic: ProductTopic | null;
  switched: boolean;
  confidence: number;
  scores: Partial<Record<ProductTopic, number>>;
}

function scoreMessage(message: string): Partial<Record<ProductTopic, number>> {
  const scores: Partial<Record<ProductTopic, number>> = {};
  for (const { topic, patterns, weight } of TOPIC_PATTERNS) {
    let s = 0;
    for (const re of patterns) {
      if (re.test(message)) s += weight;
    }
    if (s > 0) scores[topic] = s;
  }
  return scores;
}

export function detectProductTopic(
  message: string,
  previousTopic: ProductTopic | null = null
): TopicDetectionResult {
  const scores = scoreMessage(message);
  const entries = Object.entries(scores) as [ProductTopic, number][];
  entries.sort((a, b) => b[1] - a[1]);

  const topic = entries[0]?.[0] ?? previousTopic ?? "general";
  const confidence = entries[0]?.[1] ? Math.min(1, entries[0][1] / 4) : 0.3;
  const switched = !!previousTopic && previousTopic !== topic && confidence >= 0.5;

  return { topic, previousTopic, switched, confidence, scores };
}

export function detectEmotionLabel(message: string, tone: "negative" | "positive" | "neutral"): string {
  const t = message.toLowerCase();
  if (/\b(miss|longing|want (her|him|them) back)\b/.test(t)) return "longing";
  if (/\b(closure|never got|unfinished)\b/.test(t)) return "grief";
  if (/\b(hope|maybe|wish|pray)\b/.test(t)) return "hope";
  if (/\b(scared|afraid|anxious|panic|worried)\b/.test(t)) return "anxiety";
  if (/\b(confus|don't understand|unclear)\b/.test(t)) return "confusion";
  if (/\b(lonely|alone|isolated)\b/.test(t)) return "loneliness";
  if (/\b(happy|excited|grateful|relieved)\b/.test(t)) return tone === "positive" ? "joy" : "cautious optimism";
  if (/\b(heartbreak|broken|devastated|crushed)\b/.test(t)) return "heartbreak";
  if (tone === "negative") return "uncertainty";
  if (tone === "positive") return "excitement";
  return "reflective";
}
