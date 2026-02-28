import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { colors, font, radii } from "../../utils/theme";

export default function ViewerHeader({
  title = "Filename.pdf",
  onBack,
}: {
  title?: string;
  onBack?: () => void;
}) {
  return (
    <View style={styles.wrap}>
      <Pressable onPress={onBack} style={({ pressed }) => [styles.iconBtn, pressed && { transform: [{ scale: 0.95 }] }]}>
        <Text style={styles.icon}>←</Text>
      </Pressable>

      <Text numberOfLines={1} style={styles.title}>
        {title}
      </Text>

      <View style={styles.right}>
        <Pressable style={({ pressed }) => [styles.iconBtn, pressed && { transform: [{ scale: 0.95 }] }]}>
          <Text style={styles.icon}>🔍</Text>
        </Pressable>
        <Pressable style={({ pressed }) => [styles.iconBtn, pressed && { transform: [{ scale: 0.95 }] }]}>
          <Text style={styles.icon}>⋯</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: 56,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: radii.md,
    backgroundColor: "#F7F7FB",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: { fontSize: 16 },
  title: { flex: 1, fontFamily: font.title, fontSize: 14, color: colors.text },
  right: { flexDirection: "row", gap: 8 },
});