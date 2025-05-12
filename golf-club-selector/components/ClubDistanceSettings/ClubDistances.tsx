import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import ClubDistanceInput from "./ClubDistanceInput";
import ClubsEnum from "@/consts/ClubsEnum";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "@/consts/colors";
import { calculateClubsGivenSevenIron } from "@/utilities/clubCalculator";
import { useClubDistancesContext } from "@/app/_layout";

const styles = StyleSheet.create({
  distancesContainer: {
    width: "100%",
    maxHeight: 470,
    flexWrap: "wrap",
    marginBottom: 20,
  },
  clubDistanceContainer: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 3,
  },
  adjustButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    height: 45,
    borderRadius: 10,
    backgroundColor: colors.primaryBlue,
  },
});

export const DEFAULT_CLUB_DISTANCES: ClubDistancesData = {
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
};

export type ClubDistancesData = Record<ClubsEnum, number>;

const ClubDistances = () => {
  const [clubDistances, setClubDistances] = useState<ClubDistancesData>(
    DEFAULT_CLUB_DISTANCES
  );
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const { setClubDistanceData } = useClubDistancesContext();

  const storeClubDistances = async (value: ClubDistancesData) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("club-distance-data", jsonValue);
    } catch (e) {
      console.error("Error storing club distance data: ", e);
    }
  };

  const getClubDistances = async () => {
    try {
      const value = await AsyncStorage.getItem("club-distance-data");
      if (value !== null) {
        setIsLoading(false);
        return JSON.parse(value);
      }
    } catch (e) {
      console.error("Error fetching stored club distance data: ", e);
    }
  };

  const handleClubDistanceChange = (clubType: ClubsEnum, distance: number) => {
    setClubDistances((prev) => {
      return { ...prev, [clubType]: distance };
    });
  };

  useEffect(() => {
    const fetchStoredClubData = async () => {
      try {
        const clubDistanceStoredData = await getClubDistances();
        if (!clubDistanceStoredData) {
          setClubDistances(clubDistances);
        } else {
          setClubDistances(clubDistanceStoredData);
        }
      } catch (e) {
        console.error("Error fetching stored club distance data: ", e);
      }
    };
    fetchStoredClubData();
  }, []);

  useEffect(() => {
    const storeClubDistancesData = async () => {
      await storeClubDistances(clubDistances);
    };
    setClubDistanceData(clubDistances);
    storeClubDistancesData();
  }, [clubDistances]);

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator
          size="large"
          color={colors.primaryGreen}
        ></ActivityIndicator>
      </View>
    );
  }

  return (
    <View
      style={[
        {
          width: "100%",
          alignItems: "center",
        },
      ]}
    >
      <View style={[styles.distancesContainer]}>
        {Object.values(ClubsEnum).map((club) => {
          if (club === ClubsEnum.PUTTER) return;
          let displayName: ClubsEnum = club;
          if (club.includes("Wedge")) {
            displayName = club.replace("Wedge", "W") as ClubsEnum;
          }
          return (
            <View style={styles.clubDistanceContainer} key={club}>
              <ClubDistanceInput
                clubType={displayName}
                distance={clubDistances[club]}
                handleClubDistanceChange={handleClubDistanceChange}
              />
            </View>
          );
        })}
      </View>
      <View style={styles.clubDistanceContainer} key={ClubsEnum.SEVEN_IRON}>
        <ClubDistanceInput
          clubType={ClubsEnum.SEVEN_IRON}
          distance={clubDistances[ClubsEnum.SEVEN_IRON]}
          handleClubDistanceChange={handleClubDistanceChange}
          styleOverrides={{
            borderColor: colors.lightBlue,
            width: 200,
            justifyContent: "center",
            marginBottom: 3,
          }}
          textStyleOverrides={{ fontSize: 23 }}
        />
      </View>
      <TouchableOpacity
        style={styles.adjustButton}
        onPress={() => {
          const adjustedDistances = calculateClubsGivenSevenIron(
            clubDistances["7 Iron"]
          );
          setClubDistances(adjustedDistances);
        }}
      >
        <Text style={{ fontSize: 20, color: colors.snowWhite }}>
          Adjust Distances
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ClubDistances;
