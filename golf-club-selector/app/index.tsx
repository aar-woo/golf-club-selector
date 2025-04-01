import Header from "@/components/Header";
import { View } from "react-native";
import DistanceView from "@/components/DistanceView/DistanceView";

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
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <DistanceView />
      </View>
    </View>
  );
}
