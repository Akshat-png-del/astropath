import type { ReadingTopic } from "@/lib/ai/message-topics";
import { BIRTH_DATE_EXAMPLE, BIRTH_TIME_EXAMPLE } from "@/lib/ai/birth-examples";

/** Plain-language planet hook for sign */
export function getPlanetHook(sign: string | null, topic: ReadingTopic): string {
  if (!sign) {
    if (topic === "love") return "Venus rules love — what's happening now often peaks around emotional honesty.";
    if (topic === "career") return "Saturn tests patience in career — delay doesn't mean defeat.";
    return "The Moon shifts moods daily — what you feel is real, not permanent.";
  }
  const hooks: Record<string, Record<ReadingTopic, string>> = {
    Aries: { love: "Mars makes you direct in love — say what you mean, gently.", career: "Mars pushes you to lead. Take initiative this week.", general: "Fire sign energy — act, don't overthink." },
    Taurus: { love: "Venus in your nature wants stability — mixed signals drain you.", career: "Slow, steady work wins for Taurus. No shortcuts needed.", general: "Ground yourself. Comfort helps you think clearly." },
    Gemini: { love: "Mercury mind races — make sure words match feelings.", career: "Networking and ideas are your edge right now.", general: "Talk it out. Clarity comes through conversation." },
    Cancer: { love: "Moon feelings run deep — protect your heart without shutting down.", career: "Trust your instinct on people, not just numbers.", general: "Home and rest will reset you faster than forcing." },
    Leo: { love: "You need warmth and respect — not half-hearted effort.", career: "Visibility matters. Show your work.", general: "Your confidence returns when you feel seen." },
    Virgo: { love: "You analyse love a lot — feel it too.", career: "Details you fix now pay off in 4–6 weeks.", general: "Perfection isn't required. Progress is." },
    Libra: { love: "Balance in give-and-take is the real issue — not romance alone.", career: "Partnerships and fair deals look strong.", general: "Peace of mind is your real goal." },
    Scorpio: { love: "Intensity is your gift — choose where to invest it.", career: "Hidden opportunities surface when you're patient.", general: "Let go of what you can't control." },
    Sagittarius: { love: "Freedom and honesty must coexist in love.", career: "A bold move or travel-linked chance may appear.", general: "Zoom out. Bigger picture helps." },
    Capricorn: { love: "You show love through loyalty — ask for the same.", career: "Saturn rewards discipline. Keep building.", general: "Results take time. You're on track." },
    Aquarius: { love: "You need a friend and a partner — not just chemistry.", career: "Unusual ideas could be your breakthrough.", general: "Think different. The usual path bores you." },
    Pisces: { love: "You feel everything — boundaries protect your heart.", career: "Creative or helping work suits this phase.", general: "Rest and dreams hold real answers." },
  };
  return hooks[sign]?.[topic] ?? `${sign} energy is active in your chart this week.`;
}

export function getCuriosityTeaser(
  sign: string | null,
  topic: ReadingTopic,
  hasBirthTime: boolean,
  messageCount = 0
): string {
  const teasers: string[] = [];
  if (!sign) {
    teasers.push(`Share your birth date (e.g. ${BIRTH_DATE_EXAMPLE} or 12/06/2000) — I'll read deeper than Sun sign alone.`);
  } else if (!hasBirthTime) {
    teasers.push(`Birth time helps your rising sign — even "${BIRTH_TIME_EXAMPLE}" works.`);
  }
  if (topic === "love") {
    teasers.push("Want love timing for the next few months?");
  } else if (topic === "career") {
    teasers.push("Curious about career timing in your chart?");
  } else {
    teasers.push("Should I connect two chart details for you?");
  }
  return teasers[Math.abs(messageCount) % teasers.length];
}
