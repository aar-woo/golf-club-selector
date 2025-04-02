import Header from "@/components/Header";
import { ImageBackground, View } from "react-native";

import DistanceAndClubView from "./DistanceAndClubView";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ImageBackground
        source={require("@/assets/images/bg-gradient-green.png")}
        style={{
          flex: 1,
          width: "100%",

          alignItems: "center",
        }}
      >
        <Header />
        <DistanceAndClubView />
      </ImageBackground>
    </View>
  );
}
