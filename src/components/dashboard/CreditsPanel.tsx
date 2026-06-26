"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles, MessageCircle, ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/cosmic/GlassCard";
import { CosmicButton } from "@/components/cosmic/CosmicButton";
import { useAuth } from "@/contexts/AuthContext";
import { useBilling } from "@/hooks/useBilling";
import {
  CREDITS_UPDATED_EVENT,
  getCreditHistory,
  type CreditHistoryEntry,
} from "@/lib/billing/anonymous-credits";
import { CREDIT_COSTS, FREE_TRIAL_CREDITS } from "@/lib/billing/plans";
import { BILLING_REFRESH_EVENT } from "@/lib/billing/refresh";

function formatTime(iso: string): string {
  try {
    return new Intl.DateTimeFormat(undefined, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function activityLabel(type: CreditHistoryEntry["type"]): string {
  switch (type) {
    case "chat":
      return "Chat message";
    case "tarot":
      return "Tarot reading";
    case "report":
      return "Detailed report";
    case "forecast":
      return "Monthly forecast";
    default:
      return "Activity";
  }
}

export function CreditsPanel() {
  const { user } = useAuth();
  const billing = useBilling();
  const [history, setHistory] = useState<CreditHistoryEntry[]>([]);

  useEffect(() => {
    const load = () => setHistory(getCreditHistory());
    load();
    window.addEventListener(CREDITS_UPDATED_EVENT, load);
    window.addEventListener(BILLING_REFRESH_EVENT, load);
    return () => {
      window.removeEventListener(CREDITS_UPDATED_EVENT, load);
      window.removeEventListener(BILLING_REFRESH_EVENT, load);
    };
  }, [user, billing.credits, billing.anonymousCredits, billing.creditsUsedThisPeriod]);

  const isAnonymous = !user;
  const isFreePlan = isAnonymous || billing.tier === "free";
  const unlimited = !!user && billing.unlimitedChat;
  const remaining = isAnonymous ? billing.anonymousCredits : billing.credits;
  const planLimit = isFreePlan && !unlimited ? FREE_TRIAL_CREDITS : null;
  const used = planLimit != null ? billing.creditsUsedThisPeriod : null;
  const pct = planLimit ? Math.min(100, (remaining / planLimit) * 100) : 100;

  return (
    <GlassCard glow className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-white/25 mb-2">
            {isFreePlan ? "Free trial credits" : "Your credits"}
          </p>
          <h2 className="font-display text-2xl sm:text-3xl text-white/85 mb-1">
            {unlimited ? (
              "Unlimited credits"
            ) : (
              <>
                <span className="text-gradient">{remaining}</span>
                <span className="text-white/35 text-lg sm:text-xl"> credits remaining</span>
              </>
            )}
          </h2>
          <p className="text-sm text-white/35">
            {unlimited
              ? "Cosmic & Oracle plans include unlimited chat and tarot."
              : planLimit != null
                ? `${CREDIT_COSTS.chatMessage} credit per message · ${planLimit} credits included on Free plan`
                : `${CREDIT_COSTS.chatMessage} credit per message`}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 shrink-0">
          <CosmicButton size="sm" href="/chat">
            <MessageCircle className="w-3.5 h-3.5" /> Chat
          </CosmicButton>
          {isAnonymous && (
            <CosmicButton variant="secondary" size="sm" href="/auth">
              Sign in to save progress
            </CosmicButton>
          )}
          {!isAnonymous && !unlimited && remaining === 0 && (
            <CosmicButton variant="secondary" size="sm" href="/pricing">
              Upgrade for more
            </CosmicButton>
          )}
        </div>
      </div>

      {!unlimited && planLimit != null && (
        <div className="mb-6">
          <div className="flex justify-between text-[10px] text-white/25 uppercase tracking-wider mb-2">
            <span>{planLimit} free credits</span>
            <span>
              {used} used · {remaining} left
            </span>
          </div>
          <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-white/40 to-white/70 transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs text-white/40 uppercase tracking-wider">Usage history</h3>
          <Sparkles className="w-3.5 h-3.5 text-white/20" />
        </div>

        {history.length === 0 ? (
          <p className="text-sm text-white/25 py-6 text-center border border-dashed border-white/[0.06] rounded-xl">
            No messages yet. Start a chat — each message uses {CREDIT_COSTS.chatMessage} credit.
          </p>
        ) : (
          <ul className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {history.map((entry) => (
              <li
                key={entry.id}
                className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-white/25 uppercase tracking-wider mb-0.5">
                    {activityLabel(entry.type)} · {formatTime(entry.timestamp)}
                  </p>
                  <p className="text-sm text-white/55 truncate">&ldquo;{entry.message}&rdquo;</p>
                </div>
                <div className="flex items-center gap-3 shrink-0 text-xs">
                  <span className="text-white/30">−{entry.creditsUsed} cr</span>
                  <span className="text-white/50">{entry.creditsRemaining} left</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {isFreePlan && !unlimited && remaining === 0 && (
        <div className="mt-5 pt-5 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-sm text-white/40">
            {isAnonymous
              ? "Trial credits used up. Sign in for a fresh monthly allowance."
              : "Free credits used up. Upgrade for unlimited access."}
          </p>
          <Link
            href={isAnonymous ? "/auth" : "/pricing"}
            className="inline-flex items-center gap-1 text-sm text-white/60 hover:text-white/80"
          >
            {isAnonymous ? "Create free account" : "View plans"}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </GlassCard>
  );
}
