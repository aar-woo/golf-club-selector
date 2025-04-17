import Header from "@/components/Header";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import colors from "@/consts/colors";
import DistanceAndClubView from "@/app/DistanceAndClubView";
import { StyleSheet } from "react-native";
import Map from "@/components/Map";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.lightGray,
  },
  appContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.lightGray,
    borderRadius: 15,
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
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["transparent", "rgba(138, 138, 138, 0.8)"]}
        style={styles.background}
      />
      <Header />
      <View style={{ ...styles.appContainer, marginBottom: tabBarHeight }}>
        <Map />
        <DistanceAndClubView />
      </View>
    </View>
  );
}
