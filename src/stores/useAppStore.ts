import { create } from "zustand";
import type { CosmicReport, DailyInsight, ExtractedInsight } from "@/types";

interface AppState {
  user: { uid: string; email: string | null; displayName: string | null } | null;
  setUser: (user: AppState["user"]) => void;
  birthDetails: import("@/types").BirthDetailsForm | null;
  setBirthDetails: (details: import("@/types").BirthDetailsForm | null) => void;
  currentReport: CosmicReport | null;
  setCurrentReport: (report: CosmicReport | null) => void;
  dailyInsight: DailyInsight | null;
  setDailyInsight: (insight: DailyInsight | null) => void;
  insights: ExtractedInsight[];
  addInsights: (insights: ExtractedInsight[]) => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  birthDetails: null,
  setBirthDetails: (birthDetails) => set({ birthDetails }),
  currentReport: null,
  setCurrentReport: (currentReport) => set({ currentReport }),
  dailyInsight: null,
  setDailyInsight: (dailyInsight) => set({ dailyInsight }),
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
}));
