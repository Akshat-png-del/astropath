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
  scoreTopic,
  TOPIC_KEYWORDS,
  type ReadingTopic,
} from "./message-topics";
import {
  analyzeQuestion,
  hasDomainKeywords,
  isExplicitQuestion,
  isGreetingOnly,
  type QuestionAnalysis,
} from "./question-understanding";
import {
  buildConversationMemory,
  type ConversationMemory,
  formatMemoryForPrompt,
} from "./conversation-memory";
import type { ChatIntent, EmotionalSituation } from "./intent-classifier";
import { detectBreakupInText } from "./intent-classifier";

export type UserIntent =
  | "greeting"
  | "sharing_birth_details"
  | "love_question"
  | "career_question"
  | "family_question"
  | "finance_question"
  | "spirituality_question"
  | "self_discovery_question"
  | "astrology_question"
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
  coreConcern: string;
  answerAngle: string;
  questionType: QuestionAnalysis["questionType"];
  justSharedBirthInfo: boolean;
  birthAck: string | null;
  lastMessageBirth: ParsedBirthBundle;
  contextGaps: string[];
  shouldGatherContext: boolean;
  memory: ConversationMemory;
  chatIntent: ChatIntent;
  emotionalSituation: EmotionalSituation;
  resolvedQuestion: string;
  isFollowUp: boolean;
}

function hasBirthSignal(text: string): boolean {
  const bundle = parseBirthBundle(text);
  return !!(bundle.birthDate || bundle.birthTime || parseLocation(text) ||
    /\b(born|dob|birth date|birth time|birthday)\b/i.test(text));
}

function isFollowUp(ctx: ConversationContext, last: string): boolean {
  if (ctx.messageCount <= 1) return false;
  if (/\b(that|this|it|those|same|earlier|before|again|more about|in my way)\b/i.test(last)) return true;
  if (/^(and|also|what about|how about)\b/i.test(last)) return true;
  if (/\b(future|coming|ahead|expect|outlook|forecast|what.?s next)\b/i.test(last)) {
    const hasSpecific =
      scoreTopic(last, TOPIC_KEYWORDS.relationship) > 0 ||
      scoreTopic(last, TOPIC_KEYWORDS.career) > 0;
    if (!hasSpecific) return true;
  }
  return isExplicitQuestion(last) && ctx.topicsDiscussed.length > 0;
}

function resolveIntent(
  last: string,
  ctx: ConversationContext,
  topics: string[],
  primaryTopic: ReadingTopic,
  analysis: QuestionAnalysis,
  justSharedBirthInfo: boolean,
  userAskedQuestion: boolean
): UserIntent {
  if (!last) return "unclear";

  if (isGreetingOnly(last) && ctx.messageCount <= 1) return "greeting";

  if (detectBreakupInText(last) || detectBreakupInText(ctx.userMessages.join(" "))) {
    return "love_question";
  }

  if (justSharedBirthInfo && !hasDomainKeywords(last) && analysis.emotionalTone !== "negative") {
    return "sharing_birth_details";
  }

  if (hasTopicKeyword(last, "marriage") || topics.includes("marriage")) return "marriage_question";

  if (hasTopicKeyword(last, "astrology") || analysis.domain === "astrology") return "astrology_question";

  if (topics.includes("family") || analysis.domain === "family") return "family_question";

  if (topics.includes("finance") || analysis.domain === "finance") return "finance_question";

  if (topics.includes("spirituality") || analysis.domain === "spirituality") return "spirituality_question";

  if (analysis.domain === "self_discovery" || topics.includes("self_worth")) return "self_discovery_question";

  if (
    primaryTopic === "love" ||
    topics.includes("relationships") ||
    analysis.domain === "love"
  ) {
    return "love_question";
  }

  if (
    primaryTopic === "career" ||
    topics.includes("career") ||
    analysis.domain === "career"
  ) {
    return "career_question";
  }

  if (topics.includes("health") || analysis.domain === "health") return "health_question";

  if (isFollowUp(ctx, last)) return "follow_up";

  if (
    (analysis.emotionalTone === "negative" || topics.includes("self_worth")) &&
    !hasDomainKeywords(last)
  ) {
    return "emotional_support";
  }

  if (userAskedQuestion) return "general_question";

  if (justSharedBirthInfo) return "sharing_birth_details";

  return "unclear";
}

function detectContextGaps(
  ctx: ConversationContext,
  intent: UserIntent,
  analysis: QuestionAnalysis
): string[] {
  const gaps: string[] = [];
  const last = ctx.lastUserMessage;

  if (!ctx.knownBirthDate && intent !== "greeting" && intent !== "sharing_birth_details") {
    gaps.push("birth date for personalised chart reading");
  }

  if (intent === "career_question" || intent === "finance_question") {
    if (ctx.messageCount < 3 && !/\b(job|role|company|boss|interview|promotion|business|debt|loan|salary)\b/i.test(last)) {
      gaps.push("current work or money situation");
    }
    if (!/\b(change|switch|quit|leave|dissatisfied|stuck|promotion|interview)\b/i.test(ctx.userMessages.join(" "))) {
      gaps.push("whether they seek change or stability");
    }
  }

  if (intent === "love_question" || intent === "marriage_question" || intent === "family_question") {
    if (ctx.messageCount < 3 && !/\b(partner|married|dating|years|months|together|break|divorce|family)\b/i.test(ctx.userMessages.join(" "))) {
      gaps.push("relationship or family context");
    }
  }

  if (intent === "general_question" && analysis.domain === "general" && ctx.messageCount < 2) {
    gaps.push("what area of life this concerns");
  }

  if (intent === "astrology_question" && !ctx.knownBirthDate) {
    gaps.push("full birth date, time, and place");
  }

  return gaps;
}

