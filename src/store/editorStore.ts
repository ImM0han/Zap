import { create } from "zustand";

export type ToolKey = "highlight" | "comment" | "underline" | "draw" | "text";

type EditorState = {
  tool: ToolKey;
  setTool: (t: ToolKey) => void;

  page: number;
  totalPages: number;
  prevPage: () => void;
  nextPage: () => void;
};

export const useEditorStore = create<EditorState>((set, get) => ({
  tool: "highlight",
  setTool: (t) => set({ tool: t }),

  page: 2,
  totalPages: 5,

  prevPage: () => set({ page: Math.max(1, get().page - 1) }),
  nextPage: () => set({ page: Math.min(get().totalPages, get().page + 1) }),
}));