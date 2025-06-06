import DistanceInputButton from "./DistanceInputButton";
import { Text, View, StyleSheet } from "react-native";
import colors from "@/consts/colors";
import { InputDirection } from "@/consts/constants";

const styles = StyleSheet.create({
  container: {
    height: 200,
  },

  distanceDisplay: {
    justifyContent: "center",
    alignItems: "center",
  },
  distanceText: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    lineHeight: 80,
    fontSize: 80,
    color: colors.primaryBlue,
  },
});

type DistanceViewType = {
  distance: number;
  onClickChange: (direction: InputDirection) => void;
  onLongPress: (direction: InputDirection) => void;
  onDragRelease: (direction: InputDirection) => void;
  onLongPressOut: () => void;
};

const DistanceView = ({
  distance,
  onClickChange,
  onLongPress,
  onLongPressOut,
  onDragRelease,
}: DistanceViewType) => {
  return (
    <View style={styles.container}>
      <View style={styles.distanceDisplay}>
        <Text style={styles.distanceText}>{distance}</Text>
        <Text
          style={{
            fontSize: 20,
            marginBottom: 10,
            fontFamily: "Hind-SemiBold",
            color: colors.lightBlue,
          }}
        >
          Yards
        </Text>
      </View>
      <DistanceInputButton
        handleClick={onClickChange}
        handleLongPress={onLongPress}
        handleLongPressOut={onLongPressOut}
        handleDragRelease={onDragRelease}
      />
    </View>
  );
};

export default DistanceView;
