import type { StreakTier } from "./types";

export const STREAK_TIERS: StreakTier[] = [
  { minDays: 100, title: "Astrology Master" },
  { minDays: 30, title: "Cosmic Sage" },
  { minDays: 7, title: "Celestial Seeker" },
  { minDays: 3, title: "Cosmic Explorer" },
  { minDays: 1, title: "Beginning the Journey" },
];

export function streakTitle(days: number): string {
  for (const tier of STREAK_TIERS) {
    if (days >= tier.minDays) return tier.title;
  }
  return "Start your journey";
}

export function nextStreakMilestone(days: number): { days: number; title: string } | null {
  const sorted = [...STREAK_TIERS].sort((a, b) => a.minDays - b.minDays);
  for (const tier of sorted) {
    if (days < tier.minDays) return { days: tier.minDays, title: tier.title };
  }
  return null;
}
