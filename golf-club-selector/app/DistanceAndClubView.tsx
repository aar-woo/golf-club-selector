import { useState, useRef, useEffect } from "react";
import { View } from "react-native";
import RecommendedClubView from "@/components/RecomendedClubView";
import DistanceView from "@/components/DistanceView/DistanceView";
import * as Location from "expo-location";

const DistanceAndClubView = () => {
  const [distance, setDistance] = useState<number>(100);
  const [displayDistance, setDisplayDistance] = useState(distance);
  const tempDistanceRef = useRef<number>(distance);
  const counterRef = useRef<NodeJS.Timeout | null>(null);

  const handleClickChange = (direction: "left" | "right") => {
    switch (direction) {
      case "left":
        if (distance === 0) {
          return;
        }
        setDistance(distance - 1);
        tempDistanceRef.current = tempDistanceRef.current - 1;
        setDisplayDistance(tempDistanceRef.current);
        break;
      case "right":
        setDistance(distance + 1);
        tempDistanceRef.current = tempDistanceRef.current + 1;
        setDisplayDistance(tempDistanceRef.current);
    }
  };

  const handleLongPressChange = (direction: "left" | "right") => {
    switch (direction) {
      case "left":
        counterRef.current = setInterval(() => {
          if (tempDistanceRef.current <= 0 && counterRef.current) {
            clearInterval(counterRef.current);
            return;
          }
          tempDistanceRef.current = Math.max(0, tempDistanceRef.current - 1);
          setDisplayDistance(tempDistanceRef.current);
        }, 40);
        break;
      case "right":
        counterRef.current = setInterval(() => {
          tempDistanceRef.current = tempDistanceRef.current + 1;
          setDisplayDistance(tempDistanceRef.current);
        }, 40);
    }
  };

  const handleLongPressOut = () => {
    if (counterRef.current) {
      clearInterval(counterRef.current);
      setDistance(tempDistanceRef.current);
      setDisplayDistance(tempDistanceRef.current);
    }
  };

  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log("location: ", location);
      setLocation(location);
    }

    getCurrentLocation();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <RecommendedClubView distance={distance} />
      <DistanceView
        distance={displayDistance}
        onClickChange={handleClickChange}
        onLongPress={handleLongPressChange}
        onLongPressOut={handleLongPressOut}
      />
    </View>
  );
};

export default DistanceAndClubView;
