import Header from "@/components/Header";
import { View } from "react-native";

import DistanceAndClubView from "./DistanceAndClubView";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: 60,
      }}
    >
      <Header />
      <DistanceAndClubView />
    </View>
  );
}
