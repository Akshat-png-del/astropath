import {
  doc,
  getDoc,
  runTransaction,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getFirebaseDb, isFirebaseConfigured } from "./config";
import { COLLECTIONS } from "./collections";
import {
  CREDIT_COSTS,
  FREE_MONTHLY_CREDITS,
  FREE_TAROT_TRIAL_PER_MONTH,
  reportsIncludedPerMonth,
} from "@/lib/billing/plans";
import { TIER_FEATURES, type SubscriptionTier } from "./schemas";
import { resolveUserTier } from "./tier";
import { refreshBilling } from "@/lib/billing/refresh";
import type { UserProfile, UserUsage } from "@/types";
import { isDevTestUser, DEV_TEST_CREDITS } from "@/lib/billing/dev-test-user";

export type CreditAction = keyof typeof CREDIT_COSTS;

function defaultUsage(): UserUsage {
  const now = new Date();
  return {
    messagesThisPeriod: 0,
    reportsThisPeriod: 0,
    tarotThisPeriod: 0,
    monthlyForecastUnlocked: false,
    periodStart: now,
  };
}

export function buildNewUserBillingFields(): Pick<
  UserProfile,
  "credits" | "subscriptionTier" | "usage" | "creditsResetAt"
> {
  const now = new Date();
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  return {
    credits: FREE_MONTHLY_CREDITS,
    subscriptionTier: "free",
    usage: defaultUsage(),
    creditsResetAt: nextMonth,
  };
}

export function periodExpired(usage: UserUsage | undefined): boolean {
  if (!usage?.periodStart) return true;
  const start =
    usage.periodStart instanceof Date
      ? usage.periodStart
      : (usage.periodStart as { toDate?: () => Date }).toDate?.() ??
        new Date(usage.periodStart as unknown as string);
  const now = new Date();
  return start.getMonth() !== now.getMonth() || start.getFullYear() !== now.getFullYear();
}

function normalizeUsage(raw: UserUsage | undefined): UserUsage {
  if (!raw || periodExpired(raw)) return defaultUsage();
  return {
    messagesThisPeriod: raw.messagesThisPeriod ?? 0,
    reportsThisPeriod: raw.reportsThisPeriod ?? 0,
    tarotThisPeriod: raw.tarotThisPeriod ?? 0,
    monthlyForecastUnlocked: raw.monthlyForecastUnlocked ?? false,
    periodStart:
      raw.periodStart instanceof Date
        ? raw.periodStart
        : (raw.periodStart as { toDate?: () => Date }).toDate?.() ?? new Date(),
  };
}

/** Align free-tier balance with 20-credit allowance minus usage this period */
export function computeFreeTierSpent(usage: UserUsage | undefined): number {
  const normalized = normalizeUsage(usage);
  return (
    normalized.messagesThisPeriod * CREDIT_COSTS.chatMessage +
    normalized.reportsThisPeriod * CREDIT_COSTS.detailedReport +
    normalized.tarotThisPeriod * CREDIT_COSTS.tarotReading +
    (normalized.monthlyForecastUnlocked ? CREDIT_COSTS.monthlyForecast : 0)
  );
}

/** Align free-tier balance with 20-credit allowance minus usage this period */
export function reconcileFreeTierCreditBalance(
  credits: number,
  usage: UserUsage | undefined,
  tier: SubscriptionTier = "free"
): number {
  if (tier !== "free") return credits;

  const spentThisPeriod = computeFreeTierSpent(usage);

  // Stale stored balance with no recorded usage — grant full allowance
  if (spentThisPeriod === 0 && credits < FREE_MONTHLY_CREDITS) {
    return FREE_MONTHLY_CREDITS;
  }

  return Math.max(0, FREE_MONTHLY_CREDITS - spentThisPeriod);
}

export async function resetFreeTierAllowance(uid: string): Promise<void> {
  if (!isFirebaseConfigured()) return;

  const userRef = doc(getFirebaseDb(), COLLECTIONS.USERS, uid);
  const snap = await getDoc(userRef);
  if (!snap.exists()) return;

  const tier = (snap.data().subscriptionTier as SubscriptionTier) ?? "free";
  if (tier !== "free") return;

  await updateDoc(userRef, {
    credits: FREE_MONTHLY_CREDITS,
    usage: defaultUsage(),
    lastActiveAt: serverTimestamp(),
  });
  refreshBilling();
}

