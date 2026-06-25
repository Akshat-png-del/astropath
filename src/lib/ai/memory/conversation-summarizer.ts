import type { ConversationContext } from "../conversation-context";
import type { ConversationMemory } from "../conversation-memory";
import type { ExtractedInsight } from "@/types";
import type { ProductTopic } from "../topic-detector";

export interface ConversationSummary {
  messageCount: number;
  generatedAtTurn: number;
  facts: string[];
  emotionalDevelopments: string[];
  unresolvedConcerns: string[];
  predictionsGiven: string[];
  majorTopics: string[];
  text: string;
}

const SUMMARY_INTERVAL = 8;

export function shouldGenerateSummary(turnNumber: number): boolean {
  return turnNumber > 0 && turnNumber % SUMMARY_INTERVAL === 0;
}

export function buildConversationSummary(
  ctx: ConversationContext,
  memory: ConversationMemory,
  productTopic: ProductTopic,
  insights: ExtractedInsight[],
  existingSummaries: ConversationSummary[] = []
): ConversationSummary | null {
  if (!shouldGenerateSummary(memory.turnNumber)) return null;

  const facts: string[] = [];
  if (ctx.knownName) facts.push(`User: ${ctx.knownName}`);
  if (ctx.knownSign) facts.push(`Sun sign: ${ctx.knownSign}`);
  if (ctx.knownBirthDate) facts.push(`DOB: ${ctx.knownBirthDate}`);
  if (memory.relationshipContext) facts.push(memory.relationshipContext);
  if (memory.facts.lackedClosure) facts.push("Breakup without closure");
  if (memory.facts.hadGradualConflict) facts.push("Gradual conflict before separation");

  for (const ins of insights.slice(-6)) {
    facts.push(`${ins.category}: ${ins.value}`);
  }

  const emotionalDevelopments: string[] = [];
  if (memory.emotionalTone === "negative") emotionalDevelopments.push("Distress or grief present");
  if (memory.emotionalSituation === "breakup") emotionalDevelopments.push("Processing breakup");
  if (memory.emotionalSituation === "anxiety") emotionalDevelopments.push("Anxiety elevated");

  const unresolvedConcerns: string[] = [];
  const lastQuestions = ctx.userMessages.filter((m) => /\?|will |what if/i.test(m)).slice(-3);
  unresolvedConcerns.push(...lastQuestions.map((q) => q.slice(0, 100)));

  const predictionsGiven = ctx.assistantMessages
    .filter((m) => /\b(may|could|might|suggests|coming month|weeks)\b/i.test(m))
    .slice(-2)
    .map((m) => m.slice(0, 100));

  const majorTopics = [
    ...new Set([
      productTopic,
      memory.chatIntent,
      ...existingSummaries.flatMap((s) => s.majorTopics),
    ]),
  ].filter(Boolean) as string[];

  const text = [
    `Session snapshot (turn ${memory.turnNumber}):`,
    facts.length ? `Facts: ${facts.join("; ")}` : "",
    emotionalDevelopments.length ? `Emotional arc: ${emotionalDevelopments.join("; ")}` : "",
    unresolvedConcerns.length ? `Open: ${unresolvedConcerns.join("; ")}` : "",
    predictionsGiven.length ? `Prior outlooks: ${predictionsGiven.join(" | ")}` : "",
    `Topics: ${majorTopics.join(", ")}`,
  ]
    .filter(Boolean)
    .join("\n");

  return {
    messageCount: ctx.messageCount,
    generatedAtTurn: memory.turnNumber,
    facts,
    emotionalDevelopments,
    unresolvedConcerns,
    predictionsGiven,
    majorTopics,
    text,
  };
}

export function mergeSummariesForPrompt(
  summaries: ConversationSummary[],
  latest: ConversationSummary | null
): string {
  const all = latest ? [...summaries, latest] : summaries;
  if (!all.length) return "";
  const combined = all.slice(-2).map((s) => s.text).join("\n\n");
  return `SESSION HISTORY (internal — do not expose to user):\n${combined}`;
}
