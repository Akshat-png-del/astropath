"use client";

import Link from "next/link";
import { STELLAR_PLAN_NAME } from "@/lib/brand";
import { CosmicButton } from "@/components/cosmic/CosmicButton";

interface FeatureGateProps {
  locked: boolean;
  title: string;
  description: string;
  upgradeHref?: string;
  children: React.ReactNode;
}

/** Blur + upgrade CTA when feature requires paid plan */
export function FeatureGate({
  locked,
  title,
  description,
  upgradeHref = "/pricing",
  children,
}: FeatureGateProps) {
  if (!locked) return <>{children}</>;

  return (
    <div className="relative">
      <div className="pointer-events-none select-none opacity-40 blur-[2px]">{children}</div>
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="glass-card rounded-2xl p-6 text-center max-w-xs border border-white/10">
          <h4 className="font-display text-base text-white/80 mb-2">{title}</h4>
          <p className="text-xs text-white/35 mb-4 leading-relaxed">{description}</p>
          <CosmicButton size="sm" href={upgradeHref} className="w-full">
            Upgrade to {STELLAR_PLAN_NAME}
          </CosmicButton>
          <Link href="/auth" className="block text-[10px] text-white/25 mt-3 hover:text-white/40">
            Or sign in for free trials
          </Link>
        </div>
      </div>
    </div>
  );
}