export async function syncFreeTierCreditsInFirestore(uid: string): Promise<void> {
  if (!isFirebaseConfigured()) return;

  const userRef = doc(getFirebaseDb(), COLLECTIONS.USERS, uid);
  const snap = await getDoc(userRef);
  if (!snap.exists()) return;

  const data = snap.data();
  const tier = (data.subscriptionTier as SubscriptionTier) ?? "free";
  if (tier !== "free") return;

  const current = (data.credits as number) ?? 0;
  const usage = data.usage as UserUsage | undefined;
  const spent = computeFreeTierSpent(usage);
  const next = reconcileFreeTierCreditBalance(current, usage, tier);

  const patch: Record<string, unknown> = { lastActiveAt: serverTimestamp() };
  let needsUpdate = false;

  if (next !== current) {
    patch.credits = next;
    needsUpdate = true;
  }

  // Orphaned usage counters with no matching credit deductions — fresh monthly allowance
  if (spent === 0 && current < FREE_MONTHLY_CREDITS) {
    patch.credits = FREE_MONTHLY_CREDITS;
    patch.usage = defaultUsage();
    needsUpdate = true;
  }

  if (!needsUpdate) return;

  await updateDoc(userRef, patch);
  refreshBilling();
}

export interface CreditCheckResult {
  allowed: boolean;
  reason?: string;
  credits?: number;
  tier: SubscriptionTier;
  unlimitedChat: boolean;
}

export async function checkCredits(
  uid: string,
  action: CreditAction
): Promise<CreditCheckResult> {
  if (isDevTestUser(uid)) {
    return { allowed: true, credits: DEV_TEST_CREDITS, tier: "free", unlimitedChat: true };
  }

  if (!isFirebaseConfigured()) {
    if (process.env.NODE_ENV === "development") {
      return { allowed: true, tier: "free", unlimitedChat: true };
    }
    return {
      allowed: false,
      reason: "Billing is unavailable. Please try again later.",
      tier: "free",
      unlimitedChat: false,
    };
  }

  try {
    const { tier, features } = await resolveUserTier(uid);
    const cost = CREDIT_COSTS[action];

    const userSnap = await getDoc(doc(getFirebaseDb(), COLLECTIONS.USERS, uid));
    const usage = normalizeUsage(userSnap.data()?.usage as UserUsage | undefined);
    const credits = (userSnap.data()?.credits as number | undefined) ?? 0;

    if (action === "chatMessage" && features.unlimitedChat) {
      return { allowed: true, tier, unlimitedChat: true };
    }

    if (action === "tarotReading" && features.unlimitedTarot) {
      return { allowed: true, tier, unlimitedChat: features.unlimitedChat };
    }

    if (action === "monthlyForecast") {
      if (features.monthlyForecast) {
        return { allowed: true, tier, unlimitedChat: features.unlimitedChat };
      }
      if (usage.monthlyForecastUnlocked) {
        return { allowed: true, credits, tier, unlimitedChat: features.unlimitedChat };
      }
    }

    if (action === "tarotReading" && tier === "free") {
      if (usage.tarotThisPeriod < FREE_TAROT_TRIAL_PER_MONTH) {
        return { allowed: true, credits, tier, unlimitedChat: features.unlimitedChat };
      }
    }

    if (action === "detailedReport") {
      if (features.priorityReports) {
        return { allowed: true, tier, unlimitedChat: features.unlimitedChat };
      }
      const included = reportsIncludedPerMonth(tier);
      if (included > 0 && usage.reportsThisPeriod < included) {
        return { allowed: true, tier, unlimitedChat: features.unlimitedChat };
      }
    }

    if (credits >= cost) {
      return { allowed: true, credits, tier, unlimitedChat: features.unlimitedChat };
    }

    const featureLabel =
      action === "tarotReading"
        ? "tarot reading"
        : action === "monthlyForecast"
          ? "monthly forecast"
          : action === "detailedReport"
            ? "detailed report"
            : "message";

    return {
      allowed: false,
      reason: `You need ${cost} credit${cost > 1 ? "s" : ""} for this ${featureLabel}. You have ${credits}.`,
      credits,
      tier,
      unlimitedChat: features.unlimitedChat,
    };
  } catch {
    return {
      allowed: false,
      reason: "Could not verify credits. Please refresh and try again.",
      tier: "free",
      unlimitedChat: false,
    };
  }
}

function resolveTierFromSnapshots(
  userData: Record<string, unknown> | undefined,
  subData: Record<string, unknown> | undefined,
  subExists: boolean
): SubscriptionTier {
  if (subExists && subData) {
    const status = (subData.status ?? "active") as string;
    const subTier = subData.tier as SubscriptionTier;
    if ((status === "active" || status === "trialing") && (subTier === "cosmic" || subTier === "oracle")) {
      return subTier;
    }
  }
  const profileTier = userData?.subscriptionTier as SubscriptionTier | undefined;
  if (profileTier === "cosmic" || profileTier === "oracle") return profileTier;
  return "free";
}

