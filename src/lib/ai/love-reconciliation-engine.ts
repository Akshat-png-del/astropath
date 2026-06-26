/** Love & breakup fallback — answer the user's actual question, no meta commentary. */

import type { ConversationContext } from "./conversation-context";
import type { ConversationMemory } from "./conversation-memory";
import type { InternalReasoning } from "./internal-reasoning";
import type { QuestionOrientation } from "./internal-reasoning";
import type { MessageInterpretation } from "./message-interpreter";
import { isFreshReadingContext } from "./internal-reasoning";
import { hashPick, pickFreshAdvice, wasSaidRecently } from "./engines/response-variation";

const GRIEF_CLARITY_LINE =
  "In the weeks ahead, grief and clarity may alternate — that's normal. What you can influence is how steadily you rebuild for yourself, regardless of his choices.";

export function buildLoveGuidancePlan(
  ctx: ConversationContext,
  memory: ConversationMemory,
  orientation: QuestionOrientation
): string[] {
  const msg = ctx.lastUserMessage.toLowerCase();
  const plan: string[] = [
    "Answer their latest message directly — no meta commentary about scripts or process.",
    "Be specific and practical; name concrete examples when they ask 'like what' or 'how'.",
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
  return /\b(left me|he left|she left|they left|boyfriend left|girlfriend left|partner left|broke up|breakup|break up|dumped|walked away|ended things|left without|heartbroken)\b/i.test(
    msg
  );
}

function isOverthinkingMessage(msg: string): boolean {
  return /\b(overthink|overthinking|can'?t stop thinking|mind won'?t stop|racing thoughts|too much thinking|thoughts won'?t stop|looping|spinning)\b/i.test(
    msg
  );
}

function isClarificationQuestion(msg: string): boolean {
  const t = msg.trim().toLowerCase();
  return (
    /^(like what|what like|such as|what kind|what sort|what type|how so|for example|examples?)\??$/i.test(t) ||
    /\b(like what|what do you mean|what should i do|give me (an )?example|be more specific)\b/i.test(t)
  );
}

function isNewReadingTurn(ctx: ConversationContext, interp?: MessageInterpretation): boolean {
  const msg = ctx.lastUserMessage;
  if (isFreshReadingContext(msg)) return true;
  if (interp?.justSharedBirthInfo) return true;
  if (isBreakupMessage(msg) && (interp?.entities.displayDate || interp?.entities.sign || ctx.knownSign)) {
    return true;
  }
  if (/\b(love reading|relationship reading|read my chart|read my love)\b/i.test(msg)) {
    return !!(interp?.entities.displayDate || interp?.entities.sign || ctx.knownSign);
  }
  return false;
}

function chartInsightForLove(sign: string | null): string | null {
  if (!sign) return null;
  const insights: Record<string, string> = {
    Gemini:
      "With Gemini Sun, your mind runs fast after loss — you analyse before you grieve. That can look like overthinking, but it's how you process. Grounding activities help more than forcing yourself to 'figure it out'.",
    Cancer:
      "Cancer Moons and Suns often replay the relationship to feel safe again. Honour the feeling, but give your heart small daily rituals so the past doesn't become your whole present.",
    Pisces:
      "Pisces feels endings deeply and sometimes absorbs blame that isn't yours. His leaving reflects his path — not your worth.",
    Leo:
      "Leo loves with pride; rejection can sting the ego as much as the heart. Rebuilding self-respect is part of healing here, not chasing proof you're still chosen.",
    Scorpio:
      "Scorpio doesn't do shallow endings — you likely need honest closure, even if it's one-sided. Writing unsent letters or naming what you never got to say can release the grip.",
  };
  return insights[sign] ?? `Your ${sign} chart suggests you need honesty and pacing — not rushing yourself to 'be over it'.`;
}

function pushIfFresh(parts: string[], line: string, prior: string[]): void {
  if (!line.trim()) return;
  if (wasSaidRecently(line, prior)) return;
  parts.push(line);
}

function appendBreakupCore(
  parts: string[],
  seed: string,
  sign: string | null,
  prior: string[],
  includeOutlook: boolean
): void {
  pushIfFresh(
    parts,
    hashPick(seed + "breakup", [
      "When someone you love leaves without you choosing it, the grief hits twice — once for the person, once for the future you thought you were building.",
      "Being left is a particular kind of pain because rejection gets woven into the loss. You don't have to rush past that to seem strong.",
      "What happened would shake anyone — this isn't overreacting, it's an honest response to an ending you didn't write.",
    ]),
    prior
  );

  const insight = chartInsightForLove(sign);
  if (insight) pushIfFresh(parts, insight, prior);

  if (includeOutlook) {
    pushIfFresh(
      parts,
      hashPick(seed + "outlook", [
        "Contact from him is possible in the coming weeks, but not something to build your peace around. Whether he returns matters less than whether you would both show up differently.",
        "Looking ahead, this chapter may clarify what you need in love — consistency, honesty, or simply someone who stays. Reunion is one possibility; rebuilding yourself is the one you control.",
      ]),
      prior
    );
  }

  if (!wasSaidRecently(GRIEF_CLARITY_LINE, prior)) {
    parts.push(GRIEF_CLARITY_LINE);
  }
}

function buildClarificationAnswer(ctx: ConversationContext, sign: string | null): string | null {
  const prior = ctx.assistantMessages;
  const lastAssistant = prior.at(-1)?.toLowerCase() ?? "";
  const seed = ctx.lastUserMessage + String(ctx.messageCount);

  if (/outside (this )?relationship|who you are outside|reminds you who you are/.test(lastAssistant)) {
    return hashPick(seed, [
      "Try one of these tonight: a solo walk with music, cooking a meal you've been craving, a workout or yoga class, calling a friend who makes you laugh, reorganising one small space at home, or watching a film that has nothing to do with romance. Pick the easiest one — the goal is to give your body and mind something real to focus on.",
      "Concrete options: journal for ten minutes then delete it, visit a café alone, take photos on a walk, paint or draw even badly, or plan a weekend outing with friends. You don't need a big transformation — one hour that belongs to you helps break the loop.",
    ]);
  }

  if (/writ(e|ing)|wish you'?d said|release the loop/.test(lastAssistant)) {
    return "Open notes on your phone or a blank page. Write everything you'd say to him if he were listening — anger, confusion, missing him, questions. Don't send it. When you're done, close it. The point is to get the loop out of your head and onto paper so it stops circling at 2 a.m.";
  }

  if (/self-respect|small act/.test(lastAssistant)) {
    return hashPick(seed, [
      "Examples: unfollow or mute his socials for thirty days, say no to a plan you don't want, wear something that makes you feel good, eat a proper meal instead of skipping, or block an hour where your phone is off. Small boundaries rebuild self-respect faster than big speeches.",
      "It could be as simple as not texting him today, making your bed, or telling a friend the truth about how hard this is instead of pretending you're fine.",
    ]);
  }

  if (sign === "Gemini") {
    return "For Gemini energy specifically: talk it out with one trusted person, learn something new for twenty minutes (podcast, article, skill), or change your environment — new café, new route, new playlist. Your mind needs fresh input, not more replay of the same conversation.";
  }

  return hashPick(seed, [
    "A few things that help after heartbreak: movement (walk, stretch, dance), talking to someone safe, creative outlet, nature, or a task that gives you a small win (clean one drawer, finish one errand). What feels most doable for you tonight?",
    "Examples: call a friend, take a long shower, cook comfort food, watch comedy, or write unsent messages. Pick one — not to fix everything, but to get through this evening.",
  ]);
}

function buildOverthinkingAnswer(ctx: ConversationContext, sign: string | null): string | null {
  const seed = ctx.lastUserMessage + String(ctx.messageCount);
  const prior = ctx.assistantMessages;
  const parts: string[] = [];

  pushIfFresh(
    parts,
    sign === "Gemini"
      ? "Overthinking after a breakup is especially common with Gemini — your mind tries to solve heartbreak like a puzzle. The loop isn't weakness; it's your sign reaching for certainty where there isn't any yet."
      : "When the mind won't stop after a breakup, it's often trying to protect you from grief by staying busy. The thoughts feel urgent, but they're not always asking for answers — sometimes they need a container.",
    prior
  );

  pushIfFresh(
    parts,
    hashPick(seed + "tool", [
      "Try a 15-minute worry window tonight: write every looping thought on paper. When the timer ends, close the notebook and do one physical thing — shower, walk, tidy one surface. Tomorrow you can read it with more distance.",
      "When thoughts spike, name five things you can see, four you can touch, three you hear. Then ask: 'Is this thought helping me heal, or keeping me stuck?' If it's the second, redirect to one small action — water, food, a text to a friend.",
      "Set a rule: no checking his socials or re-reading old messages after 9 p.m. Replace that habit with one calming ritual — tea, stretch, or a show. Break the loop at the behaviour level, not just in your head.",
    ]),
    prior
  );

  return parts.join(" ");
}

function buildContextualFollowUp(
  ctx: ConversationContext,
  memory: ConversationMemory,
  sign: string | null
): string | null {
  const msg = ctx.lastUserMessage.toLowerCase();
  const prior = ctx.assistantMessages;
  const seed = ctx.lastUserMessage + String(ctx.messageCount);

  if (isClarificationQuestion(msg)) {
    return buildClarificationAnswer(ctx, sign);
  }

  if (isOverthinkingMessage(msg)) {
    return buildOverthinkingAnswer(ctx, sign);
  }

  if (/\b(bestie|best friend|long[- ]distance|reach(?:ing)? (?:out )?to|talk to my friend)\b/i.test(msg)) {
    const parts: string[] = [];
    pushIfFresh(
      parts,
      hashPick(seed, [
        "Leaning on a long-distance friend is a solid move — chosen support matters more than waiting on someone who left.",
        "That friendship can hold real weight right now; distance doesn't make the care less real.",
      ]),
      prior
    );
    pushIfFresh(
      parts,
      pickFreshAdvice(
        seed + "support",
        [
          "Tell them one thing you need — listening, distraction, or honesty — so the conversation feels useful, not vague.",
          "Schedule a regular check-in, even a short call; rhythm helps when romance feels uncertain.",
        ],
        prior
      ),
      prior
    );
    return parts.length > 0 ? parts.join(" ") : null;
  }

  if (/\b(will he|will she|come back|get back|return|miss me)\b/i.test(msg)) {
    const parts: string[] = [];
    pushIfFresh(
      parts,
      hashPick(seed + "return", [
        "He may reach out — many people do when distance registers — but it's not guaranteed, and timing rarely matches when you need it most.",
        "Reconciliation is possible for some couples, but it needs both people to change the pattern that led here. Watch what he does, not just what you hope for.",
      ]),
      prior
    );
    if (sign) pushIfFresh(parts, chartInsightForLove(sign) ?? "", prior);
    return parts.length > 0 ? parts.join(" ") : null;
  }

  if (memory.chatIntent === "breakup" && msg.length < 100) {
    if (/\b(sad|cry|crying|empty|lonely|miss him|miss her|hurt|pain|can'?t)\b/i.test(msg)) {
      return hashPick(seed, [
        "What you're feeling is a normal response to loss — not a sign you're failing at healing. Let today be gentle; one hour at a time is enough.",
        "The ache you're describing fits what many people feel after being left. You don't have to perform 'okay' for anyone. Rest, water, and one kind voice (friend or yours) can help tonight.",
      ]);
    }
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
  const prior = ctx.assistantMessages;
  const seed = ctx.lastUserMessage + String(ctx.messageCount) + String(prior.length);
  const newReading = isNewReadingTurn(ctx, interp);
  const isFollowUp = ctx.messageCount > 1 && !newReading;
  const inBreakupThread =
    isBreakupMessage(msg) || memory.chatIntent === "breakup" || memory.emotionalSituation === "breakup";

  if (isFollowUp) {
    const contextual = buildContextualFollowUp(ctx, memory, sign);
    if (contextual) return contextual;
  }

  const parts: string[] = [];

  if (newReading) {
    const displayDate = interp?.entities.displayDate ?? null;
    const location = interp?.entities.location ?? ctx.knownLocation;
    if (displayDate && sign) {
      const place = location ? `, ${location.replace(/\.\s*$/, "")}` : "";
      pushIfFresh(parts, `I've got your chart — ${displayDate}${place}, ${sign}.`, prior);
    } else if (sign) {
      pushIfFresh(parts, `With your ${sign} chart in view, here's how I read this.`, prior);
    }

    if (inBreakupThread) {
      appendBreakupCore(parts, seed, sign, prior, true);
    } else if (/\b(love|relationship|marriage|partner)\b/i.test(msg)) {
      pushIfFresh(
        parts,
        hashPick(seed + "love", [
          `For love, your ${sign ?? "chart"} points to depth and honesty over speed — chemistry matters, but consistency matters more.`,
          "I'll read this through your chart and what you've shared — focusing on what you need from love, not generic lines.",
        ]),
        prior
      );
    }
  } else if (isBreakupMessage(msg)) {
    appendBreakupCore(parts, seed, sign, prior, false);
  } else if (/\b(closure|never got|no goodbye)\b/.test(msg)) {
    pushIfFresh(
      parts,
      "When an ending arrives without the conversation your heart needed, the mind keeps returning to unfinished questions — that loop is exhausting, and it makes sense you're still in it.",
      prior
    );
  } else if (/\b(miss|want (her|him|them) back|come back)\b/.test(msg)) {
    pushIfFresh(
      parts,
      "Missing him this deeply tells me the connection was real — longing like that isn't weakness, it's love that hasn't found its place yet.",
      prior
    );
  }

  if (memory.facts.hadGradualConflict) {
    pushIfFresh(
      parts,
      "The pattern of conflict you described matters — any path forward would need both of you communicating differently, not just picking up where things stopped.",
      prior
    );
  }

  if (
    reasoning.orientation === "reconciliation" ||
    reasoning.orientation === "future" ||
    /\b(will he|will she|come back|get back|return)\b/.test(msg)
  ) {
    pushIfFresh(
      parts,
      hashPick(seed + "future", [
        "Over the coming weeks, contact is possible but not guaranteed — what matters more is whether both of you would show up differently if you tried again.",
        "Looking ahead, this period may favour clarity about what you need over chasing one outcome. Reunion is one possibility among several.",
      ]),
      prior
    );
  }

  if (parts.length === 0 && isFollowUp && inBreakupThread) {
    return buildClarificationAnswer(ctx, sign) ?? buildOverthinkingAnswer(ctx, sign) ?? hashPick(seed, [
      "Tell me what's weighing on you most right now — missing him, anger, confusion, or whether he'll return — and I'll read that directly.",
    ]);
  }

  if (parts.length > 0 && !isFollowUp && !newReading) {
    pushIfFresh(
      parts,
      pickFreshAdvice(
        seed + "step",
        [
          "This week, try writing what you wish you'd said — not to send, but to release the loop your mind keeps running.",
          "Choose one small act of self-respect — mute his socials, say no to something you don't want, or tell a friend the truth about how you feel.",
          "Spend one hour doing something that reminds you who you are outside this relationship.",
        ],
        prior
      ),
      prior
    );
  }

  if (parts.length === 0) {
    return hashPick(seed + "fallback", [
      "What's weighing on you most — missing him, closure, or whether he'll return? I'll read that directly.",
      "Share what shifted since we last spoke, and I'll answer that specifically.",
    ]);
  }

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
  const prior = ctx.assistantMessages;
  const msg = ctx.lastUserMessage.toLowerCase();

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

  if (isClarificationQuestion(msg)) {
    return buildClarificationAnswer(ctx, sign) ?? "What part would you like me to unpack — love, timing, or what to do next?";
  }

  pushIfFresh(
    parts,
    hashPick(seed, [
      "Tell me more about what you're facing — love, career, or timing — and I'll read it directly.",
      "What would you like to understand first? I'll answer that plainly.",
    ]),
    prior
  );

  if (sign) {
    pushIfFresh(parts, chartInsightForLove(sign) ?? `Your ${sign} chart adds context to whatever you share next.`, prior);
  }

  return parts.join(" ");
}
