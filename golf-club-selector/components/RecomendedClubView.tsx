import { useEffect, useState } from "react";
import getRecClub from "@/utilities/clubCalculator";
import { Text, View, StyleSheet, Image } from "react-native";
import ClubsEnum from "@/consts/ClubsEnum";

const styles = StyleSheet.create({
  container: {
    position: "relative",
    marginBottom: 30,
  },

  textContainer: {
    position: "absolute",
    fontSize: 40,
  },
});

type RecomendedClubViewType = {
  distance: number;
};

const RecommendedClubView = ({ distance }: RecomendedClubViewType) => {
  const [club, setClub] = useState<ClubsEnum>(ClubsEnum.PUTTER);
  const clubSplit = club.split(" ");

  useEffect(() => {
    setClub(getRecClub(distance));
  }, [distance]);

  return (
    <View style={styles.container}>
      <Text style={styles.textContainer}>{clubSplit[0]}</Text>
      <Image
        source={require("@/assets/images/golf-club-generic-icon.png")}
        style={{ width: 140, height: 140 }}
      />

      <Text
        style={{
          ...styles.textContainer,
          bottom: 0,
          right: 0,
        }}
      >
        {clubSplit[1]}
      </Text>
    </View>
  );
};

export default RecommendedClubView;
