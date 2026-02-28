import { create } from "zustand";
import type { DocItem, FileType } from "../types/document.types";
import * as DocumentPicker from "expo-document-picker";

type DocumentState = {
  docs: DocItem[];
  recent: DocItem[];

  selectedId: string | null;
  selectDoc: (id: string) => void;
  selectedDoc: () => DocItem | null;

  addMockDoc: (fileType: FileType) => void;
  pickPdfAndAdd: () => Promise<void>;
};

const nowIso = () => new Date().toISOString();

const seedDocs: DocItem[] = [
  { id: "1", filename: "College Notes.pdf", fileType: "pdf", fileSize: 943000, uploadedAt: nowIso() },
  { id: "2", filename: "Project Report.docx", fileType: "docx", fileSize: 1634000, uploadedAt: nowIso() },
  { id: "3", filename: "Pitch Deck.pptx", fileType: "pptx", fileSize: 2840000, uploadedAt: nowIso() },
  { id: "4", filename: "Invoice Feb.pdf", fileType: "pdf", fileSize: 423000, uploadedAt: nowIso() },
  { id: "5", filename: "Resume.docx", fileType: "docx", fileSize: 312000, uploadedAt: nowIso() },
];

export const useDocumentStore = create<DocumentState>((set, get) => ({
  docs: seedDocs,
  recent: seedDocs.slice(0, 3),

  selectedId: seedDocs[0]?.id ?? null,
  selectDoc: (id) => set({ selectedId: id }),
  selectedDoc: () => {
    const id = get().selectedId;
    if (!id) return null;
    return get().docs.find((d) => d.id === id) ?? null;
  },

  addMockDoc: (fileType) => {
    const id = String(Date.now());
    const doc: DocItem = {
      id,
      filename:
        fileType === "pdf" ? `New Scan ${id}.pdf` : fileType === "docx" ? `New Doc ${id}.docx` : `New Slides ${id}.pptx`,
      fileType,
      fileSize: 500000 + Math.round(Math.random() * 3000000),
      uploadedAt: nowIso(),
    };

    set((s) => ({
      docs: [doc, ...s.docs],
      recent: [doc, ...s.recent].slice(0, 6),
      selectedId: doc.id,
    }));
  },

  pickPdfAndAdd: async () => {
    const res = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      copyToCacheDirectory: true,
      multiple: false,
    });

    if (res.canceled) return;

    const a = res.assets?.[0];
    if (!a) return;

    const id = String(Date.now());
    const doc: DocItem = {
      id,
      filename: a.name || `Picked-${id}.pdf`,
      fileType: "pdf",
      fileSize: a.size ?? 0,
      uploadedAt: nowIso(),
      uri: a.uri,
    };

    set((s) => ({
      docs: [doc, ...s.docs],
      recent: [doc, ...s.recent].slice(0, 6),
      selectedId: doc.id,
    }));
  },
}));