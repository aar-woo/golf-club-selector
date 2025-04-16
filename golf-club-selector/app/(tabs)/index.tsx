import Header from "@/components/Header";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import colors from "@/consts/colors";
import DistanceAndClubView from "@/app/DistanceAndClubView";
import { StyleSheet } from "react-native";
import Map from "@/components/Map";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.lightGray,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "85%",
  },
});

export default function Index() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["transparent", "rgba(138, 138, 138, 0.8)"]}
        style={styles.background}
      />
      <Header />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 50,
        }}
      >
        <Map />
        <DistanceAndClubView />
      </View>
    </View>
  );
}
