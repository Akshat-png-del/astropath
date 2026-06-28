/** Retention, personalization, and engagement types */

export type ReadingType = "tarot" | "birth-chart" | "compatibility" | "chat" | "horoscope";

export type FavoriteType = "guide" | "tarot-spread" | "zodiac" | "planet" | "house" | "tarot-card" | "reading";

export interface FavoriteItem {
  id: string;
  type: FavoriteType;
  title: string;
  href: string;
  meta?: string;
  createdAt: string;
}

export interface SavedReading {
  id: string;
  type: ReadingType;
  title: string;
  summary: string;
  createdAt: string;
  payload: Record<string, unknown>;
}

export interface HistoryEntry {
  id: string;
  type: ReadingType;
  title: string;
  summary: string;
  createdAt: string;
  payload?: Record<string, unknown>;
  saved?: boolean;
}

export interface StreakState {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string | null;
  totalVisits: number;
  tarotDays: number;
  horoscopeViews: number;
}

export interface ActivityDay {
  date: string;
  visited: boolean;
  tarot: boolean;
  horoscope: boolean;
}

export interface NotificationPrefs {
  enabled: boolean;
  dailyHoroscope: boolean;
  freeTarot: boolean;
  streakReminder: boolean;
  reminderHour: number;
}

export interface RetentionStore {
  streak: StreakState;
  activityLog: ActivityDay[];
  unlockedAchievements: string[];
  favorites: FavoriteItem[];
  savedReadings: SavedReading[];
  history: HistoryEntry[];
  notificationPrefs: NotificationPrefs;
  topicAffinities: Record<string, number>;
  guidesRead: string[];
  zodiacPagesVisited: string[];
  version: number;
}

export interface AchievementDef {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface StreakTier {
  minDays: number;
  title: string;
}

export interface ContentRecommendation {
  href: string;
  title: string;
  reason: string;
  hub: "learn" | "zodiac" | "planets" | "houses" | "tarot" | "tool";
}

export interface DailyLoopContent {
  horoscope: {
    guidance: string;
    focusArea: string;
    affirmation: string;
    mood: string;
  } | null;
  tarotCard: {
    name: string;
    keyword: string;
    message: string;
    href: string;
  };
  cosmicTip: string;
  recommendedArticle: ContentRecommendation;
}

export type AnalyticsEventName =
  | "page_view"
  | "daily_visit"
  | "tarot_reading"
  | "horoscope_view"
  | "guide_read"
  | "reading_saved"
  | "favorite_added"
  | "streak_milestone"
  | "achievement_unlocked";

export interface AnalyticsEvent {
  name: AnalyticsEventName;
  timestamp: string;
  properties?: Record<string, string | number | boolean>;
}
