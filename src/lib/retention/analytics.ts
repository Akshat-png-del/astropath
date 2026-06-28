import type { AnalyticsEvent, AnalyticsEventName } from "./types";
import { getRetentionUserId } from "./storage";

const EVENTS_KEY = "astro_analytics_events";
const MAX_EVENTS = 500;

export function trackEvent(
  name: AnalyticsEventName,
  properties?: Record<string, string | number | boolean>
): void {
  if (typeof window === "undefined") return;

  const event: AnalyticsEvent = {
    name,
    timestamp: new Date().toISOString(),
    properties,
  };

  try {
    const raw = localStorage.getItem(EVENTS_KEY);
    const events: AnalyticsEvent[] = raw ? JSON.parse(raw) : [];
    events.unshift(event);
    localStorage.setItem(EVENTS_KEY, JSON.stringify(events.slice(0, MAX_EVENTS)));
  } catch {
    // ignore storage errors
  }

  if (typeof navigator !== "undefined" && navigator.sendBeacon) {
    const body = JSON.stringify({
      ...event,
      userId: getRetentionUserId(),
    });
    navigator.sendBeacon("/api/analytics", body);
  }
}

export function getAnalyticsSummary(): {
  totalEvents: number;
  dailyVisits: number;
  tarotReadings: number;
  guideReads: number;
  streakParticipation: number;
} {
  if (typeof window === "undefined") {
    return { totalEvents: 0, dailyVisits: 0, tarotReadings: 0, guideReads: 0, streakParticipation: 0 };
  }
  try {
    const raw = localStorage.getItem(EVENTS_KEY);
    const events: AnalyticsEvent[] = raw ? JSON.parse(raw) : [];
    return {
      totalEvents: events.length,
      dailyVisits: events.filter((e) => e.name === "daily_visit").length,
      tarotReadings: events.filter((e) => e.name === "tarot_reading").length,
      guideReads: events.filter((e) => e.name === "guide_read").length,
      streakParticipation: events.filter((e) => e.name === "streak_milestone").length,
    };
  } catch {
    return { totalEvents: 0, dailyVisits: 0, tarotReadings: 0, guideReads: 0, streakParticipation: 0 };
  }
}

export function getTopGuideSlugs(limit = 5): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(EVENTS_KEY);
    const events: AnalyticsEvent[] = raw ? JSON.parse(raw) : [];
    const counts: Record<string, number> = {};
    for (const e of events) {
      if (e.name === "guide_read" && e.properties?.slug) {
        const slug = String(e.properties.slug);
        counts[slug] = (counts[slug] ?? 0) + 1;
      }
    }
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([slug]) => slug);
  } catch {
    return [];
  }
}
