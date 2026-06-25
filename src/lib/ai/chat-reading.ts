import type { ConversationMemory } from "./conversation-memory";
import type { ConversationContext } from "./conversation-context";
import type { MessageInterpretation } from "./message-interpreter";
import type { ReasoningSummary } from "./reasoning-engine";

export function buildReadingBrief(
  interp: MessageInterpretation,
  ctx: ConversationContext,
  memory: ConversationMemory,
  reasoning?: ReasoningSummary
): string {
  const sign = interp.entities.sign ?? ctx.knownSign;
  const guidance = reasoning?.promptGuidance ?? "";

  const followUpInstruction = reasoning?.includeFollowUp
    ? "You may end with one specific question."
    : "No question this turn — end with guidance.";

  return `${guidance}

Answer directly: "${ctx.lastUserMessage}"
${sign ? `Chart context: ${sign} — weave subtly, never say "Sun sign".` : "Lead with their story."}
${followUpInstruction}`;
}
