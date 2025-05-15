import { useState, useRef, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import RecommendedClubView from "@/components/RecomendedClubView";
import DistanceView from "@/components/DistanceView/DistanceView";

type DistanceAndClubViewProps = {
  markerDistance: number | null;
  handleDistanceToMarkerChange?: (distance: number) => void;
  currentInputDirection?: "left" | "right" | null;
  handleDirectionToMarkerChange?: (direction: "left" | "right") => void;
};

const DistanceAndClubView = ({
  markerDistance,
  handleDistanceToMarkerChange,
  handleDirectionToMarkerChange,
  currentInputDirection,
}: DistanceAndClubViewProps) => {
  const [distance, setDistance] = useState<number>(100);
  const [displayDistance, setDisplayDistance] = useState(distance);
  const tempDistanceRef = useRef<number>(distance);
  const counterRef = useRef<NodeJS.Timeout | null>(null);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });

  useEffect(() => {
    if (markerDistance === null) return;
    setDisplayDistance(markerDistance);
    setDistance(markerDistance);
    tempDistanceRef.current = markerDistance;
  }, [markerDistance]);

  const handleClickChange = (direction: "left" | "right") => {
    switch (direction) {
      case "left":
        if (distance === 0) {
          return;
        }
        setDistance(distance - 1);
        tempDistanceRef.current = tempDistanceRef.current - 1;
        setDisplayDistance(tempDistanceRef.current);
        if (currentInputDirection !== "left" && handleDirectionToMarkerChange)
          handleDirectionToMarkerChange("left");
        handleDistanceToMarkerChange &&
          handleDistanceToMarkerChange(tempDistanceRef.current);
        break;
      case "right":
        setDistance(distance + 1);
        tempDistanceRef.current = tempDistanceRef.current + 1;
        setDisplayDistance(tempDistanceRef.current);
        if (currentInputDirection !== "right" && handleDirectionToMarkerChange)
          handleDirectionToMarkerChange("right");
        handleDistanceToMarkerChange &&
          handleDistanceToMarkerChange(tempDistanceRef.current);
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
          if (currentInputDirection !== "left" && handleDirectionToMarkerChange)
            handleDirectionToMarkerChange("left");
          handleDistanceToMarkerChange &&
            handleDistanceToMarkerChange(tempDistanceRef.current);
        }, 40);
        break;
      case "right":
        counterRef.current = setInterval(() => {
          tempDistanceRef.current = tempDistanceRef.current + 1;
          setDisplayDistance(tempDistanceRef.current);
          if (
            currentInputDirection !== "right" &&
            handleDirectionToMarkerChange
          )
            handleDirectionToMarkerChange("right");
          handleDistanceToMarkerChange &&
            handleDistanceToMarkerChange(tempDistanceRef.current);
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

  const handleDragRelease = (direction: "left" | "right") => {
    switch (direction) {
      case "left":
        if (distance <= 0 || distance <= 100) {
          setDistance(0);
          tempDistanceRef.current = 0;
          setDisplayDistance(0);
          return;
        }
        setDistance(distance - 100);
        tempDistanceRef.current = tempDistanceRef.current - 100;
        setDisplayDistance(tempDistanceRef.current);
        break;
      case "right":
        setDistance(distance + 100);
        tempDistanceRef.current = tempDistanceRef.current + 100;
        setDisplayDistance(tempDistanceRef.current);
    }
  };

  return (
    <View style={styles.container}>
      <RecommendedClubView distance={distance} />
      <DistanceView
        distance={displayDistance}
        onClickChange={handleClickChange}
        onLongPress={handleLongPressChange}
        onLongPressOut={handleLongPressOut}
        onDragRelease={handleDragRelease}
      />
    </View>
  );
};

export default DistanceAndClubView;
