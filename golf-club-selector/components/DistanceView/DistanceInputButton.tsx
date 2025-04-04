import React, { useEffect } from "react";
import { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import colors from "@/consts/colors";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 60,
  },
  containerActiveLeft: {
    transform: [{ rotate: "-1deg" }],
  },
  containerActiveRight: {
    transform: [{ rotate: "1deg" }],
  },
  clickerButton: {
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.gray,
    boxShadow: "0 5px black",
    borderWidth: 1,
  },
  clickerButtonActive: {
    boxShadow: "none",
    transform: [{ translateY: 5 }],
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
  const [isPressed, setIsPressed] = useState<"left" | "right" | null>(null);

  return (
    <View
      style={[
        styles.container,
        isPressed === "left"
          ? styles.containerActiveLeft
          : isPressed === "right"
          ? styles.containerActiveRight
          : null,
      ]}
    >
      <Pressable
        style={[
          styles.clickerLeft,
          styles.clickerButton,
          isPressed === "left" && styles.clickerButtonActive,
        ]}
        onPress={() => {
          setIsPressed("left");
          handleClick("left");
        }}
        onLongPress={() => {
          setIsPressed("left");
          handleLongPress("left");
        }}
        onPressOut={() => {
          setIsPressed(null);
          handleLongPressOut();
        }}
        delayLongPress={200}
      >
        <FontAwesome name="caret-left" size={40} color={colors.lightGray} />
      </Pressable>
      <Pressable
        style={[
          styles.clickerRight,
          styles.clickerButton,
          isPressed === "right" && styles.clickerButtonActive,
        ]}
        onPress={() => {
          setIsPressed("right");
          handleClick("right");
        }}
        onLongPress={() => {
          setIsPressed("right");
          handleLongPress("right");
        }}
        onPressOut={() => {
          setIsPressed(null);
          handleLongPressOut();
        }}
        delayLongPress={200}
      >
        <FontAwesome name="caret-right" size={40} color={colors.lightGray} />
      </Pressable>
    </View>
  );
};

export default DistanceInputButton;
