import type { ExtractedInsight } from "@/types";
import type { ConversationContext } from "../conversation-context";
import type { BirthDetailsPayload } from "../conversation-context";
import type { MessageInterpretation } from "../message-interpreter";
import { formatMemoryForPromptSanitized } from "../memory/format-sanitized-memory";
import {
  rankLongTermMemories,
  formatLongTermForPrompt,
  MEMORY_RELEVANCE_THRESHOLD,
} from "../memory/long-term-memory";
import {
  buildShortTermMemory,
  formatShortTermForPrompt,
} from "../memory/short-term-memory";
import { detectProductTopic } from "../topic-detector";
import { isFreshReadingContext } from "../internal-reasoning";
import type { MemoryRetrievalResult, PastConversationSnippet, ProfileRetrievalResult } from "./types";
import { ragStageLog } from "../chat-debug";

export function retrieveUserProfile(
  ctx: ConversationContext,
  birthDetails?: BirthDetailsPayload | null
): ProfileRetrievalResult {
  const freshContext = isFreshReadingContext(ctx.lastUserMessage);
  const productTopic = detectProductTopic(ctx.lastUserMessage).topic;

  const longTerm = rankLongTermMemories(
    ctx.lastUserMessage,
    ctx,
    [],
    [],
    [],
    birthDetails,
    6,
    productTopic,
    freshContext
  );

  return {
    formatted: longTerm.formatted || "",
    hasBirthData: !!(birthDetails?.dateOfBirth ?? ctx.knownBirthDate),
  };
}

export function retrieveConversationMemory(
  ctx: ConversationContext,
  interp: MessageInterpretation,
  insights: ExtractedInsight[],
  storedMemories: string[],
  pastConversations: PastConversationSnippet[],
  birthDetails?: BirthDetailsPayload | null
): MemoryRetrievalResult {
  const productTopic = detectProductTopic(ctx.lastUserMessage).topic;
  const freshContext = isFreshReadingContext(ctx.lastUserMessage);

  const stm = buildShortTermMemory(ctx, interp.memory, productTopic);
  const shortBlock = formatShortTermForPrompt(stm);

  const longTerm = rankLongTermMemories(
    ctx.lastUserMessage,
    ctx,
    insights,
    storedMemories,
    pastConversations,
    birthDetails,
    8,
    productTopic,
    freshContext
  );
  const longBlock = formatLongTermForPrompt(longTerm);

  const sanitized = formatMemoryForPromptSanitized(
    interp.memory,
    productTopic,
    freshContext
  );

  const parts = [sanitized, shortBlock, longBlock].filter(Boolean);
  const conversationMemory = parts.join("\n\n");

  ragStageLog("memory_retrieval", {
    shortTermMessages: stm.recentUserMessages.length,
    longTermCount: longTerm.ranked.length,
    topMemoryScore: longTerm.ranked[0]?.score ?? 0,
    memoryRelevanceThreshold: MEMORY_RELEVANCE_THRESHOLD,
    emotionalState: stm.emotionalState,
    activeTopic: productTopic,
    topicDetection: productTopic,
    freshContext,
    storedMemories: storedMemories.length,
    pastConversations: pastConversations.length,
  });

  return {
    conversationMemory,
    semanticHits: longTerm.ranked
      .filter((m) => m.category === "semantic")
      .map((m) => ({
        source: "stored_memory" as const,
        text: m.text,
        score: m.score,
      })),
    storedMemories,
  };
}
