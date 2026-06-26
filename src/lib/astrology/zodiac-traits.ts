export const ZODIAC_TRAITS: Record<
  string,
  {
    element: string;
    modality: string;
    keywords: string[];
    strengths: string[];
    challenges: string[];
    relationship: string;
    career: string;
    emotional: string;
    archetype: string;
  }
> = {
  Aries: {
    element: "Fire",
    modality: "Cardinal",
    keywords: ["leadership", "courage", "impulsiveness", "pioneering"],
    strengths: ["Bold initiative", "Natural leader", "Fearless authenticity"],
    challenges: ["Impatience", "Acting before thinking", "Burnout from overdrive"],
    relationship: "You love passionately and directly — you need a partner who matches your fire without trying to dim it.",
    career: "You're built to lead, initiate, and break new ground. Roles with autonomy and challenge fuel you.",
    emotional: "You process feelings through action. When low, movement and honest conversation restore you.",
    archetype: "The Pioneer",
  },
  Taurus: {
    element: "Earth",
    modality: "Fixed",
    keywords: ["stability", "loyalty", "comfort", "sensuality"],
    strengths: ["Unwavering loyalty", "Grounded wisdom", "Creating beauty and security"],
    challenges: ["Resistance to change", "Stubbornness", "Holding on too long"],
    relationship: "You build love slowly and deeply — consistency and physical affection are your love language.",
    career: "You thrive where patience, craftsmanship, and long-term value are rewarded.",
    emotional: "You need safety before vulnerability. Nature, music, and comfort rituals heal you.",
    archetype: "The Builder",
  },
  Gemini: {
    element: "Air",
    modality: "Mutable",
    keywords: ["curiosity", "communication", "duality", "adaptability"],
    strengths: ["Quick wit", "Versatile mind", "Connecting disparate ideas"],
    challenges: ["Scattered focus", "Surface-level engagement", "Restlessness"],
    relationship: "You need intellectual chemistry — a partner who stimulates your mind keeps your heart engaged.",
    career: "Writing, teaching, media, and any role involving ideas and connection suit your mercurial gifts.",
    emotional: "You process through talking. Journaling and honest dialogue untangle your inner complexity.",
    archetype: "The Messenger",
  },
  Cancer: {
    element: "Water",
    modality: "Cardinal",
    keywords: ["emotions", "family", "intuition", "nurturing"],
    strengths: ["Deep empathy", "Protective devotion", "Emotional intelligence"],
    challenges: ["Mood swings", "Taking things personally", "Retreating into shell"],
    relationship: "You love with your whole soul — home, family, and emotional safety are non-negotiable.",
    career: "Caregiving, creative work, and roles where emotional intelligence matters let you shine.",
    emotional: "Your feelings run like tides. Honor your need for solitude when overwhelmed.",
    archetype: "The Nurturer",
  },
  Leo: {
    element: "Fire",
    modality: "Fixed",
    keywords: ["creativity", "confidence", "recognition", "generosity"],
    strengths: ["Magnetic presence", "Creative fire", "Loyal heart"],
    challenges: ["Need for validation", "Pride", "Performing instead of being"],
    relationship: "You love grandly and generously — you need admiration and genuine appreciation in return.",
    career: "Performance, leadership, creative industries, and any stage — literal or metaphorical — calls you.",
    emotional: "When hurt, you may mask pain with bravado. Allowing vulnerability is your growth edge.",
    archetype: "The Sovereign",
  },
  Virgo: {
    element: "Earth",
    modality: "Mutable",
    keywords: ["perfectionism", "analysis", "service", "precision"],
    strengths: ["Keen discernment", "Devoted service", "Practical wisdom"],
    challenges: ["Self-criticism", "Overthinking", "Difficulty accepting imperfection"],
    relationship: "You show love through acts of service — you need a partner who appreciates your quiet devotion.",
    career: "Analysis, health, editing, and any detail-oriented work aligns with your meticulous nature.",
    emotional: "You analyze feelings before feeling them. Body-based practices help you reconnect.",
    archetype: "The Alchemist",
  },
  Libra: {
    element: "Air",
    modality: "Cardinal",
    keywords: ["harmony", "relationships", "balance", "beauty"],
    strengths: ["Diplomatic grace", "Aesthetic sensibility", "Fair-mindedness"],
    challenges: ["Indecision", "People-pleasing", "Avoiding conflict"],
    relationship: "Partnership is central to your identity — you flourish with a true equal beside you.",
    career: "Law, design, mediation, and roles requiring social intelligence suit your balanced nature.",
    emotional: "Discord unsettles you deeply. Creating beauty in your environment restores inner peace.",
    archetype: "The Harmonizer",
  },
  Scorpio: {
    element: "Water",
    modality: "Fixed",
    keywords: ["transformation", "depth", "intensity", "mystery"],
    strengths: ["Emotional depth", "Resilience through crisis", "Penetrating insight"],
    challenges: ["Jealousy", "Control tendencies", "Difficulty trusting"],
    relationship: "You crave soul-level intimacy — surface connections leave you starving for truth.",
    career: "Psychology, research, healing arts, and transformative work align with your regenerative power.",
    emotional: "You feel everything at maximum volume. Transformation is your superpower, not your curse.",
    archetype: "The Phoenix",
  },
  Sagittarius: {
    element: "Fire",
    modality: "Mutable",
    keywords: ["freedom", "exploration", "philosophy", "optimism"],
    strengths: ["Expansive vision", "Philosophical mind", "Infectious optimism"],
    challenges: ["Restlessness", "Bluntness", "Commitment avoidance"],
    relationship: "You need a partner who is also a fellow adventurer — freedom within love is essential.",
    career: "Travel, education, publishing, and anything that expands horizons feeds your spirit.",
    emotional: "You escape heaviness through meaning-making. Philosophy and adventure are your medicine.",
    archetype: "The Explorer",
  },
  Capricorn: {
    element: "Earth",
    modality: "Cardinal",
    keywords: ["ambition", "discipline", "responsibility", "structure"],
    strengths: ["Strategic thinking", "Unshakeable discipline", "Long-term vision"],
    challenges: ["Workaholism", "Emotional suppression", "Harsh self-judgment"],
    relationship: "You love through commitment and reliability — you build partnerships like monuments.",
    career: "Leadership, business, and any path requiring patience and mastery suits your mountain-climbing soul.",
    emotional: "You carry weight quietly. Permission to rest and be imperfect is your healing.",
    archetype: "The Architect",
  },
  Aquarius: {
    element: "Air",
    modality: "Fixed",
    keywords: ["innovation", "individuality", "vision", "humanity"],
    strengths: ["Original thinking", "Humanitarian vision", "Intellectual independence"],
    challenges: ["Emotional detachment", "Rebellion for its own sake", "Feeling misunderstood"],
    relationship: "You need friendship at the core of romance — a partner who respects your uniqueness.",
    career: "Technology, activism, innovation, and future-oriented work align with your visionary mind.",
    emotional: "You process feelings intellectually first. Community and purpose ground you.",
    archetype: "The Visionary",
  },
  Pisces: {
    element: "Water",
    modality: "Mutable",
    keywords: ["intuition", "imagination", "empathy", "spirituality"],
    strengths: ["Boundless compassion", "Creative imagination", "Psychic sensitivity"],
    challenges: ["Escapism", "Boundary issues", "Absorbing others' pain"],
    relationship: "You love with transcendent depth — you merge souls, sometimes losing yourself in the process.",
    career: "Arts, healing, spirituality, and creative expression channel your oceanic sensitivity.",
    emotional: "You feel the world's pain. Solitude, water, and creative expression are your sanctuaries.",
    archetype: "The Mystic",
  },
};