export async function consumeCredits(
  uid: string,
  action: CreditAction
): Promise<{ ok: boolean; credits?: number; error?: string }> {
  if (isDevTestUser(uid)) {
    return { ok: true, credits: DEV_TEST_CREDITS };
  }

  if (!isFirebaseConfigured()) {
    return process.env.NODE_ENV === "development" ? { ok: true } : { ok: false, error: "Billing unavailable." };
  }

  const userRef = doc(getFirebaseDb(), COLLECTIONS.USERS, uid);
  const subRef = doc(getFirebaseDb(), COLLECTIONS.SUBSCRIPTIONS, uid);
  const cost = CREDIT_COSTS[action];

  try {
    const remaining = await runTransaction(getFirebaseDb(), async (tx) => {
      const userSnap = await tx.get(userRef);
      const subSnap = await tx.get(subRef);
      const tier = resolveTierFromSnapshots(userSnap.data(), subSnap.data(), subSnap.exists());
      const features = TIER_FEATURES[tier];
      const data = userSnap.data() ?? {};
      let usage = normalizeUsage(data.usage as UserUsage | undefined);
      let credits = (data.credits as number) ?? 0;

      if (periodExpired(data.usage as UserUsage | undefined)) {
        usage = defaultUsage();
        if (tier === "free") credits = FREE_MONTHLY_CREDITS;
      } else if (tier === "free") {
        credits = reconcileFreeTierCreditBalance(credits, usage, tier);
      }

      if (action === "chatMessage" && features.unlimitedChat) {
        usage = { ...usage, messagesThisPeriod: usage.messagesThisPeriod + 1 };
        tx.update(userRef, { usage, lastActiveAt: serverTimestamp() });
        return -1;
      }

      if (action === "tarotReading" && features.unlimitedTarot) {
        usage = { ...usage, tarotThisPeriod: usage.tarotThisPeriod + 1 };
        tx.update(userRef, { usage, credits, lastActiveAt: serverTimestamp() });
        return credits;
      }

      if (action === "monthlyForecast" && features.monthlyForecast) {
        tx.update(userRef, { lastActiveAt: serverTimestamp() });
        return credits;
      }

      if (action === "monthlyForecast" && usage.monthlyForecastUnlocked) {
        return credits;
      }

      if (action === "tarotReading" && tier === "free" && usage.tarotThisPeriod < FREE_TAROT_TRIAL_PER_MONTH) {
        usage = { ...usage, tarotThisPeriod: usage.tarotThisPeriod + 1 };
        tx.update(userRef, { usage, credits, lastActiveAt: serverTimestamp() });
        return credits;
      }

      if (action === "detailedReport") {
        if (features.priorityReports) {
          usage = { ...usage, reportsThisPeriod: usage.reportsThisPeriod + 1 };
          tx.update(userRef, { usage, credits, lastActiveAt: serverTimestamp() });
          return credits;
        }
        const included = reportsIncludedPerMonth(tier);
        if (included > 0 && usage.reportsThisPeriod < included) {
          usage = { ...usage, reportsThisPeriod: usage.reportsThisPeriod + 1 };
          tx.update(userRef, { usage, credits, lastActiveAt: serverTimestamp() });
          return credits;
        }
      }

      if (credits < cost) throw new Error("INSUFFICIENT_CREDITS");

      const nextCredits = credits - cost;
      if (action === "chatMessage") {
        usage = { ...usage, messagesThisPeriod: usage.messagesThisPeriod + 1 };
      } else if (action === "detailedReport") {
        usage = { ...usage, reportsThisPeriod: usage.reportsThisPeriod + 1 };
      } else if (action === "tarotReading") {
        usage = { ...usage, tarotThisPeriod: usage.tarotThisPeriod + 1 };
      } else if (action === "monthlyForecast") {
        usage = { ...usage, monthlyForecastUnlocked: true };
      }

      tx.update(userRef, {
        credits: nextCredits,
        usage,
        lastActiveAt: serverTimestamp(),
      });
      return nextCredits;
    });

    refreshBilling();
    return { ok: true, credits: remaining };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Could not use credits";
    return { ok: false, error: msg === "INSUFFICIENT_CREDITS" ? "Not enough credits." : msg };
  }
}

export function hasMonthlyForecastUnlock(usage?: UserUsage): boolean {
  const normalized = normalizeUsage(usage);
  return !!normalized.monthlyForecastUnlocked;
}
