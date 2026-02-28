import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import Chip from "../Common/Chip";
import { colors } from "../../utils/theme";

export default function QuickChips({
  onScan,
  onView,
  onMerge,
  onExport,
}: {
  onScan: () => void;
  onView: () => void;
  onMerge: () => void;
  onExport: () => void;
}) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.wrap}>
      <Chip icon="📷" label="Scan" bg="#E3F8E6" color={colors.mint} onPress={onScan} />
      <Chip icon="👁" label="View" bg="#E0F7F6" color={colors.sky} onPress={onView} />
      <Chip icon="🔗" label="Merge" bg="#EDEAFF" color={colors.violet} onPress={onMerge} />
      <Chip icon="📤" label="Export" bg="#FFF8D6" color="#B08A00" onPress={onExport} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 8, paddingVertical: 12 },
});