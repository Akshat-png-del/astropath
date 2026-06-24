import { BIRTH_DATE_EXAMPLE, BIRTH_TIME_EXAMPLE, BIRTH_PLACE_EXAMPLE } from "./birth-examples";
import { ZODIAC_TRAITS } from "@/lib/astrology/zodiac-traits";
import type { Conversation } from "@/types";
import type { ConversationContext } from "./conversation-context";
import { BANNED_WORDS, MAX_REPLY_WORDS } from "./chat-constants";
import { buildAstrologyTurn } from "./astrology-turn";

export const TRUST_QUESTIONS: Record<Conversation["phase"], string[]> = {
  rapport: [
    "What's bothering you most — love, career, money, or something else?",
    "Is this about one problem or a general reading?",
  ],
  exploration: [
    "How long has this been going on?",
    "Is one person or situation at the centre of this?",
  ],
  birth_details: [
    `What's your date of birth? (e.g. ${BIRTH_DATE_EXAMPLE} or 12/06/2000)`,
    `Birth time? Even "${BIRTH_TIME_EXAMPLE}" or "around 8 am" helps — e.g. born in ${BIRTH_PLACE_EXAMPLE}, 6 pm.`,
  ],
  report: [],
  follow_up: [
    "Want love timing or career direction from your chart?",
  ],
};

export function getZodiacVoice(sign: string | null): string {
  if (!sign || !ZODIAC_TRAITS[sign]) {
    return `Warm astrologer on a call. Simple English. ${BANNED_WORDS}`;
  }
  const t = ZODIAC_TRAITS[sign];
  return `SUN: ${sign} (${t.element}). Traits: ${t.keywords.slice(0, 2).join(", ")}. Strength: ${t.strengths[0]}. Mention sign once if useful.`;
}

export function getTrustQuestion(
  phase: Conversation["phase"],
  askedFragments: string[]
): string | null {
  const pool = TRUST_QUESTIONS[phase] ?? [];
  for (const q of pool) {
    const key = q.slice(0, 20).toLowerCase();
    if (!askedFragments.some((a) => a.includes(key.slice(0, 10)))) return q;
  }
  return null;
}

export const ASTROLOGER_PERSONALITY = `You are Cosmic Mirror — a real astrologer (AstroTalk style: trusted, direct, human).

LENGTH (critical): Max ${MAX_REPLY_WORDS} words. Usually 2–4 short sentences. Never walls of text. Mobile chat, not an essay.

HOW YOU TALK:
- One line to acknowledge them. One line of chart/sign insight. One hope-filled line so they feel better after reading — real, not fake cheer.
- Simple words. Like a voice call: "I hear you", "Here's what your chart says", "This phase can shift".
- Chart and planets only — no tarot.

MOTIVATION (critical):
- Leave them feeling seen, hopeful, and glad they messaged you.
- When they share DOB/time/year — confirm the exact date and Sun sign. Never ignore birth details in the same message.
- No fear predictions. No doom. Offer one concrete reason things can improve.

RULES:
- Never repeat a question. No medical diagnosis.
- Ask birth details one at a time when needed — always include a simple example (e.g. 15 March 1995, 6 pm, Mumbai).
${BANNED_WORDS}`;

export function buildPersonalityBlock(
  sign: string | null,
  phase: Conversation["phase"],
  askedFragments: string[],
  ctx: ConversationContext
): string {
  const trustQ = getTrustQuestion(phase, askedFragments);
  const { planet, teaser } = buildAstrologyTurn(ctx);

  return `${ASTROLOGER_PERSONALITY}

${getZodiacVoice(sign)}

Hint (one sentence max if it fits): ${planet}
Optional close (one short line OR skip): ${teaser}
${trustQ ? `Optional question (only if needed): "${trustQ}"` : ""}`;
}