function shouldGatherContext(): boolean {
  return false;
}

export function interpretMessage(
  ctx: ConversationContext,
  _messages: ChatMessage[]
): MessageInterpretation {
  const last = ctx.lastUserMessage.trim();
  const lastBundle = parseBirthBundle(last);
  const lastLocation = parseLocation(last);
  const priorBirth = priorBirthFromMessages(ctx.userMessages);
  const analysis = analyzeQuestion(last);

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

  const sentiment = analysis.emotionalTone;
  const userAskedQuestion = isExplicitQuestion(last);

  const justSharedBirthInfo =
    birthDiff.newDate || birthDiff.newTime || newLocation || (hasBirthSignal(last) && !userAskedQuestion);

  let intent = resolveIntent(
    last,
    ctx,
    topics,
    primaryTopic,
    analysis,
    justSharedBirthInfo,
    userAskedQuestion
  );

  const knownDate = ctx.knownBirthDate ?? lastBundle.birthDate;
  const knownSign = ctx.knownSign ?? lastBundle.sign ?? (knownDate ? sunSignFromIso(knownDate) : parseSign(last));

  const summaryParts: string[] = [analysis.coreConcern];
  if (intent === "love_question") summaryParts.push("Needs love/relationship reading");
  else if (intent === "career_question") summaryParts.push("Needs career/money reading");
  else if (intent === "emotional_support") summaryParts.push("Needs validation and hope first");
  else if (intent === "sharing_birth_details") summaryParts.push("Shared birth info");
  else if (intent === "family_question") summaryParts.push("Needs family/home reading");
  else if (intent === "finance_question") summaryParts.push("Needs finance reading");
  else if (intent === "spirituality_question") summaryParts.push("Needs spiritual guidance");
  else if (intent === "self_discovery_question") summaryParts.push("Needs self-discovery support");
  else if (intent === "astrology_question") summaryParts.push("Wants chart/astrology reading");
  if (knownSign) summaryParts.push(`Sun ${knownSign}`);
  if (knownDate) summaryParts.push(`DOB ${formatBirthDateDisplay(knownDate)}`);

  const contextGaps = detectContextGaps(ctx, intent, analysis);
  const gatherContext = shouldGatherContext();
  const memory = buildConversationMemory(ctx);

  if (memory.chatIntent === "breakup") {
    intent = "love_question";
  } else if (memory.isFollowUp && !memory.followUpCleared) {
    if (memory.chatIntent === "relationship") intent = "love_question";
    else if (memory.chatIntent === "career") intent = "career_question";
    else if (memory.chatIntent === "finance") intent = "finance_question";
    else if (memory.chatIntent === "health") intent = "health_question";
    else if (memory.chatIntent === "spirituality") intent = "spirituality_question";
    else if (memory.chatIntent === "emotional_support") intent = "emotional_support";
  } else if (memory.chatIntent === "career") {
    intent = "career_question";
  } else if (memory.chatIntent === "finance") {
    intent = "finance_question";
  } else if (memory.chatIntent === "relationship") {
    intent = "love_question";
  } else if (memory.chatIntent === "health") {
    intent = "health_question";
  } else if (memory.chatIntent === "spirituality") {
    intent = "spirituality_question";
  } else if (memory.topicSwitched && memory.chatIntent === "general") {
    intent = "general_question";
  }

  const effectiveTopic: ReadingTopic = memory.activeTopic;

  return {
    intent,
    primaryTopic: effectiveTopic,
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
    userMeaning: memory.isFollowUp ? memory.resolvedQuestion : (last.length > 200 ? `${last.slice(0, 200)}…` : last),
    coreConcern: memory.isFollowUp
      ? `${analysis.coreConcern} Continuing thread: ${memory.situationSummary}`
      : analysis.coreConcern,
    answerAngle: analysis.answerAngle,
    questionType: analysis.questionType,
    justSharedBirthInfo,
    birthAck,
    lastMessageBirth: lastBundle,
    contextGaps,
    shouldGatherContext: gatherContext,
    memory,
    chatIntent: memory.chatIntent,
    emotionalSituation: memory.emotionalSituation,
    resolvedQuestion: memory.resolvedQuestion,
    isFollowUp: memory.isFollowUp,
  };
}

export function formatInterpretationForPrompt(interp: MessageInterpretation): string {
  const birthFacts: string[] = [];
  if (interp.entities.displayDate) birthFacts.push(`DOB: ${interp.entities.displayDate}`);
  if (interp.entities.birthTime) birthFacts.push(`Time: ${interp.entities.birthTime}`);
  if (interp.entities.location) birthFacts.push(`Place: ${interp.entities.location}`);
  if (interp.entities.sign) birthFacts.push(`Sun: ${interp.entities.sign}`);
  if (interp.entities.name) birthFacts.push(`Name: ${interp.entities.name}`);

  return `${formatMemoryForPrompt(interp.memory)}

INTENT (classifier): ${interp.chatIntent} | Legacy: ${interp.intent} | Sentiment: ${interp.sentiment}
THEIR QUESTION (resolved): ${interp.resolvedQuestion}
CORE CONCERN: ${interp.coreConcern}
HOW TO ANSWER: ${interp.answerAngle}
${birthFacts.length ? `BIRTH DATA: ${birthFacts.join(", ")}` : ""}
${interp.birthAck ? `BIRTH CONFIRM (brief, then continue reading): ${interp.birthAck}` : ""}`;
}

export { parseBirthDate, parseBirthTime, parseBirthBundle, formatBirthDateDisplay } from "./birth-parser";
