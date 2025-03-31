import { useState, useRef } from "react";
import DistanceInputButton from "./DistanceInputButton";
import { Text, View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    height: 200,
    justifyContent: "space-around",
  },
  distanceDisplay: {
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  distanceText: {
    fontSize: 100,
  },
});

const DistanceView = () => {
  const [distance, setDistance] = useState<number>(100);
  const counterRef = useRef<NodeJS.Timeout | null>(null);

  const handleClickChange = (direction: "left" | "right") => {
    switch (direction) {
      case "left":
        if (distance === 0) {
          return;
        }
        setDistance(distance - 1);
        break;
      case "right":
        setDistance(distance + 1);
    }
  };

  const handleLongPressChange = (direction: "left" | "right") => {
    switch (direction) {
      case "left":
        counterRef.current = setInterval(() => {
          if (distance <= 0 && counterRef.current) {
            clearInterval(counterRef.current);
            return;
          }
          setDistance((prev) => {
            if (prev <= 0) {
              if (counterRef.current) {
                clearInterval(counterRef.current);
              }
              return 0;
            }
            return prev - 1;
          });
        }, 20);
        break;
      case "right":
        counterRef.current = setInterval(() => {
          setDistance((prev) => prev + 1);
        }, 20);
    }
  };

  const handleLongPressOut = () => {
    if (counterRef.current) {
      clearInterval(counterRef.current);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.distanceDisplay}>
        <Text style={styles.distanceText}>{distance}</Text>
      </View>
      <DistanceInputButton
        handleClick={handleClickChange}
        handleLongPress={handleLongPressChange}
        handleLongPressOut={handleLongPressOut}
      />
    </View>
  );
};

export default DistanceView;
