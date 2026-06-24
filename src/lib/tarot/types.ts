export interface MajorArcanaCard {
  id: number;
  name: string;
  roman: string;
  keyword: string;
  general: string;
  love: string;
  career: string;
  yesNo: "yes" | "no" | "maybe";
}

export interface TarotSpread {
  id: string;
  name: string;
  description: string;
  cardCount: number;
  positions: string[];
  available: boolean;
  category: "tarot" | "oracle" | "daily";
}

export interface DrawnCard {
  card: MajorArcanaCard;
  position: string;
  reversed: boolean;
}

export interface TarotReadingResult {
  spread: TarotSpread;
  question: string;
  cards: DrawnCard[];
  summary: string;
  positionReadings: { position: string; text: string }[];
}

export type TarotStep = "intro" | "spreads" | "question" | "shuffle" | "pick" | "reading";
