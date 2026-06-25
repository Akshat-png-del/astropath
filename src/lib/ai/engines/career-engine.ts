/** Career conversation strategy — private guidance only. */

import type { ConversationContext } from "../conversation-context";
import type { ConversationMemory } from "../conversation-memory";

export function buildCareerGuidancePlan(
  ctx: ConversationContext,
  memory: ConversationMemory
): string[] {
  const msg = ctx.lastUserMessage.toLowerCase();
  const plan: string[] = [
    "Answer their career question directly — no deflection.",
    "Identify what they actually need: direction, timing, confidence, or a decision.",
  ];

  if (/\b(promotion|raise|interview|offer|job)\b/.test(msg)) {
    plan.push("Discuss opportunities and practical next steps for this specific situation.");
  }
  if (/\b(stuck|lost|don't know|change career|quit|leave)\b/.test(msg)) {
    plan.push("Explore growth paths and what a meaningful next chapter could look like.");
  }
  if (/\b(boss|coworker|toxic|conflict|workplace)\b/.test(msg)) {
    plan.push("Analyse workplace dynamics and boundaries — not just transit timing.");
  }
  if (memory.chatIntent === "career" || /\bcareer|job|work\b/.test(msg)) {
    plan.push(
      "Weave Saturn/Jupiter themes as supporting context — discipline, timing, opportunity cycles.",
      "End with one concrete action for this week."
    );
  }

  return plan;
}
