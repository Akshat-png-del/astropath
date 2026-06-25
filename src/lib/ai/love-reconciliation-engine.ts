/** Love & breakup fallback — conversational, never quotes the user. */

import type { ConversationContext } from "./conversation-context";
import type { ConversationMemory } from "./conversation-memory";
import type { InternalReasoning } from "./internal-reasoning";
import type { QuestionOrientation } from "./internal-reasoning";
import type { MessageInterpretation } from "./message-interpreter";
import { isFreshReadingContext } from "./internal-reasoning";
import { hashPick, pickFreshAdvice } from "./engines/response-variation";

export function buildLoveGuidancePlan(
  ctx: ConversationContext,
  memory: ConversationMemory,
  orientation: QuestionOrientation
): string[] {
  const msg = ctx.lastUserMessage.toLowerCase();
  const plan: string[] = [
    "Respond naturally — never quote their message back to them.",
    "Explore the emotional dynamics they described — be specific, not generic.",
  ];

  if (/\b(closure|never got|no goodbye)\b/.test(msg)) {
    plan.push("Address the lack of closure directly.");
  }
  if (memory.facts.hadGradualConflict) {
    plan.push("Analyse the conflict pattern — what would need to change for reconciliation to work.");
  }
  if (
    orientation === "reconciliation" ||
    orientation === "future" ||
    /\b(come back|get back|will (he|she|they))\b/.test(msg)
  ) {
    plan.push(
      "Answer reunion/outlook with may/could/suggests — never refuse, never guarantee.",
      "Offer nuanced possibilities, not one verdict."
    );
  }
  plan.push("Weave at most one brief astrological insight — never a planet-theme dump.");
  plan.push("End with one practical step.");
  return plan;
}

export function isLoveOrReconciliationTopic(topic: string, orientation: string): boolean {
  return (
    orientation === "reconciliation" ||
    orientation === "future" ||
    topic === "love" ||
    topic === "breakup" ||
    topic === "reconciliation" ||
    topic === "marriage"
  );
}

function isBreakupMessage(msg: string): boolean {
  return /\b(left me|he left|she left|boyfriend left|girlfriend left|broke up|breakup|dumped|walked away|ended things|left without)\b/i.test(
    msg
  );
}

function subtleChartNote(sign: string | null, context: "love" | "general"): string | null {
  if (!sign) return null;
  if (sign === "Gemini" && context === "love") {
    return "Your Gemini Sun often needs the story to make sense before grief can settle — that restlessness is part of how you process loss, not a flaw.";
  }
  if (context === "love") {
    return `Your ${sign} chart adds depth here — this isn't a generic heartbreak, it's yours.`;
  }
  return null;
}

