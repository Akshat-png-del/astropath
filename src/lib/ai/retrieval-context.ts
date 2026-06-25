import type { ExtractedInsight } from "@/types";
import type { ConversationContext } from "./conversation-context";
import type { BirthDetailsPayload } from "./conversation-context";
import type { MessageInterpretation } from "./message-interpreter";
import {
  analyzeRetrievalNeed,
  ANTI_HALLUCINATION_RULES,
  liveDataMissingNotice,
  REASONING_CHECKLIST,
  RETRIEVAL_PRIORITY_RULES,
  RETRIEVAL_USAGE_RULES,
  type RetrievalCategory,
} from "./retrieval-policy";
import {
  retrieveKnowledgeForMessage,
  formatKnowledgeForPrompt,
  type KnowledgeItem,
} from "./knowledge";
import { chatLog } from "./chat-debug";

export interface ExternalKnowledgeChunk {
  source?: string;
  content: string;
  title?: string;
}

export interface RetrievalContext {
  need: ReturnType<typeof analyzeRetrievalNeed>;
  internalKnowledge: KnowledgeItem[];
  externalKnowledge: ExternalKnowledgeChunk[];
  hasExternalKnowledge: boolean;
  hasLiveCelestialData: boolean;
  liveDataMissing: boolean;
}

export function normalizeExternalKnowledge(
  input?: ExternalKnowledgeChunk[] | string[] | null
): ExternalKnowledgeChunk[] {
  if (!input?.length) return [];
  return input.map((item) =>
    typeof item === "string" ? { content: item, source: "external" } : item
  );
}

export function buildRetrievalContext(
  ctx: ConversationContext,
  interp: MessageInterpretation,
  insights: ExtractedInsight[],
  memories: string[],
  birthDetails?: BirthDetailsPayload | null,
  externalInput?: ExternalKnowledgeChunk[] | string[] | null
): RetrievalContext {
  const message = ctx.lastUserMessage;
  const need = analyzeRetrievalNeed(message);

  const topicHints = [
    ...interp.topics,
    ...ctx.topicsDiscussed,
    interp.chatIntent,
    interp.primaryTopic,
    ...need.categories,
  ].filter(Boolean);

  const internalKnowledge = retrieveKnowledgeForMessage(message, topicHints, need.needsRetrieval ? 6 : 4);
  const externalKnowledge = normalizeExternalKnowledge(externalInput);

  const hasExternalKnowledge = externalKnowledge.length > 0;
  const hasLiveCelestialData =
    hasExternalKnowledge && need.needsLiveCelestialData;
  const liveDataMissing = need.needsLiveCelestialData && !hasLiveCelestialData;

  chatLog("RETRIEVAL", {
    needsRetrieval: need.needsRetrieval,
    needsLiveCelestialData: need.needsLiveCelestialData,
    categories: need.categories,
    internalChunks: internalKnowledge.length,
    externalChunks: externalKnowledge.length,
    liveDataMissing,
  });

  return {
    need,
    internalKnowledge,
    externalKnowledge,
    hasExternalKnowledge,
    hasLiveCelestialData,
    liveDataMissing,
  };
}

function formatBirthProfile(
  ctx: ConversationContext,
  birthDetails?: BirthDetailsPayload | null
): string {
  const lines: string[] = [];
  const dob = birthDetails?.dateOfBirth ?? ctx.knownBirthDate;
  const time = birthDetails?.timeOfBirth ?? ctx.knownBirthTime;
  const place = birthDetails?.birthLocation ?? ctx.knownLocation;
  const sign = birthDetails?.sunSign ?? ctx.knownSign;
  const name = birthDetails?.fullName ?? ctx.knownName;

  if (name) lines.push(`Name: ${name}`);
  if (dob) lines.push(`DOB: ${dob}`);
  if (time) lines.push(`Birth time: ${time}`);
  if (place) lines.push(`Birth place: ${place}`);
  if (sign) lines.push(`Chart: ${sign}`);
  if (birthDetails?.moonSign) lines.push(`Moon: ${birthDetails.moonSign}`);
  if (birthDetails?.risingSign) lines.push(`Rising: ${birthDetails.risingSign}`);

  return lines.length ? lines.join("\n") : "No birth profile on file.";
}

