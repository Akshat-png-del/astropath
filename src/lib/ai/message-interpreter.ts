import { ZODIAC_SIGNS_ORDER } from "@/lib/astrology/zodiac-traits";
import type { ConversationContext } from "./conversation-context";
import type { ChatMessage } from "./conversation-context";
import { priorBirthFromMessages } from "./conversation-context";
import {
  parseBirthBundle,
  diffBirthUpdate,
  formatBirthDateDisplay,
  parseLocation,
  parseName,
  parseSign,
  sunSignFromIso,
  type ParsedBirthBundle,
} from "./birth-parser";
import {
  detectConversationTopics,
  detectPrimaryTopicFromMessages,
  hasTopicKeyword,
  type ReadingTopic,
} from "./message-topics";

export type UserIntent =
  | "greeting"
  | "sharing_birth_details"
  | "love_question"
  | "career_question"
  | "emotional_support"
  | "marriage_question"
  | "health_question"
  | "general_question"
  | "follow_up"
  | "unclear";

export interface ParsedEntities {
  name: string | null;
  birthDate: string | null;
  birthTime: string | null;
  birthYear: number | null;
  displayDate: string | null;
  location: string | null;
  sign: string | null;
}

export interface MessageInterpretation {
  intent: UserIntent;
  primaryTopic: ReadingTopic;
  topics: string[];
  sentiment: "positive" | "negative" | "neutral";
  entities: ParsedEntities;
  userAskedQuestion: boolean;
  summary: string;
  userMeaning: string;
  justSharedBirthInfo: boolean;
  birthAck: string | null;
  lastMessageBirth: ParsedBirthBundle;
}

function isGreeting(text: string): boolean {
  return /^(hi|hello|hey|hii+|yo|namaste|good\s+(morning|evening|night)|sup)\b/i.test(text.trim());
}

function hasBirthSignal(text: string): boolean {
  const bundle = parseBirthBundle(text);
  return !!(bundle.birthDate || bundle.birthTime || parseLocation(text) ||
    /\b(born|dob|birth date|birth time|birthday)\b/i.test(text));
}

