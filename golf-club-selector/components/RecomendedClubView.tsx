import { Text, View, StyleSheet, Image } from "react-native";

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },

  textContainer: {
    position: "absolute",
    fontSize: 40,
  },
});

const RecommendedClubView = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textContainer}>7</Text>
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
        Iron
      </Text>
    </View>
  );
};

export default RecommendedClubView;
