import { View, StyleSheet } from "react-native";
import ClubDistanceInput from "./ClubDistanceInput";
import ClubsEnum from "@/consts/ClubsEnum";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

const styles = StyleSheet.create({
  distancesContainer: {
    width: "100%",
    flexWrap: "wrap",
  },
  clubDistanceContainer: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 3,
  },
});

const ClubDistances = () => {
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <View style={[styles.distancesContainer, { marginBottom: tabBarHeight }]}>
      {Object.values(ClubsEnum).map((club) => {
        let displayName: ClubsEnum = club;
        if (club.includes("Wedge")) {
          displayName = club.replace("Wedge", "W") as ClubsEnum;
        }
        return (
          <View style={styles.clubDistanceContainer} key={club}>
            <ClubDistanceInput clubType={displayName} />
          </View>
        );
      })}
    </View>
  );
};

export default ClubDistances;
