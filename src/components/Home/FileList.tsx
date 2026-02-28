import React from "react";
import { View } from "react-native";
import type { DocItem } from "../../types/document.types";
import ListItem from "./ListItem";

export default function FileList({ items, onOpen }: { items: DocItem[]; onOpen: (id: string) => void }) {
  return (
    <View>
      {items.map((it) => (
        <ListItem key={it.id} item={it} onPress={() => onOpen(it.id)} />
      ))}
    </View>
  );
}