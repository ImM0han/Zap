import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import type { DocItem } from "../../types/document.types";
import DocCard from "./DocCard";

export default function RecentCarousel({ items, onOpen }: { items: DocItem[]; onOpen: (id: string) => void }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.wrap}>
      {items.map((it) => (
        <DocCard key={it.id} item={it} onPress={() => onOpen(it.id)} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 12, paddingBottom: 6 },
});