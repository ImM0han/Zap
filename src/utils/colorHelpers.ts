import { colors } from "./theme";
import type { FileType } from "../types/document.types";

export function fileTypeLabel(t: FileType) {
  if (t === "pdf") return "PDF";
  if (t === "docx") return "DOCX";
  return "PPTX";
}

export function fileTypeEmoji(t: FileType) {
  if (t === "pdf") return "📕";
  if (t === "docx") return "📝";
  return "📊";
}

export function fileTypeChipBg(t: FileType) {
  if (t === "pdf") return "#FFE8E8";
  if (t === "docx") return "#E0F7F6";
  return "#FFF8D6";
}

export function fileTypeBadgeBg(t: FileType) {
  if (t === "pdf") return "#FFE8E8";
  if (t === "docx") return "#E0F7F6";
  return "#FFF8D6";
}

export function fileTypeAccent(t: FileType) {
  if (t === "pdf") return colors.coral;
  if (t === "docx") return colors.sky;
  return colors.yellow;
}

export function fileTypeGradient(t: FileType) {
  if (t === "pdf") return ["#FFE8E8", "#FFCECE"];
  if (t === "docx") return ["#E0F7F6", "#B2EBE8"];
  return ["#FFF8D6", "#FFE97A"];
}