function formatExternalKnowledge(chunks: ExternalKnowledgeChunk[]): string {
  return chunks
    .map((c, i) => {
      const header = c.title ?? c.source ?? `Source ${i + 1}`;
      return `### ${header}\n${c.content}`;
    })
    .join("\n\n");
}

export function formatRetrievalForPrompt(
  ctx: ConversationContext,
  interp: MessageInterpretation,
  insights: ExtractedInsight[],
  memories: string[],
  retrieval: RetrievalContext,
  birthDetails?: BirthDetailsPayload | null,
  overrides?: {
    conversationMemory?: string;
    profileBlock?: string;
  }
): string {
  const sections: string[] = [
    REASONING_CHECKLIST,
    RETRIEVAL_PRIORITY_RULES,
    RETRIEVAL_USAGE_RULES,
    ANTI_HALLUCINATION_RULES,
  ];

  sections.push(`PRIORITY 1 — CURRENT MESSAGE:\n"${ctx.lastUserMessage}"`);

  if (overrides?.conversationMemory) {
    sections.push(`PRIORITY 2 — CONVERSATION & MEMORY:\n${overrides.conversationMemory}`);
  }

  const profile = overrides?.profileBlock ?? formatBirthProfile(ctx, birthDetails);
  const insightLines =
    insights.length > 0
      ? insights.slice(-8).map((i) => `- ${i.category}: ${i.value}`).join("\n")
      : "";
  const memoryLines =
    memories.length > 0 ? memories.slice(-10).map((m) => `- ${m}`).join("\n") : "";

  sections.push(
    `PRIORITY 3 — USER FACTS & PROFILE:\n${profile}${insightLines ? `\nSaved insights:\n${insightLines}` : ""}${memoryLines ? `\nMemories:\n${memoryLines}` : ""}`
  );

  const internalBlock = formatKnowledgeForPrompt(retrieval.internalKnowledge);
  const externalBlock = formatExternalKnowledge(retrieval.externalKnowledge);

  if (internalBlock || externalBlock) {
    let p4 = "PRIORITY 4 — RETRIEVED KNOWLEDGE:\n";
    if (internalBlock) p4 += `[Established astrology — internal]\n${internalBlock}\n`;
    if (externalBlock) p4 += `[External / internet / articles]\n${externalBlock}`;
    sections.push(p4);
  } else if (retrieval.need.needsRetrieval) {
    sections.push(
      "PRIORITY 4 — RETRIEVED KNOWLEDGE: None available. Use Priority 5 general principles and state limits."
    );
  }

  if (retrieval.liveDataMissing) {
    sections.push(liveDataMissingNotice(retrieval.need.categories));
  }

  sections.push(
    "PRIORITY 5 — GENERAL KNOWLEDGE: Use timeless astrology principles when retrieval is thin. Never invent live sky data."
  );

  return sections.join("\n\n");
}

export function retrievalCategoriesToTopics(categories: RetrievalCategory[]): string[] {
  return categories.flatMap((c) => {
    switch (c) {
      case "retrograde":
        return ["retrograde", "mercury", "communication", "transits"];
      case "moon_phase":
        return ["moon", "emotions", "cycles"];
      case "transits":
        return ["transits", "timing", "planets"];
      case "compatibility":
        return ["love", "relationship", "venus", "synastry"];
      case "eclipse":
        return ["eclipse", "transformation", "transits"];
      case "numerology":
        return ["numerology", "numbers"];
      case "current_events":
      case "forecast":
        return ["transits", "forecast", "timing"];
      default:
        return [c];
    }
  });
}
