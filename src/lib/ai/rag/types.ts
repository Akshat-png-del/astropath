import type { ExtractedInsight, Conversation } from "@/types";
import type { ChatMessage, BirthDetailsPayload } from "../conversation-context";
import type { ExternalKnowledgeChunk } from "../retrieval-context";
import type { ConversationSummary } from "../memory/conversation-summarizer";

export interface PastConversationSnippet {
  conversationId?: string;
  title?: string;
  messages: { role: string; content: string }[];
  insights?: { category: string; value: string }[];
  updatedAt?: string;
}

export interface SemanticMemoryHit {
  source: "current_session" | "past_conversation" | "insight" | "stored_memory" | "semantic";
  conversationId?: string;
  text: string;
  score: number;
}

export interface RagPipelineInput {
  chatMessages: ChatMessage[];
  insights?: ExtractedInsight[];
  memories?: string[];
  birthDetails?: BirthDetailsPayload | null;
  externalKnowledge?: ExternalKnowledgeChunk[] | string[] | null;
  pastConversations?: PastConversationSnippet[];
  conversationSummaries?: ConversationSummary[];
  phase?: Conversation["phase"];
  userId?: string | null;
}

export interface ProfileRetrievalResult {
  formatted: string;
  hasBirthData: boolean;
}

export interface MemoryRetrievalResult {
  conversationMemory: string;
  semanticHits: SemanticMemoryHit[];
  storedMemories: string[];
}

export interface QualityCheckResult {
  passed: boolean;
  isDuplicate: boolean;
  similarity: number;
  score: number;
  dimensionScores?: Record<string, number>;
  issues: string[];
  regenerationHint: string | null;
}
