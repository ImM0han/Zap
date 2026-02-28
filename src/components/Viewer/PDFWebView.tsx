import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import * as FileSystem from "expo-file-system/legacy";
import { colors, font } from "../../utils/theme";
import type { ToolKey } from "../../store/editorStore";
import { PDFJS_LIB_CODE, PDFJS_WORKER_CODE } from "../../pdfjs/pdfjsBundle";

export default function PDFWebView({ uri, tool }: { uri: string; tool: ToolKey }) {
  const webRef = useRef<WebView>(null);
  const [localPath, setLocalPath] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const filename = `doczap-${Date.now()}.pdf`;
        const dest = (FileSystem.cacheDirectory || "") + filename;
        await FileSystem.copyAsync({ from: uri, to: dest });
        if (alive) setLocalPath(dest);
      } catch (e: any) {
        if (alive) setLocalPath("ERROR:" + (e?.message || "copy failed"));
      }
    })();
    return () => {
      alive = false;
    };
  }, [uri]);

  useEffect(() => {
    const js = `window.__DOCZAP_TOOL = ${JSON.stringify(tool)}; true;`;
    webRef.current?.injectJavaScript(js);
  }, [tool]);

  if (!localPath) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.beigeCanvas, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
        <Text style={{ marginTop: 10, fontFamily: font.body, color: colors.muted }}>Preparing PDF…</Text>
      </View>
    );
  }

  if (localPath.startsWith("ERROR:")) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.beigeCanvas, alignItems: "center", justifyContent: "center", padding: 16 }}>
        <Text style={{ fontFamily: font.title, color: colors.text }}>PDF failed</Text>
        <Text style={{ marginTop: 8, fontFamily: font.body, color: colors.muted, textAlign: "center" }}>{localPath}</Text>
      </View>
    );
  }

  const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<style>
  body { margin:0; background:${colors.beigeCanvas}; font-family: -apple-system, system-ui, Segoe UI, Roboto; }
  .wrap { padding:14px; }
  .page { position:relative; background:#fff; border-radius:12px; box-shadow:0 6px 18px rgba(0,0,0,.18); margin:0 auto 14px auto; overflow:hidden; }
  canvas { width:100%; height:auto; display:block; }
  .err { padding:14px; background:#fff; border-radius:12px; box-shadow:0 6px 18px rgba(0,0,0,.12); color:#b00020; white-space:pre-wrap; font-size:12px; }
</style>
</head>
<body>
  <div class="wrap">
    <div id="root"></div>
    <div id="error" class="err" style="display:none"></div>
  </div>

<script>
  const RN = window.ReactNativeWebView || null;
  function post(obj){ try{ RN && RN.postMessage(JSON.stringify(obj)); }catch(e){} }
  function showErr(msg){
    const el = document.getElementById('error');
    el.style.display = 'block';
    el.textContent = msg;
    post({ type:'error', msg });
  }

  window.__DOCZAP_TOOL = ${JSON.stringify(tool)};
</script>

<!-- Inline pdf.js (offline, no Hermes involvement) -->
<script>
${PDFJS_LIB_CODE}
</script>

<script>
  // Create worker from inline code (Blob URL)
  const workerBlob = new Blob([${JSON.stringify(PDFJS_WORKER_CODE)}], { type: "text/javascript" });
  const workerUrl = URL.createObjectURL(workerBlob);
  pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

  async function boot(){
    try{
      const pdfUri = ${JSON.stringify(localPath)};
      const res = await fetch(pdfUri);
      if(!res.ok) throw new Error("Cannot fetch PDF file: " + res.status);
      const buf = await res.arrayBuffer();

      const pdf = await pdfjsLib.getDocument({ data: buf }).promise;
      const root = document.getElementById("root");

      for(let p=1; p<=pdf.numPages; p++){
        const page = await pdf.getPage(p);
        const viewport = page.getViewport({ scale: 1.1 });

        const card = document.createElement("div");
        card.className = "page";
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        card.appendChild(canvas);
        root.appendChild(card);

        const ctx = canvas.getContext("2d");
        await page.render({ canvasContext: ctx, viewport }).promise;
      }

      post({ type:"ready", pages: pdf.numPages });
    } catch(err){
      showErr("PDF render failed:\\n" + (err?.message || String(err)));
    }
  }
  boot();
</script>

</body>
</html>`;

  return (
    <WebView
      ref={webRef}
      originWhitelist={["*"]}
      source={{ html }}
      javaScriptEnabled
      domStorageEnabled
      mixedContentMode="always"
      allowFileAccess
      allowUniversalAccessFromFileURLs
      style={{ flex: 1, backgroundColor: colors.beigeCanvas }}
    />
  );
}