import { create } from "zustand";

export type TabKey = "Home" | "Viewer" | "Merge" | "Scanner";

type AppState = {
  activeTab: TabKey;
  setActiveTab: (tab: TabKey) => void;

  // Later: documents, recent, selected doc, etc.
  hasNewFiles: boolean;
  setHasNewFiles: (v: boolean) => void;
};

export const useAppStore = create<AppState>((set) => ({
  activeTab: "Home",
  setActiveTab: (tab) => set({ activeTab: tab }),

  hasNewFiles: true,
  setHasNewFiles: (v) => set({ hasNewFiles: v }),
}));