/** When to trigger knowledge retrieval and how to use it safely. */

export type RetrievalCategory =
  | "transits"
  | "retrograde"
  | "moon_phase"
  | "compatibility"
  | "technique"
  | "current_events"
  | "numerology"
  | "eclipse"
  | "forecast"
  | "general_astrology";

const RETRIEVAL_TRIGGERS: [RegExp, RetrievalCategory][] = [
  [/\bmercury retrograde\b/i, "retrograde"],
  [/\bretrograde\b/i, "retrograde"],
  [/\bplanetary transit(s)?\b/i, "transits"],
  [/\btransit(s)?\b/i, "transits"],
  [/\bmoon phase\b/i, "moon_phase"],
  [/\b(full moon|new moon|waxing|waning)\b/i, "moon_phase"],
  [/\bcompatibility\b/i, "compatibility"],
  [/\bsynastry\b/i, "compatibility"],
  [/\b(eclipse|solar eclipse|lunar eclipse)\b/i, "eclipse"],
  [/\bnumerology\b/i, "numerology"],
  [/\b(life path|destiny) number\b/i, "numerology"],
  [/\bastrolog(y|ical)(ly)? right now\b/i, "current_events"],
  [/\bwhat.?s happening (in|with) the (sky|stars|cosmos)\b/i, "current_events"],
  [/\b(current|today.?s|this month.?s) (moon|transit|forecast)\b/i, "current_events"],
  [/\bforecast\b/i, "forecast"],
  [/\b(rising sign|house system|natal chart|birth chart)\b/i, "technique"],
  [/\bwhat does .+ mean\b/i, "general_astrology"],
];

/** Requires live ephemeris / internet data — never invent. */
const LIVE_CELESTIAL_TRIGGERS = [
  /\btoday\b/i,
  /\bright now\b/i,
  /\bcurrently\b/i,
  /\bthis month\b/i,
  /\bthis week\b/i,
  /\btonight\b/i,
  /\bplanetary position(s)?\b/i,
  /\bmoon phase today\b/i,
  /\bwhat sign is the moon\b/i,
  /\bis .+ in retrograde\b/i,
  /\bwhen does .+ retrograde (start|end|begin)\b/i,
];

export interface RetrievalNeed {
  needsRetrieval: boolean;
  needsLiveCelestialData: boolean;
  categories: RetrievalCategory[];
}

export function analyzeRetrievalNeed(message: string): RetrievalNeed {
  const categories = new Set<RetrievalCategory>();
  for (const [re, cat] of RETRIEVAL_TRIGGERS) {
    if (re.test(message)) categories.add(cat);
  }

  const needsLiveCelestialData = LIVE_CELESTIAL_TRIGGERS.some((re) => re.test(message));
  const needsRetrieval = categories.size > 0 || needsLiveCelestialData;

  return {
    needsRetrieval,
    needsLiveCelestialData,
    categories: [...categories],
  };
}

export const RETRIEVAL_PRIORITY_RULES = `RETRIEVAL PRIORITY (apply in order):
1. CURRENT USER MESSAGE — answer what they asked right now first.
2. CONVERSATION HISTORY & MEMORY — topic, emotional context, prior facts.
3. RETRIEVED USER FACTS & PROFILE — birth date, sign, saved insights.
4. RETRIEVED KNOWLEDGE — internal docs + external/internet results if provided.
5. GENERAL MODEL KNOWLEDGE — established astrology principles only; state limits on live facts.

If retrieved knowledge conflicts with assumptions, PREFER retrieved knowledge.
Distinguish in your answer:
- Established astrological knowledge (timeless principles)
- Factual retrieved information (cite when from retrieval)
- Your interpretation and guidance (personalized reading)`;

export const ANTI_HALLUCINATION_RULES = `ANTI-HALLUCINATION (mandatory):
NEVER fabricate:
- Live moon phases, planetary positions, or retrograde dates
- Current transits "happening now" without retrieval data
- Eclipses, news events, or internet facts
- User facts not in conversation or profile

If live celestial data is unavailable, say so briefly, then give established principles.
Example: "I don't have live planetary data right now, but Mercury retrograde is generally associated with reviewing communication and double-checking plans."

Never ignore retrieved context when it is provided below.`;

export const REASONING_CHECKLIST = `INTERNAL REASONING (complete before replying):
1. What is the user's actual question?
2. What do I already know about this user (history, birth, memories)?
3. Has the user changed topics? (honour active topic only)
4. Is external/retrieved knowledge available? Use it.
5. Should astrology, psychology, or factual info dominate?
6. Am I repeating a previous assistant reply? Say something new.
7. Is the answer personalized, actionable, and non-generic?`;

export const RETRIEVAL_USAGE_RULES = `WHEN RETRIEVED KNOWLEDGE IS PROVIDED:
1. Read and analyze it before answering.
2. Combine: retrieval + conversation + birth details + astrological interpretation.
3. Use retrieval to improve accuracy — never ignore it.
4. Weave facts naturally; do not dump encyclopedia text.
5. For live celestial questions without data: acknowledge the gap, then teach principles.`;

export function liveDataMissingNotice(categories: RetrievalCategory[]): string {
  const parts: string[] = [
    "LIVE DATA UNAVAILABLE: Do not state current moon phase, planetary positions, retrograde dates, or 'happening right now' transits.",
    "Briefly tell the user you don't have live sky data, then answer with established astrological principles.",
  ];
  if (categories.includes("retrograde")) {
    parts.push("For retrograde questions: explain general meaning (review, delay, miscommunication) without claiming it is active today.");
  }
  if (categories.includes("moon_phase")) {
    parts.push("For moon questions: explain lunar cycle themes without naming today's phase.");
  }
  if (categories.includes("transits") || categories.includes("current_events")) {
    parts.push("For transit/forecast questions: give thematic guidance for their sign without inventing exact current positions.");
  }
  return parts.join("\n");
}
