export type KnowledgeItem = {
  id: string;
  topic: string;
  content: string;
  tags: string[];
};

export const ASTROLOGY_KNOWLEDGE: KnowledgeItem[] = [
  {
    id: "sun-sign-core",
    topic: "Sun Sign",
    content:
      "The Sun sign represents your core identity, ego, and life purpose. It reflects how you express your will and what drives you at the deepest level.",
    tags: ["identity", "purpose", "ego", "sun", "zodiac"],
  },
  {
    id: "moon-sign-emotions",
    topic: "Moon Sign",
    content:
      "The Moon sign governs emotional needs, instinctive reactions, and inner security. Moon phases affect collective mood — new moons favour beginnings; full moons favour culmination and release.",
    tags: ["emotions", "needs", "inner-self", "moon", "moon phase"],
  },
  {
    id: "rising-sign",
    topic: "Rising Sign (Ascendant)",
    content:
      "The Rising sign is your social mask and first impression. It shifts approximately every 2 hours, making birth time essential for accuracy.",
    tags: ["persona", "first-impression", "approach", "rising"],
  },
  {
    id: "mercury-communication",
    topic: "Mercury",
    content:
      "Mercury rules communication, thinking, learning, and travel. In readings it shapes how someone processes information and expresses ideas.",
    tags: ["communication", "thinking", "learning", "mercury"],
  },
  {
    id: "mercury-retrograde",
    topic: "Mercury Retrograde",
    content:
      "Mercury retrograde is a period when Mercury appears to move backward. Astrologically it is linked to reviewing communication, revisiting plans, delays, miscommunications, and technology glitches. It is a time to edit, reflect, and double-check — not to fear. Avoid signing major contracts impulsively; revisit rather than launch.",
    tags: ["mercury", "retrograde", "communication", "transits", "review"],
  },
  {
    id: "retrograde-general",
    topic: "Planetary Retrogrades",
    content:
      "When a planet is retrograde it appears to move backward from Earth's view. Retrogrades internalise that planet's themes — review, redo, reconsider. Venus retrograde revisits love/values; Mars retrograde revisits drive/conflict; Saturn retrograde revisits responsibility and structure.",
    tags: ["retrograde", "transits", "planets", "review"],
  },
  {
    id: "venus-relationships",
    topic: "Venus",
    content:
      "Venus governs love, values, beauty, and attraction. Key for relationship and compatibility readings.",
    tags: ["love", "values", "attraction", "venus", "compatibility", "relationship"],
  },
  {
    id: "mars-drive",
    topic: "Mars",
    content:
      "Mars represents drive, ambition, anger, and physical energy. Its placement reveals how someone pursues goals and handles conflict.",
    tags: ["ambition", "drive", "action", "mars"],
  },
  {
    id: "saturn-lessons",
    topic: "Saturn",
    content:
      "Saturn is the teacher planet — discipline, structure, and life lessons. Saturn transits often coincide with maturation through challenge.",
    tags: ["lessons", "discipline", "growth", "saturn", "transits"],
  },
  {
    id: "jupiter-expansion",
    topic: "Jupiter",
    content:
      "Jupiter brings expansion, optimism, and opportunity. Jupiter transits can open doors in career, travel, and personal growth.",
    tags: ["opportunity", "growth", "optimism", "jupiter", "transits"],
  },
  {
    id: "houses-overview",
    topic: "Astrological Houses",
    content:
      "The 12 houses: 1st self, 2nd resources, 3rd communication, 4th home, 5th creativity, 6th health, 7th partnerships, 8th transformation, 9th philosophy, 10th career, 11th community, 12th spirituality.",
    tags: ["houses", "life-areas", "technique"],
  },
  {
    id: "transits-guidance",
    topic: "Planetary Transits",
    content:
      "Transits are current planetary movements relative to your birth chart. They highlight themes and timing for awareness. Interpret as invitations for growth, not fixed fate.",
    tags: ["transits", "timing", "awareness", "forecast"],
  },
  {
    id: "aspects-dynamics",
    topic: "Planetary Aspects",
    content:
      "Aspects: conjunctions blend energies, trines flow easily, squares create tension for growth, oppositions seek balance, sextiles offer opportunities.",
    tags: ["aspects", "dynamics", "energy", "technique"],
  },
  {
    id: "compatibility-synastry",
    topic: "Zodiac Compatibility",
    content:
      "Compatibility compares Sun, Moon, Venus, and Mars between charts (synastry). Element harmony (fire/air, earth/water) matters, but full compatibility needs both birth charts — Sun sign alone is a starting point, not the full picture.",
    tags: ["compatibility", "synastry", "love", "relationship", "venus"],
  },
  {
    id: "moon-phases",
    topic: "Moon Phases",
    content:
      "New Moon: set intentions, plant seeds. Waxing: build momentum. Full Moon: culmination, release, heightened emotion. Waning: integrate, let go. Without live ephemeris, describe the cycle — do not claim today's exact phase.",
    tags: ["moon", "moon phase", "cycles", "lunar"],
  },
  {
    id: "eclipses",
    topic: "Eclipses",
    content:
      "Solar eclipses mark powerful new beginnings; lunar eclipses bring revelations and endings. Eclipse seasons accelerate change — only cite specific eclipse dates if retrieval provides them.",
    tags: ["eclipse", "transformation", "transits", "current_events"],
  },
  {
    id: "numerology-basics",
    topic: "Numerology",
    content:
      "Numerology derives meaning from birth date and name numbers. Life Path number comes from full birth date reduction. Use as complementary symbolism alongside astrology, not as replacement.",
    tags: ["numerology", "numbers", "life path"],
  },
  {
    id: "ethical-guidance",
    topic: "Ethical Reading Principles",
    content:
      "Never make fear-based or absolute predictions. Use supportive language. Distinguish established knowledge from interpretation. State uncertainty when live data is missing.",
    tags: ["ethics", "guidance", "trust"],
  },
];

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function scoreKnowledgeItem(item: KnowledgeItem, message: string, topics: string[]): number {
  const lower = message.toLowerCase();
  let score = 0;

  for (const tag of item.tags) {
    if (lower.includes(tag.toLowerCase())) score += 2;
    if (topics.some((t) => t.toLowerCase().includes(tag.toLowerCase()))) score += 1;
  }

  if (lower.includes(item.topic.toLowerCase())) score += 3;

  const words = item.topic.toLowerCase().split(/\s+/);
  for (const w of words) {
    if (w.length > 3 && new RegExp(`\\b${escapeRegex(w)}\\b`, "i").test(message)) score += 1;
  }

  return score;
}

