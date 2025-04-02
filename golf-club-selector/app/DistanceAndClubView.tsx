import { useState, useRef } from "react";
import { View } from "react-native";
import RecommendedClubView from "@/components/RecomendedClubView";
import DistanceView from "@/components/DistanceView/DistanceView";

const DistanceAndClubView = () => {
  const [distance, setDistance] = useState<number>(100);
  const counterRef = useRef<NodeJS.Timeout | null>(null);

  const handleClickChange = (direction: "left" | "right") => {
    switch (direction) {
      case "left":
        if (distance === 0) {
          return;
        }
        setDistance(distance - 1);
        break;
      case "right":
        setDistance(distance + 1);
    }
  };

  const handleLongPressChange = (direction: "left" | "right") => {
    switch (direction) {
      case "left":
        counterRef.current = setInterval(() => {
          if (distance <= 0 && counterRef.current) {
            clearInterval(counterRef.current);
            return;
          }
          setDistance((prev) => {
            if (prev <= 0) {
              if (counterRef.current) {
                clearInterval(counterRef.current);
              }
              return 0;
            }
            return prev - 1;
          });
        }, 20);
        break;
      case "right":
        counterRef.current = setInterval(() => {
          setDistance((prev) => prev + 1);
        }, 20);
    }
  };

  const handleLongPressOut = () => {
    if (counterRef.current) {
      clearInterval(counterRef.current);
    }
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <RecommendedClubView distance={distance} />
      <DistanceView
        distance={distance}
        onClickChange={handleClickChange}
        onLongPress={handleLongPressChange}
        onLongPressOut={handleLongPressOut}
      />
    </View>
  );
};

export default DistanceAndClubView;
