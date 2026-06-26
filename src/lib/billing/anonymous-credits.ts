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
const CREDITS_VERSION = 3;

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

function readHistory(): CreditHistoryEntry[] {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) ?? "[]") as CreditHistoryEntry[];
  } catch {
    return [];
  }
}

function creditsUsedFromHistory(history: CreditHistoryEntry[]): number {
  return history.reduce((sum, entry) => sum + entry.creditsUsed, 0);
}

function migrateCreditsVersion(): void {
  if (typeof window === "undefined") return;
  const version = parseInt(localStorage.getItem(CREDITS_VERSION_KEY) ?? "0", 10);
  if (version >= CREDITS_VERSION) return;

  const history = readHistory();

  // v3: stale legacy balances (e.g. old message counter) with no usage history → full trial
  if (version < 3 && history.length === 0) {
    localStorage.setItem(CREDITS_KEY, String(FREE_TRIAL_CREDITS));
    notifyCreditsUpdated();
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

function healAnonymousCredits(): number {
  const history = readHistory();
  const stored = parseInt(localStorage.getItem(CREDITS_KEY) ?? String(FREE_TRIAL_CREDITS), 10) || 0;
  let next = stored;

  if (history.length === 0) {
    if (stored < FREE_TRIAL_CREDITS) next = FREE_TRIAL_CREDITS;
  } else {
    next = Math.max(0, FREE_TRIAL_CREDITS - creditsUsedFromHistory(history));
  }

  if (next !== stored) {
    localStorage.setItem(CREDITS_KEY, String(next));
    notifyCreditsUpdated();
  }
  return next;
}

export function getAnonymousCredits(): number {
  if (typeof window === "undefined") return ANONYMOUS_TRIAL_CREDITS;
  ensureInitialized();
  return healAnonymousCredits();
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
  entry: Omit<CreditHistoryEntry, "id" | "timestamp">
): void {
  if (typeof window === "undefined") return;
  ensureInitialized();

  const history = readHistory();
  history.unshift({
    ...entry,
    id: `ch-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    timestamp: new Date().toISOString(),
  });
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 100)));
  healAnonymousCredits();
  notifyCreditsUpdated();
}

export function consumeAnonymousCredits(
  amount: number,
  message: string,
  type: CreditActivityType = "chat"
): { ok: boolean; remaining: number } {
  if (typeof window === "undefined") return { ok: false, remaining: 0 };

  ensureInitialized();
  const current = getAnonymousCredits();
  if (current < amount) return { ok: false, remaining: current };

  const remaining = current - amount;
  localStorage.setItem(CREDITS_KEY, String(remaining));

  logCreditActivity({
    message: message.slice(0, 120),
    creditsUsed: amount,
    creditsRemaining: remaining,
    type,
    signedIn: false,
  });

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