export const ZODIAC_SIGNS_ORDER = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces",
] as const;

export function getZodiacInsight(sign: string, topic?: string): string {
  const traits = ZODIAC_TRAITS[sign];
  if (!traits) return "";

  if (topic === "relationship") return traits.relationship;
  if (topic === "career") return traits.career;
  if (topic === "emotional") return traits.emotional;
  return `${traits.archetype} energy — ${traits.keywords.join(", ")}. ${traits.strengths[0]} defines you; watch for ${traits.challenges[0].toLowerCase()}.`;
}

export function getCompatibility(sign1: string, sign2: string): {
  score: number;
  summary: string;
  strengths: string[];
  challenges: string[];
} {
  const elements: Record<string, string> = {
    Aries: "Fire", Leo: "Fire", Sagittarius: "Fire",
    Taurus: "Earth", Virgo: "Earth", Capricorn: "Earth",
    Gemini: "Air", Libra: "Air", Aquarius: "Air",
    Cancer: "Water", Scorpio: "Water", Pisces: "Water",
  };

  const e1 = elements[sign1];
  const e2 = elements[sign2];

  let score = 50;
  const strengths: string[] = [];
  const challenges: string[] = [];

  if (e1 === e2) {
    score += 25;
    strengths.push("Shared elemental language creates natural understanding");
  } else if (
    (e1 === "Fire" && e2 === "Air") || (e1 === "Air" && e2 === "Fire") ||
    (e1 === "Earth" && e2 === "Water") || (e1 === "Water" && e2 === "Earth")
  ) {
    score += 20;
    strengths.push("Complementary elements that fuel each other's growth");
  } else {
    score -= 5;
    challenges.push("Different elemental needs require conscious bridging");
  }

  if (sign1 === sign2) {
    score += 10;
    strengths.push("Mirror souls who deeply recognize each other");
    challenges.push("Similar blind spots may go unchallenged");
  }

  const t1 = ZODIAC_TRAITS[sign1];
  const t2 = ZODIAC_TRAITS[sign2];
  if (t1 && t2) {
    strengths.push(`${t1.archetype} meets ${t2.archetype} — a dynamic of ${t1.element} and ${t2.element}`);
  }

  score = Math.min(98, Math.max(35, score + Math.floor(Math.random() * 15)));

  return {
    score,
    summary: score >= 75
      ? `A powerful astrological connection between ${sign1} and ${sign2} — the stars suggest deep resonance with room for growth.`
      : score >= 55
        ? `${sign1} and ${sign2} share meaningful chemistry with complementary differences that can deepen over time.`
        : `${sign1} and ${sign2} offer a lesson in contrast — understanding each other's rhythms is the key.`,
    strengths,
    challenges,
  };
}
