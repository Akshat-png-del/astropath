/**
 * Structured audit logging for chat response diagnostics.
 * Enabled when CHAT_AUDIT=1 or in development (disable with CHAT_AUDIT=0).
 */

import { wordCount } from "./response-pipeline";

export type ChatResponseSource =
  | "openai"
  | "fallback"
  | "fallback-no-api-key"
  | "fallback-after-error"
  | "panic";

export interface ChatAuditEntry {
  timestamp: string;
  model: string;
  responseSource: ChatResponseSource;
  fallbackReason?: string;
  openAIConfigured: boolean;
  tokenCount: {
    prompt: number;
    completion: number;
    total: number;
  };
  responseLength: number;
  responseWordCount: number;
  qualityScore: number;
  qualityMaxScore: number;
  qualityPassed: boolean;
  qualityIssues: string[];
  qualityRetried: boolean;
  retrievalActive: boolean;
  userMessagePreview: string;
  responsePreview: string;
  errorMessage?: string;
}

const AUDIT_ENABLED =
  process.env.CHAT_AUDIT !== "0" &&
  (process.env.CHAT_AUDIT === "1" ||
    process.env.CHAT_AUDIT === "true" ||
    process.env.NODE_ENV === "development");

/** In-memory ring buffer for recent audit entries (diagnostic scripts). */
const RECENT_ENTRIES: ChatAuditEntry[] = [];
const MAX_RECENT = 500;

export function isChatAuditEnabled(): boolean {
  return AUDIT_ENABLED;
}

export function getRecentChatAuditEntries(): ChatAuditEntry[] {
  return [...RECENT_ENTRIES];
}

export function clearChatAuditEntries(): void {
  RECENT_ENTRIES.length = 0;
}

export function logChatAudit(entry: Omit<ChatAuditEntry, "timestamp" | "responseWordCount"> & {
  responseWordCount?: number;
}): ChatAuditEntry {
  const full: ChatAuditEntry = {
    ...entry,
    timestamp: new Date().toISOString(),
    responseWordCount: entry.responseWordCount ?? wordCount(entry.responsePreview || ""),
  };

  if (RECENT_ENTRIES.length >= MAX_RECENT) RECENT_ENTRIES.shift();
  RECENT_ENTRIES.push(full);

  if (AUDIT_ENABLED) {
    console.log(JSON.stringify({ tag: "chat-audit", ...full }));
  }

  return full;
}

export interface ChatAuditSummary {
  totalRequests: number;
  openAISuccessCount: number;
  openAISuccessRate: number;
  fallbackCount: number;
  fallbackRate: number;
  fallbackByReason: Record<string, number>;
  averageResponseWords: number;
  averageQualityScore: number;
  averageQualityScoreOutOf10: number;
  averageTokenCount: number;
  qualityPassRate: number;
  openAIAverageWords: number;
  fallbackAverageWords: number;
  openAIAverageQuality: number;
  fallbackAverageQuality: number;
}

export function summarizeChatAudit(entries: ChatAuditEntry[]): ChatAuditSummary {
  const total = entries.length || 1;
  const openAIEntries = entries.filter((e) => e.responseSource === "openai");
  const fallbackEntries = entries.filter((e) => e.responseSource !== "openai");

  const fallbackByReason: Record<string, number> = {};
  for (const e of fallbackEntries) {
    const reason = e.fallbackReason ?? e.responseSource;
    fallbackByReason[reason] = (fallbackByReason[reason] ?? 0) + 1;
  }

  const avg = (nums: number[]) =>
    nums.length ? nums.reduce((a, b) => a + b, 0) / nums.length : 0;

  const allWords = entries.map((e) => e.responseWordCount);
  const allQuality = entries.map((e) => e.qualityScore);
  const maxScore = entries[0]?.qualityMaxScore ?? 60;

  return {
    totalRequests: entries.length,
    openAISuccessCount: openAIEntries.length,
    openAISuccessRate: (openAIEntries.length / total) * 100,
    fallbackCount: fallbackEntries.length,
    fallbackRate: (fallbackEntries.length / total) * 100,
    fallbackByReason,
    averageResponseWords: avg(allWords),
    averageQualityScore: avg(allQuality),
    averageQualityScoreOutOf10: (avg(allQuality) / maxScore) * 10,
    averageTokenCount: avg(entries.map((e) => e.tokenCount.total)),
    qualityPassRate: (entries.filter((e) => e.qualityPassed).length / total) * 100,
    openAIAverageWords: avg(openAIEntries.map((e) => e.responseWordCount)),
    fallbackAverageWords: avg(fallbackEntries.map((e) => e.responseWordCount)),
    openAIAverageQuality: avg(openAIEntries.map((e) => e.qualityScore)),
    fallbackAverageQuality: avg(fallbackEntries.map((e) => e.qualityScore)),
  };
}
