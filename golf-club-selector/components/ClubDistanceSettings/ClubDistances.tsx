import { useState } from "react";
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
type ClubDistancesData = Record<ClubsEnum, number>;

const ClubDistances = () => {
  const tabBarHeight = useBottomTabBarHeight();
  const [clubDistances, setClubDistances] = useState<ClubDistancesData>({
    [ClubsEnum.DRIVER]: 250,
    [ClubsEnum.THREE_WOOD]: 200,
    [ClubsEnum.FIVE_WOOD]: 180,
    [ClubsEnum.THREE_IRON]: 170,
    [ClubsEnum.FOUR_IRON]: 160,
    [ClubsEnum.FIVE_IRON]: 150,
    [ClubsEnum.SIX_IRON]: 140,
    [ClubsEnum.SEVEN_IRON]: 130,
    [ClubsEnum.EIGHT_IRON]: 120,
    [ClubsEnum.NINE_IRON]: 110,
    [ClubsEnum.PITCHING_WEDGE]: 90,
    [ClubsEnum.GAP_WEDGE]: 70,
    [ClubsEnum.SAND_WEDGE]: 50,
    [ClubsEnum.LOB_WEDGE]: 30,
    [ClubsEnum.PUTTER]: 0,
  });

  return (
    <View style={[styles.distancesContainer, { marginBottom: tabBarHeight }]}>
      {Object.values(ClubsEnum).map((club) => {
        let displayName: ClubsEnum = club;
        if (club.includes("Wedge")) {
          displayName = club.replace("Wedge", "W") as ClubsEnum;
        }
        return (
          <View style={styles.clubDistanceContainer} key={club}>
            <ClubDistanceInput
              clubType={displayName}
              distance={clubDistances[club]}
            />
          </View>
        );
      })}
    </View>
  );
};

export default ClubDistances;
