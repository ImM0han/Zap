import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, font } from "../utils/theme";

export default function ViewerScreen() {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>Viewer</Text>
      <Text style={styles.sub}>PDF render + annotations in Phase 3</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.bg, padding: 16 },
  title: { fontFamily: font.title, fontSize: 22, color: colors.text },
  sub: { marginTop: 8, fontFamily: font.body, color: colors.muted },
});