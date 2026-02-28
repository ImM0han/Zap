import React, { ReactNode } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, radii, shadows } from "../../utils/theme";
import StatusBarMock from "./StatusBar";

export default function PhoneShell({ children }: { children: ReactNode }) {
  // On mobile, we don’t need the “phone frame”.
  // On web, it helps preview the 375x812 layout.
  const isWeb = Platform.OS === "web";

  if (!isWeb) {
    return (
      <SafeAreaView style={styles.mobileSafe}>
        {children}
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.webStage}>
      <View style={styles.phone}>
        <StatusBarMock />
        <View style={styles.phoneInner}>{children}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mobileSafe: { flex: 1, backgroundColor: colors.bg },
  webStage: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    alignItems: "center",
    justifyContent: "center",
    padding: 18,
  },
  phone: {
    width: 375,
    height: 812,
    backgroundColor: colors.bg,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
    ...shadows.card,
  },
  phoneInner: { flex: 1 },
});