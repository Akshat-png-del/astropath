import type { ConversationContext } from "./conversation-context";
import {
  detectExplicitTopicShift,
  isVagueFollowUp,
  type ChatIntent,
  type EmotionalSituation,
} from "./intent-classifier";
import { hasTopicKeyword, scoreTopic, TOPIC_KEYWORDS, type ReadingTopic } from "./message-topics";
import { isExplicitQuestion } from "./question-understanding";
import { extractConversationFacts, type ConversationFacts } from "./conversation-facts";
import {
  resolveConversationState,
  emotionalSituationForActiveTopic,
  type ConversationState,
} from "./conversation-state";
import { formatFactsForPrompt } from "./conversation-facts";

export interface ConversationMemory {
  chatIntent: ChatIntent;
  emotionalSituation: EmotionalSituation;
  situationSummary: string;
  relationshipContext: string | null;
  isFollowUp: boolean;
  resolvedQuestion: string;
  activeTopic: ReadingTopic;
  emotionalTone: "negative" | "positive" | "neutral";
  facts: ConversationFacts;
  turnNumber: number;
  conversationState: ConversationState;
  topicSwitched: boolean;
  previousTopic: ChatIntent;
  intentConfidence: number;
  activeSegmentMessages: string[];
  followUpCleared: boolean;
}

function extractRelationshipContext(messages: string[]): string | null {
  const combined = messages.join(" ");
  const patterns: [RegExp, string][] = [
    [/\b(boyfriend|girlfriend|husband|wife|partner|fiancé|fiance)\b[^.?!]{0,40}\b(left|dumped|broke up|ended|walked away)\b/i, "partner ended the relationship"],
    [/\b(boyfriend|girlfriend|husband|wife|partner)\b[^.?!]{0,30}\b(cheat|cheating|affair|lied)\b/i, "trust issue with partner"],
    [/\b(ex|ex-boyfriend|ex-girlfriend)\b/i, "involves an ex"],
    [/\b(boyfriend|girlfriend|husband|wife|partner|crush)\b/i, "romantic relationship focus"],
    [/\b(marriage|married|wedding|divorce)\b/i, "marriage or commitment"],
  ];

  for (const [re, label] of patterns) {
    if (re.test(combined)) return label;
  }
  return null;
}

function buildSituationSummary(
  ctx: ConversationContext,
  memory: Partial<ConversationMemory>,
  segmentMessages: string[]
): string {
  const parts: string[] = [];
  const activeIntent = memory.chatIntent;

  parts.push(`Active topic: ${activeIntent}`);

  if (memory.topicSwitched) {
    parts.push(`User switched from ${memory.previousTopic} to ${activeIntent} — abandon prior topic entirely`);
  }

  if (activeIntent === "breakup" && memory.emotionalSituation === "breakup") {
    parts.push("User is going through a breakup or separation");
  } else if (activeIntent === "career") {
    parts.push("User is asking about career or work");
  } else if (activeIntent === "finance") {
    parts.push("User is asking about money or finances");
  } else if (memory.emotionalSituation === "career_stress") {
    parts.push("User is stressed about work or career");
  } else if (memory.emotionalSituation === "anxiety") {
    parts.push("User is anxious or emotionally overwhelmed");
  }

  if (memory.relationshipContext && (activeIntent === "breakup" || activeIntent === "relationship")) {
    parts.push(memory.relationshipContext);
  }

  const substantive = segmentMessages.filter(
    (m) => m.length > 10 && !/^\d/.test(m.trim())
  );
  if (substantive.length > 0) {
    const latest = substantive.at(-1)!;
    const latestSnippet = latest.length > 120 ? `${latest.slice(0, 120)}…` : latest;
    parts.push(`Latest in this topic: "${latestSnippet}"`);
  }

  if (ctx.knownSign) parts.push(`Sun sign: ${ctx.knownSign}`);
  if (ctx.knownBirthDate) parts.push(`DOB on file`);
  if (ctx.knownLocation) parts.push(`Birth place: ${ctx.knownLocation}`);

  return parts.length ? parts.join(". ") + "." : "General life guidance request.";
}

function resolveQuestion(
  ctx: ConversationContext,
  isFollowUp: boolean,
  chatIntent: ChatIntent,
  emotionalSituation: EmotionalSituation,
  topicSwitched: boolean
): string {
  const last = ctx.lastUserMessage.trim();

  if (topicSwitched) return last;

  if (!isFollowUp) return last;

  if (/\b(in my way|blocking|obstacle|holding me back)\b/i.test(last)) {
    if (chatIntent === "breakup") {
      return "What is blocking healing or moving forward after this breakup?";
    }
    if (chatIntent === "career") return "What is blocking career progress?";
    return "What obstacles are in their path right now?";
  }

  if (/\b(future|coming|ahead|expect|outlook|forecast|next)\b/i.test(last)) {
    if (chatIntent === "breakup" || chatIntent === "relationship") {
      return "What can they expect in love and emotional healing in the coming weeks and months?";
    }
    if (chatIntent === "career") {
      return "What can they expect in their career over the coming months?";
    }
    if (chatIntent === "finance") {
      return "What can they expect financially in the near future?";
    }
    return "What can they expect in the coming weeks and months given what they have shared?";
  }

  const prior = ctx.userMessages.slice(0, -1).join(" ");
  const priorSnippet = prior.length > 80 ? `${prior.slice(0, 80)}…` : prior;
  return `${last} (in context of: ${priorSnippet})`;
}

