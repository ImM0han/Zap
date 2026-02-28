import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Modal } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors, radii } from "../../utils/theme";

export default function FAB({
  onAddPdf,
  onAddDocx,
  onAddPptx,
}: {
  onAddPdf: () => void;
  onAddDocx: () => void;
  onAddPptx: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Pressable onPress={() => setOpen(true)} style={({ pressed }) => [styles.fabWrap, pressed && { transform: [{ scale: 0.93 }] }]}>
        <LinearGradient colors={[colors.coral, "#FF3D6E"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.fab}>
          <Text style={styles.plus}>＋</Text>
        </LinearGradient>
      </Pressable>

      <Modal transparent animationType="slide" visible={open} onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)} />
        <View style={styles.sheet}>
          <Text style={styles.sheetTitle}>Add a file</Text>

          <Pressable
            onPress={() => { setOpen(false); onAddPdf(); }}
            style={({ pressed }) => [styles.sheetBtn, pressed && { transform: [{ scale: 0.98 }] }]}
          >
            <Text style={styles.sheetBtnTxt}>📕 Add PDF (mock)</Text>
          </Pressable>

          <Pressable
            onPress={() => { setOpen(false); onAddDocx(); }}
            style={({ pressed }) => [styles.sheetBtn, pressed && { transform: [{ scale: 0.98 }] }]}
          >
            <Text style={styles.sheetBtnTxt}>📝 Add DOCX (mock)</Text>
          </Pressable>

          <Pressable
            onPress={() => { setOpen(false); onAddPptx(); }}
            style={({ pressed }) => [styles.sheetBtn, pressed && { transform: [{ scale: 0.98 }] }]}
          >
            <Text style={styles.sheetBtnTxt}>📊 Add PPTX (mock)</Text>
          </Pressable>

          <Pressable onPress={() => setOpen(false)} style={styles.close}>
            <Text style={styles.closeTxt}>Close</Text>
          </Pressable>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  fabWrap: { position: "absolute", right: 18, bottom: 98 }, // above tab bar
  fab: {
    width: 50,
    height: 50,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.coral,
    shadowOpacity: 0.4,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  plus: { color: "white", fontSize: 24, lineHeight: 24, fontWeight: "900" },

  backdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.25)" },
  sheet: {
    backgroundColor: "white",
    padding: 16,
    borderTopLeftRadius: radii.xl,
    borderTopRightRadius: radii.xl,
  },
  sheetTitle: { fontSize: 16, fontWeight: "900", marginBottom: 10, color: colors.text },
  sheetBtn: {
    backgroundColor: "#F7F7FB",
    padding: 14,
    borderRadius: radii.lg,
    marginBottom: 10,
  },
  sheetBtnTxt: { fontSize: 14, fontWeight: "800", color: colors.text },
  close: { paddingVertical: 10, alignItems: "center" },
  closeTxt: { fontWeight: "800", color: colors.muted },
});