import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { colors, font } from "../../utils/theme";

export default function SectionRow({
  title,
  actionLabel,
  onAction,
}: {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
      {!!actionLabel && (
        <Pressable onPress={onAction}>
          <Text style={styles.action}>{actionLabel}</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 18, marginBottom: 10 },
  title: { fontFamily: font.title, fontSize: 16, color: colors.text },
  action: { fontFamily: font.label, fontSize: 12, color: colors.violet },
});