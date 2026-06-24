"use client";

import { ChatInterface } from "@/components/chat/ChatInterface";
import { CosmicButton } from "@/components/cosmic/CosmicButton";
import { PageTransition } from "@/components/cosmic/FadeIn";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useAppStore } from "@/stores/useAppStore";

export default function ChatPage() {
  const currentReport = useAppStore((s) => s.currentReport);

  return (
    <PageTransition>
      <div className="flex flex-col h-screen">
        <header className="flex items-center justify-between px-5 py-4 border-b border-white/[0.04] bg-[#050505]/80 backdrop-blur-2xl">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-white/30 hover:text-white/60 transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/50 text-sm">☽</div>
              <div>
                <h1 className="font-display text-sm text-white/70">Cosmic Mirror</h1>
                <p className="text-[10px] text-white/25 tracking-wider uppercase">Your guide</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CosmicButton variant="secondary" size="sm" href="/tarot">Tarot</CosmicButton>
            {currentReport && (
              <CosmicButton variant="secondary" size="sm" href="/dashboard">View Report</CosmicButton>
            )}
          </div>
        </header>
        <div className="flex-1 overflow-hidden max-w-2xl w-full mx-auto">
          <ChatInterface />
        </div>
      </div>
    </PageTransition>
  );
}
