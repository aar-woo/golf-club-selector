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

type DistanceInputButtonType = {
  handleClick: (direction: "left" | "right") => void;
  handleLongPress: (direction: "left" | "right") => void;
  handleLongPressOut: () => void;
};

const DistanceInputButton = ({
  handleClick,
  handleLongPress,
  handleLongPressOut,
}: DistanceInputButtonType) => {
  return (
    <View style={[styles.container]}>
      <Pressable
        style={[styles.clickerLeft, styles.clickerButton]}
        onPress={() => handleClick("left")}
        onLongPress={() => handleLongPress("left")}
        onPressOut={handleLongPressOut}
        delayLongPress={200}
      >
        <FontAwesome name="caret-left" size={40} color="black" />
      </Pressable>
      <Pressable
        style={[styles.clickerRight, styles.clickerButton]}
        onPress={() => handleClick("right")}
        onLongPress={() => handleLongPress("right")}
        onPressOut={handleLongPressOut}
        delayLongPress={200}
      >
        <FontAwesome name="caret-right" size={40} color="black" />
      </Pressable>
    </View>
  );
};

export default DistanceInputButton;
