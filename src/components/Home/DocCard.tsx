import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors, font, shadows } from "../../utils/theme";
import type { DocItem } from "../../types/document.types";
import {
  fileTypeAccent,
  fileTypeBadgeBg,
  fileTypeEmoji,
  fileTypeGradient,
  fileTypeLabel,
} from "../../utils/colorHelpers";
import { formatBytes, formatDate } from "../../utils/fileHelpers";
import FileTypeBadge from "../Common/FileTypeBadge";

export default function DocCard({ item, onPress }: { item: DocItem; onPress: () => void }) {
  const grad = fileTypeGradient(item.fileType);
  const accent = fileTypeAccent(item.fileType);

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && { transform: [{ scale: 0.96 }] }]}>
      <LinearGradient colors={grad} style={styles.thumb}>
        <View style={styles.badgeWrap}>
          <FileTypeBadge
            text={fileTypeLabel(item.fileType)}
            bg={fileTypeBadgeBg(item.fileType)}
            color={accent}
          />
        </View>
        <Text style={styles.emoji}>{fileTypeEmoji(item.fileType)}</Text>
      </LinearGradient>

      <View style={styles.body}>
        <Text numberOfLines={1} style={styles.name}>
          {item.filename}
        </Text>
        <Text numberOfLines={1} style={styles.meta}>
          {formatBytes(item.fileSize)} · {formatDate(item.uploadedAt)}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 130,
    borderRadius: 18,
    backgroundColor: colors.card,
    overflow: "hidden",
    ...shadows.card,
  },
  thumb: { height: 100, alignItems: "center", justifyContent: "center" },
  badgeWrap: { position: "absolute", top: 10, right: 10 },
  emoji: { fontSize: 28 },
  body: { padding: 10, backgroundColor: colors.card },
  name: { fontFamily: font.title, fontSize: 12, color: colors.text },
  meta: { marginTop: 4, fontFamily: font.body, fontSize: 10, color: colors.muted },
});