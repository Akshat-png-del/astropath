"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  ADSENSE_CLIENT_ID,
  getAdSlotId,
  isAdSenseConfigured,
} from "@/lib/ads/adsense";

import type { AdSlotVariant } from "@/lib/ads/adsense";
import { STELLAR_PLAN_NAME } from "@/lib/brand";
import { useShowAds } from "@/hooks/useShowAds";

interface AdBannerProps {
  variant?: AdSlotVariant;
  className?: string;
  showUpgradeHint?: boolean;
}

export function FreePlanAd({
  variant = "banner",
  className,
  showUpgradeHint = true,
}: AdBannerProps) {
  const { show, loading } = useShowAds();
  const pushed = useRef(false);

  useEffect(() => {
    if (!show || !isAdSenseConfigured() || pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense may block in dev or before approval
    }
  }, [show]);

  if (!isAdSenseConfigured() || loading || !show) return null;

  const slot = getAdSlotId(variant);

  return (
    <aside
      className={cn(
        "ad-slot relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6",
        className
      )}
      aria-label="Advertisement"
    >
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/[0.04]">
          <span className="text-[9px] tracking-[0.2em] uppercase text-white/20">
            Sponsored
          </span>
          {showUpgradeHint && (
            <Link
              href="/pricing"
              className="text-[10px] text-white/30 hover:text-white/50 transition-colors"
            >
              Go ad-free with {STELLAR_PLAN_NAME} →
            </Link>
          )}
        </div>
        <div className="min-h-[90px] flex items-center justify-center p-2">
          <ins
            className="adsbygoogle block w-full"
            style={{ display: "block", minHeight: 90 }}
            data-ad-client={ADSENSE_CLIENT_ID}
            data-ad-slot={slot}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      </div>
    </aside>
  );
}
