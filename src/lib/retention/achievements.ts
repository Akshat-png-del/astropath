import type { AchievementDef } from "./types";
import { ACHIEVEMENT_SYMBOL } from "@/lib/symbols";

export const ACHIEVEMENTS: AchievementDef[] = [
  {
    id: "first-reading",
    title: "First Reading",
    description: "Complete your first tarot session",
    icon: ACHIEVEMENT_SYMBOL.firstReading,
  },
  {
    id: "first-birth-chart",
    title: "First Birth Chart",
    description: "Generate your birth chart report",
    icon: ACHIEVEMENT_SYMBOL.birthChart,
  },
  {
    id: "first-tarot-spread",
    title: "First Tarot Spread",
    description: "Complete a tarot reading",
    icon: ACHIEVEMENT_SYMBOL.tarotSpread,
  },
  {
    id: "streak-7",
    title: "7-Day Streak",
    description: "Return for seven consecutive days",
    icon: ACHIEVEMENT_SYMBOL.streak7,
  },
  {
    id: "read-10-guides",
    title: "Curious Mind",
    description: "Read 10 educational guides",
    icon: ACHIEVEMENT_SYMBOL.readGuides,
  },
  {
    id: "zodiac-explorer",
    title: "Zodiac Explorer",
    description: "Explore all twelve zodiac sign pages",
    icon: ACHIEVEMENT_SYMBOL.zodiacExplorer,
  },
  {
    id: "streak-30",
    title: "Cosmic Devotee",
    description: "Maintain a 30-day streak",
    icon: ACHIEVEMENT_SYMBOL.streak30,
  },
  {
    id: "saved-first",
    title: "Keeper of Insights",
    description: "Save your first reading",
    icon: ACHIEVEMENT_SYMBOL.savedFirst,
  },
];

export function getAchievement(id: string): AchievementDef | undefined {
  return ACHIEVEMENTS.find((a) => a.id === id);
}
