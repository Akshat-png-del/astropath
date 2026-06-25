"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { MessageBubble, ThinkingIndicator } from "./MessageBubble";
import { BirthDetailsFormComponent } from "./BirthDetailsForm";
import { ChatHistoryPanel } from "./ChatHistoryPanel";
import { useAppStore } from "@/stores/useAppStore";
import { useAuth } from "@/contexts/AuthContext";
import { generateId } from "@/lib/utils";
import {
  saveLocalChat,
  loadLocalChat,
  ensureFirebaseConversation,
  persistMessageToFirestore,
  trackAnalytics,
} from "@/lib/firebase/chat-persistence";
import { consumeCredits } from "@/lib/firebase/credits";
import { saveCosmicReport, saveBirthProfile } from "@/lib/firebase/firestore";
import { ANONYMOUS_MESSAGE_LIMIT } from "@/lib/billing/plans";
import {
  useBilling,
  getAnonymousMessageCount,
  incrementAnonymousMessageCount,
} from "@/hooks/useBilling";
import { UpgradeModal } from "@/components/billing/UpgradeModal";
import { Send, RotateCcw, History } from "lucide-react";
import type { BirthDetailsForm, Conversation, ConversationMessage } from "@/types";
import { CHAT_GREETING } from "@/lib/ai/chat-constants";
import { CHAT_EXAMPLE_CHIPS, INPUT_PLACEHOLDER } from "@/lib/ai/birth-examples";

function createGreetingMessages(conversationId: string): ConversationMessage[] {
  return [
    {
      id: generateId(),
      conversationId,
      role: "assistant",
      content: CHAT_GREETING,
      timestamp: new Date(),
    },
  ];
}

