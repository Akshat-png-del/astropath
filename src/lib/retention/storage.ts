import type { RetentionStore, StreakState, NotificationPrefs } from "./types";

export const RETENTION_VERSION = 1;
const DEVICE_ID_KEY = "astro_device_id";

export function getRetentionUserId(firebaseUid?: string | null): string {
  if (firebaseUid) return firebaseUid;
  if (typeof window === "undefined") return "anonymous";
  let id = localStorage.getItem(DEVICE_ID_KEY);
  if (!id) {
    id = `anon_${crypto.randomUUID()}`;
    localStorage.setItem(DEVICE_ID_KEY, id);
  }
  return id;
}

function storageKey(userId: string): string {
  return `astro_retention_${userId}`;
}

export function defaultStreak(): StreakState {
  return {
    currentStreak: 0,
    longestStreak: 0,
    lastActiveDate: null,
    totalVisits: 0,
    tarotDays: 0,
    horoscopeViews: 0,
  };
}

export function defaultNotificationPrefs(): NotificationPrefs {
  return {
    enabled: false,
    dailyHoroscope: true,
    freeTarot: true,
    streakReminder: true,
    reminderHour: 9,
  };
}

export function defaultStore(): RetentionStore {
  return {
    streak: defaultStreak(),
    activityLog: [],
    unlockedAchievements: [],
    favorites: [],
    savedReadings: [],
    history: [],
    notificationPrefs: defaultNotificationPrefs(),
    topicAffinities: {},
    guidesRead: [],
    zodiacPagesVisited: [],
    version: RETENTION_VERSION,
  };
}

export function loadStore(userId: string): RetentionStore {
  if (typeof window === "undefined") return defaultStore();
  try {
    const raw = localStorage.getItem(storageKey(userId));
    if (!raw) return defaultStore();
    const parsed = JSON.parse(raw) as RetentionStore;
    return { ...defaultStore(), ...parsed, streak: { ...defaultStreak(), ...parsed.streak } };
  } catch {
    return defaultStore();
  }
}

export function saveStore(userId: string, store: RetentionStore): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(storageKey(userId), JSON.stringify(store));
}

export function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

export function yesterdayKey(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}
