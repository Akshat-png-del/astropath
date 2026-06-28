"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { useBilling } from "@/hooks/useBilling";
import { useAuth } from "@/contexts/AuthContext";
import { CREDIT_COSTS, FREE_TRIAL_CREDITS } from "@/lib/billing/plans";
import { BTN_CHIP } from "@/lib/ui/button-classes";

export function CreditsBadge() {
  const { user } = useAuth();
  const {
    credits,
    unlimitedTarot,
    tier,
    loading,
    anonymousCredits,
    isAnonymousTrial,
    usesFreeCredits,
    creditsHydrated,
  } = useBilling();

  if (!creditsHydrated) return null;
  if (!isAnonymousTrial && (!user || loading)) return null;

  const href = "/dashboard";
  const remaining = usesFreeCredits ? anonymousCredits : credits;

  if (usesFreeCredits || isAnonymousTrial) {
    return (
      <Link
        href={href}
        title="Credits remaining"
        className={BTN_CHIP}
      >
        <Sparkles className="w-3 h-3" />
        <span>{remaining} credits left</span>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      title="Credits and plan"
      className={BTN_CHIP}
    >
      <Sparkles className="w-3 h-3" />
      {unlimitedTarot ? (
        <span className="capitalize">{tier} · unlimited</span>
      ) : (
        <span>
          {credits} credits · tarot from {CREDIT_COSTS.tarotReading} cr
        </span>
      )}
    </Link>
  );
}
