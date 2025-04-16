import Header from "@/components/Header";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, StyleSheet } from "react-native";
import colors from "@/consts/colors";
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

export default function MapView() {
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
      </View>
    </View>
  );
}
