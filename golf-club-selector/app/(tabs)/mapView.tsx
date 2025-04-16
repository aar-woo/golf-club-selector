import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default function Tab() {
  return (
    <View style={styles.container}>
      <Text>Map View</Text>
    </View>
  );
}
