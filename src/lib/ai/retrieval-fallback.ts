import type { RetrievalContext } from "./retrieval-context";
import type { ConversationContext } from "./conversation-context";
import type { RetrievalCategory } from "./retrieval-policy";

const ESTABLISHED_ANSWERS: Partial<Record<RetrievalCategory, () => string>> = {
  retrograde: () =>
    "I don't have live planetary data right now, but Mercury retrograde is generally associated with reviewing communication, revisiting old plans, and double-checking details before committing. It's a useful time to slow decisions and clarify messages rather than assume silence means rejection.",

  moon_phase: () =>
    "I don't have today's exact moon phase on hand, but lunar cycles work like this: new moons favour fresh intentions, waxing moons build momentum, full moons bring culmination and emotional peaks, and waning moons support release and integration.",

  transits: () =>
    "Without live ephemeris I can't name exact transits today, but transits highlight recurring life themes — especially around identity (Sun), relationships (Venus), and career structure (Saturn). Tell me your focus area and I can read the pattern.",

  compatibility: () =>
    "Sun-sign compatibility is only a starting point. Moon and Venus signs matter more for lasting chemistry. Tell me both birth dates for a sharper read.",

  eclipse: () =>
    "Eclipses mark accelerated change — solar eclipses seed new chapters, lunar eclipses reveal what needs to end. I don't have this season's exact eclipse dates without live data, but eclipse seasons ask for honesty and bold adjustments.",

  numerology: () =>
    "Numerology looks at numbers derived from your birth date and name. Life Path number comes from reducing your full birth date. It complements astrology — share your full DOB if you'd like both lenses.",

  current_events: () =>
    "I don't have a live sky feed right now, so I can't state what's happening astronomically this exact moment. I can still read how Venus (love), Mercury (communication), and Saturn (career) themes may apply to your situation.",

  forecast: () =>
    "Without live transit data I'll focus on thematic patterns: the coming weeks often favour steady progress when you align actions with what you actually need rather than forcing outcomes.",
};

export function buildRetrievalFallbackResponse(
  ctx: ConversationContext,
  retrieval: RetrievalContext
): string | null {
  if (!retrieval.need.needsRetrieval) return null;

  const primary = retrieval.need.categories[0] ?? "general_astrology";
  const builder = ESTABLISHED_ANSWERS[primary];

  if (builder) {
    const body = builder();
    const followUp =
      primary === "retrograde"
        ? " Is this about communication at work, in love, or something else?"
        : primary === "compatibility"
          ? " What are both people's birth dates?"
          : primary === "transits" || primary === "forecast"
            ? " Is this about love, career, or personal growth?"
            : " What would you like to explore next?";

    const contextLead =
      ctx.lastUserMessage.length > 10
        ? `On "${ctx.lastUserMessage.slice(0, 60)}${ctx.lastUserMessage.length > 60 ? "…" : ""}" — `
        : "";

    return `${contextLead}${body}${followUp}`;
  }

  if (retrieval.need.needsLiveCelestialData && retrieval.liveDataMissing) {
    return `I don't have live planetary or moon data right now, so I can't state exact positions or phases today. I can still read your chart and life questions with established astrology — what area matters most: love, career, or timing?`;
  }

  return null;
}
