import { MAJOR_ARCANA } from "./major-arcana";
import type { MajorArcanaCard } from "./types";

export interface ShuffledDeck {
  cards: MajorArcanaCard[];
  reversed: boolean[];
  seed: number;
}

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function createShuffledDeck(userSeed?: number): ShuffledDeck {
  const seed = userSeed ?? Date.now();
  const rand = mulberry32(seed);
  const cards = [...MAJOR_ARCANA];
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  const reversed = cards.map(() => rand() < 0.25);
  return { cards, reversed, seed };
}

export function reshuffleDeck(prev: ShuffledDeck): ShuffledDeck {
  return createShuffledDeck(prev.seed + Math.floor(Math.random() * 10000) + 1);
}

export function pickCardsFromIndices(
  deck: ShuffledDeck,
  indices: number[]
): { card: MajorArcanaCard; reversed: boolean }[] {
  return indices.map((i) => ({
    card: deck.cards[i],
    reversed: deck.reversed[i],
  }));
}
