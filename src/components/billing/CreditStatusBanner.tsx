"use client";

import Link from "next/link";
import { useBilling } from "@/hooks/useBilling";
import { FREE_TRIAL_CREDITS } from "@/lib/billing/plans";
import { hasDailyFreeTarotAvailable, hasDailySpreadAvailable } from "@/lib/billing/daily-free";

interface CreditStatusBannerProps {
  spreadCostLabel?: string;
  className?: string;
}

export function CreditStatusBanner({ spreadCostLabel, className = "" }: CreditStatusBannerProps) {
  const billing = useBilling();

  if (!billing.creditsHydrated) return null;

  const remaining = billing.unlimitedTarot
    ? null
    : billing.usesFreeCredits || billing.isAnonymousTrial
      ? billing.anonymousCredits
      : billing.credits;

  const dailyNote =
    hasDailySpreadAvailable() || hasDailyFreeTarotAvailable()
      ? " · 1 free reading available today"
      : "";

  return (
    <div
      className={`rounded-xl border border-silver/10 bg-silver/5 px-4 py-3 text-center ${className}`}
    >
      {billing.unlimitedTarot ? (
        <p className="text-xs text-silver-dim/80">
          <span className="text-silver/80">Unlimited exploration</span> on your plan
        </p>
      ) : (
        <p className="text-xs text-silver-muted">
          You have:{" "}
          <span className="text-silver/85 font-medium">
            {remaining ?? 0} credit{(remaining ?? 0) === 1 ? "" : "s"} remaining
          </span>
          {billing.tarotTrialLeft && !billing.unlimitedTarot && (
            <span className="text-silver-muted/85"> · plus 1 free monthly reading</span>
          )}
          {dailyNote && <span className="text-emerald-400/60">{dailyNote}</span>}
        </p>
      )}
      {spreadCostLabel && (
        <p className="text-[11px] text-silver-muted/80 mt-1">
          This reading: <span className="text-silver-dim/85">{spreadCostLabel}</span>
          {" · "}
          Credits deduct only after a successful reading
        </p>
      )}
      {!billing.unlimitedTarot && (
        <Link
          href="/pricing"
          className="inline-block mt-2 text-[10px] text-silver-muted/80 hover:text-silver-dim/80 underline-offset-2 hover:underline"
        >
          See all credit costs · Upgrade for unlimited
        </Link>
      )}
    </div>
  );
}

export function CreditCostGuide({ compact = false }: { compact?: boolean }) {
  if (compact) return null;
  return (
    <p className="text-[10px] text-silver-faint/90 text-center mt-2">
      Starter pack: {FREE_TRIAL_CREDITS} credits · Daily card free once per day
    </p>
  );
}
