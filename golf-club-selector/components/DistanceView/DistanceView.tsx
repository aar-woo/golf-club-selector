import { useState } from "react";
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
  const [distance, setDistance] = useState<number>(0);

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

  return (
    <View style={styles.container}>
      <View style={styles.distanceDisplay}>
        <Text style={styles.distanceText}>{distance}</Text>
      </View>
      <DistanceInputButton
        distance={distance}
        handleClick={handleClickChange}
      />
    </View>
  );
};

export default DistanceView;
