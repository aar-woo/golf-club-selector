import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "@/consts/colors";

const styles = StyleSheet.create({
  title: {
    color: colors.primaryGreen,
    fontSize: 30,
    fontFamily: "Boldonse-Regular",
  },
});

export function Header() {
  return (
    <View>
      <Text style={styles.title}>ClubCaddy</Text>
    </View>
  );
}

export default Header;
