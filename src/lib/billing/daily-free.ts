/** One free tarot reading per calendar day + daily spread tracking */

import { getSpreadBaseCost, formatCreditCost } from "./credit-pricing";

const DAILY_TAROT_KEY = "astro_daily_tarot_free";
const DAILY_SPREAD_KEY = "astro_daily_spread_used";

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function readKey(storageKey: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { date: string };
    return parsed.date === todayKey() ? parsed.date : null;
  } catch {
    return null;
  }
}

function writeKey(storageKey: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(storageKey, JSON.stringify({ date: todayKey() }));
}

/** Free tier: one complimentary tarot reading per day (any spread ≤3 credits) */
export function hasDailyFreeTarotAvailable(): boolean {
  return readKey(DAILY_TAROT_KEY) === null;
}

export function markDailyFreeTarotUsed(): void {
  writeKey(DAILY_TAROT_KEY);
}

/** Daily spread (today's card) — once per calendar day */
export function hasDailySpreadAvailable(): boolean {
  return readKey(DAILY_SPREAD_KEY) === null;
}

export function markDailySpreadUsed(): void {
  writeKey(DAILY_SPREAD_KEY);
}

export type TarotCostReason =
  | "unlimited"
  | "daily-spread"
  | "daily-free"
  | "monthly-trial"
  | "anonymous-trial"
  | "paid";

export interface ResolvedTarotCost {
  cost: number;
  reason: TarotCostReason;
  label: string;
}

export interface TarotCostContext {
  spreadId: string;
  unlimitedTarot: boolean;
  tarotTrialLeft: boolean;
  anonymousTrialLeft: boolean;
  credits: number;
}

/** Resolve what the user will pay for a spread (before starting) */
export function resolveTarotCost(ctx: TarotCostContext): ResolvedTarotCost {
  const base = getSpreadBaseCost(ctx.spreadId);

  if (ctx.unlimitedTarot) {
    return { cost: 0, reason: "unlimited", label: "Included with your plan" };
  }

  if (ctx.spreadId === "daily" && hasDailySpreadAvailable()) {
    return { cost: 0, reason: "daily-spread", label: "Free today · daily card" };
  }

  if (ctx.tarotTrialLeft) {
    return { cost: 0, reason: "monthly-trial", label: "Free · monthly trial" };
  }

  if (ctx.anonymousTrialLeft && !ctx.spreadId) {
    return { cost: 0, reason: "anonymous-trial", label: "Free trial reading" };
  }

  if (ctx.anonymousTrialLeft) {
    return { cost: 0, reason: "anonymous-trial", label: "Free trial reading" };
  }

  if (hasDailyFreeTarotAvailable() && base <= 3 && ctx.spreadId !== "celtic-cross") {
    return { cost: 0, reason: "daily-free", label: "Free today · daily reading" };
  }

  return {
    cost: base,
    reason: "paid",
    label: formatCreditCost(base),
  };
}

export function canAffordTarot(ctx: TarotCostContext): boolean {
  const { cost } = resolveTarotCost(ctx);
  return cost === 0 || ctx.credits >= cost;
}

export function markTarotFreeUsage(reason: TarotCostReason, spreadId: string): void {
  if (reason === "daily-spread" || spreadId === "daily") {
    markDailySpreadUsed();
  }
  if (reason === "daily-free") {
    markDailyFreeTarotUsed();
  }
}
