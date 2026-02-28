export function formatBytes(bytes: number) {
  const kb = bytes / 1024;
  const mb = kb / 1024;
  if (mb >= 1) return `${mb.toFixed(1)} MB`;
  return `${Math.max(1, Math.round(kb))} KB`;
}

export function formatDate(iso: string) {
  const d = new Date(iso);
  // simple, stable formatting
  const day = String(d.getDate()).padStart(2, "0");
  const mon = d.toLocaleString("en-US", { month: "short" });
  const yr = d.getFullYear();
  return `${day} ${mon} ${yr}`;
}