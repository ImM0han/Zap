const fs = require("fs");
const path = require("path");

const inLib = path.join(process.cwd(), "assets", "pdfjs", "pdf.min.js");
const inWorker = path.join(process.cwd(), "assets", "pdfjs", "pdf.worker.min.js");
const out = path.join(process.cwd(), "src", "pdfjs", "pdfjsBundle.ts");

function esc(s) {
  return s
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$\{/g, "\\${");
}

function main() {
  if (!fs.existsSync(inLib) || !fs.existsSync(inWorker)) {
    console.error("❌ Missing assets/pdfjs/pdf.min.js or pdf.worker.min.js");
    process.exit(1);
  }

  const lib = fs.readFileSync(inLib, "utf8");
  const worker = fs.readFileSync(inWorker, "utf8");

  fs.mkdirSync(path.dirname(out), { recursive: true });

  const content = `// AUTO-GENERATED. Do not edit by hand.
// Run: node scripts/make-pdfjs-inline.js

export const PDFJS_LIB_CODE = \`${esc(lib)}\`;
export const PDFJS_WORKER_CODE = \`${esc(worker)}\`;
`;

  fs.writeFileSync(out, content, "utf8");
  console.log("✅ Generated:", out);
}

main();