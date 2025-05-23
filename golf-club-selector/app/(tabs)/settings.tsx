import Header from "@/components/Header";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, StyleSheet } from "react-native";
import colors from "@/consts/colors";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import ClubDistances from "@/components/ClubDistanceSettings/ClubDistances";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: colors.lightGray,
  },
  settingsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.lightGray,
    borderRadius: 15,
    width: "90%",
    padding: 10,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
});

const Settings = () => {
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <View style={[styles.container]}>
      <LinearGradient
        colors={["transparent", "rgba(138, 138, 138, 0.8)"]}
        style={styles.background}
      />
      <Header />
      <View style={[styles.settingsContainer, { marginBottom: tabBarHeight }]}>
        <ClubDistances />
      </View>
    </View>
  );
};

export default Settings;
