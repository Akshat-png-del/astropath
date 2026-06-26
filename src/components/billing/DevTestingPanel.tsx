"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { FREE_TRIAL_CREDITS } from "@/lib/billing/credits-constants";
import { isDevEnvironment, isDevTestUser } from "@/lib/billing/dev-test-user";
import { refreshBilling } from "@/lib/billing/refresh";

export function DevTestingPanel() {
  const { user } = useAuth();
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isDevEnvironment() || !user || !isDevTestUser(user.uid)) {
    return null;
  }

  async function resetCredits() {
    setLoading(true);
    setStatus(null);
    try {
      const token = await user!.getIdToken();
      const res = await fetch("/api/dev/reset-credits", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus(data.error ?? "Reset failed");
        if (data.hint) setStatus((s) => `${s}\n${data.hint}`);
      } else {
        setStatus(data.message ?? "Credits reset.");
        refreshBilling();
      }
    } catch {
      setStatus("Network error — dev bypass still allows unlimited chat.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.06] p-4 mb-6 space-y-3">
      <p className="text-xs text-amber-200/70 uppercase tracking-wider">Dev testing (you only)</p>
      <p className="text-sm text-white/50 leading-relaxed">
        Unlimited chat is active for your UID in development. Use reset to set Firestore credits to {FREE_TRIAL_CREDITS}
        (requires Firebase Admin in <code className="text-white/40">.env.local</code>).
      </p>
      <p className="text-[10px] text-white/25 font-mono break-all">UID: {user.uid}</p>
      <button
        type="button"
        onClick={() => void resetCredits()}
        disabled={loading}
        className="text-xs px-3 py-2 rounded-lg border border-amber-500/30 text-amber-100/80 hover:bg-amber-500/10 disabled:opacity-50"
      >
        {loading ? "Resetting…" : `Reset credits to ${FREE_TRIAL_CREDITS}`}
      </button>
      {status && <p className="text-xs text-white/40 whitespace-pre-wrap">{status}</p>}
    </div>
  );
}
