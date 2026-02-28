import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { radii, font } from "../../utils/theme";

export default function FileTypeBadge({ text, bg, color }: { text: string; bg: string; color: string }) {
  return (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      <Text style={[styles.txt, { color }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radii.sm,
  },
  txt: { fontFamily: font.label, fontSize: 10 },
});