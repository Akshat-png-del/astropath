import { getStore, updateNotificationPrefs } from "./service";
import type { NotificationPrefs } from "./types";

export function getNotificationPrefs(userId?: string | null): NotificationPrefs {
  return getStore(userId).notificationPrefs;
}

export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (typeof window === "undefined" || !("Notification" in window)) return "denied";
  if (Notification.permission === "granted") return "granted";
  if (Notification.permission === "denied") return "denied";
  return Notification.requestPermission();
}

export function scheduleDailyNotifications(userId: string | null | undefined): void {
  if (typeof window === "undefined") return;
  const prefs = getNotificationPrefs(userId);
  if (!prefs.enabled || Notification.permission !== "granted") return;

  const lastShown = localStorage.getItem("astro_notif_last");
  const today = new Date().toISOString().slice(0, 10);
  if (lastShown === today) return;

  const hour = new Date().getHours();
  if (hour < prefs.reminderHour) return;

  const messages: string[] = [];
  if (prefs.dailyHoroscope) messages.push("Your daily horoscope is ready on AstroPath.");
  if (prefs.freeTarot) messages.push("Your free daily tarot card awaits.");
  if (prefs.streakReminder) {
    const streak = getStore(userId).streak.currentStreak;
    if (streak > 0) messages.push(`Keep your ${streak}-day streak alive today.`);
  }

  if (messages.length === 0) return;

  try {
    new Notification("AstroPath", {
      body: messages[0],
      icon: "/astropath-icon.svg",
      tag: "astro-daily",
    });
    localStorage.setItem("astro_notif_last", today);
  } catch {
    // notifications blocked or unsupported
  }
}

export function saveNotificationPrefs(
  userId: string | null | undefined,
  prefs: Partial<NotificationPrefs>
): NotificationPrefs {
  return updateNotificationPrefs(userId, prefs).notificationPrefs;
}
