import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts as useNunito, Nunito_900Black } from "@expo-google-fonts/nunito";
import { useFonts as useNunitoSans, NunitoSans_600SemiBold, NunitoSans_700Bold } from "@expo-google-fonts/nunito-sans";
import { ActivityIndicator, View } from "react-native";
import PhoneShell from "./src/components/Shell/PhoneShell";
import AppTabs from "./src/navigation";
import { colors } from "./src/utils/theme";

export default function App() {
  const [nunitoLoaded] = useNunito({ Nunito_900Black });
  const [nunitoSansLoaded] = useNunitoSans({ NunitoSans_600SemiBold, NunitoSans_700Bold });

  const loaded = nunitoLoaded && nunitoSansLoaded;

  if (!loaded) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <PhoneShell>
        <AppTabs />
      </PhoneShell>
    </NavigationContainer>
  );
}