export const ASTROLOGY_KNOWLEDGE = [
  {
    id: "sun-sign-core",
    topic: "Sun Sign",
    content:
      "The Sun sign represents your core identity, ego, and life purpose. It reflects how you express your will and what drives you at the deepest level. In readings, emphasize self-discovery rather than fixed destiny.",
    tags: ["identity", "purpose", "ego"],
  },
  {
    id: "moon-sign-emotions",
    topic: "Moon Sign",
    content:
      "The Moon sign governs emotional needs, instinctive reactions, and inner security. It reveals how you process feelings and what comforts you. Pair Moon insights with conversational emotional patterns for deeper resonance.",
    tags: ["emotions", "needs", "inner-self"],
  },
  {
    id: "rising-sign",
    topic: "Rising Sign (Ascendant)",
    content:
      "The Rising sign is your social mask and first impression. It colors how others perceive you and how you approach new experiences. It shifts approximately every 2 hours, making birth time essential.",
    tags: ["persona", "first-impression", "approach"],
  },
  {
    id: "mercury-communication",
    topic: "Mercury",
    content:
      "Mercury rules communication, thinking patterns, and learning style. Its sign and house placement reveal how you process information and express ideas. Useful for career and relationship communication insights.",
    tags: ["communication", "thinking", "learning"],
  },
  {
    id: "venus-relationships",
    topic: "Venus",
    content:
      "Venus governs love, values, beauty, and attraction. It shows what you seek in relationships and what you find pleasurable. Combine with conversational relationship patterns for personalized guidance.",
    tags: ["love", "values", "attraction"],
  },
  {
    id: "mars-drive",
    topic: "Mars",
    content:
      "Mars represents drive, ambition, anger, and physical energy. Its placement reveals how you pursue goals and handle conflict. Frame as empowerment, not aggression.",
    tags: ["ambition", "drive", "action"],
  },
  {
    id: "saturn-lessons",
    topic: "Saturn",
    content:
      "Saturn is the teacher planet — representing discipline, structure, and life lessons. Its transits often coincide with periods of growth through challenge. Present as soul lessons, never punishment.",
    tags: ["lessons", "discipline", "growth"],
  },
  {
    id: "jupiter-expansion",
    topic: "Jupiter",
    content:
      "Jupiter brings expansion, optimism, and opportunity. Its transits can open doors in career, travel, and personal growth. Frame opportunities as invitations, not guarantees.",
    tags: ["opportunity", "growth", "optimism"],
  },
  {
    id: "houses-overview",
    topic: "Astrological Houses",
    content:
      "The 12 houses represent life areas: 1st self, 2nd resources, 3rd communication, 4th home, 5th creativity, 6th health, 7th partnerships, 8th transformation, 9th philosophy, 10th career, 11th community, 12th spirituality.",
    tags: ["houses", "life-areas"],
  },
  {
    id: "transits-guidance",
    topic: "Planetary Transits",
    content:
      "Transits are current planetary movements relative to your birth chart. They highlight themes and timing for reflection. Never predict specific events — suggest areas for awareness and intentional action.",
    tags: ["transits", "timing", "awareness"],
  },
  {
    id: "aspects-dynamics",
    topic: "Planetary Aspects",
    content:
      "Aspects are angular relationships between planets. Conjunctions blend energies, trines flow easily, squares create tension for growth, oppositions seek balance, sextiles offer opportunities. Tension aspects are growth catalysts.",
    tags: ["aspects", "dynamics", "energy"],
  },
  {
    id: "ethical-guidance",
    topic: "Ethical Reading Principles",
    content:
      "Never make fear-based or absolute predictions. Use supportive, reflective language. Present astrology as guidance and self-reflection. Show confidence indicators. Encourage self-discovery and curiosity over certainty.",
    tags: ["ethics", "guidance", "trust"],
  },
];

export function retrieveRelevantKnowledge(
  topics: string[],
  limit = 5
): typeof ASTROLOGY_KNOWLEDGE {
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

export function formatKnowledgeForPrompt(
  knowledge: typeof ASTROLOGY_KNOWLEDGE
): string {
  return knowledge
    .map((k) => `### ${k.topic}\n${k.content}`)
    .join("\n\n");
}
