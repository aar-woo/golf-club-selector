import { useEffect, useState } from "react";
import getRecClub from "@/utilities/clubCalculator";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from "react-native";
import ClubsEnum from "@/consts/ClubsEnum";
import colors from "@/consts/colors";
import { useClubDistancesContext } from "@/app/_layout";
import { ClubDistancesData } from "./ClubDistanceSettings/ClubDistances";

const styles = StyleSheet.create({
  container: {
    position: "relative",
    marginBottom: 30,
  },

  textContainer: {
    position: "absolute",
    fontSize: 24,
    fontFamily: "Montserrat-SemiBold",
    color: colors.primaryBlue,
  },

  img: {
    height: 130,
    width: 130,
    resizeMode: "contain",
  },
});

type RecomendedClubViewType = {
  distance: number;
};

type ClubData = {
  unit?: string;
  clubType: string;
  img: ImageSourcePropType;
};

const RecommendedClubView = ({ distance }: RecomendedClubViewType) => {
  const [club, setClub] = useState<ClubsEnum>(ClubsEnum.PUTTER);
  const clubSplit = club.split(" ");
  const { clubDistanceData } = useClubDistancesContext();

  const recClub: ClubData = {
    unit:
      club === ClubsEnum.PUTTER || club === ClubsEnum.DRIVER
        ? undefined
        : clubSplit[0],
    clubType:
      club === ClubsEnum.PUTTER || club === ClubsEnum.DRIVER
        ? clubSplit[0]
        : clubSplit[1],
    img:
      club === ClubsEnum.PUTTER
        ? require("@/assets/images/putter-icon.png")
        : club === ClubsEnum.DRIVER
        ? require("@/assets/images/driver-icon.png")
        : club.toLowerCase().includes("wood")
        ? require("@/assets/images/wood-icon.png")
        : clubSplit[1].toLowerCase().includes("wedge")
        ? require("@/assets/images/wedge-icon.png")
        : require("@/assets/images/iron-icon.png"),
  };

  const fetchRecClub = async () => {
    const club = await getRecClub(distance);
    setClub(club);
  };

  useEffect(() => {
    fetchRecClub();
  }, [distance, clubDistanceData]);

  return (
    <View style={styles.container}>
      {recClub.unit && (
        <Text
          style={{
            ...styles.textContainer,
            left:
              club === ClubsEnum.GAP_WEDGE ||
              club === ClubsEnum.LOB_WEDGE ||
              club == ClubsEnum.SAND_WEDGE
                ? -20
                : 10,
          }}
        >
          {recClub.unit}
        </Text>
      )}
      <Image style={styles.img} source={recClub.img} />

      <Text
        style={{
          ...styles.textContainer,
          bottom: 0,
          right: 0,
        }}
      >
        {recClub.clubType}
      </Text>
    </View>
  );
};

export default RecommendedClubView;
