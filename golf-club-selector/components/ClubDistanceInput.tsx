import { View, Text, TextInput, StyleSheet } from "react-native";
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

const data = [...Array(100).keys()].map((index) => ({
  value: index,
  label: index.toString(),
}));

const ClubDistanceInput = ({ clubType }: ClubDistanceInputProps) => {
  const [value, setValue] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{clubType}:</Text>
      <WheelPicker
        data={data}
        value={value}
        onValueChanged={({ item: { value } }) => setValue(value)}
      />
    </View>
  );
};

export default ClubDistanceInput;
