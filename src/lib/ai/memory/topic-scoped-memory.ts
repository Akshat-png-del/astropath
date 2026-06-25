/** Topic-scoped memory retrieval — prevent cross-topic bleed. */

import type { ExtractedInsight } from "@/types";
import type { ProductTopic } from "../topic-detector";

export const MEMORY_RELEVANCE_THRESHOLD = 0.7;

const TOPIC_KEYWORDS: Record<Exclude<ProductTopic, "general">, RegExp> = {
  love: /\b(love|relationship|partner|dating|crush|romance|heart)\b/i,
  breakup: /\b(breakup|broke up|left|dumped|ex|separation|divorce)\b/i,
  reconciliation: /\b(reconcile|come back|get back together|second chance|return)\b/i,
  marriage: /\b(marriage|married|wedding|fiancé|fiance|spouse)\b/i,
  career: /\b(career|job|work|boss|promotion|interview|salary|profession)\b/i,
  education: /\b(school|college|university|study|exam|degree|course)\b/i,
  money: /\b(money|finance|debt|loan|invest|savings|wealth|budget|income)\b/i,
  family: /\b(family|parent|mother|father|sibling|child|in-laws)\b/i,
  friendship: /\b(friend|friendship|best friend)\b/i,
  health: /\b(health|sick|wellbeing|mental health|anxiety|stress)\b/i,
  spirituality: /\b(spiritual|soul|karma|meditation|faith|destiny)\b/i,
  astrology: /\b(chart|horoscope|zodiac|transit|retrograde|natal)\b/i,
  tarot: /\b(tarot|oracle|cards|spread)\b/i,
  self_growth: /\b(growth|purpose|self.?worth|confidence|healing journey)\b/i,
};

const LOVE_TOPICS: ProductTopic[] = ["love", "breakup", "reconciliation", "marriage"];

function insightMatchesTopic(category: string, value: string, topic: ProductTopic): boolean {
  if (topic === "general") return true;
  const combined = `${category} ${value}`.toLowerCase();
  const re = TOPIC_KEYWORDS[topic as Exclude<ProductTopic, "general">];
  if (re?.test(combined)) return true;

  if (LOVE_TOPICS.includes(topic)) {
    return /\b(love|relationship|breakup|partner|ex|marriage|romance)\b/i.test(combined);
  }
  if (topic === "career") {
    return /\b(career|job|work|profession)\b/i.test(combined);
  }
  if (topic === "money") {
    return /\b(money|finance|debt|income)\b/i.test(combined);
  }
  if (topic === "family") {
    return /\b(family|parent|child|sibling)\b/i.test(combined);
  }

  return false;
}

function memoryTextMatchesTopic(text: string, topic: ProductTopic): boolean {
  if (topic === "general") return true;

  const re = TOPIC_KEYWORDS[topic as Exclude<ProductTopic, "general">];
  if (re?.test(text)) return true;

  if (LOVE_TOPICS.includes(topic)) {
    const isOtherDomain = /\b(career|job|work|finance|money|family|school|college)\b/i.test(
      text
    );
    const isLove = /\b(love|relationship|breakup|partner|ex|reconcile|marriage)\b/i.test(text);
    return isLove || !isOtherDomain;
  }

  if (topic === "career" || topic === "education" || topic === "money") {
    return !/\b(breakup|ex-|left me|boyfriend|girlfriend|reconcile|miss (her|him|them))\b/i.test(
      text
    );
  }

  return re?.test(text) ?? false;
}

export function filterInsightsByTopic(
  insights: ExtractedInsight[],
  topic: ProductTopic,
  freshContext: boolean
): ExtractedInsight[] {
  if (freshContext) {
    return insights.filter((i) =>
      ["birth_date", "zodiac_sign", "personality", "name"].includes(i.category)
    );
  }
  return insights.filter((i) => insightMatchesTopic(i.category, i.value, topic));
}

export function filterStoredMemoriesByTopic(
  memories: string[],
  topic: ProductTopic,
  freshContext: boolean
): string[] {
  if (freshContext) return [];
  return memories.filter((m) => memoryTextMatchesTopic(m, topic));
}
