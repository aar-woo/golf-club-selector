import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import colors from "@/consts/colors";
import WheelPicker from "@quidone/react-native-wheel-picker";
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
  styleOverrides?: ViewStyle;
  textStyleOverrides?: TextStyle;
};

const distanceChoices = [...Array(70).keys()].map((index) => ({
  value: (69 - index) * 5,
  label: ((69 - index) * 5).toString(),
}));

const ClubDistanceInput = ({
  clubType,
  distance,
  handleClubDistanceChange,
  styleOverrides,
  textStyleOverrides,
}: ClubDistanceInputProps) => {
  return (
    <View style={[styles.container, styleOverrides as ViewStyle]}>
      <Text style={[styles.label, textStyleOverrides as TextStyle]}>
        {clubType}:
      </Text>
      <WheelPicker
        data={distanceChoices}
        value={distance}
        visibleItemCount={1}
        onValueChanged={({ item: { value } }) => {
          handleClubDistanceChange(clubType, value);
        }}
      />
    </View>
  );
};

export default ClubDistanceInput;
