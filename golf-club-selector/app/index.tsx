import Header from "@/components/Header";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import colors from "@/consts/colors";
import DistanceAndClubView from "./DistanceAndClubView";
import { StyleSheet } from "react-native";
import Map from "@/components/Map";

const styles = StyleSheet.create({
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
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.lightGray,
      }}
    >
      <LinearGradient
        colors={["transparent", "rgba(138, 138, 138, 0.8)"]}
        style={styles.background}
      />
      <Header />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Map />
        <DistanceAndClubView />
      </View>
    </View>
  );
}
