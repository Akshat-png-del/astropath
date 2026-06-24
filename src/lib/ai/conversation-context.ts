import { detectConversationTopics } from "./message-topics";
import {
  parseBirthBundle,
  parseBirthTime,
  parseLocation,
  parseName,
  parseSign,
  sunSignFromIso,
} from "./birth-parser";

export interface ChatMessage {
  role: string;
  content: string;
}

export interface ConversationContext {
  currentDateTime: string;
  userMessages: string[];
  assistantMessages: string[];
  topicsDiscussed: string[];
  knownSign: string | null;
  knownBirthDate: string | null;
  knownBirthTime: string | null;
  knownLocation: string | null;
  knownName: string | null;
  questionsAlreadyAsked: string[];
  lastUserMessage: string;
  messageCount: number;
}

function extractQuestions(text: string): string[] {
  return text
    .split(/(?<=[.?!])\s+/)
    .filter((s) => s.includes("?"))
    .map((s) => s.trim().toLowerCase());
}

export function buildConversationContext(messages: ChatMessage[]): ConversationContext {
  const now = new Date();
  const userMessages = messages.filter((m) => m.role === "user").map((m) => m.content);
  const assistantMessages = messages.filter((m) => m.role === "assistant").map((m) => m.content);

  let knownBirthDate: string | null = null;
  let knownBirthTime: string | null = null;
  let knownSign: string | null = null;
  let knownName: string | null = null;
  let knownLocation: string | null = null;

  for (const msg of userMessages) {
    const bundle = parseBirthBundle(msg);
    knownBirthDate = bundle.birthDate ?? knownBirthDate;
    knownBirthTime = bundle.birthTime ?? parseBirthTime(msg) ?? knownBirthTime;
    knownSign = parseSign(msg) ?? knownSign;
    knownName = parseName(msg) ?? knownName;
    knownLocation = parseLocation(msg) ?? knownLocation;
  }

  if (!knownSign && knownBirthDate) {
    knownSign = sunSignFromIso(knownBirthDate);
  }

  return {
    currentDateTime: now.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
    userMessages,
    assistantMessages,
    topicsDiscussed: detectConversationTopics(userMessages),
    knownSign,
    knownBirthDate,
    knownBirthTime,
    knownLocation,
    knownName,
    questionsAlreadyAsked: assistantMessages.flatMap(extractQuestions),
    lastUserMessage: userMessages.at(-1) ?? "",
    messageCount: userMessages.length,
  };
}

export function formatContextForPrompt(ctx: ConversationContext): string {
  const facts: string[] = [];
  if (ctx.knownName) facts.push(`Name: ${ctx.knownName}`);
  if (ctx.knownBirthDate) facts.push(`DOB: ${ctx.knownBirthDate}`);
  if (ctx.knownBirthTime) facts.push(`Time: ${ctx.knownBirthTime}`);
  if (ctx.knownLocation) facts.push(`Place: ${ctx.knownLocation}`);
  if (ctx.knownSign) facts.push(`Sun: ${ctx.knownSign}`);
  if (ctx.topicsDiscussed.length) facts.push(`Topics: ${ctx.topicsDiscussed.join(", ")}`);

  return [`Msg #${ctx.messageCount}`, ...facts].join("\n");
}

const BIRTH_FIELD_ORDER = ["birth date", "birth time", "birth place"] as const;

export function missingBirthFields(ctx: ConversationContext): string[] {
  const missing: string[] = [];
  if (!ctx.knownBirthDate) missing.push("birth date");
  if (!ctx.knownBirthTime) missing.push("birth time");
  if (!ctx.knownLocation) missing.push("birth place");
  return missing;
}

export function nextBirthFieldToAsk(ctx: ConversationContext): string | null {
  for (const field of BIRTH_FIELD_ORDER) {
    if (missingBirthFields(ctx).includes(field)) return field;
  }
  return null;
}

/** Birth facts known before the latest user message */
export function priorBirthFromMessages(userMessages: string[]): {
  birthDate: string | null;
  birthTime: string | null;
  location: string | null;
} {
  let birthDate: string | null = null;
  let birthTime: string | null = null;
  let location: string | null = null;

  for (const msg of userMessages.slice(0, -1)) {
    const bundle = parseBirthBundle(msg);
    birthDate = bundle.birthDate ?? birthDate;
    birthTime = bundle.birthTime ?? parseBirthTime(msg) ?? birthTime;
    location = parseLocation(msg) ?? location;
  }

  return { birthDate, birthTime, location };
}
