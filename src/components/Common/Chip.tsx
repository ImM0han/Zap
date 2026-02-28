import React from "react";
import { Pressable, Text, StyleSheet, ViewStyle } from "react-native";
import { radii, font } from "../../utils/theme";

type Props = {
  icon: string;
  label: string;
  bg: string;
  color: string;
  onPress?: () => void;
  style?: ViewStyle;
};

export default function Chip({ icon, label, bg, color, onPress, style }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        { backgroundColor: bg },
        pressed && { transform: [{ scale: 0.95 }] },
        style,
      ]}
    >
      <Text style={[styles.text, { color }]}>{icon} {label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderRadius: radii.pill,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  text: {
    fontFamily: font.label,
    fontSize: 12,
  },
});