"use client";

import { useState } from "react";
import { IraIntro } from "./IraIntro";
import { TarotSpreadGrid } from "./TarotSpreadGrid";
import { TarotQuestionStep } from "./TarotQuestionStep";
import { TarotShuffleStep } from "./TarotShuffleStep";
import { TarotCardPicker } from "./TarotCardPicker";
import { TarotReadingView } from "./TarotReadingView";
import type { TarotReadingResult, TarotSpread, TarotStep } from "@/lib/tarot/types";
import { createShuffledDeck, pickCardsFromIndices, reshuffleDeck, type ShuffledDeck } from "@/lib/tarot/deck";
import { buildReading } from "@/lib/tarot/interpretation";
import { useAuth } from "@/contexts/AuthContext";
import {
  useBilling,
  incrementAnonymousTarotCount,
  hasAnonymousTarotTrialLeft,
} from "@/hooks/useBilling";
import { consumeCredits } from "@/lib/firebase/credits";
import { UpgradeModal } from "@/components/billing/UpgradeModal";
import { CREDIT_COSTS } from "@/lib/billing/plans";

export function TarotExperience() {
  const { user } = useAuth();
  const billing = useBilling();
  const [step, setStep] = useState<TarotStep>("intro");
  const [spread, setSpread] = useState<TarotSpread | null>(null);
  const [question, setQuestion] = useState("");
  const [deck, setDeck] = useState<ShuffledDeck>(() => createShuffledDeck());
  const [shuffleCount, setShuffleCount] = useState(0);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [result, setResult] = useState<TarotReadingResult | null>(null);
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [upgradeReason, setUpgradeReason] = useState<"tarot" | "signin" | "credits">("tarot");

  const reset = () => {
    setStep("intro");
    setSpread(null);
    setQuestion("");
    setDeck(createShuffledDeck());
    setShuffleCount(0);
    setSelectedIndices([]);
    setResult(null);
  };

  const handleSpreadSelect = (s: TarotSpread) => {
    if (user?.uid && !billing.canTarot) {
      setUpgradeReason("credits");
      setUpgradeOpen(true);
      return;
    }
    if (!user?.uid && !hasAnonymousTarotTrialLeft()) {
      setUpgradeReason("signin");
      setUpgradeOpen(true);
      return;
    }
    setSpread(s);
    setStep("question");
    setDeck(createShuffledDeck());
    setShuffleCount(0);
    setSelectedIndices([]);
  };

  const handleShuffle = () => {
    setDeck((d) => reshuffleDeck(d));
    setShuffleCount((c) => c + 1);
  };

  const handleToggleCard = (index: number) => {
    if (!spread) return;
    setSelectedIndices((prev) => {
      if (prev.includes(index)) return prev.filter((i) => i !== index);
      if (prev.length >= spread.cardCount) return prev;
      return [...prev, index];
    });
  };

  const handleReveal = async () => {
    if (!spread) return;

    if (!user?.uid) {
      if (!hasAnonymousTarotTrialLeft()) {
        setUpgradeReason("signin");
        setUpgradeOpen(true);
        return;
      }
      incrementAnonymousTarotCount();
    } else {
      const consumed = await consumeCredits(user.uid, "tarotReading");
      if (!consumed.ok) {
        setUpgradeReason("credits");
        setUpgradeOpen(true);
        return;
      }
    }

    const picks = pickCardsFromIndices(deck, selectedIndices);
    const reading = buildReading(spread, question, picks);
    setResult(reading);
    setStep("reading");
  };

  const trialHint = !user
    ? billing.canTarotAnonymous
      ? "1 free reading without sign-in"
      : "Sign in for more readings"
    : billing.unlimitedTarot
      ? "Unlimited on your plan"
      : billing.tarotTrialLeft
        ? "1 free reading this month · then 2 credits each"
        : `${CREDIT_COSTS.tarotReading} credits per reading`;

  return (
    <div className="px-4 py-8 sm:py-12">
      <UpgradeModal open={upgradeOpen} onClose={() => setUpgradeOpen(false)} reason={upgradeReason} />

      {step !== "reading" && (
        <p className="text-center text-[10px] text-white/25 tracking-wider uppercase mb-6">{trialHint}</p>
      )}

      {step === "intro" && <IraIntro onContinue={() => setStep("spreads")} />}

      {step === "spreads" && <TarotSpreadGrid onSelect={handleSpreadSelect} />}

      {step === "question" && spread && (
        <TarotQuestionStep
          spread={spread}
          question={question}
          onQuestionChange={setQuestion}
          onContinue={() => setStep("shuffle")}
          onBack={() => setStep("spreads")}
        />
      )}

      {step === "shuffle" && (
        <TarotShuffleStep
          shuffleCount={shuffleCount}
          onShuffle={handleShuffle}
          onContinue={() => setStep("pick")}
          onBack={() => setStep("question")}
        />
      )}

      {step === "pick" && spread && (
        <TarotCardPicker
          spread={spread}
          deck={deck}
          selectedIndices={selectedIndices}
          onToggle={handleToggleCard}
          onReveal={handleReveal}
          onBack={() => setStep("shuffle")}
        />
      )}

      {step === "reading" && result && (
        <TarotReadingView result={result} onNewReading={reset} />
      )}
    </div>
  );
}
