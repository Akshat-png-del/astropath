"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useBilling } from "@/hooks/useBilling";
import { isAdSenseConfigured } from "@/lib/ads/adsense";

/** Show ads for anonymous visitors and signed-in Free tier only */
export function useShowAds() {
  const { user, loading: authLoading } = useAuth();
  const { tier, loading: billingLoading, isAnonymousTrial } = useBilling();

  if (!isAdSenseConfigured()) {
    return { show: false, loading: false };
  }

  if (authLoading) {
    return { show: false, loading: true };
  }

  if (user && billingLoading) {
    return { show: false, loading: true };
  }

  const show = isAnonymousTrial || tier === "free";
  return { show, loading: false };
}
