import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 60,
  },
  clickerButton: {
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey",
    borderWidth: 1,
  },
  clickerLeft: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  clickerRight: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
});

const DistanceInputButton = () => {
  return (
    <View style={[styles.container]}>
      <Pressable
        style={[styles.clickerLeft, styles.clickerButton]}
        onPress={() => console.log("left")}
      >
        <Text>Left</Text>
      </Pressable>
      <Pressable
        style={[styles.clickerRight, styles.clickerButton]}
        onPress={() => console.log("right")}
      >
        <Text>Right</Text>
      </Pressable>
    </View>
  );
};

export default DistanceInputButton;
