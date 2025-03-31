import DistanceInputButton from "@/components/DistanceInputButton";
import Header from "@/components/Header";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <Header />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <DistanceInputButton />
      </View>
    </View>
  );
}