/** Fallback when LLM unavailable. */
export function buildDynamicLoveResponse(
  ctx: ConversationContext,
  memory: ConversationMemory,
  reasoning: InternalReasoning,
  sign: string | null,
  interp?: MessageInterpretation
): string {
  const msg = ctx.lastUserMessage.toLowerCase();
  const parts: string[] = [];
  const seed = ctx.lastUserMessage + String(ctx.messageCount) + String(ctx.assistantMessages.length);
  const isFollowUp = ctx.messageCount > 1 && !isFreshReadingContext(ctx.lastUserMessage);

  const repeatCount = ctx.userMessages.filter((m) => m.trim() === ctx.lastUserMessage.trim()).length;
  if (repeatCount > 1) {
    parts.push("I know you're still sitting with this — let me go deeper rather than repeat myself.");
  }

  if (!isFollowUp) {
    const displayDate = interp?.entities.displayDate ?? null;
    const location = interp?.entities.location ?? ctx.knownLocation;
    if (displayDate && sign) {
      const place = location ? `, ${location.replace(/\.\s*$/, "")}` : "";
      parts.push(`I've got your chart — ${displayDate}${place}, ${sign}.`);
    } else if (sign) {
      parts.push(`With your ${sign} chart in view, here's how I read this.`);
    }
  }

  if (isBreakupMessage(msg)) {
    parts.push(
      hashPick(seed, [
        "When someone you love leaves without you choosing it, the grief hits twice — once for the person, once for the future you thought you were building.",
        "Being left is a particular kind of pain because rejection gets woven into the loss. You don't have to rush past that to seem strong.",
        "What happened with him would shake anyone — this isn't overreacting, it's an honest response to an ending you didn't write.",
      ])
    );
  } else if (/\b(closure|never got|no goodbye)\b/.test(msg)) {
    parts.push(
      "When an ending arrives without the conversation your heart needed, the mind keeps returning to unfinished questions — that loop is exhausting, and it makes sense you're still in it."
    );
  } else if (/\b(miss|want (her|him|them) back|come back)\b/.test(msg)) {
    parts.push(
      "Missing him this deeply tells me the connection was real — longing like that isn't weakness, it's love that hasn't found its place yet."
    );
  } else if (!isFollowUp) {
    parts.push(
      "Love questions like this deserve a real answer — I'll stay with what you're actually carrying, not a script."
    );
  } else {
    parts.push("Let's pick up from where you are now.");
  }

  if (memory.facts.hadGradualConflict) {
    parts.push(
      "The pattern of conflict you described matters — any path forward would need both of you communicating differently, not just picking up where things stopped."
    );
  }

  const chartNote = subtleChartNote(sign, "love");
  if (chartNote && !parts.some((p) => p.includes("Gemini"))) {
    parts.push(chartNote);
  }

  if (
    reasoning.orientation === "reconciliation" ||
    reasoning.orientation === "future" ||
    /\b(will he|will she|come back|get back|return)\b/.test(msg)
  ) {
    parts.push(
      hashPick(seed + "future", [
        "Over the coming weeks, contact is possible but not guaranteed — what matters more is whether both of you would show up differently if you tried again.",
        "Looking ahead, this period may favour clarity about what you need over chasing one outcome. Reunion is one possibility among several.",
      ])
    );
  } else if (isBreakupMessage(msg) || isFollowUp) {
    parts.push(
      "In the weeks ahead, grief and clarity may alternate — that's normal. What you can influence is how steadily you rebuild for yourself, regardless of his choices."
    );
  }

  parts.push(
    pickFreshAdvice(seed + "step", [
      "This week, try writing what you wish you'd said — not to send, but to release the loop your mind keeps running.",
      "Notice who you reach for when you're low — that pattern tells you what kind of support actually steadies you.",
      "Choose one small act of self-respect this week so grief doesn't become your only companion.",
      "Spend an hour doing something that reminds you who you are outside this relationship — it matters more than waiting for his next move.",
    ], ctx.assistantMessages)
  );

  return parts.join(" ");
}

/** General fallback — never quotes the user. */
export function buildDynamicGeneralResponse(
  ctx: ConversationContext,
  memory: ConversationMemory,
  sign: string | null
): string {
  const parts: string[] = [];
  const seed = ctx.lastUserMessage + String(ctx.messageCount);

  if (memory.chatIntent === "career") {
    parts.push(
      "Career pressure often touches identity, not just income — when direction feels unclear, the urgency you feel is understandable.",
      sign
        ? "Your chart favours deliberate steps over dramatic leaps right now — one focused move this month outweighs trying to solve everything at once."
        : "The most useful step is identifying the single decision that unlocks the rest.",
      "Pick one concrete action for this week rather than resolving your entire path in one sitting."
    );
    return parts.join(" ");
  }

  parts.push(
    hashPick(seed, [
      "Let me read this with you — there's more here than a surface answer would capture.",
      "There's something specific in what you're asking, and I'll meet it directly.",
      "I'll answer this plainly, without dressing it up in generic advice.",
    ])
  );

  if (sign) {
    parts.push(
      `Your ${sign} chart adds context, but your situation leads — I'll keep the reading grounded in what you're actually navigating.`
    );
  }

  parts.push(
    "Take one small step this week that honours what you've learned — momentum often starts smaller than we expect."
  );

  return parts.join(" ");
}
