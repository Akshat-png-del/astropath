import { MAJOR_ARCANA } from "@/lib/tarot/major-arcana";
import { tarotCardSlug } from "@/content/pillars/tarot/meta";
import type { DailyLoopContent } from "./types";
import { getDailyRecommendedArticle } from "./recommendations";

const COSMIC_TIPS = [
  "Write three sentences about how you want to feel today — not what you want to achieve.",
  "Notice where you rush. Astrology rewards patience with clearer signals.",
  "Your moon sign describes what you need to feel safe. Honor one small need today.",
  "Before a big decision, ask: am I acting from fear or from curiosity?",
  "Read one paragraph of an astrology guide instead of scrolling — depth beats volume.",
  "Tarot works best as a mirror. Ask one honest question, then sit with the answer.",
  "Compare today's mood to your last journal entry. Patterns are data.",
  "Spend five minutes outdoors. The sky is the original chart.",
  "If a horoscope feels off, check your rising sign — it shapes how transits land.",
  "Gratitude for progress, not perfection, aligns with Jupiter's expansive tone.",
  "When communication feels stuck, Mercury favors listening before fixing.",
  "Your chart is a map, not a mandate. You still choose the route.",
  "Save one insight from today. Future you will thank present you.",
  "Compatibility scores describe chemistry, not compatibility of effort.",
  "Rest is a valid response to a heavy Saturn transit.",
];

function seededIndex(seed: string, max: number): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return hash % max;
}

export function getDailyTarotCard(userId: string): DailyLoopContent["tarotCard"] {
  const seed = `${userId}_${new Date().toISOString().slice(0, 10)}`;
  const card = MAJOR_ARCANA[seededIndex(seed, MAJOR_ARCANA.length)];
  const slug = tarotCardSlug(card.name);
  return {
    name: card.name,
    keyword: card.keyword,
    message: card.general,
    href: `/tarot/${slug}`,
  };
}

export function getCosmicTip(userId: string): string {
  const seed = `${userId}_tip_${new Date().toISOString().slice(0, 10)}`;
  return COSMIC_TIPS[seededIndex(seed, COSMIC_TIPS.length)];
}

export function buildDailyLoop(
  userId: string,
  sunSign: string | undefined,
  horoscope: DailyLoopContent["horoscope"]
): DailyLoopContent {
  return {
    horoscope,
    tarotCard: getDailyTarotCard(userId),
    cosmicTip: getCosmicTip(userId),
    recommendedArticle: getDailyRecommendedArticle(userId, sunSign),
  };
}
