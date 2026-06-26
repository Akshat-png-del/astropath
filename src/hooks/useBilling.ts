"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { isFirebaseConfigured } from "@/lib/firebase/config";
import { resolveUserTier } from "@/lib/firebase/tier";
import { hasMonthlyForecastUnlock, reconcileFreeTierCreditBalance, computeFreeTierSpent, syncFreeTierCreditsInFirestore, resetFreeTierAllowance } from "@/lib/firebase/credits";
import {
  createUserProfile,
  ensureUserBillingProfile,
  getUserProfile,
} from "@/lib/firebase/firestore";
import { BILLING_REFRESH_EVENT } from "@/lib/billing/refresh";
import { TIER_FEATURES, type SubscriptionTier } from "@/lib/firebase/schemas";
import { CREDIT_COSTS, FREE_MONTHLY_CREDITS, FREE_TRIAL_CREDITS, FREE_TAROT_TRIAL_PER_MONTH, reportsIncludedPerMonth } from "@/lib/billing/plans";
import {
  ANONYMOUS_TRIAL_CREDITS,
  CREDITS_UPDATED_EVENT,
  getAnonymousCredits,
  hasAnonymousCreditsFor,
  hasAnonymousChatTrialLeft,
  anonymousCreditsUsed,
  getCreditHistory,
} from "@/lib/billing/anonymous-credits";
import {
  hasAnonymousTarotTrialLeft,
} from "@/lib/billing/trials";
import { isDevTestUser } from "@/lib/billing/dev-test-user";
import type { UserProfile } from "@/types";

export interface BillingState {
  profile: UserProfile | null;
  tier: SubscriptionTier;
  credits: number;
  unlimitedChat: boolean;
  unlimitedTarot: boolean;
  savedHistory: boolean;
  monthlyForecast: boolean;
  monthlyForecastUnlocked: boolean;
  compatibilityDeepDive: boolean;
  loading: boolean;
  canChat: boolean;
  canGenerateReport: boolean;
  canTarot: boolean;
  canTarotAnonymous: boolean;
  canMonthlyForecast: boolean;
  canUnlockMonthlyWithCredits: boolean;
  canCompatibility: boolean;
  tarotTrialLeft: boolean;
  anonymousCredits: number;
  isAnonymousTrial: boolean;
  creditLimit: number | null;
  creditsUsedThisPeriod: number;
}

export {
  getAnonymousMessageCount,
  incrementAnonymousMessageCount,
  getAnonymousTarotCount,
  incrementAnonymousTarotCount,
  hasAnonymousTarotTrialLeft,
} from "@/lib/billing/trials";

export { hasAnonymousChatTrialLeft } from "@/lib/billing/anonymous-credits";

