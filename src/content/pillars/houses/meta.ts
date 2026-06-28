export interface HouseMeta {
  slug: string;
  number: number;
  name: string;
  alias: string;
  naturalSign: string;
  naturalRuler: string;
  lifeArea: string;
  keywords: string[];
}

export const HOUSE_SLUGS = [
  "first-house",
  "second-house",
  "third-house",
  "fourth-house",
  "fifth-house",
  "sixth-house",
  "seventh-house",
  "eighth-house",
  "ninth-house",
  "tenth-house",
  "eleventh-house",
  "twelfth-house",
] as const;

export type HouseSlug = (typeof HOUSE_SLUGS)[number];

export const HOUSE_META: Record<HouseSlug, HouseMeta> = {
  "first-house": {
    slug: "first-house",
    number: 1,
    name: "First House",
    alias: "House of Self",
    naturalSign: "Aries",
    naturalRuler: "Mars",
    lifeArea: "Identity, body, first impressions, approach to life",
    keywords: ["self", "appearance", "vitality", "beginnings", "persona"],
  },
  "second-house": {
    slug: "second-house",
    number: 2,
    name: "Second House",
    alias: "House of Value",
    naturalSign: "Taurus",
    naturalRuler: "Venus",
    lifeArea: "Money, possessions, self-worth, resources",
    keywords: ["income", "security", "talents", "values", "material comfort"],
  },
  "third-house": {
    slug: "third-house",
    number: 3,
    name: "Third House",
    alias: "House of Communication",
    naturalSign: "Gemini",
    naturalRuler: "Mercury",
    lifeArea: "Learning, siblings, local travel, daily communication",
    keywords: ["mind", "writing", "neighbors", "short trips", "curiosity"],
  },
  "fourth-house": {
    slug: "fourth-house",
    number: 4,
    name: "Fourth House",
    alias: "House of Home",
    naturalSign: "Cancer",
    naturalRuler: "Moon",
    lifeArea: "Family, roots, private life, emotional foundation",
    keywords: ["home", "parents", "ancestry", "inner security", "retreat"],
  },
  "fifth-house": {
    slug: "fifth-house",
    number: 5,
    name: "Fifth House",
    alias: "House of Pleasure",
    naturalSign: "Leo",
    naturalRuler: "Sun",
    lifeArea: "Creativity, romance, children, play, self-expression",
    keywords: ["joy", "art", "dating", "risk", "performance"],
  },
  "sixth-house": {
    slug: "sixth-house",
    number: 6,
    name: "Sixth House",
    alias: "House of Service",
    naturalSign: "Virgo",
    naturalRuler: "Mercury",
    lifeArea: "Work routines, health, habits, daily duty",
    keywords: ["wellness", "craft", "pets", "organization", "improvement"],
  },
  "seventh-house": {
    slug: "seventh-house",
    number: 7,
    name: "Seventh House",
    alias: "House of Partnership",
    naturalSign: "Libra",
    naturalRuler: "Venus",
    lifeArea: "Marriage, contracts, open enemies, one-to-one bonds",
    keywords: ["relationships", "commitment", "balance", "mirrors", "negotiation"],
  },
  "eighth-house": {
    slug: "eighth-house",
    number: 8,
    name: "Eighth House",
    alias: "House of Transformation",
    naturalSign: "Scorpio",
    naturalRuler: "Pluto",
    lifeArea: "Shared resources, intimacy, death, rebirth, psychology",
    keywords: ["merging", "inheritance", "taboo", "crisis", "depth"],
  },
  "ninth-house": {
    slug: "ninth-house",
    number: 9,
    name: "Ninth House",
    alias: "House of Philosophy",
    naturalSign: "Sagittarius",
    naturalRuler: "Jupiter",
    lifeArea: "Higher education, travel, belief, publishing, meaning",
    keywords: ["faith", "adventure", "law", "teaching", "expansion"],
  },
  "tenth-house": {
    slug: "tenth-house",
    number: 10,
    name: "Tenth House",
    alias: "House of Career",
    naturalSign: "Capricorn",
    naturalRuler: "Saturn",
    lifeArea: "Public reputation, ambition, authority, legacy",
    keywords: ["career", "status", "achievement", "parents", "calling"],
  },
  "eleventh-house": {
    slug: "eleventh-house",
    number: 11,
    name: "Eleventh House",
    alias: "House of Community",
    naturalSign: "Aquarius",
    naturalRuler: "Uranus",
    lifeArea: "Friends, groups, hopes, social causes, future vision",
    keywords: ["networks", "ideals", "technology", "collective", "belonging"],
  },
  "twelfth-house": {
    slug: "twelfth-house",
    number: 12,
    name: "Twelfth House",
    alias: "House of the Unconscious",
    naturalSign: "Pisces",
    naturalRuler: "Neptune",
    lifeArea: "Spirituality, solitude, hidden matters, endings, compassion",
    keywords: ["dreams", "retreat", "karma", "healing", "transcendence"],
  },
};
