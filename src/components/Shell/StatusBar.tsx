import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, font } from "../../utils/theme";

export default function StatusBarMock() {
  return (
    <View style={styles.wrap}>
      <Text style={styles.time}>9:41</Text>
      <View style={styles.right}>
        <Text style={styles.icon}>📶</Text>
        <Text style={styles.icon}>📡</Text>
        <Text style={styles.icon}>🔋</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: 44,
    paddingHorizontal: 14,
    backgroundColor: colors.bg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  time: { fontFamily: font.label, color: colors.text, fontSize: 12 },
  right: { flexDirection: "row", gap: 6 },
  icon: { fontSize: 12 },
});