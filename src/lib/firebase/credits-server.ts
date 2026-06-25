import type { UserUsage } from "@/types";

/** Shared usage defaults for server-side billing writes. */
export function defaultUsage(): UserUsage {
  const now = new Date();
  return {
    messagesThisPeriod: 0,
    reportsThisPeriod: 0,
    tarotThisPeriod: 0,
    monthlyForecastUnlocked: false,
    periodStart: now,
  };
}
