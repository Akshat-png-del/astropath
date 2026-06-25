import type { PastConversationSnippet, SemanticMemoryHit } from "./types";

const STOP_WORDS = new Set([
  "a", "an", "the", "is", "are", "was", "were", "be", "been", "being",
  "have", "has", "had", "do", "does", "did", "will", "would", "could",
  "should", "may", "might", "must", "shall", "can", "need", "to", "of",
  "in", "for", "on", "with", "at", "by", "from", "as", "into", "about",
  "i", "me", "my", "we", "our", "you", "your", "he", "she", "it", "they",
  "them", "their", "this", "that", "what", "which", "who", "how", "when",
  "where", "why", "and", "or", "but", "if", "so", "just", "very", "really",
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 2 && !STOP_WORDS.has(t));
}

function termFrequency(tokens: string[]): Map<string, number> {
  const tf = new Map<string, number>();
  for (const t of tokens) {
    tf.set(t, (tf.get(t) ?? 0) + 1);
  }
  return tf;
}

function cosineSimilarity(a: Map<string, number>, b: Map<string, number>): number {
  let dot = 0;
  let normA = 0;
  let normB = 0;

  for (const [, v] of a) normA += v * v;
  for (const [, v] of b) normB += v * v;

  for (const [k, v] of a) {
    const bv = b.get(k);
    if (bv) dot += v * bv;
  }

  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

/** Lightweight semantic search — TF cosine over token overlap. */
export function semanticSearch(
  query: string,
  documents: { id: string; text: string; source: SemanticMemoryHit["source"]; conversationId?: string }[],
  limit = 5,
  minScore = 0.12
): SemanticMemoryHit[] {
  const queryTf = termFrequency(tokenize(query));
  if (queryTf.size === 0) return [];

  const scored = documents
    .map((doc) => ({
      source: doc.source,
      conversationId: doc.conversationId,
      text: doc.text,
      score: cosineSimilarity(queryTf, termFrequency(tokenize(doc.text))),
    }))
    .filter((h) => h.score >= minScore)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit);
}

export function buildMemoryCorpus(
  currentUserMessages: string[],
  insights: { category: string; value: string }[],
  storedMemories: string[],
  pastConversations: PastConversationSnippet[]
): { id: string; text: string; source: SemanticMemoryHit["source"]; conversationId?: string }[] {
  const docs: { id: string; text: string; source: SemanticMemoryHit["source"]; conversationId?: string }[] = [];

  currentUserMessages.forEach((m, i) => {
    if (m.trim().length > 10) {
      docs.push({ id: `current-${i}`, text: m, source: "current_session" });
    }
  });

  insights.forEach((ins, i) => {
    docs.push({
      id: `insight-${i}`,
      text: `${ins.category}: ${ins.value}`,
      source: "insight",
    });
  });

  storedMemories.forEach((m, i) => {
    docs.push({ id: `mem-${i}`, text: m, source: "stored_memory" });
  });

  pastConversations.forEach((convo, ci) => {
    const userMsgs = convo.messages.filter((m) => m.role === "user").map((m) => m.content);
    const combined = userMsgs.join(" ");
    if (combined.length > 15) {
      docs.push({
        id: `past-${ci}`,
        text: combined,
        source: "past_conversation",
        conversationId: convo.conversationId,
      });
    }
    convo.insights?.forEach((ins, ii) => {
      docs.push({
        id: `past-ins-${ci}-${ii}`,
        text: `${ins.category}: ${ins.value}`,
        source: "past_conversation",
        conversationId: convo.conversationId,
      });
    });
  });

  return docs;
}

export function formatSemanticHits(hits: SemanticMemoryHit[]): string {
  if (!hits.length) return "";
  return hits
    .map((h) => `- [${h.source}${h.score.toFixed(2)}] ${h.text.slice(0, 200)}${h.text.length > 200 ? "…" : ""}`)
    .join("\n");
}
