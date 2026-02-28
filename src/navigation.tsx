import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import ViewerScreen from "./screens/ViewerScreen";
import MergeScreen from "./screens/MergeScreen";
import ScannerScreen from "./screens/ScannerScreen";
import { colors, font, radii } from "./utils/theme";
import { View, Text, StyleSheet } from "react-native";
import { useAppStore } from "./store/appStore";

const Tab = createBottomTabNavigator();

function TabIcon({ emoji, label, focused }: { emoji: string; label: string; focused: boolean }) {
  return (
    <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
      <Text style={[styles.emoji, focused && styles.emojiActive]}>{emoji}</Text>
      <Text style={[styles.label, focused && styles.labelActive]}>{label}</Text>
    </View>
  );
}

export default function AppTabs() {
  const setActiveTab = useAppStore((s) => s.setActiveTab);

  return (
    <Tab.Navigator
      screenListeners={{
        state: (e) => {
          const name = e.data?.state?.routeNames?.[e.data.state.index];
          if (name) setActiveTab(name as any);
        },
      }}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 82,
          paddingTop: 10,
          paddingBottom: 16,
          backgroundColor: "#fff",
          borderTopColor: colors.border,
          borderTopWidth: 1,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="🏠" label="Home" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Viewer"
        component={ViewerScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="📄" label="View" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Merge"
        component={MergeScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="🔗" label="Merge" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Scanner"
        component={ScannerScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="📷" label="Scan" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconWrap: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: radii.pill,
  },
  iconWrapActive: {
    backgroundColor: "#F5F3FF",
    transform: [{ translateY: -2 }],
  },
  emoji: { fontSize: 18 },
  emojiActive: {},
  label: { marginTop: 4, fontFamily: font.label, fontSize: 10, color: colors.muted },
  labelActive: { color: colors.violet },
});