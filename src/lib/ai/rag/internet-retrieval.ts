import type { ExternalKnowledgeChunk } from "../retrieval-context";
import { ragStageLog } from "../chat-debug";

const SEARCH_TIMEOUT_MS = 4000;

function buildSearchQuery(userMessage: string): string {
  const trimmed = userMessage.trim().slice(0, 120);
  if (/\b(retrograde|transit|moon phase|eclipse|astrology)\b/i.test(trimmed)) {
    return `${trimmed} astrology meaning`;
  }
  return trimmed;
}

async function searchDuckDuckGo(query: string): Promise<ExternalKnowledgeChunk[]> {
  const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_redirect=1&no_html=1`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), SEARCH_TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return [];

    const data = (await res.json()) as {
      Abstract?: string;
      AbstractText?: string;
      AbstractSource?: string;
      Heading?: string;
      RelatedTopics?: { Text?: string }[];
    };

    const chunks: ExternalKnowledgeChunk[] = [];

    const abstract = data.AbstractText || data.Abstract;
    if (abstract?.trim()) {
      chunks.push({
        source: "internet:duckduckgo",
        title: data.Heading ?? "Web summary",
        content: abstract.trim(),
      });
    }

    const related = (data.RelatedTopics ?? [])
      .map((t) => t.Text?.trim())
      .filter(Boolean)
      .slice(0, 3);

    if (related.length) {
      chunks.push({
        source: "internet:duckduckgo",
        title: "Related topics",
        content: related.join("\n"),
      });
    }

    return chunks;
  } catch {
    return [];
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Fetch internet knowledge when retrieval is needed and no external chunks were supplied.
 * Uses DuckDuckGo instant answer API (no API key required).
 */
export async function retrieveInternetKnowledge(
  userMessage: string,
  needsRetrieval: boolean
): Promise<ExternalKnowledgeChunk[]> {
  if (!needsRetrieval) {
    ragStageLog("internet_retrieval", { skipped: true, reason: "not_needed" });
    return [];
  }

  if (process.env.DISABLE_INTERNET_RETRIEVAL === "1") {
    ragStageLog("internet_retrieval", { skipped: true, reason: "disabled" });
    return [];
  }

  const query = buildSearchQuery(userMessage);
  ragStageLog("internet_retrieval", { query, status: "searching" });

  const chunks = await searchDuckDuckGo(query);

  ragStageLog("internet_retrieval", {
    query,
    chunks: chunks.length,
    preview: chunks[0]?.content?.slice(0, 80),
  });

  return chunks;
}