export function interpretMessage(
  ctx: ConversationContext,
  _messages: ChatMessage[]
): MessageInterpretation {
  const last = ctx.lastUserMessage.trim();
  const lastBundle = parseBirthBundle(last);
  const lastLocation = parseLocation(last);
  const priorBirth = priorBirthFromMessages(ctx.userMessages);

  const birthDiff = diffBirthUpdate(last, priorBirth);

  const newLocation = !!lastLocation && lastLocation !== priorBirth.location;

  let birthAck: string | null = null;
  if (birthDiff.newDate || birthDiff.newTime || newLocation) {
    const bits: string[] = [];
    if (birthDiff.newDate && lastBundle.displayDate) bits.push(lastBundle.displayDate);
    if (birthDiff.newTime && lastBundle.birthTime) bits.push(`at ${lastBundle.birthTime}`);
    if (newLocation && lastLocation) bits.push(lastLocation);
    const sign = lastBundle.sign ?? ctx.knownSign;
    if (bits.length) {
      birthAck = sign
        ? `Got it — ${bits.join(", ")}. You're a ${sign} Sun.`
        : `Got it — ${bits.join(", ")}.`;
    }
  }

  const userMessages = ctx.userMessages;
  const primaryTopic = detectPrimaryTopicFromMessages(userMessages);
  const topics = detectConversationTopics(userMessages);

  const negative =
    hasTopicKeyword(last, "emotions_negative") || hasTopicKeyword(last, "self_worth");
  const positive = hasTopicKeyword(last, "emotions_positive");
  const sentiment = negative ? "negative" : positive ? "positive" : "neutral";

  const userAskedQuestion =
    last.includes("?") ||
    /^(what|when|where|why|how|will|should|can|is|are|do|does|did)\b/i.test(last);

  const justSharedBirthInfo =
    birthDiff.newDate || birthDiff.newTime || newLocation || (hasBirthSignal(last) && !userAskedQuestion);

  let intent: UserIntent = "general_question";

  if (!last) intent = "unclear";
  else if (isGreeting(last) && userMessages.length <= 1) intent = "greeting";
  else if (justSharedBirthInfo && !hasTopicKeyword(last, "relationship") && !hasTopicKeyword(last, "career") && !negative) {
    intent = "sharing_birth_details";
  } else if (hasTopicKeyword(last, "marriage") || topics.includes("marriage")) intent = "marriage_question";
  else if (primaryTopic === "love" || topics.includes("relationships")) intent = "love_question";
  else if (primaryTopic === "career" || topics.includes("career")) intent = "career_question";
  else if (topics.includes("health")) intent = "health_question";
  else if (negative || topics.includes("self_worth")) intent = "emotional_support";
  else if (ctx.messageCount > 3 && userAskedQuestion) intent = "follow_up";
  else if (userAskedQuestion) intent = "general_question";
  else if (justSharedBirthInfo) intent = "sharing_birth_details";
  else intent = "unclear";

  const knownDate = ctx.knownBirthDate ?? lastBundle.birthDate;
  const knownSign = ctx.knownSign ?? lastBundle.sign ?? (knownDate ? sunSignFromIso(knownDate) : parseSign(last));

  const summaryParts: string[] = [];
  if (intent === "love_question") summaryParts.push("User wants love guidance");
  else if (intent === "career_question") summaryParts.push("User wants career guidance");
  else if (intent === "emotional_support") summaryParts.push("User needs warmth and hope");
  else if (intent === "sharing_birth_details") summaryParts.push("User shared birth info");
  if (knownSign) summaryParts.push(`Sun ${knownSign}`);
  if (knownDate) summaryParts.push(`DOB ${formatBirthDateDisplay(knownDate)}`);
  if (ctx.knownBirthTime || lastBundle.birthTime) summaryParts.push(`Time ${ctx.knownBirthTime ?? lastBundle.birthTime}`);

  return {
    intent,
    primaryTopic,
    topics,
    sentiment,
    entities: {
      name: ctx.knownName ?? parseName(last),
      birthDate: knownDate,
      birthTime: ctx.knownBirthTime ?? lastBundle.birthTime,
      birthYear: knownDate ? parseInt(knownDate.slice(0, 4), 10) : lastBundle.birthYear,
      displayDate: knownDate ? formatBirthDateDisplay(knownDate) : lastBundle.displayDate,
      location: ctx.knownLocation ?? lastLocation,
      sign: knownSign,
    },
    userAskedQuestion,
    summary: summaryParts.join(". "),
    userMeaning: last.length > 100 ? last.slice(0, 100) + "…" : last,
    justSharedBirthInfo,
    birthAck,
    lastMessageBirth: lastBundle,
  };
}

export function formatInterpretationForPrompt(interp: MessageInterpretation): string {
  const birthFacts: string[] = [];
  if (interp.entities.displayDate) birthFacts.push(`DOB: ${interp.entities.displayDate}`);
  if (interp.entities.birthTime) birthFacts.push(`Time: ${interp.entities.birthTime}`);
  if (interp.entities.location) birthFacts.push(`Place: ${interp.entities.location}`);
  if (interp.entities.sign) birthFacts.push(`Sun: ${interp.entities.sign}`);

  return `INTENT: ${interp.intent} | Sentiment: ${interp.sentiment}
USER SAID: ${interp.userMeaning}
${birthFacts.length ? `BIRTH DATA (use it — don't re-ask): ${birthFacts.join(", ")}` : "No birth date yet — ask once with an example (e.g. 15 March 1995 or 12/06/2000)."}
${interp.birthAck ? `CONFIRM TO USER: ${interp.birthAck}` : ""}
TONE: Warm, real, motivating — leave them feeling hopeful and glad they messaged.`;
}

export { parseBirthDate, parseBirthTime, parseBirthBundle, formatBirthDateDisplay } from "./birth-parser";
