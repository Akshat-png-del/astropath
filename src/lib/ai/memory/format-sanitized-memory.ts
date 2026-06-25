import type { ConversationMemory } from "../conversation-memory";
import type { ProductTopic } from "../topic-detector";

const LOVE_INTENTS = new Set(["breakup", "relationship"]);
const LOVE_TOPICS = new Set<ProductTopic>([
  "love",
  "breakup",
  "reconciliation",
  "marriage",
]);

function isLoveContext(memory: ConversationMemory, productTopic: ProductTopic): boolean {
  return LOVE_INTENTS.has(memory.chatIntent) || LOVE_TOPICS.has(productTopic);
}

/** Model-safe memory block — topic-gated, no leaky labels. */
export function formatMemoryForPromptSanitized(
  memory: ConversationMemory,
  productTopic: ProductTopic = "general",
  freshContext = false
): string {
  if (freshContext) return "";

  const lines: string[] = [];
  const love = isLoveContext(memory, productTopic);

  if (memory.topicSwitched) {
    lines.push("User changed subject — respond only to the latest message.");
  }

  if (love && memory.relationshipContext) {
    lines.push(`Relationship note: ${memory.relationshipContext}`);
  }

  if (love && memory.facts.lackedClosure) {
    lines.push("They did not receive closure at the ending.");
  }
  if (love && memory.facts.hadGradualConflict) {
    lines.push("Conflict built gradually before the separation.");
  }
  if (memory.facts.latestDetail && memory.facts.isContextUpdate) {
    lines.push(`New detail: "${memory.facts.latestDetail.slice(0, 100)}"`);
  }

  if (memory.isFollowUp && !memory.followUpCleared && !memory.topicSwitched) {
    lines.push("Follow-up on prior exchange — stay on current topic.");
  }

  return lines.length
    ? `Notes for you only (never quote to user):\n${lines.join("\n")}`
    : "";
}
