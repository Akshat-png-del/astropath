import type { ConversationMemory } from "./conversation-memory";
import type { ConversationContext } from "./conversation-context";
import type { MessageInterpretation } from "./message-interpreter";
import { buildReasoningSummary } from "./reasoning-engine";
import {
  buildDynamicLoveResponse,
  buildDynamicGeneralResponse,
  isLoveOrReconciliationTopic,
} from "./love-reconciliation-engine";
import { isForecastQuery, buildForecastFallback } from "./engines/forecast-engine";

/** Fallback reading when LLM unavailable. */
export function buildStructuredFallbackResponse(
  ctx: ConversationContext,
  memory: ConversationMemory,
  interp: MessageInterpretation
): string {
  const reasoning = buildReasoningSummary(ctx, interp);
  const sign = interp.entities.sign ?? ctx.knownSign;
  const { privateReasoning: r } = reasoning;

  if (isForecastQuery(ctx.lastUserMessage) || r.orientation === "future") {
    return buildForecastFallback(ctx, memory, sign, r);
  }

  if (
    isLoveOrReconciliationTopic(r.topic, r.orientation) ||
    memory.chatIntent === "breakup" ||
    memory.chatIntent === "relationship"
  ) {
    return buildDynamicLoveResponse(ctx, memory, r, sign, interp);
  }

  return buildDynamicGeneralResponse(ctx, memory, sign);
}
