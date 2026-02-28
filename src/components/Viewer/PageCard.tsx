import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, radii } from "../../utils/theme";

export default function PageCard({ index, active }: { index: number; active?: boolean }) {
  return (
    <View style={[styles.card, !active && { opacity: 0.5 }]}>
      <View style={styles.headerBlock} />
      <View style={styles.imageBlock}>
        <Text style={styles.imageEmoji}>📈</Text>
      </View>

      <View style={styles.lines}>
        <View style={[styles.line, { width: "86%" }]} />
        <View style={[styles.line, { width: "78%" }]} />
        <View style={[styles.line, { width: "92%" }]} />

        <View style={styles.highlightRow}>
          <View style={styles.highlightYellow} />
          <View style={styles.highlightPink} />
        </View>

        <View style={[styles.line, { width: "82%" }]} />
        <View style={[styles.line, { width: "70%" }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  headerBlock: { height: 18, backgroundColor: colors.violet, borderRadius: radii.sm, width: "70%" },
  imageBlock: {
    marginTop: 12,
    height: 90,
    borderRadius: 14,
    backgroundColor: "#F3F0FF",
    alignItems: "center",
    justifyContent: "center",
  },
  imageEmoji: { fontSize: 24 },
  lines: { marginTop: 14, gap: 8 },
  line: { height: 10, backgroundColor: "#E6E6EE", borderRadius: radii.pill },
  highlightRow: { flexDirection: "row", gap: 10, marginTop: 4, marginBottom: 4 },
  highlightYellow: {
    flex: 1,
    height: 12,
    borderRadius: radii.pill,
    backgroundColor: "rgba(255,217,61,0.45)",
  },
  highlightPink: {
    flex: 1,
    height: 12,
    borderRadius: radii.pill,
    backgroundColor: "rgba(253,121,168,0.35)",
  },
});