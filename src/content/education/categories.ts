import type { EducationCategoryId } from "./types";
import { CATEGORY_SYMBOL } from "@/lib/symbols";

export interface EducationCategory {
  id: EducationCategoryId;
  name: string;
  slug: EducationCategoryId;
  description: string;
  icon: string;
}

export const EDUCATION_CATEGORIES: EducationCategory[] = [
  {
    id: "astrology-basics",
    name: "Astrology Basics",
    slug: "astrology-basics",
    description: "Foundations of astrology — what it is, how it works, and how to read it responsibly.",
    icon: CATEGORY_SYMBOL["astrology-basics"],
  },
  {
    id: "zodiac-signs",
    name: "Zodiac Signs",
    slug: "zodiac-signs",
    description: "The twelve signs, elements, modalities, and what sun, moon, and rising really mean.",
    icon: CATEGORY_SYMBOL["zodiac-signs"],
  },
  {
    id: "birth-charts",
    name: "Birth Charts",
    slug: "birth-charts",
    description: "Natal charts, birth time, and step-by-step chart reading for beginners.",
    icon: CATEGORY_SYMBOL["birth-charts"],
  },
  {
    id: "planets",
    name: "Planets",
    slug: "planets",
    description: "Personal and outer planets, transits, and how planetary cycles shape experience.",
    icon: CATEGORY_SYMBOL.planets,
  },
  {
    id: "houses",
    name: "Houses",
    slug: "houses",
    description: "The twelve houses of life — relationships, career, home, and where themes unfold.",
    icon: CATEGORY_SYMBOL.houses,
  },
  {
    id: "aspects",
    name: "Aspects",
    slug: "aspects",
    description: "Conjunctions, squares, trines, and the geometry that connects chart factors.",
    icon: CATEGORY_SYMBOL.aspects,
  },
  {
    id: "tarot",
    name: "Tarot",
    slug: "tarot",
    description: "Spreads, symbolism, and ethical tarot practice for reflection and insight.",
    icon: CATEGORY_SYMBOL.tarot,
  },
  {
    id: "compatibility",
    name: "Compatibility",
    slug: "compatibility",
    description: "Synastry, composite charts, and relationship astrology beyond sun-sign memes.",
    icon: CATEGORY_SYMBOL.compatibility,
  },
];

export function getCategoryById(id: EducationCategoryId): EducationCategory | undefined {
  return EDUCATION_CATEGORIES.find((c) => c.id === id);
}

export function getCategoryBySlug(slug: string): EducationCategory | undefined {
  return EDUCATION_CATEGORIES.find((c) => c.slug === slug);
}
