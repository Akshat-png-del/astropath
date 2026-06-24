"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { MessageBubble, TypingIndicator } from "./MessageBubble";
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
  const { user, firebaseReady } = useAuth();

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

  useEffect(() => { scrollToBottom(); }, [messages, isLoading, showBirthForm, scrollToBottom]);

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
    if (!firebaseReady || !user?.uid) return;
    ensureFirebaseConversation(user.uid, conversationId).then((id) => {
      if (id && id !== conversationId) setConversationId(id);
    });
    trackAnalytics(user.uid, "chat_session_open");
  }, [firebaseReady, user?.uid, conversationId, setConversationId]);

  const streamResponse = async (userContent: string) => {
    const state = useAppStore.getState();
    const assistantId = generateId();

    setIsLoading(true);
    setIsStreaming(true);

    addMessage({
      id: assistantId,
      conversationId: state.conversationId ?? "local",
      role: "assistant",
      content: "",
      timestamp: new Date(),
      isStreaming: true,
    });

    try {
      const history = useAppStore.getState().messages
        .filter((m) => m.content && m.id !== assistantId)
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
        let gotFirstChunk = false;
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          if (!gotFirstChunk) {
            gotFirstChunk = true;
            setIsLoading(false);
          }
          fullContent += decoder.decode(value, { stream: true });
          updateMessage(assistantId, fullContent, true);
        }
      }

      if (!fullContent.trim()) {
        fullContent = "I'm here. What's on your mind?";
      }

      updateMessage(assistantId, fullContent, false);
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
        persistMessageToFirestore(cid, { role: "user", content: userContent });
        persistMessageToFirestore(cid, { role: "assistant", content: fullContent });
        trackAnalytics(user.uid, "chat_message", { phase: updatedPhase });
      }
    } catch {
      const fallback =
        "I'm still here with you. Something interrupted our connection — please send your message again and I'll respond.";
      updateMessage(assistantId, fallback, false);
    } finally {
      setIsLoading(false);
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

    await streamResponse(content);
  };

  const handleReset = () => {
    resetChat();
    const cid = generateId();
    setConversationId(cid);
    setMessages(createGreetingMessages(cid));
    trackAnalytics(user?.uid ?? null, "chat_reset");
  };

  const handleHistorySelect = (id: string) => {
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
    <div className="relative flex flex-col h-full">
      <ChatHistoryPanel
        open={historyOpen}
        onClose={() => setHistoryOpen(false)}
        currentId={conversationId}
        onSelect={handleHistorySelect}
        onNewChat={handleReset}
      />
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-5">
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            role={msg.role as "user" | "assistant"}
            content={msg.content}
            isStreaming={!!msg.isStreaming && isStreaming}
          />
        ))}
        {isLoading && !isStreaming && <TypingIndicator />}
        {showBirthForm && (
          <BirthDetailsFormComponent onSubmit={handleBirthSubmit} isLoading={isLoading} />
        )}
        <div ref={messagesEndRef} />
      </div>

      {!showBirthForm && (
        <div className="border-t border-white/[0.04] bg-[#050505]/90 backdrop-blur-2xl p-4">
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
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              disabled={isLoading}
              className="flex-1 resize-none rounded-2xl bg-white/[0.03] border border-white/[0.08] px-4 py-3 text-sm text-white/70 placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-all disabled:opacity-40"
            />
            <button
              onClick={handleSend}
              disabled={isLoading}
              className="flex-shrink-0 w-10 h-10 rounded-full bg-white text-[#050505] flex items-center justify-center hover:bg-white/90 transition-all disabled:opacity-30"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <div className="max-w-2xl mx-auto mt-3 flex flex-wrap gap-2 justify-center">
            {CHAT_EXAMPLE_CHIPS.map((chip) => (
              <button
                key={chip.label}
                type="button"
                onClick={() => handleExampleChip(chip.text)}
                disabled={isLoading}
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
