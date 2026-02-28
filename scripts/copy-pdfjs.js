const fs = require("fs");
const path = require("path");

function exists(p) {
  try { return fs.existsSync(p); } catch { return false; }
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function copy(from, to) {
  ensureDir(path.dirname(to));
  fs.copyFileSync(from, to);
  console.log("Copied:", from, "->", to);
}

function main() {
  const root = process.cwd();
  const outDir = path.join(root, "assets", "pdfjs");
  ensureDir(outDir);

  const candidates = [
    // try common pdfjs-dist layouts
    {
      lib: path.join(root, "node_modules", "pdfjs-dist", "legacy", "build", "pdf.min.js"),
      worker: path.join(root, "node_modules", "pdfjs-dist", "legacy", "build", "pdf.worker.min.js"),
    },
    {
      lib: path.join(root, "node_modules", "pdfjs-dist", "build", "pdf.min.js"),
      worker: path.join(root, "node_modules", "pdfjs-dist", "build", "pdf.worker.min.js"),
    },
    {
      lib: path.join(root, "node_modules", "pdfjs-dist", "build", "pdf.js"),
      worker: path.join(root, "node_modules", "pdfjs-dist", "build", "pdf.worker.js"),
    },
    {
      lib: path.join(root, "node_modules", "pdfjs-dist", "build", "pdf.mjs"),
      worker: path.join(root, "node_modules", "pdfjs-dist", "build", "pdf.worker.mjs"),
    },
  ];

  const found = candidates.find(c => exists(c.lib) && exists(c.worker));
  if (!found) {
    console.error("\n❌ Could not find pdfjs-dist build files in node_modules.");
    console.error("Make sure you ran: npm i pdfjs-dist\n");
    process.exit(1);
  }

  // Always copy to these fixed names for WebView
  copy(found.lib, path.join(outDir, "pdf.min.js"));
  copy(found.worker, path.join(outDir, "pdf.worker.min.js"));

  console.log("\n✅ PDF.js is now offline in assets/pdfjs/");
}

main();