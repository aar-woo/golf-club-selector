import { View, Text, StyleSheet } from "react-native";
import colors from "@/consts/colors";
import WheelPicker from "@quidone/react-native-wheel-picker";
import { useState } from "react";
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: 120,
    height: 70,
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
};

const distanceChoices = [...Array(45).keys()].map((index) => ({
  value: index * 5,
  label: (index * 5).toString(),
}));

const ClubDistanceInput = ({ clubType }: ClubDistanceInputProps) => {
  const [value, setValue] = useState(0);
  const [visibleItemCount, setVisibleItemCount] = useState(1);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{clubType}:</Text>
      <WheelPicker
        data={distanceChoices}
        value={value}
        onValueChanging={() => {
          setVisibleItemCount(5);
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
