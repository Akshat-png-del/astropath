"use client";

import { useCallback, useState } from "react";
import { IraIntro } from "./IraIntro";
import { TarotSpreadGrid } from "./TarotSpreadGrid";
import { TarotQuestionStep } from "./TarotQuestionStep";
import { TarotShuffleStep } from "./TarotShuffleStep";
import { TarotCardPicker } from "./TarotCardPicker";
import { TarotReadingView } from "./TarotReadingView";
import type { TarotReadingResult, TarotSpread, TarotStep } from "@/lib/tarot/types";
import { createShuffledDeck, pickCardsFromIndices, reshuffleDeck, type ShuffledDeck } from "@/lib/tarot/deck";
import { buildReading } from "@/lib/tarot/interpretation";

export function TarotExperience() {
  const [step, setStep] = useState<TarotStep>("intro");
  const [spread, setSpread] = useState<TarotSpread | null>(null);
  const [question, setQuestion] = useState("");
  const [deck, setDeck] = useState<ShuffledDeck>(() => createShuffledDeck());
  const [shuffleCount, setShuffleCount] = useState(0);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [result, setResult] = useState<TarotReadingResult | null>(null);

  const reset = useCallback(() => {
    setStep("intro");
    setSpread(null);
    setQuestion("");
    setDeck(createShuffledDeck());
    setShuffleCount(0);
    setSelectedIndices([]);
    setResult(null);
  }, []);

  const handleSpreadSelect = (s: TarotSpread) => {
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

  const handleReveal = () => {
    if (!spread) return;
    const picks = pickCardsFromIndices(deck, selectedIndices);
    const reading = buildReading(spread, question, picks);
    setResult(reading);
    setStep("reading");
  };

  return (
    <div className="px-4 py-8 sm:py-12">
      {step === "intro" && <IraIntro onContinue={() => setStep("spreads")} />}

      {step === "spreads" && (
        <TarotSpreadGrid onSelect={handleSpreadSelect} />
      )}

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