export function ChatInterface() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const greetingSet = useRef(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [upgradeReason, setUpgradeReason] = useState<import("@/components/billing/UpgradeModal").UpgradeReason>("credits");
  const { user, firebaseReady } = useAuth();
  const billing = useBilling();

  const store = useAppStore();
  const {
    messages, addMessage, setMessages, updateMessage,
    isLoading, setIsLoading, isStreaming, setIsStreaming,
    phase, setPhase, insights, addInsights,
    showBirthForm, setShowBirthForm, birthDetails, setBirthDetails,
    setCurrentReport, conversationId, setConversationId, user: storeUser, resetChat,
  } = store;

  const persistSnapshot = useCallback(() => {
    const s = useAppStore.getState();
    const cid = s.conversationId ?? generateId();
    if (!s.conversationId) setConversationId(cid);

    saveLocalChat({
      conversationId: cid,
      messages: s.messages
        .filter((m) => m.content && !m.isStreaming)
        .map((m) => ({
          id: m.id,
          role: m.role,
          content: m.content,
          timestamp: m.timestamp.toISOString(),
        })),
      phase: s.phase,
      insights: s.insights,
      updatedAt: new Date().toISOString(),
    });
  }, [setConversationId]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, isLoading, isThinking, showBirthForm, scrollToBottom]);

  // Keep input visible when mobile keyboard opens
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;

    const syncKeyboardOffset = () => {
      const offset = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
      document.documentElement.style.setProperty("--keyboard-offset", `${offset}px`);
      if (offset > 0) scrollToBottom();
    };

    vv.addEventListener("resize", syncKeyboardOffset);
    vv.addEventListener("scroll", syncKeyboardOffset);
    syncKeyboardOffset();

    return () => {
      vv.removeEventListener("resize", syncKeyboardOffset);
      vv.removeEventListener("scroll", syncKeyboardOffset);
      document.documentElement.style.removeProperty("--keyboard-offset");
    };
  }, [scrollToBottom]);

  // Restore saved session or start fresh
  useEffect(() => {
    if (greetingSet.current) return;

    const local = loadLocalChat();
    if (local && local.messages.length > 0) {
      greetingSet.current = true;
      setConversationId(local.conversationId);
      setMessages(
        local.messages.map((m) => ({
          id: m.id,
          conversationId: local.conversationId,
          role: m.role as "user" | "assistant",
          content: m.content,
          timestamp: new Date(m.timestamp),
        }))
      );
      setPhase(local.phase as Conversation["phase"]);
      return;
    }

    greetingSet.current = true;
    const cid = generateId();
    setConversationId(cid);
    setMessages(createGreetingMessages(cid));
  }, [setConversationId, setMessages, setPhase]);

  // Firebase conversation + analytics when signed in
  useEffect(() => {
    if (!firebaseReady || !user?.uid || !billing.savedHistory) return;
    ensureFirebaseConversation(user.uid, conversationId).then((id) => {
      if (id && id !== conversationId) setConversationId(id);
    });
    trackAnalytics(user.uid, "chat_session_open");
  }, [firebaseReady, user?.uid, conversationId, setConversationId, billing.savedHistory]);

  const streamResponse = async (userContent: string) => {
    const state = useAppStore.getState();
    const assistantId = generateId();

    setIsLoading(true);
    setIsThinking(true);
    setIsStreaming(false);

    let messageStarted = false;

    try {
      const history = useAppStore.getState().messages
        .filter((m) => m.content?.trim())
        .map((m) => ({ role: m.role, content: m.content }));

      const messageCount = history.filter((m) => m.role === "user").length;

      const memories = state.insights.map((i) => `${i.category}: ${i.value}`);

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history,
          phase: state.phase,
          insights: state.insights,
          memories,
          messageCount,
          birthDetails: state.birthDetails,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error ${response.status}`);
      }

      const newPhase = response.headers.get("X-Conversation-Phase") as Conversation["phase"] | null;
      if (newPhase) setPhase(newPhase);

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullContent = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          if (!chunk) continue;

          if (!messageStarted) {
            messageStarted = true;
            setIsThinking(false);
            setIsStreaming(true);
            fullContent = chunk;
            addMessage({
              id: assistantId,
              conversationId: state.conversationId ?? "local",
              role: "assistant",
              content: fullContent,
              timestamp: new Date(),
              isStreaming: true,
            });
          } else {
            fullContent += chunk;
            updateMessage(assistantId, fullContent, true);
          }
        }
      }

      if (!fullContent.trim()) {
        fullContent = "I'm here. What's on your mind?";
      }

      if (!messageStarted) {
        setIsThinking(false);
        addMessage({
          id: assistantId,
          conversationId: state.conversationId ?? "local",
          role: "assistant",
          content: fullContent,
          timestamp: new Date(),
          isStreaming: false,
        });
      } else {
        updateMessage(assistantId, fullContent, false);
      }
      setIsStreaming(false);

      const updatedPhase = newPhase ?? state.phase;
      const userCount = messageCount;
      const missingBirth =
        !state.birthDetails &&
        userCount >= 4 &&
        updatedPhase === "birth_details";

      if (missingBirth && !state.showBirthForm) {
        setTimeout(() => setShowBirthForm(true), 1200);
      }

      // Extract insights (non-blocking)
      fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "extract",
          messages: [
            { role: "user", content: userContent },
            { role: "assistant", content: fullContent },
          ],
        }),
      })
        .then((r) => r.ok ? r.json() : null)
        .then((data) => { if (data?.insights?.length) addInsights(data.insights); })
        .catch(() => {});

      persistSnapshot();
      const cid = useAppStore.getState().conversationId;
      if (cid && user?.uid) {
        if (billing.savedHistory) {
          persistMessageToFirestore(cid, { role: "user", content: userContent });
          persistMessageToFirestore(cid, { role: "assistant", content: fullContent });
        }
        trackAnalytics(user.uid, "chat_message", { phase: updatedPhase });
      }
    } catch {
      const fallback =
        "I'm still here with you. Something interrupted our connection — please send your message again and I'll respond.";
      setIsThinking(false);
      if (!messageStarted) {
        addMessage({
          id: assistantId,
          conversationId: state.conversationId ?? "local",
          role: "assistant",
          content: fallback,
          timestamp: new Date(),
          isStreaming: false,
        });
      } else {
        updateMessage(assistantId, fallback, false);
      }
      setIsStreaming(false);
    } finally {
      setIsLoading(false);
      setIsThinking(false);
      setIsStreaming(false);
    }
  };

  const handleSend = async () => {
    const input = inputRef.current;
    if (!input?.value.trim() || isLoading) return;
    const content = input.value.trim();
    input.value = "";

    addMessage({
      id: generateId(),
      conversationId: conversationId ?? "local",
      role: "user",
      content,
      timestamp: new Date(),
    });

    setIsThinking(true);
    setIsLoading(true);

    if (!user?.uid) {
      if (getAnonymousMessageCount() >= ANONYMOUS_MESSAGE_LIMIT) {
        setUpgradeReason("signin");
        setUpgradeOpen(true);
        setIsThinking(false);
        setIsLoading(false);
        return;
      }
      incrementAnonymousMessageCount();
    } else if (firebaseReady && user?.uid) {
      if (!billing.canChat) {
        setUpgradeReason("credits");
        setUpgradeOpen(true);
        setIsThinking(false);
        setIsLoading(false);
        return;
      }
      const result = await consumeCredits(user.uid, "chatMessage");
      if (!result.ok) {
        setUpgradeReason("credits");
        setUpgradeOpen(true);
        setIsThinking(false);
        setIsLoading(false);
        return;
      }
    }

    await streamResponse(content);
  };

  const handleReset = () => {
    resetChat();
    const cid = generateId();
    setConversationId(cid);
    setMessages(createGreetingMessages(cid));
    trackAnalytics(user?.uid ?? null, "chat_reset");
  };

  const handleHistorySelect = async (id: string, source?: "local" | "cloud") => {
    if (source === "cloud" && user?.uid) {
      const { loadFirebaseConversation } = await import("@/lib/firebase/chat-persistence");
      const remote = await loadFirebaseConversation(id);
      if (remote) {
        setConversationId(remote.conversationId);
        setMessages(
          remote.messages.map((m) => ({
            id: m.id,
            conversationId: remote.conversationId,
            role: m.role as "user" | "assistant",
            content: m.content,
            timestamp: new Date(m.timestamp),
          }))
        );
        setPhase(remote.phase as Conversation["phase"]);
        return;
      }
    }
    const local = loadLocalChat();
    if (!local || local.conversationId !== id) return;
    setConversationId(local.conversationId);
    setMessages(
      local.messages.map((m) => ({
        id: m.id,
        conversationId: local.conversationId,
        role: m.role as "user" | "assistant",
        content: m.content,
        timestamp: new Date(m.timestamp),
      }))
    );
    setPhase(local.phase as Conversation["phase"]);
  };

  const handleBirthSubmit = async (details: BirthDetailsForm) => {
    if (!user?.uid) {
      setUpgradeReason("signin");
      setUpgradeOpen(true);
      return;
    }
    if (!billing.canGenerateReport) {
      setUpgradeReason("report");
      setUpgradeOpen(true);
      return;
    }

    const creditResult = await consumeCredits(user.uid, "detailedReport");
    if (!creditResult.ok) {
      setUpgradeReason("report");
      setUpgradeOpen(true);
      return;
    }

    setBirthDetails(details);
    setShowBirthForm(false);
    setIsLoading(true);

    addMessage({
      id: generateId(),
      conversationId: conversationId ?? "local",
      role: "assistant",
      content: "Got your birth details — building your chart now...",
      timestamp: new Date(),
    });

    try {
      let latitude = 0;
      let longitude = 0;
      try {
        const geoRes = await fetch(`/api/geocode?q=${encodeURIComponent(details.birthLocation)}`);
        if (geoRes.ok) {
          const geo = await geoRes.json();
          latitude = geo.latitude ?? 0;
          longitude = geo.longitude ?? 0;
        }
      } catch { /* best-effort */ }

      const chartRes = await fetch("/api/chart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dateOfBirth: details.dateOfBirth,
          timeOfBirth: details.timeOfBirth || "12:00",
          latitude,
          longitude,
        }),
      });

      if (!chartRes.ok) throw new Error("Chart failed");
      const chart = await chartRes.json();

      const chartSummary = `Sun: ${chart.sunSign}, Moon: ${chart.moonSign}, Rising: ${chart.risingSign}`;

      const reportRes = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "report",
          insights: useAppStore.getState().insights,
          chartSummary,
          userName: details.fullName,
          topics: useAppStore.getState().insights.map((i) => i.category),
        }),
      });

      if (!reportRes.ok) throw new Error("Report failed");
      const report = await reportRes.json();

      const fullReport = {
        ...report,
        id: generateId(),
        userId: user?.uid ?? storeUser?.uid ?? "anonymous",
        conversationId: conversationId ?? "local",
        birthProfileId: generateId(),
        sunSign: chart.sunSign,
        moonSign: chart.moonSign,
        risingSign: chart.risingSign,
        createdAt: new Date(),
        curiosityCards: (report.curiosityCards ?? []).map(
          (card: { type: string }, i: number) => ({ ...card, id: `card-${i}` })
        ),
      };

      setCurrentReport(fullReport);
      setPhase("follow_up");
      sessionStorage.setItem("cosmicReport", JSON.stringify(fullReport));

      if (user?.uid) {
        try {
          const birthProfileId = await saveBirthProfile({
            userId: user.uid,
            fullName: details.fullName,
            dateOfBirth: details.dateOfBirth,
            timeOfBirth: details.timeOfBirth || "12:00",
            birthLocation: details.birthLocation,
            latitude,
            longitude,
            timezone: "UTC",
            sunSign: chart.sunSign,
            moonSign: chart.moonSign,
            risingSign: chart.risingSign,
            chartData: chart.chartData ?? { planets: [], houses: [], aspects: [] },
          });
          await saveCosmicReport({
            userId: user.uid,
            conversationId: conversationId ?? "local",
            birthProfileId,
            title: report.title ?? `${details.fullName}'s Cosmic Mirror`,
            summary: report.summary,
            cosmicDna: report.cosmicDna,
            curiosityCards: fullReport.curiosityCards,
            sections: report.sections ?? [],
            sunSign: chart.sunSign,
            moonSign: chart.moonSign,
            risingSign: chart.risingSign,
          });
        } catch {
          // Report still available locally
        }
      }

      addMessage({
        id: generateId(),
        conversationId: conversationId ?? "local",
        role: "assistant",
        content: `${details.fullName}, your report is ready.\n\n${report.summary}\n\nOpen the dashboard for your full reading.`,
        timestamp: new Date(),
      });
    } catch {
      addMessage({
        id: generateId(),
        conversationId: conversationId ?? "local",
        role: "assistant",
        content: "Chart didn't load — please try your birth details again.",
        timestamp: new Date(),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExampleChip = (text: string) => {
    if (inputRef.current) {
      inputRef.current.value = text;
      inputRef.current.focus();
    }
  };

  return (
    <div className="relative flex flex-col h-full min-h-0">
      <UpgradeModal open={upgradeOpen} onClose={() => setUpgradeOpen(false)} reason={upgradeReason} />
      <ChatHistoryPanel
        open={historyOpen}
        onClose={() => setHistoryOpen(false)}
        currentId={conversationId}
        onSelect={handleHistorySelect}
        onNewChat={handleReset}
        userId={user?.uid ?? null}
        cloudHistory={billing.savedHistory}
      />
      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-5">
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            role={msg.role as "user" | "assistant"}
            content={msg.content}
            isStreaming={!!msg.isStreaming && isStreaming}
          />
        ))}
        {isThinking && <ThinkingIndicator />}
        {showBirthForm && (
          <BirthDetailsFormComponent onSubmit={handleBirthSubmit} isLoading={isLoading} />
        )}
        <div ref={messagesEndRef} />
      </div>

      {!showBirthForm && (
        <div className="chat-input-dock shrink-0 border-t border-white/[0.04] bg-[#050505]/90 backdrop-blur-2xl p-3 sm:p-4 safe-bottom">
          <div className="max-w-2xl mx-auto flex items-end gap-2">
            <button
              onClick={() => setHistoryOpen(true)}
              title="Chat history"
              className="flex-shrink-0 w-9 h-9 rounded-full border border-white/[0.08] flex items-center justify-center text-white/25 hover:text-white/50 transition-colors"
            >
              <History className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleReset}
              title="New conversation"
              className="flex-shrink-0 w-9 h-9 rounded-full border border-white/[0.08] flex items-center justify-center text-white/25 hover:text-white/50 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <textarea
              ref={inputRef}
              rows={1}
              placeholder={INPUT_PLACEHOLDER}
              onFocus={() => {
                window.setTimeout(scrollToBottom, 300);
              }}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              disabled={isLoading || (!!user && !billing.loading && !billing.canChat)}
              className="flex-1 resize-none rounded-2xl bg-white/[0.03] border border-white/[0.08] px-4 py-3 text-sm text-white/70 placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-all disabled:opacity-40"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || (!!user && !billing.loading && !billing.canChat)}
              className="flex-shrink-0 w-10 h-10 rounded-full bg-white text-[#050505] flex items-center justify-center hover:bg-white/90 transition-all disabled:opacity-30"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <div className="max-w-2xl mx-auto mt-2 sm:mt-3 flex flex-wrap gap-1.5 sm:gap-2 justify-center">
            {CHAT_EXAMPLE_CHIPS.map((chip) => (
              <button
                key={chip.label}
                type="button"
                onClick={() => handleExampleChip(chip.text)}
                disabled={isLoading || (!!user && !billing.loading && !billing.canChat)}
                className="text-[11px] px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] text-white/35 hover:text-white/60 hover:border-white/15 transition-colors disabled:opacity-40"
              >
                {chip.label}
              </button>
            ))}
          </div>
          <p className="text-center text-[10px] text-white/15 mt-3 tracking-[0.35em] uppercase">
            made by the universe itself
          </p>
        </div>
      )}
    </div>
  );
}
