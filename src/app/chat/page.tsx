"use client";

import { ChatInterface } from "@/components/chat/ChatInterface";
import { CreditsBadge } from "@/components/billing/CreditsBadge";
import { CosmicButton } from "@/components/cosmic/CosmicButton";
import { PageTransition } from "@/components/cosmic/FadeIn";
import { PageHeader } from "@/components/layout/PageHeader";
import { useAppStore } from "@/stores/useAppStore";

export default function ChatPage() {
  const currentReport = useAppStore((s) => s.currentReport);

  const actions = (
    <>
      <CreditsBadge />
      <CosmicButton variant="secondary" size="sm" href="/tarot">
        Tarot
      </CosmicButton>
      {currentReport && (
        <CosmicButton variant="secondary" size="sm" href="/dashboard">
          Report
        </CosmicButton>
      )}
    </>
  );

  return (
    <PageTransition>
      <div className="flex flex-col h-dvh max-h-dvh overflow-hidden">
        <PageHeader
          icon="☽"
          title="Cosmic Mirror"
          subtitle="Your guide"
          actions={actions}
          mobileActions={actions}
        />
        <div className="flex-1 min-h-0 overflow-hidden w-full max-w-2xl mx-auto">
          <ChatInterface />
        </div>
      </div>
    </PageTransition>
  );
}
