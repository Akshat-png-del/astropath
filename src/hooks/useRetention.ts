import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import type { FavoriteItem, FavoriteType, HistoryEntry, RetentionStore, SavedReading } from "@/lib/retention/types";
import {
  addFavorite,
  addHistoryEntry,
  getStore,
  isFavorite,
  recordDailyVisit,
  recordGuideRead,
  recordHoroscopeView,
  recordTarotActivity,
  recordZodiacPageVisit,
  removeFavorite,
  removeSavedReading,
  saveReading,
  filterHistory,
} from "@/lib/retention/service";
import { getRecommendations } from "@/lib/retention/recommendations";
import { scheduleDailyNotifications } from "@/lib/retention/notifications";
import { getRetentionUserId } from "@/lib/retention/storage";

export function useRetention(sunSign?: string) {
  const { user } = useAuth();
  const userId = user?.uid ?? null;
  const [store, setStore] = useState<RetentionStore>(() => getStore(userId));

  const refresh = useCallback(() => {
    setStore(getStore(userId));
  }, [userId]);

  useEffect(() => {
    setStore(getStore(userId));
  }, [userId]);

  useEffect(() => {
    setStore(recordDailyVisit(userId));
    scheduleDailyNotifications(userId);
  }, [userId]);

  const recommendations = useMemo(
    () => getRecommendations(userId, sunSign, 6),
    [userId, sunSign, store.topicAffinities, store.guidesRead]
  );

  const logHistory = useCallback(
    (entry: Omit<HistoryEntry, "id" | "createdAt">) => {
      const item = addHistoryEntry(userId, entry);
      refresh();
      return item;
    },
    [userId, refresh]
  );

  const saveReadingFn = useCallback(
    (reading: Omit<SavedReading, "id" | "createdAt">) => {
      const item = saveReading(userId, reading);
      refresh();
      return item;
    },
    [userId, refresh]
  );

  const removeSaved = useCallback(
    (id: string) => {
      removeSavedReading(userId, id);
      refresh();
    },
    [userId, refresh]
  );

  const toggleFavorite = useCallback(
    (item: Omit<FavoriteItem, "id" | "createdAt">) => {
      const current = getStore(userId);
      if (isFavorite(userId, item.href)) {
        const fav = current.favorites.find((f) => f.href === item.href);
        if (fav) removeFavorite(userId, fav.id);
      } else {
        addFavorite(userId, item);
      }
      refresh();
    },
    [userId, refresh]
  );

  const isFavorited = useCallback((href: string) => isFavorite(userId, href), [userId]);

  const recordTarot = useCallback(() => {
    setStore(recordTarotActivity(userId));
  }, [userId]);

  const recordHoroscope = useCallback(() => {
    setStore((prev) => {
      const today = new Date().toISOString().slice(0, 10);
      if (prev.activityLog.some((d) => d.date === today && d.horoscope)) return prev;
      return recordHoroscopeView(userId);
    });
  }, [userId]);

  const recordGuide = useCallback(
    (slug: string, topics: string[] = []) => {
      setStore((prev) => {
        if (prev.guidesRead.includes(slug)) return prev;
        return recordGuideRead(userId, slug, topics);
      });
    },
    [userId]
  );

  const recordZodiacVisit = useCallback(
    (slug: string) => {
      setStore((prev) => {
        if (prev.zodiacPagesVisited.includes(slug)) return prev;
        return recordZodiacPageVisit(userId, slug);
      });
    },
    [userId]
  );

  const filterHistoryFn = useCallback(
    (opts: Parameters<typeof filterHistory>[1]) => filterHistory(store.history, opts),
    [store.history]
  );

  return {
    store,
    refresh,
    userKey: getRetentionUserId(userId),
    streak: store.streak,
    achievements: store.unlockedAchievements,
    favorites: store.favorites,
    savedReadings: store.savedReadings,
    history: store.history,
    notificationPrefs: store.notificationPrefs,
    recommendations,
    logHistory,
    saveReading: saveReadingFn,
    removeSaved,
    toggleFavorite,
    isFavorited,
    recordTarot,
    recordHoroscope,
    recordGuide,
    recordZodiacVisit,
    filterHistory: filterHistoryFn,
  };
}

export type { FavoriteType, SavedReading, HistoryEntry, FavoriteItem };
