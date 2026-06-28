import type {
  FavoriteItem,
  FavoriteType,
  HistoryEntry,
  ReadingType,
  RetentionStore,
  SavedReading,
} from "./types";
import {
  defaultStore,
  getRetentionUserId,
  loadStore,
  saveStore,
  todayKey,
  yesterdayKey,
} from "./storage";
import { trackEvent } from "./analytics";

function uid(): string {
  return crypto.randomUUID();
}

export function getStore(userId?: string | null): RetentionStore {
  return loadStore(getRetentionUserId(userId));
}

export function persistStore(userId: string | null | undefined, store: RetentionStore): void {
  saveStore(getRetentionUserId(userId), store);
}

function updateActivity(
  store: RetentionStore,
  patch: Partial<{ visited: boolean; tarot: boolean; horoscope: boolean }>
): RetentionStore {
  const today = todayKey();
  const log = [...store.activityLog];
  let day = log.find((d) => d.date === today);
  if (!day) {
    day = { date: today, visited: false, tarot: false, horoscope: false };
    log.unshift(day);
  }
  if (patch.visited) day.visited = true;
  if (patch.tarot) day.tarot = true;
  if (patch.horoscope) day.horoscope = true;
  return { ...store, activityLog: log.slice(0, 90) };
}

function computeStreak(store: RetentionStore): RetentionStore {
  const today = todayKey();
  const yesterday = yesterdayKey();
  const { lastActiveDate, currentStreak } = store.streak;

  if (lastActiveDate === today) return store;

  let newStreak = 1;
  if (lastActiveDate === yesterday) {
    newStreak = currentStreak + 1;
  } else if (lastActiveDate === today) {
    newStreak = currentStreak;
  }

  const streak = {
    ...store.streak,
    currentStreak: newStreak,
    longestStreak: Math.max(store.streak.longestStreak, newStreak),
    lastActiveDate: today,
    totalVisits: store.streak.totalVisits + 1,
  };

  return { ...store, streak };
}

function checkAchievements(store: RetentionStore): string[] {
  const unlocked = new Set(store.unlockedAchievements);
  const newly: string[] = [];

  const unlock = (id: string) => {
    if (!unlocked.has(id)) {
      unlocked.add(id);
      newly.push(id);
      trackEvent("achievement_unlocked", { achievementId: id });
    }
  };

  if (store.history.length >= 1) unlock("first-reading");
  if (store.history.some((h) => h.type === "birth-chart")) unlock("first-birth-chart");
  if (store.history.some((h) => h.type === "tarot")) unlock("first-tarot-spread");
  if (store.streak.currentStreak >= 7) unlock("streak-7");
  if (store.streak.currentStreak >= 30) unlock("streak-30");
  if (store.guidesRead.length >= 10) unlock("read-10-guides");
  if (store.zodiacPagesVisited.length >= 12) unlock("zodiac-explorer");
  if (store.savedReadings.length >= 1) unlock("saved-first");

  return newly;
}

export function recordDailyVisit(userId?: string | null): RetentionStore {
  let store = getStore(userId);
  store = updateActivity(store, { visited: true });
  store = computeStreak(store);
  const before = store.unlockedAchievements.length;
  store = { ...store, unlockedAchievements: [...new Set([...store.unlockedAchievements, ...checkAchievements(store)])] };
  if (store.unlockedAchievements.length > before) {
    trackEvent("streak_milestone", { streak: store.streak.currentStreak });
  }
  trackEvent("daily_visit", { streak: store.streak.currentStreak });
  persistStore(userId, store);
  return store;
}

export function recordTarotActivity(userId?: string | null): RetentionStore {
  let store = getStore(userId);
  store = updateActivity(store, { visited: true, tarot: true });
  store = computeStreak(store);
  store.streak = { ...store.streak, tarotDays: store.streak.tarotDays + 1 };
  store = { ...store, topicAffinities: bumpTopic(store.topicAffinities, "tarot") };
  store = { ...store, unlockedAchievements: [...new Set([...store.unlockedAchievements, ...checkAchievements(store)])] };
  trackEvent("tarot_reading");
  persistStore(userId, store);
  return store;
}

export function recordHoroscopeView(userId?: string | null): RetentionStore {
  const store = getStore(userId);
  const today = todayKey();
  const day = store.activityLog.find((d) => d.date === today);
  if (day?.horoscope) return store;

  let updated = updateActivity(store, { visited: true, horoscope: true });
  updated = computeStreak(updated);
  updated = {
    ...updated,
    streak: { ...updated.streak, horoscopeViews: updated.streak.horoscopeViews + 1 },
    topicAffinities: bumpTopic(updated.topicAffinities, "horoscope"),
  };
  persistStore(userId, updated);
  trackEvent("horoscope_view");
  return updated;
}

