import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { colors, font, radii, shadows } from "../../utils/theme";
import type { DocItem } from "../../types/document.types";
import { fileTypeAccent, fileTypeChipBg, fileTypeEmoji, fileTypeLabel } from "../../utils/colorHelpers";
import { formatBytes, formatDate } from "../../utils/fileHelpers";

export default function ListItem({ item, onPress }: { item: DocItem; onPress: () => void }) {
  const bg = fileTypeChipBg(item.fileType);
  const accent = fileTypeAccent(item.fileType);

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.row, pressed && { transform: [{ scale: 0.98 }] }]}>
      <View style={[styles.iconTile, { backgroundColor: bg }]}>
        <Text style={styles.icon}>{fileTypeEmoji(item.fileType)}</Text>
      </View>

      <View style={styles.mid}>
        <Text numberOfLines={1} style={styles.name}>{item.filename}</Text>
        <Text style={styles.meta}>
          {fileTypeLabel(item.fileType)} · {formatBytes(item.fileSize)} · {formatDate(item.uploadedAt)}
        </Text>
      </View>

      <Text style={[styles.chev, { color: accent }]}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: radii.md,
    padding: 12,
    gap: 12,
    marginBottom: 10,
    ...shadows.card,
  },
  iconTile: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: { fontSize: 18 },
  mid: { flex: 1 },
  name: { fontFamily: font.title, fontSize: 13, color: colors.text },
  meta: { marginTop: 3, fontFamily: font.body, fontSize: 10, color: colors.muted },
  chev: { fontFamily: font.title, fontSize: 22, marginLeft: 4 },
});