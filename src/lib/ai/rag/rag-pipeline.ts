import type { ExtractedInsight, Conversation } from "@/types";
import type { ChatMessage, BirthDetailsPayload } from "../conversation-context";
import { buildConversationContext, applyBirthDetailsToContext } from "../conversation-context";
import { interpretMessage } from "../message-interpreter";
import { decideChatAction, type ChatDecision } from "../chat-decision";
import { determinePhase } from "../prompts";
import { buildChatPrompt } from "../prompts";
import {
  buildRetrievalContext,
  type RetrievalContext,
} from "../retrieval-context";
import { retrieveConversationMemory, retrieveUserProfile } from "./memory-retrieval";
import { retrieveInternetKnowledge } from "./internet-retrieval";
import {
  checkResponseQuality,
} from "./response-quality";
import type { ConversationContext } from "../conversation-context";
import type { MessageInterpretation } from "../message-interpreter";
import type { PastConversationSnippet, RagPipelineInput } from "./types";
import { ragStageLog, chatLog, logProductionPipeline } from "../chat-debug";
import { buildReasoningSummary, type ReasoningSummary } from "../reasoning-engine";
import { buildPrivateReasoningLog } from "../internal-reasoning";
import { detectProductTopic, detectEmotionLabel } from "../topic-detector";
import {
  buildConversationSummary,
  mergeSummariesForPrompt,
  type ConversationSummary,
} from "../memory/conversation-summarizer";
import { SHORT_TERM_MESSAGE_LIMIT } from "../memory/short-term-memory";

export interface RagPipelineResult {
  ctx: ConversationContext;
  interp: MessageInterpretation;
  decision: ChatDecision;
  retrieval: RetrievalContext;
  reasoning: ReasoningSummary;
  phase: Conversation["phase"];
  hasBirthDetails: boolean;
  systemPrompt: string;
  llmMessages: { role: "system" | "user" | "assistant"; content: string }[];
  chatMessages: ChatMessage[];
  conversationSummary: ConversationSummary | null;
  productTopic: string;
  emotion: string;
  memoryBlock: string;
  profileBlock: string;
}

function inferPreviousTopic(ctx: ConversationContext): import("../topic-detector").ProductTopic | null {
  if (ctx.userMessages.length < 2) return null;
  const prev = ctx.userMessages[ctx.userMessages.length - 2];
  return detectProductTopic(prev).topic;
}

function trimHistory(messages: ChatMessage[], max = SHORT_TERM_MESSAGE_LIMIT): ChatMessage[] {
  return messages
    .filter((m) => m.content?.trim())
    .filter((m, idx) => !(m.role === "assistant" && idx === 0 && m.content.includes("Cosmic Mirror")))
    .slice(-max);
}

function modelMessages(chatMessages: ChatMessage[]) {
  return chatMessages
    .filter((m, idx) => !(m.role === "assistant" && idx === 0 && m.content.includes("Cosmic Mirror")))
    .map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    }));
}

