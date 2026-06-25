/** Natural monthly / forecast responses — no quoting, no template dumps. */

import type { ConversationContext } from "../conversation-context";
import type { ConversationMemory } from "../conversation-memory";
import type { InternalReasoning } from "../internal-reasoning";

import { hashPick, pickFreshAdvice } from "./response-variation";

export function isForecastQuery(message: string): boolean {
  return /\b(next month|this month|coming month|month ahead|weeks ahead|what happens|what.?s next|forecast|outlook|near future)\b/i.test(
    message
  );
}

function isLoveContext(memory: ConversationMemory, reasoning: InternalReasoning): boolean {
  return (
    memory.chatIntent === "breakup" ||
    memory.chatIntent === "relationship" ||
    reasoning.topic === "breakup" ||
    reasoning.topic === "love" ||
    reasoning.topic === "reconciliation" ||
    reasoning.topic === "marriage"
  );
}

export function buildForecastFallback(
  ctx: ConversationContext,
  memory: ConversationMemory,
  sign: string | null,
  reasoning: InternalReasoning
): string {
  const seed = ctx.lastUserMessage + String(ctx.messageCount);
  const parts: string[] = [];
  const love = isLoveContext(memory, reasoning);
  const career = memory.chatIntent === "career" || reasoning.topic === "career";

  if (love) {
    parts.push(
      hashPick(seed, [
        "The month ahead won't undo what's already happened between you two, but the emotional temperature may shift — less raw shock, more honest clarity about what you actually want.",
        "Looking at the coming month, love timing for you is less about waiting for a sign from him and more about whether contact, closure, or quiet healing becomes the main story.",
        "Next month carries a softer arc than where you are right now — not necessarily easier, but more revealing about whether this connection has anywhere real to go.",
      ])
    );

    if (memory.facts.lackedClosure || memory.facts.hadGradualConflict) {
      parts.push(
        "If he reappears, it may come after you've started finding your footing again — not because the universe is testing you, but because people often reach out when they feel the distance themselves."
      );
    }

    parts.push(
      hashPick(seed + "love", [
        "There could be a moment mid-month where emotions feel less volatile — a text, a dream, or simply a clearer sense of whether you still want him back. Contact is possible, though not something to build your peace around.",
        "Silence may continue through part of the month, and that doesn't mean nothing is moving internally. You may understand your own needs more sharply before anything changes between you.",
        "Reconciliation remains one thread in the month ahead, not the only one. Whether it happens depends less on timing alone and more on whether both of you would show up differently.",
      ])
    );
  } else if (career) {
    parts.push(
      "Professionally, the coming month favours steady progress over dramatic leaps — one conversation, application, or decision may unlock more than trying to solve your entire path at once.",
      "Watch for a small opening around the middle of the month: an email, an idea, or a conversation that clarifies direction without forcing a final answer."
    );
  } else {
    parts.push(
      "The month ahead opens gradually — more tilt than earthquake. Small signals will matter more than waiting for one definitive event.",
      "Rather than one big answer arriving, expect a sequence of nudges that help you see where your energy wants to go."
    );
  }

  if (sign === "Gemini") {
    parts.push(
      "As a Gemini, this month may bring the kind of dialogue or inner clarity you've been craving — your mind settles when the story starts making sense, even if the ending isn't the one you hoped for."
    );
  } else if (sign) {
    parts.push(
      `Your ${sign} chart suggests the month unfolds in layers — what feels unclear at the start may read differently by the time it closes.`
    );
  }

  parts.push(
    pickFreshAdvice(seed + "close", [
      "One thing to do this week: name what you want next month to feel like, independent of any single outcome — that intention will sharpen everything else.",
      "Pay attention to how you feel around the middle of the month; that's often when the emotional weather shifts, even if nothing dramatic happens on the surface.",
      "Let the month show you something before you decide anything permanent — watch for patterns, not just events.",
    ], ctx.assistantMessages)
  );

  return parts.join(" ");
}
