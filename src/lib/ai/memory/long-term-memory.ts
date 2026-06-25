import type { ExtractedInsight } from "@/types";
import type { ConversationContext } from "../conversation-context";
import type { BirthDetailsPayload } from "../conversation-context";
import type { ProductTopic } from "../topic-detector";
import { semanticSearch, buildMemoryCorpus } from "../rag/semantic-memory";
import type { PastConversationSnippet } from "../rag/types";
import {
  filterInsightsByTopic,
  filterStoredMemoriesByTopic,
  MEMORY_RELEVANCE_THRESHOLD,
} from "./topic-scoped-memory";

export interface RankedMemory {
  text: string;
  score: number;
  category: "profile" | "fact" | "insight" | "semantic" | "stored";
}

export interface LongTermMemoryResult {
  ranked: RankedMemory[];
  formatted: string;
}

function profileFacts(
  ctx: ConversationContext,
  birthDetails?: BirthDetailsPayload | null,
  freshContext = false
): RankedMemory[] {
  const facts: RankedMemory[] = [];
  const name = birthDetails?.fullName ?? ctx.knownName;
  const dob = birthDetails?.dateOfBirth ?? ctx.knownBirthDate;
  const place = birthDetails?.birthLocation ?? ctx.knownLocation;
  const sign = birthDetails?.sunSign ?? ctx.knownSign;

  if (name) facts.push({ text: `Name: ${name}`, score: 0.9, category: "profile" });
  if (dob) facts.push({ text: `Birth date: ${dob}`, score: 0.85, category: "profile" });
  if (place) facts.push({ text: `Birth place: ${place}`, score: 0.7, category: "profile" });
  if (sign) facts.push({ text: `Chart: ${sign}`, score: 0.75, category: "profile" });
  if (birthDetails?.moonSign) {
    facts.push({ text: `Moon: ${birthDetails.moonSign}`, score: 0.65, category: "profile" });
  }
  if (birthDetails?.risingSign) {
    facts.push({ text: `Rising: ${birthDetails.risingSign}`, score: 0.65, category: "profile" });
  }

  if (freshContext) {
    return facts.filter((f) => f.category === "profile");
  }

  return facts;
}

export function rankLongTermMemories(
  query: string,
  ctx: ConversationContext,
  insights: ExtractedInsight[],
  storedMemories: string[],
  pastConversations: PastConversationSnippet[],
  birthDetails?: BirthDetailsPayload | null,
  limit = 8,
  productTopic: ProductTopic = "general",
  freshContext = false
): LongTermMemoryResult {
  const ranked: RankedMemory[] = [...profileFacts(ctx, birthDetails, freshContext)];

  const filteredInsights = filterInsightsByTopic(insights, productTopic, freshContext);
  for (const ins of filteredInsights.slice(-12)) {
    ranked.push({
      text: `${ins.category}: ${ins.value}`,
      score: 0.5 + (ins.confidence ?? 0.5) * 0.3,
      category: "insight",
    });
  }

  const filteredStored = filterStoredMemoriesByTopic(storedMemories, productTopic, freshContext);
  for (const m of filteredStored.slice(-15)) {
    ranked.push({ text: m, score: 0.55, category: "stored" });
  }

  if (!freshContext) {
    const insightPairs = filteredInsights.map((i) => ({
      category: i.category,
      value: i.value,
    }));
    const corpus = buildMemoryCorpus(
      ctx.userMessages,
      insightPairs,
      filteredStored,
      pastConversations
    );
    const hits = semanticSearch(query, corpus, 6, MEMORY_RELEVANCE_THRESHOLD);

    for (const hit of hits) {
      ranked.push({ text: hit.text, score: hit.score, category: "semantic" });
    }
  }

  ranked.sort((a, b) => b.score - a.score);

  const deduped: RankedMemory[] = [];
  const seen = new Set<string>();
  for (const item of ranked) {
    if (item.category !== "profile" && item.score < MEMORY_RELEVANCE_THRESHOLD) continue;
    const key = item.text.slice(0, 60).toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(item);
    if (deduped.length >= limit) break;
  }

  const formatted =
    deduped.length === 0 ? "" : deduped.map((m) => `- ${m.text}`).join("\n");

  return { ranked: deduped, formatted };
}

export function formatLongTermForPrompt(result: LongTermMemoryResult): string {
  if (!result.formatted) return "";
  return `Background (weave naturally — never quote these notes to the user):\n${result.formatted}`;
}

export { MEMORY_RELEVANCE_THRESHOLD };