export async function runRagPipeline(input: RagPipelineInput): Promise<RagPipelineResult> {
  const {
    chatMessages: rawMessages,
    insights = [],
    memories = [],
    birthDetails,
    externalKnowledge,
    pastConversations = [],
    conversationSummaries = [],
    phase,
  } = input;

  const chatMessages = trimHistory(rawMessages);
  const userMessage = chatMessages.filter((m) => m.role === "user").at(-1)?.content ?? "";

  ragStageLog("user_message", { userMessage, historyCount: chatMessages.length });

  const baseCtx = buildConversationContext(chatMessages);
  const ctx = applyBirthDetailsToContext(baseCtx, birthDetails);
  const hasBirthDetails = !!birthDetails?.dateOfBirth || !!ctx.knownBirthDate;

  const interp = interpretMessage(ctx, chatMessages);

  const previousTopic = inferPreviousTopic(ctx);
  const topicResult = detectProductTopic(userMessage, previousTopic);
  const emotion = detectEmotionLabel(userMessage, interp.memory.emotionalTone);

  ragStageLog("intent_detection", {
    chatIntent: interp.chatIntent,
    productTopic: topicResult.topic,
    topicSwitched: topicResult.switched || interp.memory.topicSwitched,
    confidence: topicResult.confidence,
  });

  ragStageLog("topic_detection", {
    primaryTopic: topicResult.topic,
    previousTopic: topicResult.previousTopic,
    chatIntent: interp.chatIntent,
    emotionalSituation: interp.emotionalSituation,
  });

  ragStageLog("emotion_detection", { emotion, tone: interp.memory.emotionalTone });

  const decision = decideChatAction(ctx, interp, hasBirthDetails);

  const reasoning = buildReasoningSummary(ctx, interp, topicResult.topic);
  ragStageLog("internal_reasoning", {
    topic: topicResult.topic,
    log: buildPrivateReasoningLog(reasoning.privateReasoning),
  });
  ragStageLog("reasoning", {
    orientation: reasoning.orientation,
    emotion: reasoning.privateReasoning.emotion,
    freshContext: reasoning.privateReasoning.isFreshContext,
    memoryNeeds: reasoning.privateReasoning.memoryNeeds,
  });

  const profile = retrieveUserProfile(ctx, birthDetails);
  const memoryResult = retrieveConversationMemory(
    ctx,
    interp,
    insights,
    memories,
    pastConversations as PastConversationSnippet[],
    birthDetails
  );

  logProductionPipeline({
    detectedIntent: interp.chatIntent,
    activeTopic: topicResult.topic,
    emotion,
    retrievedMemories: memoryResult.semanticHits.length + memories.length,
  });

  const newSummary = buildConversationSummary(
    ctx,
    interp.memory,
    topicResult.topic,
    insights,
    conversationSummaries
  );
  const summaryBlock = mergeSummariesForPrompt(conversationSummaries, newSummary);

  if (newSummary) {
    ragStageLog("conversation_summary", { turn: newSummary.generatedAtTurn, topics: newSummary.majorTopics });
    logProductionPipeline({
      detectedIntent: interp.chatIntent,
      activeTopic: topicResult.topic,
      emotion,
      retrievedMemories: memoryResult.semanticHits.length,
      summaryGenerated: true,
    });
  }

  let retrieval = buildRetrievalContext(
    ctx,
    interp,
    insights,
    memories,
    birthDetails,
    externalKnowledge
  );

  if (retrieval.need.needsRetrieval && !retrieval.hasExternalKnowledge) {
    const internetChunks = await retrieveInternetKnowledge(userMessage, retrieval.need.needsRetrieval);
    if (internetChunks.length) {
      retrieval = {
        ...retrieval,
        externalKnowledge: internetChunks,
        hasExternalKnowledge: true,
        hasLiveCelestialData: retrieval.need.needsLiveCelestialData,
        liveDataMissing: retrieval.need.needsLiveCelestialData && internetChunks.length === 0,
      };
    }
  }

  ragStageLog("knowledge_retrieval", {
    internalChunks: retrieval.internalKnowledge.length,
    externalChunks: retrieval.externalKnowledge.length,
    liveDataMissing: retrieval.liveDataMissing,
  });

  const currentPhase: Conversation["phase"] = determinePhase(
    ctx.messageCount,
    false,
    hasBirthDetails,
    decision.phase ?? phase
  );

  const memoryBlock = [memoryResult.conversationMemory, summaryBlock].filter(Boolean).join("\n\n");

  const systemPrompt = buildChatPrompt(
    currentPhase,
    insights,
    ctx,
    interp,
    decision,
    {
      memories,
      retrieval,
      birthDetails,
      memoryBlock,
      profileBlock: profile.formatted,
      reasoning,
    }
  );

  const llmMessages = [
    { role: "system" as const, content: systemPrompt },
    ...modelMessages(chatMessages),
  ];

  ragStageLog("prompt_construction", {
    systemPromptLength: systemPrompt.length,
    llmMessageCount: llmMessages.length,
    phase: currentPhase,
  });

  chatLog("INTENT", {
    chatIntent: interp.chatIntent,
    productTopic: topicResult.topic,
    topicSwitched: interp.memory.topicSwitched,
  });

  return {
    ctx,
    interp,
    decision,
    retrieval,
    reasoning,
    phase: currentPhase,
    hasBirthDetails,
    systemPrompt,
    llmMessages,
    chatMessages,
    conversationSummary: newSummary,
    productTopic: topicResult.topic,
    emotion,
    memoryBlock,
    profileBlock: profile.formatted,
  };
}

