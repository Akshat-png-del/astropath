/**
 * Unified system prompt composer — single source of truth for LLM instructions.
 * No PRIORITY labels, no duplicate history, no leaky scaffolding.
 */

import type { ExtractedInsight } from "@/types";
import type { ConversationContext, BirthDetailsPayload } from "./conversation-context";
import type { MessageInterpretation } from "./message-interpreter";
import type { ReasoningSummary } from "./reasoning-engine";
import type { RetrievalContext } from "./retrieval-context";
import { buildPersonalityBlock } from "./astrologer-personality";
import { formatKnowledgeForPrompt } from "./knowledge";
import type { Conversation } from "@/types";
import type { ChatDecision } from "./chat-decision";
import { MIN_RESPONSE_WORDS, MAX_RESPONSE_WORDS } from "./response-pipeline";

export interface PromptComposerInput {
  phase: Conversation["phase"];
  ctx: ConversationContext;
  interp: MessageInterpretation;
  decision: ChatDecision;
  reasoning: ReasoningSummary;
  retrieval?: RetrievalContext;
  memoryBlock?: string;
  profileBlock?: string;
  birthDetails?: BirthDetailsPayload | null;
  insights?: ExtractedInsight[];
  storedMemories?: string[];
  retryHint?: string;
}

function formatProfileBlock(
  ctx: ConversationContext,
  birthDetails?: BirthDetailsPayload | null,
  profileBlock?: string
): string {
  if (profileBlock?.trim()) return profileBlock;

  const lines: string[] = [];
  const name = birthDetails?.fullName ?? ctx.knownName;
  const dob = birthDetails?.dateOfBirth ?? ctx.knownBirthDate;
  const time = birthDetails?.timeOfBirth ?? ctx.knownBirthTime;
  const place = birthDetails?.birthLocation ?? ctx.knownLocation;
  const sign = birthDetails?.sunSign ?? ctx.knownSign;

  if (name) lines.push(name);
  if (dob) lines.push(`Born ${dob}`);
  if (time) lines.push(`Time ${time}`);
  if (place) lines.push(place);
  if (sign) lines.push(`${sign} chart`);
  if (birthDetails?.moonSign) lines.push(`Moon ${birthDetails.moonSign}`);
  if (birthDetails?.risingSign) lines.push(`Rising ${birthDetails.risingSign}`);

  return lines.length ? lines.join(" · ") : "";
}

function formatKnowledgeBlock(retrieval: RetrievalContext): string {
  const parts: string[] = [];
  const internal = formatKnowledgeForPrompt(retrieval.internalKnowledge);
  if (internal) parts.push(internal);

  if (retrieval.externalKnowledge.length) {
    const external = retrieval.externalKnowledge
      .map((c) => c.content)
      .join("\n\n");
    parts.push(external);
  }

  if (retrieval.liveDataMissing) {
    parts.push(
      "Live sky data unavailable — do not invent current planetary positions or moon phases."
    );
  }

  return parts.join("\n\n");
}

function formatAntiDuplicateNote(ctx: ConversationContext): string {
  const prior = ctx.assistantMessages.slice(-3);
  if (!prior.length) return "";

  return `Do not repeat phrasing or structure from your recent replies:\n${prior
    .map((m, i) => `${i + 1}. ${m.slice(0, 180)}${m.length > 180 ? "…" : ""}`)
    .join("\n")}`;
}

function formatTurnInstruction(reasoning: ReasoningSummary, ctx: ConversationContext): string {
  const r = reasoning.privateReasoning;
  const lines = [
    "Answer their latest message directly.",
    "Never quote or repeat their words back to them.",
    "Never open with 'What you shared' or 'From a chart perspective'.",
    "Write like a natural conversation — warm, flowing, specific.",
    "",
    ...r.responseStrategy.map((s) => `• ${s}`),
  ];

  if (reasoning.includeFollowUp) {
    lines.push("• You may end with one specific question.");
  } else {
    lines.push("• Do not end with a question.");
  }

  return lines.join("\n");
}

export function composeSystemPrompt(input: PromptComposerInput): string {
  const {
    phase,
    ctx,
    interp,
    reasoning,
    retrieval,
    memoryBlock,
    profileBlock,
    birthDetails,
    insights = [],
    storedMemories = [],
    retryHint,
  } = input;

  const sections: string[] = [];

  sections.push(
    buildPersonalityBlock(ctx.knownSign, phase, ctx.questionsAlreadyAsked, ctx, interp.memory)
  );

  sections.push(formatTurnInstruction(reasoning, ctx));

  const profile = formatProfileBlock(ctx, birthDetails, profileBlock);
  const contextParts: string[] = [];

  if (profile) contextParts.push(`About them: ${profile}`);

  if (memoryBlock?.trim()) contextParts.push(memoryBlock);

  const relevantInsights = insights
    .slice(-5)
    .map((i) => `${i.value}`)
    .filter(Boolean);
  if (relevantInsights.length) {
    contextParts.push(`What you know: ${relevantInsights.join("; ")}`);
  }

  const stored = storedMemories.slice(-5);
  if (stored.length) {
    contextParts.push(`Past notes: ${stored.join("; ")}`);
  }

  if (contextParts.length) {
    sections.push(
      `Context (weave naturally — never quote or list these notes to the user):\n${contextParts.join("\n\n")}`
    );
  }

  if (retrieval && (retrieval.internalKnowledge.length || retrieval.externalKnowledge.length)) {
    const knowledge = formatKnowledgeBlock(retrieval);
    if (knowledge) {
      sections.push(
        `Reference material (integrate naturally, never cite sources):\n${knowledge}`
      );
    }
  }

  const antiDup = formatAntiDuplicateNote(ctx);
  if (antiDup) sections.push(antiDup);

  sections.push(
    `Length: ${MIN_RESPONSE_WORDS}–${MAX_RESPONSE_WORDS} words. Output only the reply — no labels, no analysis.`
  );

  if (retryHint) {
    sections.push(`Revise your previous attempt: ${retryHint}`);
  }

  return sections.filter(Boolean).join("\n\n");
}
