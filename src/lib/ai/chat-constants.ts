import { APP_NAME } from "@/lib/brand";

export const CHAT_GREETING = `Hi — I'm ${APP_NAME}, your astrologer.

Ask me anything — love, career, marriage, money, timing. The more you share (including birth date like 15 March 1995, 6 pm, Mumbai), the sharper the reading.

Tap an example below or type your own.`;

export const BANNED_WORDS =
  "Never use: sacred, veil, archetype, modality, constellation, iterate, leverage, tapestry, realm, embark, delve.";

export const BANNED_PHRASES =
  "FORBIDDEN PHRASES (never use): I hear how much uncertainty you're carrying, I hear your uncertainty, Thank you for sharing, What feels hardest today, What feels like the hardest part, Connection and reciprocity, I'm here for you, I hear you, I hear what's on your heart, What you're going through sounds, Makes sense that you're looking, completely natural. BANNED FORMATS: standalone sign blurbs ('Gemini: quick wit'), 'As a Gemini you are', 'Since you're a [sign]', trait keyword lists.";

/** Premium readings need room for reflection + astro + guidance */
export const MIN_REPLY_WORDS = 120;
export const MAX_REPLY_WORDS = 280;
