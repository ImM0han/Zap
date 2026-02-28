import { create } from "zustand";
import type { DocItem, FileType } from "../types/document.types";

type DocumentState = {
  docs: DocItem[];
  recent: DocItem[];

  addMockDoc: (fileType: FileType) => void;
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

    const docs = [doc, ...get().docs];
    const recent = [doc, ...get().recent].slice(0, 6);
    set({ docs, recent });
  },
}));