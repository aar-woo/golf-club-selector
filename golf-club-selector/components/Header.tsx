import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "@/consts/colors";

const styles = StyleSheet.create({
  title: {
    color: colors.primaryGreen,
    fontSize: 30,
    fontFamily: "Boldonse-Regular",
    marginTop: 50,
  },
});

interface HeaderProps {
  styleOverride?: {};
}

export function Header({ styleOverride }: HeaderProps) {
  return (
    <View style={{ zIndex: 2, ...styleOverride }}>
      <Text style={styles.title}>ClubCaddy</Text>
    </View>
  );
}

export default Header;