function detectFollowUp(
  ctx: ConversationContext,
  topicSwitched: boolean,
  activeIntent: ChatIntent
): boolean {
  if (topicSwitched) return false;

  const last = ctx.lastUserMessage.trim();
  if (ctx.messageCount <= 1) return false;

  if (detectExplicitTopicShift(last)) return false;

  const segmentCtx = { ...ctx, userMessages: ctx.userMessages };
  const facts = extractConversationFacts(segmentCtx, ctx.userMessages.slice(-1));

  if (facts.isContextUpdate && (activeIntent === "breakup" || activeIntent === "relationship")) {
    return true;
  }

  if (isVagueFollowUp(last)) return true;
  if (/\b(that|this|it|those|same|earlier|still|again|more about|in my way)\b/i.test(last)) return true;
  if (/^(and|also|what about|how about|but)\b/i.test(last)) return true;

  const lastHasDomain =
    scoreTopic(last, TOPIC_KEYWORDS.relationship) > 0 ||
    scoreTopic(last, TOPIC_KEYWORDS.career) > 0 ||
    scoreTopic(last, TOPIC_KEYWORDS.finance) > 0;

  if (isExplicitQuestion(last) && !lastHasDomain && ctx.userMessages.length > 1) {
    return true;
  }

  return false;
}

function resolveActiveTopic(intent: ChatIntent): ReadingTopic {
  if (intent === "breakup" || intent === "relationship") return "love";
  if (intent === "career" || intent === "finance") return "career";
  return "general";
}

function detectTone(
  segmentMessages: string[],
  situation: EmotionalSituation
): ConversationMemory["emotionalTone"] {
  const combined = segmentMessages.join(" ");
  if (situation !== "none" || hasTopicKeyword(combined, "emotions_negative")) return "negative";
  if (hasTopicKeyword(combined, "emotions_positive")) return "positive";
  return "neutral";
}

export function buildConversationMemory(ctx: ConversationContext): ConversationMemory {
  const resolved = resolveConversationState(ctx);
  const { state, topicSwitched, previousTopic, activeSegmentMessages, currentClassification } = resolved;

  const chatIntent = state.activeTopic;
  const followUpCleared = topicSwitched;
  const emotionalSituation = emotionalSituationForActiveTopic(activeSegmentMessages, chatIntent);
  const relationshipContext =
    chatIntent === "breakup" || chatIntent === "relationship"
      ? extractRelationshipContext(activeSegmentMessages)
      : null;

  const isFollowUp = detectFollowUp(ctx, topicSwitched, chatIntent);
  const activeTopic = resolveActiveTopic(chatIntent);
  const emotionalTone = detectTone(activeSegmentMessages, emotionalSituation);

  const facts = extractConversationFacts(ctx, activeSegmentMessages);

  const resolvedQuestion = topicSwitched
    ? ctx.lastUserMessage
    : facts.isContextUpdate && !followUpCleared
      ? `User added context: "${ctx.lastUserMessage}" — respond to this NEW detail about ${chatIntent}.`
      : resolveQuestion(ctx, isFollowUp, chatIntent, emotionalSituation, topicSwitched);

  const memory: ConversationMemory = {
    chatIntent,
    emotionalSituation,
    situationSummary: "",
    relationshipContext,
    isFollowUp,
    resolvedQuestion,
    activeTopic,
    emotionalTone,
    facts,
    turnNumber: ctx.messageCount,
    conversationState: state,
    topicSwitched,
    previousTopic,
    intentConfidence: currentClassification.confidence,
    activeSegmentMessages,
    followUpCleared,
  };

  memory.situationSummary = buildSituationSummary(ctx, memory, activeSegmentMessages);
  return memory;
}

export function formatMemoryForPrompt(memory: ConversationMemory): string {
  return `CONVERSATION MEMORY (always honour this):
Active topic: ${memory.conversationState.activeTopic} (confidence: ${memory.intentConfidence.toFixed(2)})
${memory.topicSwitched ? `TOPIC SWITCHED from ${memory.previousTopic} → ${memory.chatIntent}. Abandon ${memory.previousTopic} thread. Do NOT ask breakup/relationship follow-ups.` : ""}
Emotional context: ${memory.conversationState.emotionalContext}
Emotional situation: ${memory.emotionalSituation}
Turn: #${memory.turnNumber}${memory.facts.isContextUpdate && !memory.followUpCleared ? " (context update within same topic)" : ""}
Situation: ${memory.situationSummary}
${memory.relationshipContext && (memory.chatIntent === "breakup" || memory.chatIntent === "relationship") ? `Relationship context: ${memory.relationshipContext}` : ""}
${memory.isFollowUp && !memory.followUpCleared ? `FOLLOW-UP: Yes — continue the ${memory.chatIntent} thread only.` : ""}
Question to answer: "${memory.resolvedQuestion}"
Active life area: ${memory.activeTopic}
Tone: ${memory.emotionalTone}

${formatFactsForPrompt(memory.facts)}`;
}
