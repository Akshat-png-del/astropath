"use client";

import { useState, useMemo } from "react";
import { IraIntro } from "./IraIntro";
import { TarotSpreadGrid } from "./TarotSpreadGrid";
import { TarotQuestionStep } from "./TarotQuestionStep";
import { TarotShuffleStep } from "./TarotShuffleStep";
import { TarotCardPicker } from "./TarotCardPicker";
import { TarotReadingView } from "./TarotReadingView";
import { TarotTrustNotice } from "./TarotTrustNotice";
import type { TarotReadingResult, TarotSpread, TarotStep } from "@/lib/tarot/types";
import {
  createShuffledDeck,
  drawDeckIndex,
  isDrawComplete,
  pickCardsFromIndices,
  reshuffleDeck,
  undoLastDraw,
  type ShuffledDeck,
} from "@/lib/tarot/deck";
import { buildReading } from "@/lib/tarot/interpretation";
import { useAuth } from "@/contexts/AuthContext";
import {
  useBilling,
  incrementAnonymousTarotCount,
  hasAnonymousTarotTrialLeft,
} from "@/hooks/useBilling";
import { consumeCredits } from "@/lib/firebase/credits";
import { chargeCreditAmount } from "@/lib/billing/credit-ledger";
import { OutOfCreditsPanel } from "@/components/billing/OutOfCreditsPanel";
import { UpgradeModal } from "@/components/billing/UpgradeModal";
import { CreditStatusBanner } from "@/components/billing/CreditStatusBanner";
import {
  resolveTarotCost,
  canAffordTarot,
  markTarotFreeUsage,
  type ResolvedTarotCost,
} from "@/lib/billing/daily-free";
import { useRetention } from "@/hooks/useRetention";
import { StepProgress } from "@/components/layout/StepProgress";

const FLOW_STEPS = ["Welcome", "Spread", "Question", "Shuffle", "Draw", "Reading"];

const STEP_INDEX: Record<TarotStep, number> = {
  intro: 0,
  spreads: 1,
  question: 2,
  shuffle: 3,
  pick: 4,
  reading: 5,
};

