/** Shared billing constants — no imports from other billing modules (avoids circular deps). */

export const CREDIT_COSTS = {
  chatMessage: 1,
  detailedReport: 5,
  tarotReading: 2,
  monthlyForecast: 3,
  compatibilityReading: 4,
} as const;

/** Free trial / Free tier monthly allocation — anonymous & signed-in */
export const FREE_TRIAL_CREDITS = 20;
export const FREE_MONTHLY_CREDITS = FREE_TRIAL_CREDITS;
export const ANONYMOUS_TRIAL_CREDITS = FREE_TRIAL_CREDITS;
