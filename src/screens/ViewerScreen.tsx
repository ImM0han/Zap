import React from "react";
import { View, StyleSheet } from "react-native";
import ViewerHeader from "../components/Viewer/ViewerHeader";
import AnnotationToolbar from "../components/Viewer/AnnotationToolbar";
import PageNavBar from "../components/Viewer/PageNavBar";
import PDFCanvas from "../components/Viewer/PDFCanvas";
import PDFWebView from "../components/Viewer/PDFWebView";
import { useDocumentStore } from "../store/documentStore";
import { useEditorStore } from "../store/editorStore";

export default function ViewerScreen() {
  const selected = useDocumentStore((s) => s.selectedDoc());
  const page = useEditorStore((s) => s.page);
  const total = useEditorStore((s) => s.totalPages);

  const title = selected?.filename ?? "Viewer";

  return (
    <View style={styles.wrap}>
      <ViewerHeader title={title} onBack={() => {}} />

      {/* If a picked PDF exists -> render real PDF */}
      {selected?.fileType === "pdf" && selected?.uri ? (
        <PDFWebView uri={selected.uri} />
      ) : (
        <PDFCanvas total={total} activePage={page} />
      )}

      <AnnotationToolbar />
      <PageNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1 },
});