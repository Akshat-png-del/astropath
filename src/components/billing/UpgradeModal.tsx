"use client";

import Link from "next/link";
import { CosmicButton } from "@/components/cosmic/CosmicButton";
import { CREDIT_COSTS, FREE_MONTHLY_CREDITS, FREE_TRIAL_CREDITS } from "@/lib/billing/plans";
import { PAID_PLANS_LABEL, STELLAR_PLAN_NAME } from "@/lib/brand";

export type UpgradeReason =
  | "credits"
  | "report"
  | "signin"
  | "history"
  | "tarot"
  | "forecast"
  | "compatibility";

interface UpgradeModalProps {
  open: boolean;
  onClose: () => void;
  reason?: UpgradeReason;
}

const COPY: Record<UpgradeReason, { title: string; body: string }> = {
  credits: {
    title: "You're out of credits",
    body: `Each chat message uses ${CREDIT_COSTS.chatMessage} credit. Free trial includes ${FREE_TRIAL_CREDITS} credits without sign-in. Signed-in Free accounts get ${FREE_MONTHLY_CREDITS} credits monthly.`,
  },
  report: {
    title: "Unlock your detailed report",
    body: `Full birth chart reports use ${CREDIT_COSTS.detailedReport} credits, or are included with ${PAID_PLANS_LABEL} plans.`,
  },
  signin: {
    title: "Sign in to continue",
    body: `Create a free account for ${FREE_MONTHLY_CREDITS} monthly credits, 1 free tarot/month, saved chart, and cloud history on paid plans.`,
  },
  history: {
    title: `Cloud history is a ${STELLAR_PLAN_NAME} feature`,
    body: "Upgrade to sync readings across all your devices.",
  },
  tarot: {
    title: "More tarot readings",
    body: `Free plan includes 1 tarot trial per month, then ${CREDIT_COSTS.tarotReading} credits each. ${PAID_PLANS_LABEL} include unlimited tarot.`,
  },
  forecast: {
    title: "Unlock monthly forecast",
    body: `Month-ahead guidance is on ${PAID_PLANS_LABEL} plans, or use ${CREDIT_COSTS.monthlyForecast} credits on Free.`,
  },
  compatibility: {
    title: "Unlock compatibility deep-dive",
    body: `Full zodiac compatibility analysis is included with ${PAID_PLANS_LABEL} plans.`,
  },
};

export function UpgradeModal({ open, onClose, reason = "credits" }: UpgradeModalProps) {
  if (!open) return null;
  const { title, body } = COPY[reason];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative glass-card rounded-3xl p-8 max-w-sm w-full text-center">
        <h3 className="font-display text-xl text-white/85 mb-2">{title}</h3>
        <p className="text-sm text-white/40 leading-relaxed mb-6">{body}</p>
        <div className="flex flex-col gap-2">
          {reason === "signin" ? (
            <CosmicButton href="/auth" className="w-full">Sign in free</CosmicButton>
          ) : (
            <CosmicButton href="/pricing" className="w-full">View plans</CosmicButton>
          )}
          {reason !== "signin" && (
            <Link
              href="/auth"
              className="text-xs text-white/30 hover:text-white/50 py-2"
              onClick={onClose}
            >
              Sign in for free trials
            </Link>
          )}
          <button
            type="button"
            onClick={onClose}
            className="text-xs text-white/25 hover:text-white/40 py-1"
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}