async function chargeForTarotReading(
  userId: string | undefined,
  spread: TarotSpread,
  resolved: ResolvedTarotCost,
  usesFreeCredits: boolean
): Promise<{ ok: boolean }> {
  if (resolved.cost === 0) {
    markTarotFreeUsage(resolved.reason, spread.id);
    if (resolved.reason === "anonymous-trial") {
      incrementAnonymousTarotCount();
      return { ok: true };
    }
    if (userId && (resolved.reason === "monthly-trial" || resolved.reason === "unlimited")) {
      const result = await consumeCredits(userId, "tarotReading", 0);
      return { ok: result.ok };
    }
    return { ok: true };
  }

  if (!userId) {
    const result = chargeCreditAmount(
      resolved.cost,
      `${spread.name} reading`,
      "tarot",
      false
    );
    return { ok: result.ok };
  }

  if (usesFreeCredits) {
    const result = chargeCreditAmount(
      resolved.cost,
      `${spread.name} reading`,
      "tarot",
      true
    );
    return { ok: result.ok };
  }

  const result = await consumeCredits(userId, "tarotReading", resolved.cost);
  return { ok: result.ok };
}

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
  const [outOfCreditsOpen, setOutOfCreditsOpen] = useState(false);
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [upgradeReason, setUpgradeReason] = useState<"credits" | "signin">("credits");
  const [chargeError, setChargeError] = useState<string | null>(null);
  const [readingSaved, setReadingSaved] = useState(false);
  const { logHistory, recordTarot, saveReading } = useRetention();

  const costContext = useMemo(
    () => ({
      spreadId: spread?.id ?? "",
      unlimitedTarot: billing.unlimitedTarot,
      tarotTrialLeft: billing.tarotTrialLeft && !!user?.uid,
      anonymousTrialLeft: !user?.uid && hasAnonymousTarotTrialLeft(),
      credits: billing.credits,
    }),
    [spread?.id, billing.unlimitedTarot, billing.tarotTrialLeft, billing.credits, user?.uid]
  );

  const resolvedCost = spread ? resolveTarotCost(costContext) : null;

  const reset = () => {
    setStep("intro");
    setSpread(null);
    setQuestion("");
    setDeck(createShuffledDeck());
    setShuffleCount(0);
    setSelectedIndices([]);
    setResult(null);
    setChargeError(null);
    setReadingSaved(false);
  };

  const trySelectSpread = (s: TarotSpread) => {
    const ctx = {
      spreadId: s.id,
      unlimitedTarot: billing.unlimitedTarot,
      tarotTrialLeft: billing.tarotTrialLeft && !!user?.uid,
      anonymousTrialLeft: !user?.uid && hasAnonymousTarotTrialLeft(),
      credits: billing.credits,
    };

    if (!canAffordTarot(ctx)) {
      if (!user?.uid && !hasAnonymousTarotTrialLeft()) {
        setUpgradeReason("signin");
        setUpgradeOpen(true);
        return;
      }
      setUpgradeReason("credits");
      setOutOfCreditsOpen(true);
      return;
    }

    setSpread(s);
    setStep("question");
    setDeck(createShuffledDeck());
    setShuffleCount(0);
    setSelectedIndices([]);
    setChargeError(null);
  };

  const handleShuffle = () => {
    setDeck((d) => reshuffleDeck(d));
    setShuffleCount((c) => c + 1);
    setSelectedIndices([]);
  };

  const handleSelectCard = (index: number) => {
    if (!spread) return;
    setSelectedIndices((prev) =>
      drawDeckIndex(prev, index, spread.cardCount, deck.cards.length)
    );
  };

  const handleUndoLastCard = () => {
    setSelectedIndices((prev) => undoLastDraw(prev));
  };

  const handleReveal = async () => {
    if (!spread || !resolvedCost) return;
    if (!isDrawComplete(selectedIndices, spread.cardCount)) return;
    setChargeError(null);

    const picks = pickCardsFromIndices(deck, selectedIndices);
    const reading = buildReading(spread, question, picks);

    const charged = await chargeForTarotReading(
      user?.uid,
      spread,
      resolvedCost,
      billing.usesFreeCredits
    );

    if (!charged.ok) {
      setChargeError("Could not complete billing — your reading was not saved. No credits were deducted.");
      setOutOfCreditsOpen(true);
      return;
    }

    setResult(reading);
    setStep("reading");
    recordTarot();
    logHistory({
      type: "tarot",
      title: `${spread.name}${question ? `: ${question.slice(0, 40)}` : ""}`,
      summary: reading.summary.slice(0, 200),
      payload: { spreadId: spread.id, question, cardNames: reading.cards.map((c) => c.card.name) },
    });
  };

  return (
    <div className="py-4 sm:py-8">
      {outOfCreditsOpen && (
        <OutOfCreditsPanel context="tarot" onClose={() => setOutOfCreditsOpen(false)} />
      )}

      <UpgradeModal open={upgradeOpen} onClose={() => setUpgradeOpen(false)} reason={upgradeReason} />

      {step !== "reading" && (
        <StepProgress
          steps={FLOW_STEPS}
          currentIndex={STEP_INDEX[step]}
          className="mb-10 sm:mb-12"
        />
      )}

      {step !== "reading" && (
        <CreditStatusBanner
          className="mb-8"
          spreadCostLabel={resolvedCost?.label}
        />
      )}

      {chargeError && (
        <p className="text-center text-xs text-amber-400/70 mb-4" role="alert">
          {chargeError}
        </p>
      )}

      {step === "intro" && <IraIntro onContinue={() => setStep("spreads")} />}

      {step === "spreads" && <TarotSpreadGrid onSelect={trySelectSpread} />}

      {step === "question" && spread && (
        <TarotQuestionStep
          spread={spread}
          question={question}
          costLabel={resolvedCost?.label}
          onQuestionChange={setQuestion}
          onContinue={() => setStep("shuffle")}
          onBack={() => setStep("spreads")}
        />
      )}

      {step === "shuffle" && (
        <TarotShuffleStep
          shuffleCount={shuffleCount}
          onShuffle={handleShuffle}
          onContinue={() => {
            setSelectedIndices([]);
            setStep("pick");
          }}
          onBack={() => {
            setSelectedIndices([]);
            setStep("question");
          }}
        />
      )}

      {step === "pick" && spread && (
        <TarotCardPicker
          spread={spread}
          deck={deck}
          selectedIndices={selectedIndices}
          costLabel={resolvedCost?.label}
          onSelect={handleSelectCard}
          onUndoLast={handleUndoLastCard}
          onReveal={handleReveal}
          onBack={() => {
            setSelectedIndices([]);
            setStep("shuffle");
          }}
        />
      )}

      {step === "reading" && result && (
        <TarotReadingView
          result={result}
          onNewReading={reset}
          saved={readingSaved}
          onSave={() => {
            saveReading({
              type: "tarot",
              title: `${result.spread.name}${result.question ? `: ${result.question.slice(0, 40)}` : ""}`,
              summary: result.summary.slice(0, 300),
              payload: result as unknown as Record<string, unknown>,
            });
            setReadingSaved(true);
          }}
        />
      )}

      <TarotTrustNotice className="mt-14 sm:mt-16" />
    </div>
  );
}
