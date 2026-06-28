"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { isFirebaseConfigured } from "@/lib/firebase/config";
import { resolveUserTier } from "@/lib/firebase/tier";
import { hasMonthlyForecastUnlock } from "@/lib/firebase/credits";
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
  hasAnonymousChatTrialLeft,
  anonymousCreditsUsed,
  repairCreditLedger,
} from "@/lib/billing/anonymous-credits";
import { hasAnonymousTarotTrialLeft } from "@/lib/billing/trials";
import { isDevTestUser } from "@/lib/billing/dev-test-user";
import { useClientReady } from "@/hooks/useClientReady";
import type { UserProfile } from "@/types";

export interface BillingState {
  profile: UserProfile | null;
  tier: SubscriptionTier;
  credits: number;
  unlimitedChat: boolean;
  /** Dev-only chat bypass — does not change credit display */
  devBypass: boolean;
  /** Free-tier users who consume the 20-credit trial ledger */
  usesFreeCredits: boolean;
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
  /** False until mount — local credit values are SSR-safe defaults until then */
  creditsHydrated: boolean;
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
  const clientReady = useClientReady();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [tier, setTier] = useState<SubscriptionTier>("free");
  const [loading, setLoading] = useState(true);
  /** Bump to re-read localStorage credit ledger on every charge */
  const [creditRevision, setCreditRevision] = useState(0);

  useEffect(() => {
    if (!clientReady) return;
    repairCreditLedger();
    const bump = () => setCreditRevision((n) => n + 1);
    bump();
    window.addEventListener(CREDITS_UPDATED_EVENT, bump);
    window.addEventListener(BILLING_REFRESH_EVENT, bump);
    return () => {
      window.removeEventListener(CREDITS_UPDATED_EVENT, bump);
      window.removeEventListener(BILLING_REFRESH_EVENT, bump);
    };
  }, [clientReady]);

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

    return () => {
      cancelled = true;
      window.removeEventListener(BILLING_REFRESH_EVENT, onRefresh);
    };
  }, [user, firebaseReady, authLoading]);

  // Re-read local ledger when creditRevision changes (after client mount only)
  void creditRevision;
  const localRemaining = clientReady ? getAnonymousCredits() : ANONYMOUS_TRIAL_CREDITS;
  const localUsed = clientReady ? anonymousCreditsUsed() : 0;

  const features = TIER_FEATURES[tier];
  const devBypass = isDevTestUser(user?.uid);
  const paidUnlimitedChat = features.unlimitedChat;
  const tarotUsed = profile?.usage?.tarotThisPeriod ?? 0;
  const reportsUsed = profile?.usage?.reportsThisPeriod ?? 0;
  const tarotTrialLeft = tier === "free" && tarotUsed < FREE_TAROT_TRIAL_PER_MONTH;
  const monthlyForecastUnlocked = hasMonthlyForecastUnlock(profile?.usage);
  const reportsIncluded = reportsIncludedPerMonth(tier);
  const isAnonymousTrial = !user?.uid;
  const rawCredits = profile?.credits ?? 0;
  const usesFreeCredits = tier === "free" && !paidUnlimitedChat;

  /** Local ledger is the source of truth for free-tier remaining credits */
  const credits = usesFreeCredits ? localRemaining : rawCredits;
  const creditsUsedThisPeriod = usesFreeCredits ? localUsed : 0;
  const anonymousCredits = localRemaining;

  return {
    profile,
    tier,
    credits,
    unlimitedChat: paidUnlimitedChat,
    devBypass,
    usesFreeCredits,
    unlimitedTarot: features.unlimitedTarot,
    savedHistory: features.savedHistory,
    monthlyForecast: features.monthlyForecast || monthlyForecastUnlocked,
    monthlyForecastUnlocked,
    compatibilityDeepDive: features.compatibilityDeepDive,
    loading,
    canChat: false,
    canGenerateReport:
      devBypass ||
      features.priorityReports ||
      (reportsIncluded > 0 && reportsUsed < reportsIncluded) ||
      localRemaining >= CREDIT_COSTS.detailedReport,
    canTarot:
      devBypass ||
      features.unlimitedTarot ||
      tarotTrialLeft ||
      localRemaining >= CREDIT_COSTS.tarotReading,
    canTarotAnonymous: clientReady ? hasAnonymousTarotTrialLeft() : true,
    canMonthlyForecast:
      devBypass ||
      features.monthlyForecast ||
      monthlyForecastUnlocked ||
      localRemaining >= CREDIT_COSTS.monthlyForecast,
    canUnlockMonthlyWithCredits:
      !features.monthlyForecast &&
      !monthlyForecastUnlocked &&
      localRemaining >= CREDIT_COSTS.monthlyForecast,
    canCompatibility: features.compatibilityDeepDive,
    tarotTrialLeft,
    anonymousCredits,
    isAnonymousTrial,
    creditLimit: usesFreeCredits
      ? FREE_TRIAL_CREDITS
      : paidUnlimitedChat
        ? null
        : FREE_MONTHLY_CREDITS,
    creditsUsedThisPeriod,
    creditsHydrated: clientReady,
  };
}
