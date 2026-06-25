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
import { CREDIT_COSTS, FREE_TAROT_TRIAL_PER_MONTH, reportsIncludedPerMonth } from "@/lib/billing/plans";
import {
  hasAnonymousTarotTrialLeft,
  hasAnonymousChatTrialLeft,
} from "@/lib/billing/trials";
import { isDevTestUser, DEV_TEST_CREDITS } from "@/lib/billing/dev-test-user";
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
}

export {
  getAnonymousMessageCount,
  incrementAnonymousMessageCount,
  getAnonymousTarotCount,
  incrementAnonymousTarotCount,
  hasAnonymousTarotTrialLeft,
  hasAnonymousChatTrialLeft,
} from "@/lib/billing/trials";

export function useBilling(): BillingState {
  const { user, loading: authLoading, firebaseReady } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [tier, setTier] = useState<SubscriptionTier>("free");
  const [loading, setLoading] = useState(true);

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
    window.addEventListener("focus", onRefresh);

    return () => {
      cancelled = true;
      window.removeEventListener(BILLING_REFRESH_EVENT, onRefresh);
      window.removeEventListener("focus", onRefresh);
    };
  }, [user, firebaseReady, authLoading]);

  const features = TIER_FEATURES[tier];
  const devUnlimited = isDevTestUser(user?.uid);
  const credits = devUnlimited ? DEV_TEST_CREDITS : (profile?.credits ?? 0);
  const tarotUsed = profile?.usage?.tarotThisPeriod ?? 0;
  const reportsUsed = profile?.usage?.reportsThisPeriod ?? 0;
  const tarotTrialLeft = tier === "free" && tarotUsed < FREE_TAROT_TRIAL_PER_MONTH;
  const monthlyForecastUnlocked = hasMonthlyForecastUnlock(profile?.usage);
  const reportsIncluded = reportsIncludedPerMonth(tier);

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
    canChat: devUnlimited || features.unlimitedChat || credits >= CREDIT_COSTS.chatMessage,
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
  };
}
