import type { ConversationContext } from "../conversation-context";
import type { ConversationMemory } from "../conversation-memory";
import type { ProductTopic } from "../topic-detector";
import { detectEmotionLabel } from "../topic-detector";

export const SHORT_TERM_MESSAGE_LIMIT = 20;

export interface ShortTermMemory {
  activeTopic: ProductTopic | string;
  emotionalState: string;
  recentUserMessages: string[];
  recentAssistantMessages: string[];
  unresolvedQuestions: string[];
  recentPredictions: string[];
  currentConcerns: string[];
  turnNumber: number;
  topicSwitched: boolean;
}

function extractUnresolvedQuestions(userMessages: string[]): string[] {
  return userMessages
    .filter((m) => /\?|will (he|she|they|i)|what (will|should|if)|when will|how (will|can)/i.test(m))
    .slice(-3);
}

function extractRecentPredictions(assistantMessages: string[]): string[] {
  return assistantMessages
    .filter((m) => /\b(may|could|might|suggests|indicates|coming month|weeks ahead|over the next)\b/i.test(m))
    .slice(-2)
    .map((m) => m.slice(0, 120));
}

export function buildShortTermMemory(
  ctx: ConversationContext,
  memory: ConversationMemory,
  productTopic: ProductTopic
): ShortTermMemory {
  const recentUser = ctx.userMessages.slice(-SHORT_TERM_MESSAGE_LIMIT);
  const recentAssistant = ctx.assistantMessages.slice(-SHORT_TERM_MESSAGE_LIMIT);

  const concerns: string[] = [];
  if (memory.facts.lackedClosure) concerns.push("lack of closure");
  if (memory.facts.hadGradualConflict) concerns.push("repeated conflict before ending");
  if (memory.relationshipContext) concerns.push(memory.relationshipContext);
  if (memory.chatIntent === "career") concerns.push("career direction");
  if (memory.chatIntent === "finance") concerns.push("financial stability");

  return {
    activeTopic: productTopic,
    emotionalState: detectEmotionLabel(ctx.lastUserMessage, memory.emotionalTone),
    recentUserMessages: recentUser,
    recentAssistantMessages: recentAssistant,
    unresolvedQuestions: extractUnresolvedQuestions(recentUser),
    recentPredictions: extractRecentPredictions(recentAssistant),
    currentConcerns: concerns,
    turnNumber: memory.turnNumber,
    topicSwitched: memory.topicSwitched,
  };
}

/** Sanitized for model — no internal labels that could leak to user. */
export function formatShortTermForPrompt(stm: ShortTermMemory): string {
  const lines: string[] = [];

  if (stm.topicSwitched) {
    lines.push("The conversation has moved to a new life area — respond to the latest message only.");
  }

  if (stm.currentConcerns.length) {
    lines.push(`Background: ${stm.currentConcerns.join("; ")}`);
  }

  if (stm.unresolvedQuestions.length) {
    lines.push(`Open questions they raised: ${stm.unresolvedQuestions.map((q) => `"${q.slice(0, 80)}"`).join("; ")}`);
  }

  if (stm.recentPredictions.length) {
    lines.push(`Do not repeat prior outlooks verbatim: ${stm.recentPredictions.join(" | ")}`);
  }

  lines.push(`Tone: ${stm.emotionalState}`);

  return lines.join("\n");
}
