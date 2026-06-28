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

/** Indices still available to draw from the shuffled deck. */
export function getAvailableDeckIndices(
  deckSize: number,
  drawnIndices: number[]
): number[] {
  const drawn = new Set(drawnIndices);
  return Array.from({ length: deckSize }, (_, i) => i).filter((i) => !drawn.has(i));
}

/** Append one deck index in draw order; ignores duplicates and overflow. */
export function drawDeckIndex(
  drawnIndices: number[],
  index: number,
  maxCards: number,
  deckSize: number
): number[] {
  if (index < 0 || index >= deckSize) return drawnIndices;
  if (drawnIndices.includes(index)) return drawnIndices;
  if (drawnIndices.length >= maxCards) return drawnIndices;
  return [...drawnIndices, index];
}

/** Remove the most recently drawn card (undo). */
export function undoLastDraw(drawnIndices: number[]): number[] {
  if (drawnIndices.length === 0) return drawnIndices;
  return drawnIndices.slice(0, -1);
}

export function isDrawComplete(drawnIndices: number[], expectedCount: number): boolean {
  if (drawnIndices.length !== expectedCount) return false;
  return new Set(drawnIndices).size === drawnIndices.length;
}
