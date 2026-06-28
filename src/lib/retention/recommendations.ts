import { EDUCATION_ARTICLES } from "@/content/education";
import type { ContentRecommendation } from "./types";
import { getStore } from "./service";

const TOPIC_RECOMMENDATIONS: Record<string, ContentRecommendation[]> = {
  relationship: [
    { href: "/learn/zodiac-compatibility-guide", title: "Zodiac Compatibility Guide", reason: "Based on your relationship interests", hub: "learn" },
    { href: "/learn/venus-mars-in-relationships", title: "Venus & Mars in Relationships", reason: "Deepen love chart reading", hub: "learn" },
    { href: "/tarot/reading", title: "Love Tarot Spread", reason: "Reflect on partnership questions", hub: "tool" },
    { href: "/learn/synastry-relationship-astrology", title: "Synastry Basics", reason: "Compare two charts", hub: "learn" },
  ],
  tarot: [
    { href: "/tarot/the-lovers", title: "The Lovers — Tarot Meaning", reason: "Expand your tarot knowledge", hub: "tarot" },
    { href: "/learn/how-tarot-readings-work", title: "How Tarot Readings Work", reason: "Understand spreads deeply", hub: "learn" },
    { href: "/tarot/reading", title: "Try another spread", reason: "Continue your tarot practice", hub: "tool" },
  ],
  career: [
    { href: "/houses/tenth-house", title: "Tenth House — Career", reason: "Career astrology fundamentals", hub: "houses" },
    { href: "/planets/saturn", title: "Saturn in Your Chart", reason: "Structure and ambition", hub: "planets" },
    { href: "/learn/understanding-planetary-transits", title: "Planetary Transits", reason: "Timing career moves", hub: "learn" },
  ],
  zodiac: [
    { href: "/zodiac", title: "All Zodiac Signs", reason: "Explore every sign in depth", hub: "zodiac" },
    { href: "/learn/twelve-zodiac-signs", title: "Twelve Zodiac Signs Guide", reason: "Complete zodiac overview", hub: "learn" },
    { href: "/learn/elements-and-modalities", title: "Elements & Modalities", reason: "Understand sign chemistry", hub: "learn" },
  ],
  "birth-chart": [
    { href: "/learn/how-to-read-natal-chart", title: "How to Read Your Natal Chart", reason: "Next step after your report", hub: "learn" },
    { href: "/houses/first-house", title: "First House — Identity", reason: "Rising sign and persona", hub: "houses" },
    { href: "/planets/moon", title: "Moon in Astrology", reason: "Emotional blueprint", hub: "planets" },
  ],
  horoscope: [
    { href: "/dashboard", title: "Your Dashboard", reason: "Daily cosmic snapshot", hub: "tool" },
    { href: "/learn/understanding-planetary-transits", title: "Understanding Transits", reason: "Why today feels this way", hub: "learn" },
  ],
};

const SIGN_ARTICLES: Record<string, ContentRecommendation> = {
  Aries: { href: "/zodiac/aries", title: "Aries Sign Guide", reason: "Your sun sign deep dive", hub: "zodiac" },
  Taurus: { href: "/zodiac/taurus", title: "Taurus Sign Guide", reason: "Your sun sign deep dive", hub: "zodiac" },
  Gemini: { href: "/zodiac/gemini", title: "Gemini Sign Guide", reason: "Your sun sign deep dive", hub: "zodiac" },
  Cancer: { href: "/zodiac/cancer", title: "Cancer Sign Guide", reason: "Your sun sign deep dive", hub: "zodiac" },
  Leo: { href: "/zodiac/leo", title: "Leo Sign Guide", reason: "Your sun sign deep dive", hub: "zodiac" },
  Virgo: { href: "/zodiac/virgo", title: "Virgo Sign Guide", reason: "Your sun sign deep dive", hub: "zodiac" },
  Libra: { href: "/zodiac/libra", title: "Libra Sign Guide", reason: "Your sun sign deep dive", hub: "zodiac" },
  Scorpio: { href: "/zodiac/scorpio", title: "Scorpio Sign Guide", reason: "Your sun sign deep dive", hub: "zodiac" },
  Sagittarius: { href: "/zodiac/sagittarius", title: "Sagittarius Sign Guide", reason: "Your sun sign deep dive", hub: "zodiac" },
  Capricorn: { href: "/zodiac/capricorn", title: "Capricorn Sign Guide", reason: "Your sun sign deep dive", hub: "zodiac" },
  Aquarius: { href: "/zodiac/aquarius", title: "Aquarius Sign Guide", reason: "Your sun sign deep dive", hub: "zodiac" },
  Pisces: { href: "/zodiac/pisces", title: "Pisces Sign Guide", reason: "Your sun sign deep dive", hub: "zodiac" },
};

export function getRecommendations(
  userId: string | null | undefined,
  sunSign?: string,
  limit = 6
): ContentRecommendation[] {
  const store = getStore(userId);
  const recs: ContentRecommendation[] = [];
  const seen = new Set<string>();

  const add = (r: ContentRecommendation) => {
    if (!seen.has(r.href)) {
      seen.add(r.href);
      recs.push(r);
    }
  };

  if (sunSign && SIGN_ARTICLES[sunSign]) add(SIGN_ARTICLES[sunSign]);

  const sortedTopics = Object.entries(store.topicAffinities)
    .sort((a, b) => b[1] - a[1])
    .map(([t]) => t);

  for (const topic of sortedTopics) {
    for (const r of TOPIC_RECOMMENDATIONS[topic] ?? []) add(r);
  }

  const unread = EDUCATION_ARTICLES.filter((a) => !store.guidesRead.includes(a.slug));
  for (const article of unread.slice(0, 3)) {
    add({
      href: `/learn/${article.slug}`,
      title: article.title,
      reason: "Recommended for you",
      hub: "learn",
    });
  }

  if (recs.length < limit) {
    for (const r of TOPIC_RECOMMENDATIONS.relationship) add(r);
    for (const r of TOPIC_RECOMMENDATIONS["birth-chart"]) add(r);
  }

  return recs.slice(0, limit);
}

export function getDailyRecommendedArticle(
  userId: string | null | undefined,
  sunSign?: string
): ContentRecommendation {
  const recs = getRecommendations(userId, sunSign, 20);
  const dayIndex = new Date().getDate() % Math.max(recs.length, 1);
  return (
    recs[dayIndex] ?? {
      href: "/learn/what-is-astrology",
      title: "What Is Astrology?",
      reason: "Start with the fundamentals",
      hub: "learn",
    }
  );
}
