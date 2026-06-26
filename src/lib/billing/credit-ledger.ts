/**
 * Client-side credit ledger — single source of truth for free-tier remaining credits.
 * All chat/tarot/report charges write here first; Firestore sync is secondary.
 */

import {
  consumeAnonymousCredits,
  getAnonymousCredits,
  anonymousCreditsUsed,
  hasAnonymousCreditsFor,
  type CreditActivityType,
} from "./anonymous-credits";
import { CREDIT_COSTS, FREE_TRIAL_CREDITS } from "./credits-constants";

export { getAnonymousCredits, anonymousCreditsUsed, hasAnonymousCreditsFor };

export function getRemainingCredits(): number {
  if (typeof window === "undefined") return FREE_TRIAL_CREDITS;
  return getAnonymousCredits();
}

export function getUsedCredits(): number {
  if (typeof window === "undefined") return 0;
  return anonymousCreditsUsed();
}

export function chargeCredits(
  action: keyof typeof CREDIT_COSTS,
  message: string,
  type: CreditActivityType = "chat",
  signedIn = false
): { ok: boolean; remaining: number } {
  return consumeAnonymousCredits(CREDIT_COSTS[action], message, type, signedIn);
}

export function canAfford(action: keyof typeof CREDIT_COSTS): boolean {
  return hasAnonymousCreditsFor(action);
}
