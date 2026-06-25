import { BIRTH_DATE_EXAMPLE, BIRTH_TIME_EXAMPLE, BIRTH_PLACE_EXAMPLE } from "./birth-examples";
import type { Conversation } from "@/types";
import type { ConversationContext } from "./conversation-context";
import { BANNED_WORDS, BANNED_PHRASES, MAX_REPLY_WORDS, MIN_REPLY_WORDS } from "./chat-constants";
import { PREMIUM_VOICE } from "./response-pipeline";
import type { ConversationMemory } from "./conversation-memory";

export const ASTROLOGER_PERSONALITY = `${PREMIUM_VOICE}

You are Cosmic Mirror — a premium astrology companion, relationship guide, and trusted confidant.
Answer the user's latest message directly. Every reply should feel written specifically for them.

Never expose internal analysis, labels, memory notes, or chain-of-thought.
Never use scripted openings, sign trait lists, or generic horoscope language.
Never quote the user's message back to them. Never say "What you shared" or "From a chart perspective".

${BANNED_PHRASES}
${BANNED_WORDS}`;

export function buildPersonalityBlock(
  _sign: string | null,
  _phase: Conversation["phase"],
  _askedFragments: string[],
  ctx: ConversationContext,
  _memory: ConversationMemory
): string {
  const birthNote = !ctx.knownBirthDate
    ? `Birth details not yet shared — read from conversation. Optional brief DOB ask on turn 1 only (e.g. ${BIRTH_DATE_EXAMPLE}).`
    : `Birth data available.${!ctx.knownBirthTime ? ` Time unknown — rising approximate (e.g. ${BIRTH_TIME_EXAMPLE}, ${BIRTH_PLACE_EXAMPLE}).` : ""}`;

  return `${ASTROLOGER_PERSONALITY}\n\n${birthNote}`;
}
