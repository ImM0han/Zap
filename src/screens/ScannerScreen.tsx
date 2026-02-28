import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, font } from "../utils/theme";

export default function ScannerScreen() {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>Scanner</Text>
      <Text style={styles.sub}>Camera + OCR in Phase 5</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.black, padding: 16 },
  title: { fontFamily: font.title, fontSize: 22, color: "#fff" },
  sub: { marginTop: 8, fontFamily: font.body, color: "#bbb" },
});