import React, { useEffect, useRef } from "react";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  PanResponder,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import colors from "@/consts/colors";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 60,
    boxShadow: `0 12 0 0.8 ${colors.darkGray}`,
  },
  clickerButton: {
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.gray,
    borderWidth: 1,
    borderColor: colors.darkGray,
    shadowColor: colors.darkGray,
    shadowRadius: 0,
    shadowOpacity: 1,
  },
  clickerButtonActive: {
    shadowOpacity: 0,
    backgroundColor: "#615A56",
    transform: [{ translateY: 5 }],
  },
  clickerLeft: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    transform: [{ skewY: "4deg" }],
    shadowOffset: { width: -0.5, height: 7 },
  },
  clickerRight: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    transform: [{ skewY: "-4deg" }],
    shadowOffset: { width: 0.5, height: 7 },
  },
  pressable: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
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
  const [isDragging, setIsDragging] = useState(false);
  const panRight = useRef(new Animated.ValueXY()).current;
  const panLeft = useRef(new Animated.ValueXY()).current;

  const panResponderRight = PanResponder.create({
    onStartShouldSetPanResponder: () => isDragging,
    onMoveShouldSetPanResponder: () => {
      setIsDragging(true);
      return true;
    },
    onPanResponderMove: (e, gestureState) => {
      setIsDragging(true);
      Animated.event(
        [
          null,
          {
            dx: panRight.x,
          },
        ],
        {
          useNativeDriver: false,
        }
      )(e, gestureState);
    },
    onPanResponderRelease: () => {
      Animated.spring(panRight, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: false,
      }).start();
      setIsDragging(false);
    },
  });

  const panResponderLeft = PanResponder.create({
    onStartShouldSetPanResponder: () => isDragging,
    onMoveShouldSetPanResponder: () => {
      setIsDragging(true);
      return true;
    },
    onPanResponderMove: (e, gestureState) => {
      setIsDragging(true);
      Animated.event(
        [
          null,
          {
            dx: panLeft.x,
          },
        ],
        {
          useNativeDriver: false,
        }
      )(e, gestureState);
    },
    onPanResponderRelease: () => {
      Animated.spring(panLeft, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: false,
      }).start();
      setIsDragging(false);
    },
  });

  return (
    <View style={[styles.container]}>
      <Animated.View
        {...panResponderLeft.panHandlers}
        style={[
          styles.clickerLeft,
          styles.clickerButton,
          isPressed === "left"
            ? styles.clickerButtonActive
            : isPressed === "right"
            ? { transform: [{ skewY: "6.5deg" }] }
            : null,
          panLeft.getLayout(),
        ]}
      >
        <Pressable
          style={styles.pressable}
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
          delayLongPress={100}
        >
          <FontAwesome name="caret-left" size={40} color={colors.lightGray} />
        </Pressable>
      </Animated.View>
      <Animated.View
        {...panResponderRight.panHandlers}
        style={[
          styles.clickerRight,
          styles.clickerButton,
          isPressed === "right"
            ? styles.clickerButtonActive
            : isPressed === "left"
            ? { transform: [{ skewY: "-6.5deg" }] }
            : null,
          panRight.getLayout(),
        ]}
      >
        <Pressable
          style={styles.pressable}
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
      </Animated.View>
    </View>
  );
};

export default DistanceInputButton;
