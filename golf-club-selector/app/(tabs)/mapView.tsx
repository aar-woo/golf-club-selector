import Header from "@/components/Header";
import { View, StyleSheet } from "react-native";
import colors from "@/consts/colors";
import Map from "@/components/Map";

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
      <Header styleOverride={{ position: "absolute", top: 0 }} />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Map fullScreen={true} />
      </View>
    </View>
  );
}
