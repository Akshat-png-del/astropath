import { create } from "zustand";
import type {
  ConversationMessage,
  ExtractedInsight,
  Conversation,
  CosmicReport,
  DailyInsight,
  BirthDetailsForm,
} from "@/types";

interface AppState {
  user: { uid: string; email: string | null; displayName: string | null } | null;
  setUser: (user: AppState["user"]) => void;
  conversationId: string | null;
  setConversationId: (id: string | null) => void;
  messages: ConversationMessage[];
  setMessages: (messages: ConversationMessage[]) => void;
  addMessage: (message: ConversationMessage) => void;
  updateMessage: (id: string, content: string, isStreaming?: boolean) => void;
  phase: Conversation["phase"];
  setPhase: (phase: Conversation["phase"]) => void;
  insights: ExtractedInsight[];
  addInsights: (insights: ExtractedInsight[]) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  isStreaming: boolean;
  setIsStreaming: (streaming: boolean) => void;
  birthDetails: BirthDetailsForm | null;
  setBirthDetails: (details: BirthDetailsForm | null) => void;
  currentReport: CosmicReport | null;
  setCurrentReport: (report: CosmicReport | null) => void;
  dailyInsight: DailyInsight | null;
  setDailyInsight: (insight: DailyInsight | null) => void;
  showBirthForm: boolean;
  setShowBirthForm: (show: boolean) => void;
  resetChat: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  conversationId: null,
  setConversationId: (conversationId) => set({ conversationId }),
  messages: [],
  setMessages: (messages) => set({ messages }),
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  updateMessage: (id, content, isStreaming = false) =>
    set((state) => ({
      messages: state.messages.map((m) =>
        m.id === id ? { ...m, content, isStreaming } : m
      ),
    })),
  phase: "rapport",
  setPhase: (phase) => set({ phase }),
  insights: [],
  addInsights: (newInsights) =>
    set((state) => ({
      insights: [
        ...state.insights,
        ...newInsights.filter(
          (ni) => !state.insights.some((ei) => ei.category === ni.category && ei.value === ni.value)
        ),
      ],
    })),
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  isStreaming: false,
  setIsStreaming: (isStreaming) => set({ isStreaming }),
  birthDetails: null,
  setBirthDetails: (birthDetails) => set({ birthDetails }),
  currentReport: null,
  setCurrentReport: (currentReport) => set({ currentReport }),
  dailyInsight: null,
  setDailyInsight: (dailyInsight) => set({ dailyInsight }),
  showBirthForm: false,
  setShowBirthForm: (showBirthForm) => set({ showBirthForm }),
  resetChat: () =>
    set({
      conversationId: null,
      messages: [],
      phase: "rapport",
      insights: [],
      isLoading: false,
      isStreaming: false,
      birthDetails: null,
      showBirthForm: false,
    }),
}));