export function retrieveRelevantKnowledge(topics: string[], limit = 5): KnowledgeItem[] {
  const scored = ASTROLOGY_KNOWLEDGE.map((item) => {
    const score = item.tags.filter((tag) =>
      topics.some(
        (t) =>
          t.toLowerCase().includes(tag.toLowerCase()) ||
          tag.toLowerCase().includes(t.toLowerCase())
      )
    ).length;
    return { item, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.item);
}

export function retrieveKnowledgeForMessage(
  message: string,
  topics: string[],
  limit = 5
): KnowledgeItem[] {
  const scored = ASTROLOGY_KNOWLEDGE.map((item) => ({
    item,
    score: scoreKnowledgeItem(item, message, topics),
  }));

  const ranked = scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  if (ranked.length >= limit) {
    return ranked.slice(0, limit).map((s) => s.item);
  }

  const fallback = retrieveRelevantKnowledge(topics, limit);
  const ids = new Set(ranked.map((r) => r.item.id));
  for (const item of fallback) {
    if (!ids.has(item.id)) ranked.push({ item, score: 0 });
    if (ranked.length >= limit) break;
  }

  return ranked.slice(0, limit).map((s) => s.item);
}

export function formatKnowledgeForPrompt(knowledge: KnowledgeItem[]): string {
  if (!knowledge.length) return "";
  return knowledge.map((k) => `### ${k.topic}\n${k.content}`).join("\n\n");
}
