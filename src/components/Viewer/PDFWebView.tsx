import React, { useMemo } from "react";
import { ActivityIndicator, View } from "react-native";
import { WebView } from "react-native-webview";
import * as FileSystem from "expo-file-system";
import { colors } from "../../utils/theme";

async function readAsBase64(uri: string) {
  return FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
}

export default function PDFWebView({ uri }: { uri: string }) {
  const htmlPromise = useMemo(async () => {
    const b64 = await readAsBase64(uri);

    // PDF.js from CDN (reliable, simplest). Later we can bundle offline if needed.
    return `
<!doctype html>
<html>
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <style>
    body { margin:0; background:${colors.beigeCanvas}; font-family: -apple-system, system-ui, Segoe UI, Roboto; }
    .wrap { padding: 14px; }
    .page { background:#fff; border-radius:12px; box-shadow:0 6px 18px rgba(0,0,0,.18); margin: 0 auto 14px auto; overflow:hidden; }
    canvas { width:100%; height:auto; display:block; }
  </style>
</head>
<body>
  <div class="wrap" id="root"></div>

  <script src="https://unpkg.com/pdfjs-dist@4.10.38/build/pdf.min.js"></script>
  <script>
    const pdfData = atob("${b64}");
    const bytes = new Uint8Array(pdfData.length);
    for (let i = 0; i < pdfData.length; i++) bytes[i] = pdfData.charCodeAt(i);

    pdfjsLib.GlobalWorkerOptions.workerSrc = "https://unpkg.com/pdfjs-dist@4.10.38/build/pdf.worker.min.js";

    (async function() {
      const loadingTask = pdfjsLib.getDocument({ data: bytes });
      const pdf = await loadingTask.promise;

      const root = document.getElementById("root");

      for (let p = 1; p <= pdf.numPages; p++) {
        const page = await pdf.getPage(p);

        const scale = 1.35;
        const viewport = page.getViewport({ scale });

        const card = document.createElement("div");
        card.className = "page";
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        card.appendChild(canvas);
        root.appendChild(card);

        await page.render({ canvasContext: ctx, viewport }).promise;
      }
    })();
  </script>
</body>
</html>
`;
  }, [uri]);

  const [html, setHtml] = React.useState<string | null>(null);

  React.useEffect(() => {
    let alive = true;
    htmlPromise.then((h) => alive && setHtml(h)).catch(() => alive && setHtml("ERROR"));
    return () => { alive = false; };
  }, [htmlPromise]);

  if (!html || html === "ERROR") {
    return (
      <View style={{ flex: 1, backgroundColor: colors.beigeCanvas, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <WebView
      originWhitelist={["*"]}
      source={{ html }}
      javaScriptEnabled
      domStorageEnabled
      style={{ flex: 1, backgroundColor: colors.beigeCanvas }}
    />
  );
}