import type { ExtractedInsight, Conversation } from "@/types";
import type { ConversationContext } from "./conversation-context";
import type { ChatDecision } from "./chat-decision";
import type { MessageInterpretation } from "./message-interpreter";
import type { BirthDetailsPayload } from "./conversation-context";
import type { ReasoningSummary } from "./reasoning-engine";
import type { RetrievalContext } from "./retrieval-context";
import { composeSystemPrompt } from "./prompt-composer";

export function buildChatPrompt(
  phase: Conversation["phase"],
  insights: ExtractedInsight[],
  ctx: ConversationContext,
  interp: MessageInterpretation,
  decision: ChatDecision,
  options?: {
    memories?: string[];
    knowledgeContext?: string;
    retrieval?: RetrievalContext;
    birthDetails?: BirthDetailsPayload | null;
    memoryBlock?: string;
    profileBlock?: string;
    reasoning?: ReasoningSummary;
    retryHint?: string;
  }
): string {
  if (!options?.reasoning) {
    return composeSystemPrompt({
      phase,
      ctx,
      interp,
      decision,
      reasoning: {
        includeFollowUp: false,
        followUpPrompt: null,
        orientation: "present",
        userThemes: [],
        formattedBlock: "",
        promptGuidance: "",
        internalBrief: "",
        privateReasoning: {
          intent: "general",
          emotion: "neutral",
          topic: "general",
          userGoal: "",
          memoryNeeds: [],
          astroContext: null,
          knowledgeSources: [],
          responseStrategy: ["Answer their message directly."],
          orientation: "present",
          isFreshContext: false,
          topicSwitched: false,
        },
        reflection: "",
        interpretation: "",
        astroInsight: "",
        futurePossibilities: null,
        practicalGuidance: "",
        whatUserWants: ctx.lastUserMessage,
        priorConversation: "",
        emotions: "",
        astrologicalPrinciples: "",
        practicalAdvice: "",
        futureGuidance: null,
      },
      retrieval: options?.retrieval,
      memoryBlock: options?.memoryBlock,
      profileBlock: options?.profileBlock,
      birthDetails: options?.birthDetails,
      insights,
      storedMemories: options?.memories,
      retryHint: options?.retryHint,
    });
  }

  return composeSystemPrompt({
    phase,
    ctx,
    interp,
    decision,
    reasoning: options.reasoning,
    retrieval: options?.retrieval,
    memoryBlock: options?.memoryBlock,
    profileBlock: options?.profileBlock,
    birthDetails: options?.birthDetails,
    insights,
    storedMemories: options?.memories,
    retryHint: options?.retryHint,
  });
}

export function buildReportPrompt(
  conversationInsights: ExtractedInsight[],
  chartSummary: string,
  knowledgeContext: string,
  userName: string
): string {
  return `Personalised birth chart report for ${userName}. Plain language. Warm tone like a professional astrologer. Avoid the word "cosmic" in user-facing text — use astrology terms like birth chart, stars, planets, and zodiac instead.

INSIGHTS FROM CHAT:
${conversationInsights.map((i) => `- ${i.category}: ${i.value}`).join("\n")}

BIRTH CHART:
${chartSummary}

REFERENCE:
${knowledgeContext}

Return JSON:
{
  "title": "string",
  "summary": "string (2-3 short paragraphs, simple words)",
  "cosmicDna": {
    "archetype": "string",
    "coreTraits": ["string"],
    "emotionalPattern": "string",
    "relationshipStyle": "string",
    "careerDrive": "string",
    "hiddenStrength": "string",
    "soulLesson": "string",
    "cosmicSignature": "string"
  },
  "curiosityCards": [
    { "type": "hidden_strength", "title": "string", "content": "string", "confidence": 0.0-1.0, "reasoning": "string" },
    { "type": "upcoming_opportunity", "title": "string", "content": "string", "confidence": 0.0-1.0, "reasoning": "string" },
    { "type": "relationship_pattern", "title": "string", "content": "string", "confidence": 0.0-1.0, "reasoning": "string" },
    { "type": "soul_lesson", "title": "string", "content": "string", "confidence": 0.0-1.0, "reasoning": "string" },
    { "type": "ninety_day_outlook", "title": "string", "content": "string", "confidence": 0.0-1.0, "reasoning": "string" }
  ],
  "sections": [
    { "title": "string", "content": "string", "confidence": 0.0-1.0, "reasoning": "string", "astrologicalBasis": ["string"] }
  ]
}

Use plain-language curiosity in curiosityCards titles. No fear predictions.`;
}

export function buildInsightExtractionPrompt(
  userMessage: string,
  assistantResponse: string
): string {
  return `Analyze this exchange.

USER: ${userMessage}
ASSISTANT: ${assistantResponse}

Return JSON:
{
  "insights": [{ "category": "string", "value": "string", "confidence": 0.0-1.0 }],
  "sentiment": "positive|neutral|negative|mixed",
  "topicsDiscussed": ["string"]
}

Categories: personality, emotions, relationships, career, goals, struggles, love, money, birth_date, zodiac_sign, self_worth, family, finance, spirituality, relationship_status, career_status, breakup`;
}

export function determinePhase(
  messageCount: number,
  _birthDetailsRequested: boolean,
  hasBirthDetails: boolean,
  decisionPhase?: Conversation["phase"]
): Conversation["phase"] {
  if (hasBirthDetails) return "follow_up";
  if (decisionPhase) return decisionPhase;
  if (messageCount >= 2) return "exploration";
  return "rapport";
}