export function applyQualityCheck(
  response: string,
  pipeline: RagPipelineResult,
  _insights: ExtractedInsight[],
  _memories: string[],
  _birthDetails?: BirthDetailsPayload | null
): { text: string; quality: ReturnType<typeof checkResponseQuality>; retried: boolean } {
  const quality = checkResponseQuality({
    response,
    ctx: pipeline.ctx,
    topicSwitched: pipeline.interp.memory.topicSwitched,
    reasoning: pipeline.reasoning,
    knownSign: pipeline.ctx.knownSign ?? pipeline.interp.entities.sign,
  });

  logProductionPipeline({
    detectedIntent: pipeline.interp.chatIntent,
    activeTopic: pipeline.productTopic,
    emotion: pipeline.emotion,
    retrievedMemories: 0,
    qualityScore: quality.score,
    duplicateScore: quality.similarity,
  });

  return { text: response, quality, retried: false };
}

export function buildRetryPrompt(
  pipeline: RagPipelineResult,
  insights: ExtractedInsight[],
  memories: string[],
  birthDetails: BirthDetailsPayload | null | undefined,
  regenerationHint: string
): string {
  return buildChatPrompt(
    pipeline.phase,
    insights,
    pipeline.ctx,
    pipeline.interp,
    pipeline.decision,
    {
      memories,
      retrieval: pipeline.retrieval,
      birthDetails,
      memoryBlock: pipeline.memoryBlock,
      profileBlock: pipeline.profileBlock,
      reasoning: pipeline.reasoning,
      retryHint: regenerationHint,
    }
  );
}

export async function generateWithQualityGate(
  generate: (
    messages: RagPipelineResult["llmMessages"],
    isRetry: boolean
  ) => Promise<string>,
  pipeline: RagPipelineResult,
  insights: ExtractedInsight[],
  memories: string[],
  birthDetails?: BirthDetailsPayload | null
): Promise<{ text: string; quality: ReturnType<typeof checkResponseQuality>; retried: boolean }> {
  let text = await generate(pipeline.llmMessages, false);
  let result = applyQualityCheck(text, pipeline, insights, memories, birthDetails);

  const maxRetries = 2;
  let retries = 0;

  while (!result.quality.passed && result.quality.regenerationHint && retries < maxRetries) {
    retries++;
    ragStageLog("llm_generation", {
      action: "retry_after_quality_fail",
      score: result.quality.score,
      duplicateScore: result.quality.similarity,
      attempt: retries,
      issues: result.quality.issues,
    });
    const retryPrompt = buildRetryPrompt(
      pipeline,
      insights,
      memories,
      birthDetails,
      result.quality.regenerationHint
    );
    const retryMessages = [
      { role: "system" as const, content: retryPrompt },
      ...pipeline.llmMessages.slice(1),
    ];
    text = await generate(retryMessages, true);
    const retryQuality = checkResponseQuality({
      response: text,
      ctx: pipeline.ctx,
      topicSwitched: pipeline.interp.memory.topicSwitched,
      reasoning: pipeline.reasoning,
      knownSign: pipeline.ctx.knownSign ?? pipeline.interp.entities.sign,
    });
    result = { text, quality: retryQuality, retried: true };
  }

  logProductionPipeline({
    detectedIntent: pipeline.interp.chatIntent,
    activeTopic: pipeline.productTopic,
    emotion: pipeline.emotion,
    retrievedMemories: 0,
    qualityScore: result.quality.score,
    duplicateScore: result.quality.similarity,
    responseGenerated: true,
  });

  ragStageLog("llm_generation", {
    length: text.length,
    retried: result.retried,
    passed: result.quality.passed,
    score: result.quality.score,
  });

  return result;
}
