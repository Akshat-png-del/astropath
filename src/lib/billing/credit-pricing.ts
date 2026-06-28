/** Per-spread credit costs and catalog metadata helpers */

import { CREDIT_COSTS } from "./credits-constants";

/** Transparent feature costs (display + billing reference) */
export const FEATURE_CREDIT_COSTS = {
  dailyHoroscope: 0,
  chatMessage: CREDIT_COSTS.chatMessage,
  singleCardTarot: 1,
  threeCardSpread: 2,
  loveReading: 3,
  careerReading: 3,
  celticCross: 5,
  birthChartAnalysis: CREDIT_COSTS.detailedReport,
  compatibilityReading: 4,
  monthlyForecast: CREDIT_COSTS.monthlyForecast,
} as const;

/** Base credit cost per tarot spread id */
export const SPREAD_CREDIT_COSTS: Record<string, number> = {
  daily: FEATURE_CREDIT_COSTS.dailyHoroscope,
  "yes-no": FEATURE_CREDIT_COSTS.singleCardTarot,
  oracle: FEATURE_CREDIT_COSTS.threeCardSpread,
  angel: FEATURE_CREDIT_COSTS.threeCardSpread,
  osho: FEATURE_CREDIT_COSTS.threeCardSpread,
  love: FEATURE_CREDIT_COSTS.loveReading,
  psychic: FEATURE_CREDIT_COSTS.careerReading,
  chinese: FEATURE_CREDIT_COSTS.careerReading,
  egyptian: FEATURE_CREDIT_COSTS.careerReading,
  "32-cards": FEATURE_CREDIT_COSTS.careerReading,
  free: 4,
  "celtic-cross": FEATURE_CREDIT_COSTS.celticCross,
};

export function getSpreadBaseCost(spreadId: string): number {
  return SPREAD_CREDIT_COSTS[spreadId] ?? CREDIT_COSTS.tarotReading;
}

export function formatCreditCost(cost: number): string {
  if (cost === 0) return "Free";
  return `${cost} credit${cost === 1 ? "" : "s"}`;
}

export const CREDIT_COST_GUIDE = [
  { label: "Daily horoscope", cost: FEATURE_CREDIT_COSTS.dailyHoroscope },
  { label: "Single card tarot", cost: FEATURE_CREDIT_COSTS.singleCardTarot },
  { label: "Three card spread", cost: FEATURE_CREDIT_COSTS.threeCardSpread },
  { label: "Love reading", cost: FEATURE_CREDIT_COSTS.loveReading },
  { label: "Career / purpose reading", cost: FEATURE_CREDIT_COSTS.careerReading },
  { label: "Celtic cross", cost: FEATURE_CREDIT_COSTS.celticCross },
  { label: "Birth chart analysis", cost: FEATURE_CREDIT_COSTS.birthChartAnalysis },
  { label: "Monthly forecast", cost: FEATURE_CREDIT_COSTS.monthlyForecast },
] as const;
