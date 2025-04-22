import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "@/consts/colors";
import { BlurView } from "expo-blur";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const styles = StyleSheet.create({
  tabBar: { position: "absolute", borderTopWidth: 0, bottom: 6 },
  tabBarItem: {
    position: "relative",
    top: 17,
    overflow: "hidden",
  },
  blurView: {
    flex: 1,
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: 20,
  },
});

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primaryGreen,
        tabBarInactiveTintColor: colors.warmGray,
        tabBarActiveBackgroundColor: colors.lightGray,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItem,
        tabBarBackground: () => (
          <BlurView tint="light" intensity={100} style={styles.blurView} />
        ),
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="golf-cart" size={24} color={color} />
          ),
          tabBarItemStyle: {
            ...styles.tabBarItem,
            marginLeft: 16,
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
          },
        }}
      />
      <Tabs.Screen
        name="mapView"
        options={{
          title: "Map",
          tabBarIcon: ({ color }) => (
            <Ionicons name="golf" size={24} color={color} />
          ),
          tabBarItemStyle: {
            ...styles.tabBarItem,
            marginRight: 16,
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
          },
        }}
      />
    </Tabs>
  );
}
