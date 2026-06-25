import type { ConversationContext } from "./conversation-context";

export interface ConversationFacts {
  hadGradualConflict: boolean;
  lackedClosure: boolean;
  partnerLeft: boolean;
  mentionedFights: boolean;
  isContextUpdate: boolean;
  latestDetail: string;
  allUserSnippets: string[];
}

const GRADUAL_PATTERNS =
  /\b(small fights?|arguments?|problems? for (some time|a while)|building up|tension|on and off|slowly|gradual)\b/i;
const CLOSURE_PATTERNS =
  /\b(without closure|no closure|didn't explain|did not explain|no explanation|ghost|silence|blocked|stopped talking)\b/i;
const LEFT_PATTERNS =
  /\b(left me|broke up|breakup|dumped|walked away|ended things|separation)\b/i;
const FIGHT_PATTERNS = /\b(fight|fighting|arguments?|conflict|disagree)\b/i;

/** Extract facts scoped to the active topic segment only. */
export function extractConversationFacts(
  ctx: ConversationContext,
  segmentMessages: string[]
): ConversationFacts {
  const all = segmentMessages.join(" ");
  const last = ctx.lastUserMessage.trim();

  const isContextUpdate =
    ctx.messageCount > 1 &&
    segmentMessages.length > 1 &&
    segmentMessages.at(-1) === last &&
    !/\?\s*$/.test(last) &&
    !/^(what|when|why|how|will|should|can|is|are|do|does)\b/i.test(last) &&
    !/\bcareer question\b/i.test(last) &&
    !/\b(job|finance|money|health) question\b/i.test(last);

  return {
    hadGradualConflict: GRADUAL_PATTERNS.test(all),
    lackedClosure: CLOSURE_PATTERNS.test(all),
    partnerLeft: LEFT_PATTERNS.test(all),
    mentionedFights: FIGHT_PATTERNS.test(all),
    isContextUpdate:
      isContextUpdate &&
      (GRADUAL_PATTERNS.test(last) ||
        CLOSURE_PATTERNS.test(last) ||
        FIGHT_PATTERNS.test(last) ||
        /\b(she|he|they)\b/i.test(last)),
    latestDetail: last,
    allUserSnippets: segmentMessages.map((m) => (m.length > 100 ? `${m.slice(0, 100)}…` : m)),
  };
}

export function formatFactsForPrompt(facts: ConversationFacts): string {
  const lines: string[] = [`Latest user detail: "${facts.latestDetail}"`];
  if (facts.partnerLeft) lines.push("Partner left / breakup confirmed");
  if (facts.hadGradualConflict) lines.push("Conflict built gradually (not sudden)");
  if (facts.lackedClosure) lines.push("Left without closure or explanation");
  if (facts.mentionedFights) lines.push("Mentioned fights or arguments");
  if (facts.isContextUpdate) lines.push("TURN TYPE: context update within active topic");
  lines.push(`Messages in active topic: ${facts.allUserSnippets.map((s) => `"${s}"`).join(" → ")}`);
  return lines.join("\n");
}
