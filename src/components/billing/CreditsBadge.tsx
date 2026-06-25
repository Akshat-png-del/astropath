"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { useBilling } from "@/hooks/useBilling";
import { useAuth } from "@/contexts/AuthContext";
import { CREDIT_COSTS } from "@/lib/billing/plans";

export function CreditsBadge() {
  const { user } = useAuth();
  const { credits, unlimitedChat, tier, loading } = useBilling();

  if (!user || loading) return null;

  return (
    <Link
      href="/pricing"
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-[11px] text-white/50 hover:text-white/70 hover:border-white/20 transition-colors"
    >
      <Sparkles className="w-3 h-3" />
      {unlimitedChat ? (
        <span className="capitalize">{tier} · unlimited chat & tarot</span>
      ) : (
        <span>{credits} credits · {CREDIT_COSTS.chatMessage}/msg</span>
      )}
    </Link>
  );
}
