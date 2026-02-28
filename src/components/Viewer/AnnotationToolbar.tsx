import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { colors, font, radii } from "../../utils/theme";
import { useEditorStore, ToolKey } from "../../store/editorStore";

const tools: { key: ToolKey; icon: string; label: string }[] = [
  { key: "highlight", icon: "🖊️", label: "Highlight" },
  { key: "comment", icon: "💬", label: "Comment" },
  { key: "underline", icon: "〰️", label: "Underline" },
  { key: "draw", icon: "✏️", label: "Draw" },
  { key: "text", icon: "T", label: "Text" },
];

export default function AnnotationToolbar() {
  const tool = useEditorStore((s) => s.tool);
  const setTool = useEditorStore((s) => s.setTool);

  return (
    <View style={styles.wrap}>
      {tools.map((t) => {
        const active = t.key === tool;
        return (
          <Pressable
            key={t.key}
            onPress={() => setTool(t.key)}
            style={({ pressed }) => [
              styles.item,
              active && styles.active,
              pressed && { transform: [{ scale: 0.96 }] },
            ]}
          >
            <Text style={styles.icon}>{t.icon}</Text>
            <Text style={[styles.label, active && { color: colors.text }]}>{t.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: 72,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: colors.border,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 6,
  },
  item: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: radii.pill,
  },
  active: { backgroundColor: colors.border },
  icon: { fontSize: 16 },
  label: { marginTop: 4, fontFamily: font.title, fontSize: 9, color: colors.muted },
});