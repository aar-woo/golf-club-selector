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

const styles = StyleSheet.create({
  container: {
    position: "relative",
    marginBottom: 30,
  },

  textContainer: {
    position: "absolute",
    fontSize: 30,
    fontFamily: "Montserrat-SemiBold",
    color: colors.primaryBlue,
  },

  img: {
    height: 160,
    width: 160,
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

  useEffect(() => {
    setClub(getRecClub(distance));
  }, [distance]);

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
