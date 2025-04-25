import { View, Text, StyleSheet } from "react-native";
import colors from "@/consts/colors";
import WheelPicker from "@quidone/react-native-wheel-picker";
import { useState } from "react";

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
  clubType: string;
  distance: number;
};

const distanceChoices = [...Array(70).keys()].map((index) => ({
  value: index * 5,
  label: (index * 5).toString(),
}));

const ClubDistanceInput = ({ clubType, distance }: ClubDistanceInputProps) => {
  const [value, setValue] = useState(0);
  const [visibleItemCount, setVisibleItemCount] = useState(1);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{clubType}:</Text>
      <WheelPicker
        data={distanceChoices}
        value={distance}
        onValueChanging={() => {
          setVisibleItemCount(3);
        }}
        visibleItemCount={visibleItemCount}
        onValueChanged={({ item: { value } }) => {
          setValue(value);
          setVisibleItemCount(1);
        }}
      />
    </View>
  );
};

export default ClubDistanceInput;