export function useBilling(): BillingState {
  const { user, loading: authLoading, firebaseReady } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [tier, setTier] = useState<SubscriptionTier>("free");
  const [loading, setLoading] = useState(true);
  const [anonymousCredits, setAnonymousCredits] = useState(ANONYMOUS_TRIAL_CREDITS);

  useEffect(() => {
    const loadAnon = () => setAnonymousCredits(getAnonymousCredits());
    loadAnon();
    window.addEventListener(CREDITS_UPDATED_EVENT, loadAnon);
    return () => window.removeEventListener(CREDITS_UPDATED_EVENT, loadAnon);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadProfile() {
      if (!firebaseReady || authLoading || !user?.uid || !isFirebaseConfigured()) {
        setProfile(null);
        setTier("free");
        setLoading(!firebaseReady || authLoading);
        return;
      }

      setLoading(true);
      try {
        await user.getIdToken();
        const resolved = await resolveUserTier(user.uid);
        let profile = await getUserProfile(user.uid);
        if (!profile) {
          await createUserProfile(user.uid, {
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          });
          await ensureUserBillingProfile(user.uid);
          profile = await getUserProfile(user.uid);
        } else {
          await syncFreeTierCreditsInFirestore(user.uid);
          profile = await getUserProfile(user.uid);
          if (
            profile &&
            resolved.tier === "free" &&
            getCreditHistory().length === 0 &&
            computeFreeTierSpent(profile.usage) > 0
          ) {
            await resetFreeTierAllowance(user.uid);
            profile = await getUserProfile(user.uid);
          }
        }
        if (!cancelled) {
          setProfile(profile);
          setTier(resolved.tier);
        }
      } catch {
        if (!cancelled) {
          setProfile(null);
          setTier("free");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadProfile();

    const onRefresh = () => void loadProfile();
    window.addEventListener(BILLING_REFRESH_EVENT, onRefresh);
    window.addEventListener("focus", onRefresh);

    return () => {
      cancelled = true;
      window.removeEventListener(BILLING_REFRESH_EVENT, onRefresh);
      window.removeEventListener("focus", onRefresh);
    };
  }, [user, firebaseReady, authLoading]);

  const features = TIER_FEATURES[tier];
  const devUnlimited = isDevTestUser(user?.uid);
  const tarotUsed = profile?.usage?.tarotThisPeriod ?? 0;
  const reportsUsed = profile?.usage?.reportsThisPeriod ?? 0;
  const tarotTrialLeft = tier === "free" && tarotUsed < FREE_TAROT_TRIAL_PER_MONTH;
  const monthlyForecastUnlocked = hasMonthlyForecastUnlock(profile?.usage);
  const reportsIncluded = reportsIncludedPerMonth(tier);
  const isAnonymousTrial = !user?.uid;
  const rawCredits = profile?.credits ?? 0;
  const credits =
    devUnlimited
      ? FREE_TRIAL_CREDITS
      : tier === "free" && !features.unlimitedChat
        ? reconcileFreeTierCreditBalance(rawCredits, profile?.usage, tier)
        : rawCredits;
  const creditsUsedThisPeriod = isAnonymousTrial
    ? anonymousCreditsUsed()
    : tier === "free"
      ? computeFreeTierSpent(profile?.usage)
      : 0;
  const anonCanChat = hasAnonymousCreditsFor("chatMessage");

  return {
    profile,
    tier,
    credits,
    unlimitedChat: features.unlimitedChat,
    unlimitedTarot: features.unlimitedTarot,
    savedHistory: features.savedHistory,
    monthlyForecast: features.monthlyForecast || monthlyForecastUnlocked,
    monthlyForecastUnlocked,
    compatibilityDeepDive: features.compatibilityDeepDive,
    loading,
    canChat:
      devUnlimited ||
      (isAnonymousTrial
        ? anonCanChat
        : features.unlimitedChat || credits >= CREDIT_COSTS.chatMessage),
    canGenerateReport:
      devUnlimited ||
      features.priorityReports ||
      (reportsIncluded > 0 && reportsUsed < reportsIncluded) ||
      credits >= CREDIT_COSTS.detailedReport,
    canTarot:
      devUnlimited ||
      features.unlimitedTarot ||
      tarotTrialLeft ||
      credits >= CREDIT_COSTS.tarotReading,
    canTarotAnonymous: hasAnonymousTarotTrialLeft(),
    canMonthlyForecast:
      devUnlimited ||
      features.monthlyForecast ||
      monthlyForecastUnlocked ||
      credits >= CREDIT_COSTS.monthlyForecast,
    canUnlockMonthlyWithCredits:
      !features.monthlyForecast &&
      !monthlyForecastUnlocked &&
      credits >= CREDIT_COSTS.monthlyForecast,
    canCompatibility: features.compatibilityDeepDive,
    tarotTrialLeft,
    anonymousCredits,
    isAnonymousTrial,
    creditLimit: isAnonymousTrial
      ? FREE_TRIAL_CREDITS
      : features.unlimitedChat
        ? null
        : FREE_MONTHLY_CREDITS,
    creditsUsedThisPeriod,
  };
}
