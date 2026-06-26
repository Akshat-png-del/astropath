import {
  ANONYMOUS_TRIAL_CREDITS,
  CREDIT_COSTS,
  FREE_TRIAL_CREDITS,
} from "./credits-constants";

export { ANONYMOUS_TRIAL_CREDITS } from "./credits-constants";

export const CREDITS_UPDATED_EVENT = "cosmic-credits-updated";

const CREDITS_KEY = "cosmic_anon_credits";
const HISTORY_KEY = "cosmic_credit_history";
const INITIALIZED_KEY = "cosmic_anon_credits_init";
const CREDITS_VERSION_KEY = "cosmic_anon_credits_version";
const CREDITS_VERSION = 5;

export type CreditActivityType = "chat" | "tarot" | "report" | "forecast";

export interface CreditHistoryEntry {
  id: string;
  message: string;
  creditsUsed: number;
  creditsRemaining: number;
  timestamp: string;
  type: CreditActivityType;
  signedIn: boolean;
}

function readHistoryRaw(): unknown[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(HISTORY_KEY) ?? "[]") as unknown;
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function normalizeEntry(raw: Record<string, unknown>): CreditHistoryEntry {
  const creditsUsed =
    Number(raw.creditsUsed ?? raw.cost ?? raw.amount ?? raw.used ?? 0) || 0;
  const type = raw.type as CreditActivityType | undefined;

  return {
    id: String(raw.id ?? `ch-legacy-${Date.now()}`),
    message: String(raw.message ?? ""),
    creditsUsed,
    creditsRemaining: Number(raw.creditsRemaining) || 0,
    timestamp: String(raw.timestamp ?? new Date().toISOString()),
    type: type === "tarot" || type === "report" || type === "forecast" ? type : "chat",
    signedIn: Boolean(raw.signedIn),
  };
}

/** Recompute per-entry balances oldest → newest; history is stored newest-first. */
function repairHistoryBalances(history: CreditHistoryEntry[]): CreditHistoryEntry[] {
  if (history.length === 0) return history;

  const oldestFirst = [...history].reverse();
  let balance = FREE_TRIAL_CREDITS;

  const repaired = oldestFirst.map((raw) => {
    const entry = normalizeEntry(raw as unknown as Record<string, unknown>);
    balance = Math.max(0, balance - entry.creditsUsed);
    return { ...entry, creditsRemaining: balance };
  });

  return repaired.reverse();
}

function readHistory(): CreditHistoryEntry[] {
  if (typeof window === "undefined") return [];
  return readHistoryRaw().map((row) =>
    normalizeEntry(row as Record<string, unknown>)
  );
}

function writeHistory(history: CreditHistoryEntry[]): void {
  const repaired = repairHistoryBalances(history);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(repaired.slice(0, 100)));
  const balance =
    repaired.length > 0
      ? repaired[0].creditsRemaining
      : parseInt(localStorage.getItem(CREDITS_KEY) ?? String(FREE_TRIAL_CREDITS), 10) ||
        FREE_TRIAL_CREDITS;
  localStorage.setItem(CREDITS_KEY, String(Math.max(0, Math.min(FREE_TRIAL_CREDITS, balance))));
}

function creditsUsedFromHistory(history: CreditHistoryEntry[]): number {
  return history.reduce((sum, entry) => sum + (Number(entry.creditsUsed) || 0), 0);
}

function migrateCreditsVersion(): void {
  if (typeof window === "undefined") return;
  const version = parseInt(localStorage.getItem(CREDITS_VERSION_KEY) ?? "0", 10);
  if (version >= CREDITS_VERSION) return;

  const history = readHistory();
  if (history.length > 0) {
    writeHistory(history);
  }

  localStorage.setItem(CREDITS_VERSION_KEY, String(CREDITS_VERSION));
}

function ensureInitialized(): void {
  if (typeof window === "undefined") return;

  if (!localStorage.getItem(INITIALIZED_KEY)) {
    localStorage.setItem(CREDITS_KEY, String(FREE_TRIAL_CREDITS));
    localStorage.setItem(HISTORY_KEY, JSON.stringify([]));
    localStorage.setItem(INITIALIZED_KEY, "1");
    localStorage.setItem(CREDITS_VERSION_KEY, String(CREDITS_VERSION));
    return;
  }

  migrateCreditsVersion();
}

/** Remaining credits — history sum is authoritative when history exists. */
function syncBalanceFromHistory(): number {
  const history = readHistory();
  if (history.length === 0) {
    const stored =
      parseInt(localStorage.getItem(CREDITS_KEY) ?? String(FREE_TRIAL_CREDITS), 10) || 0;
    return Math.min(Math.max(0, stored), FREE_TRIAL_CREDITS);
  }

  const used = creditsUsedFromHistory(history);
  const remaining = Math.max(0, FREE_TRIAL_CREDITS - used);
  localStorage.setItem(CREDITS_KEY, String(remaining));
  return remaining;
}

export function getAnonymousCredits(): number {
  if (typeof window === "undefined") return ANONYMOUS_TRIAL_CREDITS;
  ensureInitialized();
  return syncBalanceFromHistory();
}

export function getCreditHistory(): CreditHistoryEntry[] {
  if (typeof window === "undefined") return [];
  ensureInitialized();
  return readHistory();
}

function notifyCreditsUpdated(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(CREDITS_UPDATED_EVENT));
}

export function logCreditActivity(
  entry: Omit<CreditHistoryEntry, "id" | "timestamp" | "creditsRemaining">
): void {
  if (typeof window === "undefined") return;
  ensureInitialized();

  const history = readHistory();
  history.unshift({
    id: `ch-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    timestamp: new Date().toISOString(),
    message: entry.message,
    creditsUsed: Number(entry.creditsUsed) || 0,
    creditsRemaining: 0,
    type: entry.type,
    signedIn: entry.signedIn,
  });
  writeHistory(history);
  notifyCreditsUpdated();
}

export function consumeAnonymousCredits(
  amount: number,
  message: string,
  type: CreditActivityType = "chat",
  signedIn = false
): { ok: boolean; remaining: number } {
  if (typeof window === "undefined") return { ok: false, remaining: 0 };

  ensureInitialized();
  const current = getAnonymousCredits();
  if (current < amount) return { ok: false, remaining: current };

  logCreditActivity({
    message: message.slice(0, 120),
    creditsUsed: amount,
    type,
    signedIn,
  });

  const remaining = getAnonymousCredits();
  return { ok: true, remaining };
}

export function hasAnonymousCreditsFor(action: keyof typeof CREDIT_COSTS): boolean {
  return getAnonymousCredits() >= CREDIT_COSTS[action];
}

export function hasAnonymousChatTrialLeft(): boolean {
  return hasAnonymousCreditsFor("chatMessage");
}

export function resetAnonymousTrial(): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CREDITS_KEY, String(ANONYMOUS_TRIAL_CREDITS));
  localStorage.setItem(HISTORY_KEY, JSON.stringify([]));
  localStorage.setItem(INITIALIZED_KEY, "1");
  localStorage.setItem(CREDITS_VERSION_KEY, String(CREDITS_VERSION));
  notifyCreditsUpdated();
}

export function anonymousCreditsUsed(): number {
  if (typeof window === "undefined") return 0;
  ensureInitialized();
  return creditsUsedFromHistory(readHistory());
}

/** Re-read and repair ledger — call after client mount if balances look stale. */
export function repairCreditLedger(): void {
  if (typeof window === "undefined") return;
  ensureInitialized();
  const history = readHistory();
  if (history.length > 0) {
    writeHistory(history);
    notifyCreditsUpdated();
  }
}
