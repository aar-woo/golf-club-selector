import { View, Text, StyleSheet } from "react-native";
import colors from "@/consts/colors";
import WheelPicker from "@quidone/react-native-wheel-picker";
import { useEffect, useState } from "react";
import ClubsEnum from "@/consts/ClubsEnum";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 140,
    height: 60,
    borderWidth: 3,
    borderColor: colors.primaryGreen,
    borderRadius: 10,
    padding: 10,
  },
  label: {
    fontSize: 20,
    paddingRight: 5,
  },
});

type ClubDistanceInputProps = {
  clubType: ClubsEnum;
  distance: number;
  handleClubDistanceChange: (clubType: ClubsEnum, distance: number) => void;
};

const distanceChoices = [...Array(70).keys()].map((index) => ({
  value: index * 5,
  label: (index * 5).toString(),
}));

const ClubDistanceInput = ({
  clubType,
  distance,
  handleClubDistanceChange,
}: ClubDistanceInputProps) => {
  const [visibleItemCount, setVisibleItemCount] = useState(1);
  const [isAutoAdjust, setIsAutoAdjusted] = useState(false);

  useEffect(() => {
    setIsAutoAdjusted(true);
    // setVisibleItemCount(1);
  }, [distance]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{clubType}:</Text>
      <WheelPicker
        data={distanceChoices}
        value={distance}
        onValueChanging={() => {
          if (isAutoAdjust) {
            return;
          }
          setVisibleItemCount(3);
        }}
        visibleItemCount={visibleItemCount}
        onValueChanged={({ item: { value } }) => {
          setVisibleItemCount(1);
          setIsAutoAdjusted(false);
          handleClubDistanceChange(clubType, value);
        }}
      />
    </View>
  );
};

export default ClubDistanceInput;
