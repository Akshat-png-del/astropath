"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { useBilling } from "@/hooks/useBilling";
import { useAuth } from "@/contexts/AuthContext";
import { CREDIT_COSTS, FREE_TRIAL_CREDITS } from "@/lib/billing/plans";

export function CreditsBadge() {
  const { user } = useAuth();
  const { credits, unlimitedChat, tier, loading, anonymousCredits, isAnonymousTrial } = useBilling();

  if (!isAnonymousTrial && (!user || loading)) return null;

  const href = "/dashboard";

  if (isAnonymousTrial) {
    return (
      <Link
        href={href}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-[11px] text-white/50 hover:text-white/70 hover:border-white/20 transition-colors"
      >
        <Sparkles className="w-3 h-3" />
        <span>
          {anonymousCredits}/{FREE_TRIAL_CREDITS} credits
        </span>
      </Link>
    );
  }

  if (tier === "free" && !unlimitedChat) {
    return (
      <Link
        href={href}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-[11px] text-white/50 hover:text-white/70 hover:border-white/20 transition-colors"
      >
        <Sparkles className="w-3 h-3" />
        <span>
          {credits}/{FREE_TRIAL_CREDITS} credits
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-[11px] text-white/50 hover:text-white/70 hover:border-white/20 transition-colors"
    >
      <Sparkles className="w-3 h-3" />
      {unlimitedChat ? (
        <span className="capitalize">{tier} · unlimited</span>
      ) : (
        <span>
          {credits} credits · {CREDIT_COSTS.chatMessage}/msg
        </span>
      )}
    </Link>
  );
}
