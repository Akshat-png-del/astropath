/** PRIVATE internal reasoning — never expose fields to users. */

import type { ConversationContext } from "./conversation-context";
import type { MessageInterpretation } from "./message-interpreter";
import type { ProductTopic } from "./topic-detector";
import { detectEmotionLabel } from "./topic-detector";
import { planetThemeForIntent } from "./sign-situational-insight";
import { detectEmotionalState, toneGuidanceFor } from "./engines/emotional-layer";
import { buildCareerGuidancePlan } from "./engines/career-engine";
import { buildLoveGuidancePlan } from "./love-reconciliation-engine";

export type QuestionOrientation =
  | "future"
  | "healing"
  | "reconciliation"
  | "guidance"
  | "understanding"
  | "present";

export interface InternalReasoning {
  intent: string;
  emotion: string;
  topic: ProductTopic;
  userGoal: string;
  memoryNeeds: string[];
  astroContext: string | null;
  knowledgeSources: string[];
  responseStrategy: string[];
  orientation: QuestionOrientation;
  isFreshContext: boolean;
  topicSwitched: boolean;
}

const FRESH_CONTEXT_RE =
  /\b(my name is|i am |i'm )[\w\s.,]{0,40}(dob|born|birth|date of birth)/i;

const MONTH_NAME_DATE_RE =
  /\b\d{1,2}\s+(?:jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\s+\d{4}\b/i;

const FUTURE_RE =
  /\b(future|coming|ahead|expect|outlook|next month|next week|this month|this year|what.?s next|will we|will (he|she|they)|get back|reconcile|come back)\b/i;
const HEALING_RE =
  /\b(heal|healing|move on|get over|recover|cope|closure|let go|feel better|pain|hurt|miss)\b/i;
const RECONCILIATION_RE =
  /\b(reconcile|get back together|come back|want (her|him|them)|will (he|she|they) return|take me back|second chance|yes.*want|miss (her|him|them))\b/i;
const GUIDANCE_RE =
  /\b(what should i|advice|guide|help me|what do i do|how do i|should i)\b/i;

export function detectOrientation(message: string): QuestionOrientation {
  if (RECONCILIATION_RE.test(message)) return "reconciliation";
  if (HEALING_RE.test(message)) return "healing";
  if (FUTURE_RE.test(message)) return "future";
  if (GUIDANCE_RE.test(message)) return "guidance";
  if (/\b(why|understand|meaning|reason)\b/i.test(message)) return "understanding";
  return "present";
}

export function isFreshReadingContext(message: string): boolean {
  if (FRESH_CONTEXT_RE.test(message)) return true;
  if (MONTH_NAME_DATE_RE.test(message)) return true;
  if (
    /\b(born|dob|birth date|date of birth|birthday|birth time)\b/i.test(message) &&
    (/\d{1,2}[\/\-\.]\d{1,2}/.test(message) ||
      MONTH_NAME_DATE_RE.test(message) ||
      /\b\d{1,2}\s+(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i.test(message))
  ) {
    return true;
  }
  return false;
}

function inferUserGoal(message: string, orientation: QuestionOrientation, topic: ProductTopic): string {
  if (orientation === "reconciliation") return "Understand reunion possibilities and emotional path forward";
  if (orientation === "future") return "Outlook on what may unfold — timing and possibilities";
  if (orientation === "healing") return "Process loss and find a way through";
  if (orientation === "guidance") return "Clear direction on what to do next";
  if (topic === "career") return "Career clarity, opportunity, or decision support";
  if (topic === "love" || topic === "breakup") return "Relationship understanding and emotional clarity";
  if (/\?/.test(message)) return "Direct answer to their question";
  return "Thoughtful reading of their situation";
}

export function internalReasoning(
  ctx: ConversationContext,
  interp: MessageInterpretation,
  productTopic: ProductTopic
): InternalReasoning {
  const message = ctx.lastUserMessage;
  const memory = interp.memory;
  const orientation = detectOrientation(message);
  const emotion = detectEmotionLabel(message, memory.emotionalTone);
  const emotionalState = detectEmotionalState(message, memory.emotionalTone);
  const isFreshContext = isFreshReadingContext(message);
  const topicSwitched = memory.topicSwitched || isFreshContext;
  const userGoal = inferUserGoal(message, orientation, productTopic);

  const memoryNeeds: string[] = [];
  if (isFreshContext) {
    memoryNeeds.push("profile_only");
  } else if (topicSwitched) {
    memoryNeeds.push("current_topic_only");
  } else {
    memoryNeeds.push(`topic:${productTopic}`);
  }

  if (
    memory.facts.lackedClosure &&
    (productTopic === "love" ||
      productTopic === "breakup" ||
      productTopic === "reconciliation")
  ) {
    memoryNeeds.push("closure_context");
  }

  const sign = interp.entities.sign ?? ctx.knownSign;
  const astroContext = sign
    ? planetThemeForIntent(memory.chatIntent)
    : null;

  if (sign) memoryNeeds.push("chart_reference");

  const knowledgeSources: string[] = [];
  if (/\b(retrograde|transit|moon phase|eclipse|forecast)\b/i.test(message)) {
    knowledgeSources.push("astrology_knowledge");
  }
  if (productTopic === "love" || productTopic === "breakup" || productTopic === "reconciliation") {
    knowledgeSources.push("relationship_knowledge");
  }

  const responseStrategy: string[] = [
    "Never quote or repeat their message back to them.",
    "Never use meta phrases like 'What you shared' or 'From a chart perspective'.",
    toneGuidanceFor(emotionalState, productTopic),
    "Answer their latest message directly — warm, natural, conversational.",
  ];

  const LOVE_TOPICS: ProductTopic[] = ["love", "breakup", "reconciliation", "marriage"];
  if (LOVE_TOPICS.includes(productTopic)) {
    responseStrategy.push(...buildLoveGuidancePlan(ctx, memory, orientation));
  } else if (productTopic === "career" || memory.chatIntent === "career") {
    responseStrategy.push(...buildCareerGuidancePlan(ctx, memory));
  } else {
    responseStrategy.push(
      "Let their story lead. Weave astrology only where it genuinely illuminates."
    );
  }

  if (sign && astroContext) {
    responseStrategy.push(
      `One chart insight using ${astroContext.toLowerCase()} — woven in, never as a sign trait list.`
    );
  }

  if (isFreshContext) {
    responseStrategy.push("Fresh reading — ignore unrelated past topics.");
  } else if (topicSwitched) {
    responseStrategy.push("Topic changed — do not carry over the previous subject.");
  }

  responseStrategy.push("Close with something useful — insight or one practical step.");

  return {
    intent: memory.chatIntent,
    emotion,
    topic: productTopic,
    userGoal,
    memoryNeeds,
    astroContext,
    knowledgeSources,
    responseStrategy,
    orientation,
    isFreshContext,
    topicSwitched,
  };
}

export const INTERNAL_LEAK_PATTERNS = [
  /\byou(?:'re| are) shifting focus\b/i,
  /\bactive topic\b/i,
  /\bthey want\b/i,
  /\buser wants\b/i,
  /\bdob on file\b/i,
  /\bsun sign\b/i,
  /\bwhat you(?:'re| are) experiencing maps to\b/i,
  /\bcontinuing thread\b/i,
  /\bcontinue the same thread\b/i,
  /\bturn #\d+/i,
  /\bstep \d+/i,
  /\binternal reasoning\b/i,
  /\bconversation memory\b/i,
  /\btopic switched\b/i,
  /\babandon .* thread\b/i,
  /\bconfidence:\s*0\.\d+/i,
  /\bsemantic memory\b/i,
  /\bPRIORITY \d+/i,
  /\borientation:\s*\w+/i,
  /\buser themes detected\b/i,
  /\bquestion to answer:/i,
  /\bemotional undertone to honour:/i,
  /\brelevant background\b/i,
  /\bcontext \(use naturally\b/i,
  /\bgemini energy\b/i,
  /\bcapricorn often carries\b/i,
  /\bfocus on what is within your control\b/i,
  /\blooking at your \w+ energy\b/i,
  /\byour question opens a new chapter\b/i,
  /\bwhat stands out in your message is the specific weight\b/i,
  /\bnotes for you only\b/i,
  /\bquality retry\b/i,
  /\brevise your previous attempt\b/i,
];

export function hasInternalLeak(text: string): boolean {
  return INTERNAL_LEAK_PATTERNS.some((re) => re.test(text));
}

export function buildPrivateReasoningLog(reasoning: InternalReasoning): string {
  return JSON.stringify({
    intent: reasoning.intent,
    emotion: reasoning.emotion,
    topic: reasoning.topic,
    userGoal: reasoning.userGoal,
    memoryNeeds: reasoning.memoryNeeds,
    astroContext: reasoning.astroContext,
    knowledgeSources: reasoning.knowledgeSources,
    orientation: reasoning.orientation,
    fresh: reasoning.isFreshContext,
    topicSwitched: reasoning.topicSwitched,
  });
}
