import React from "react";
import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  title: {
    color: "#006745",
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
