import Header from "@/components/Header";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import colors from "@/consts/colors";
import DistanceAndClubView from "@/app/DistanceAndClubView";
import { StyleSheet } from "react-native";
import Map from "@/components/Map";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useState } from "react";

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
    width: "90%",
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
  const [distanceBetweenMarkers, setDistanceBetweenMarkers] = useState<
    number | null
  >(null);

  const handleMapMarkerChange = (distance: number) => {
    setDistanceBetweenMarkers(distance);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["transparent", "rgba(138, 138, 138, 0.8)"]}
        style={styles.background}
      />
      <Header />
      <View style={{ ...styles.appContainer, marginBottom: tabBarHeight }}>
        <Map
          markerDistance={distanceBetweenMarkers}
          handleMarkerChange={handleMapMarkerChange}
        />
        <DistanceAndClubView markerDistance={distanceBetweenMarkers} />
      </View>
    </View>
  );
}
