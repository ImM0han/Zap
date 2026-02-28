import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors, font, radii } from "../../utils/theme";

function Letter({ c, color }: { c: string; color: string }) {
  return <Text style={[styles.logoChar, { color }]}>{c}</Text>;
}

export default function HomeHeader() {
  return (
    <View style={styles.row}>
      <View style={styles.logo}>
        <Letter c="D" color={colors.coral} />
        <Letter c="o" color={colors.sky} />
        <Letter c="c" color={colors.yellow} />
        <Letter c="Z" color={colors.mint} />
        <Letter c="a" color={colors.coral} />
        <Letter c="p" color={colors.mint} />
      </View>

      <LinearGradient colors={[colors.violet, colors.pink]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.avatar}>
        <Text style={styles.avatarTxt}>MO</Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  logo: { flexDirection: "row", alignItems: "flex-end" },
  logoChar: { fontFamily: font.title, fontSize: 26, letterSpacing: 0.2 },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: radii.pill,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarTxt: { fontFamily: font.title, color: "white", fontSize: 12 },
});