export function recordGuideRead(userId: string | null | undefined, slug: string, topics: string[] = []): RetentionStore {
  const store = getStore(userId);
  if (store.guidesRead.includes(slug)) return store;

  let updated: RetentionStore = {
    ...store,
    guidesRead: [...store.guidesRead, slug],
  };
  for (const t of topics) {
    updated = { ...updated, topicAffinities: bumpTopic(updated.topicAffinities, t) };
  }
  updated = {
    ...updated,
    unlockedAchievements: [...new Set([...updated.unlockedAchievements, ...checkAchievements(updated)])],
  };
  trackEvent("guide_read", { slug });
  persistStore(userId, updated);
  return updated;
}

export function recordZodiacPageVisit(userId: string | null | undefined, slug: string): RetentionStore {
  const store = getStore(userId);
  if (store.zodiacPagesVisited.includes(slug)) return store;

  let updated: RetentionStore = {
    ...store,
    zodiacPagesVisited: [...store.zodiacPagesVisited, slug],
    topicAffinities: bumpTopic(store.topicAffinities, "zodiac"),
  };
  updated = {
    ...updated,
    unlockedAchievements: [...new Set([...updated.unlockedAchievements, ...checkAchievements(updated)])],
  };
  persistStore(userId, updated);
  return updated;
}

function bumpTopic(affinities: Record<string, number>, topic: string): Record<string, number> {
  return { ...affinities, [topic]: (affinities[topic] ?? 0) + 1 };
}

export function addHistoryEntry(
  userId: string | null | undefined,
  entry: Omit<HistoryEntry, "id" | "createdAt">
): HistoryEntry {
  const store = getStore(userId);
  const item: HistoryEntry = {
    ...entry,
    id: uid(),
    createdAt: new Date().toISOString(),
  };
  const history = [item, ...store.history].slice(0, 100);
  persistStore(userId, { ...store, history });
  return item;
}

export function saveReading(
  userId: string | null | undefined,
  reading: Omit<SavedReading, "id" | "createdAt">
): SavedReading {
  const store = getStore(userId);
  const item: SavedReading = {
    ...reading,
    id: uid(),
    createdAt: new Date().toISOString(),
  };
  const savedReadings = [item, ...store.savedReadings.filter((s) => s.title !== reading.title)].slice(0, 50);
  const history = store.history.map((h) =>
    h.title === reading.title && h.type === reading.type ? { ...h, saved: true } : h
  );
  let updated = { ...store, savedReadings, history };
  updated = { ...updated, unlockedAchievements: [...new Set([...updated.unlockedAchievements, ...checkAchievements(updated)])] };
  persistStore(userId, updated);
  trackEvent("reading_saved", { type: reading.type });
  return item;
}

export function removeSavedReading(userId: string | null | undefined, id: string): void {
  const store = getStore(userId);
  persistStore(userId, {
    ...store,
    savedReadings: store.savedReadings.filter((s) => s.id !== id),
  });
}

export function addFavorite(
  userId: string | null | undefined,
  item: Omit<FavoriteItem, "id" | "createdAt">
): FavoriteItem {
  const store = getStore(userId);
  const existing = store.favorites.find((f) => f.href === item.href);
  if (existing) return existing;

  const fav: FavoriteItem = { ...item, id: uid(), createdAt: new Date().toISOString() };
  persistStore(userId, { ...store, favorites: [fav, ...store.favorites].slice(0, 100) });
  trackEvent("favorite_added", { type: item.type });
  return fav;
}

export function removeFavorite(userId: string | null | undefined, id: string): void {
  const store = getStore(userId);
  persistStore(userId, { ...store, favorites: store.favorites.filter((f) => f.id !== id) });
}

export function isFavorite(userId: string | null | undefined, href: string): boolean {
  return getStore(userId).favorites.some((f) => f.href === href);
}

export function updateNotificationPrefs(
  userId: string | null | undefined,
  prefs: Partial<RetentionStore["notificationPrefs"]>
): RetentionStore {
  const store = getStore(userId);
  const updated = {
    ...store,
    notificationPrefs: { ...store.notificationPrefs, ...prefs },
  };
  persistStore(userId, updated);
  return updated;
}

export function filterHistory(
  history: HistoryEntry[],
  opts: { query?: string; type?: ReadingType | "all"; sort?: "newest" | "oldest" }
): HistoryEntry[] {
  let list = [...history];
  if (opts.type && opts.type !== "all") {
    list = list.filter((h) => h.type === opts.type);
  }
  if (opts.query?.trim()) {
    const q = opts.query.toLowerCase();
    list = list.filter(
      (h) => h.title.toLowerCase().includes(q) || h.summary.toLowerCase().includes(q)
    );
  }
  list.sort((a, b) => {
    const ta = new Date(a.createdAt).getTime();
    const tb = new Date(b.createdAt).getTime();
    return opts.sort === "oldest" ? ta - tb : tb - ta;
  });
  return list;
}

export function resetRetentionStore(userId?: string | null): void {
  persistStore(userId, defaultStore());
}
