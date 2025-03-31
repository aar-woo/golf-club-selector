import React, { useEffect } from "react";
import { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 60,
  },
  clickerButton: {
    width: 90,
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

type DistanceInputButtonType = {
  handleClick: (direction: "left" | "right") => void;
};

const DistanceInputButton = ({ handleClick }: DistanceInputButtonType) => {
  return (
    <View style={[styles.container]}>
      <Pressable
        style={[styles.clickerLeft, styles.clickerButton]}
        onPress={() => handleClick("left")}
      >
        <FontAwesome name="caret-left" size={40} color="black" />
      </Pressable>
      <Pressable
        style={[styles.clickerRight, styles.clickerButton]}
        onPress={() => handleClick("right")}
      >
        <FontAwesome name="caret-right" size={40} color="black" />
      </Pressable>
    </View>
  );
};

export default DistanceInputButton;
