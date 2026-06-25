"use client";

import { TarotExperience } from "@/components/tarot/TarotExperience";
import { PageTransition } from "@/components/cosmic/FadeIn";
import { CosmicButton } from "@/components/cosmic/CosmicButton";
import { CreditsBadge } from "@/components/billing/CreditsBadge";
import { PageHeader } from "@/components/layout/PageHeader";

export default function TarotPage() {
  const actions = (
    <>
      <CreditsBadge />
      <CosmicButton variant="secondary" size="sm" href="/pricing">
        Plans
      </CosmicButton>
      <CosmicButton variant="secondary" size="sm" href="/chat">
        Chat
      </CosmicButton>
    </>
  );

  return (
    <PageTransition>
      <div className="min-h-dvh flex flex-col overflow-x-hidden">
        <PageHeader
          icon="✦"
          title="Tarot Reading"
          subtitle="1 free trial · then credits or plan"
          actions={actions}
          mobileActions={actions}
        />
        <main className="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-6 pb-safe-bottom">
          <TarotExperience />
        </main>
      </div>
    </PageTransition>
  );
}
