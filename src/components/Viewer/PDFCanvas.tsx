import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { colors } from "../../utils/theme";
import PageCard from "./PageCard";

export default function PDFCanvas({ total = 5, activePage = 2 }: { total?: number; activePage?: number }) {
  return (
    <View style={styles.wrap}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {Array.from({ length: total }).map((_, i) => {
          const pageNum = i + 1;
          return <PageCard key={pageNum} index={pageNum} active={pageNum === activePage} />;
        })}
        <View style={{ height: 16 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.beigeCanvas, paddingHorizontal: 14, paddingTop: 14 },
  content: { paddingBottom: 16 },
});