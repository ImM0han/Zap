import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { colors } from "../utils/theme";
import HomeHeader from "../components/Home/HomeHeader";
import QuickChips from "../components/Home/QuickChips";
import SectionRow from "../components/Common/SectionRow";
import RecentCarousel from "../components/Home/RecentCarousel";
import FileList from "../components/Home/FileList";
import FAB from "../components/Home/FAB";
import { useDocumentStore } from "../store/documentStore";

export default function HomeScreen() {
  const recent = useDocumentStore((s) => s.recent);
  const docs = useDocumentStore((s) => s.docs);
  const addMockDoc = useDocumentStore((s) => s.addMockDoc);
  const pickPdfAndAdd = useDocumentStore((s) => s.pickPdfAndAdd);
const selectDoc = useDocumentStore((s) => s.selectDoc);
const navigation = useNavigation<any>();

  const openDoc = (id: string) => {
  selectDoc(id);
  navigation.navigate("Viewer");
};

  return (
    <View style={styles.page}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <HomeHeader />

        <QuickChips
          onScan={() => Alert.alert("Scan", "Go to Scanner tab (Phase 5 will implement)")}
          onView={() => Alert.alert("View", "Open Viewer tab (Phase 3 will implement)")}
          onMerge={() => Alert.alert("Merge", "Open Merge tab (Phase 4 will implement)")}
          onExport={() => Alert.alert("Export", "Phase 6 will implement export")}
        />

        <SectionRow title="Recent Files" actionLabel="See all" onAction={() => {}} />
        <RecentCarousel items={recent} onOpen={openDoc} />

        <SectionRow title="All Files" />
        <FileList items={docs} onOpen={openDoc} />

        <View style={{ height: 120 }} />
      </ScrollView>

      <FAB
 onAddPdf={async () => {
  await pickPdfAndAdd();
  navigation.navigate("Viewer");
}}
  onAddDocx={() => addMockDoc("docx")}
  onAddPptx={() => addMockDoc("pptx")}
/>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 16, paddingBottom: 24 },
});