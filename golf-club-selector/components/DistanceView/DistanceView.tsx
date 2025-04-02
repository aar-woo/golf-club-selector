import DistanceInputButton from "./DistanceInputButton";
import { Text, View, StyleSheet } from "react-native";
import colors from "@/consts/colors";

const styles = StyleSheet.create({
  container: {
    height: 200,
    justifyContent: "space-around",
  },
  distanceDisplay: {
    justifyContent: "center",
    alignItems: "center",
  },
  distanceText: {
    height: 100,
    fontSize: 100,
    color: colors.primaryBlue,
  },
});

type DistanceViewType = {
  distance: number;
  onClickChange: (direction: "left" | "right") => void;
  onLongPress: (direction: "left" | "right") => void;
  onLongPressOut: () => void;
};

const DistanceView = ({
  distance,
  onClickChange,
  onLongPress,
  onLongPressOut,
}: DistanceViewType) => {
  return (
    <View style={styles.container}>
      <View style={styles.distanceDisplay}>
        <Text style={styles.distanceText}>{distance}</Text>
        <Text style={{ fontSize: 20, marginBottom: 20 }}>Yards</Text>
      </View>
      <DistanceInputButton
        handleClick={onClickChange}
        handleLongPress={onLongPress}
        handleLongPressOut={onLongPressOut}
      />
    </View>
  );
};

export default DistanceView;
