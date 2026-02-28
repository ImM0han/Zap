import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { colors, font, radii } from "../../utils/theme";
import { useEditorStore } from "../../store/editorStore";

export default function PageNavBar() {
  const page = useEditorStore((s) => s.page);
  const total = useEditorStore((s) => s.totalPages);
  const prevPage = useEditorStore((s) => s.prevPage);
  const nextPage = useEditorStore((s) => s.nextPage);

  return (
    <View style={styles.wrap}>
      <Pressable onPress={prevPage} style={({ pressed }) => [styles.btn, pressed && { transform: [{ scale: 0.95 }] }]}>
        <Text style={styles.icon}>‹</Text>
      </Pressable>

      <Text style={styles.txt}>Page {page} of {total}</Text>

      <Pressable onPress={nextPage} style={({ pressed }) => [styles.btn, pressed && { transform: [{ scale: 0.95 }] }]}>
        <Text style={styles.icon}>›</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: 52,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
  },
  btn: {
    width: 32,
    height: 32,
    borderRadius: radii.md,
    backgroundColor: "#F7F7FB",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: { fontSize: 18, color: colors.text },
  txt: { fontFamily: font.title, fontSize: 13, color: colors.muted },
});