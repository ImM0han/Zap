export type FileType = "pdf" | "docx" | "pptx";

export type DocItem = {
  id: string;
  filename: string;
  fileType: FileType;
  fileSize: number; // bytes
  uploadedAt: string; // ISO string
};