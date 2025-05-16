import { useEffect, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import RecommendedClubView from "@/components/RecomendedClubView";
import DistanceView from "@/components/DistanceView/DistanceView";
import useDistanceManager from "@/utilities/useDistanceManager";
import DISTANCE_CONFIG from "@/consts/constants";

const { INITIAL_DISTANCE } = DISTANCE_CONFIG;

type DistanceAndClubViewProps = {
  markerDistance: number | null;
  handleDistanceToMarkerChange: (distance: number) => void;
  currentInputDirection: "left" | "right" | null;
  handleDirectionToMarkerChange: (direction: "left" | "right") => void;
};

const DistanceAndClubView = ({
  markerDistance,
  handleDistanceToMarkerChange,
  handleDirectionToMarkerChange,
  currentInputDirection,
}: DistanceAndClubViewProps) => {
  const handleInputToMarkerUpdate = useCallback(
    (
      distance: number,
      currentDirection: "left" | "right" | null,
      inputDirection: "left" | "right"
    ) => {
      if (currentDirection !== inputDirection) {
        handleDirectionToMarkerChange(inputDirection);
      }
      handleDistanceToMarkerChange(distance);
    },
    [handleDirectionToMarkerChange, handleDistanceToMarkerChange]
  );

  const {
    distance,
    displayDistance,
    tempDistanceRef,
    handleClickChange,
    handleLongPress,
    handleLongPressOut,
    handleDragRelease,
  } = useDistanceManager(
    markerDistance || INITIAL_DISTANCE,
    currentInputDirection,
    markerDistance ? handleInputToMarkerUpdate : undefined
  );
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });

  useEffect(() => {
    if (markerDistance === null) return;
    tempDistanceRef.current = markerDistance;
  }, [markerDistance]);

  return (
    <View style={styles.container}>
      <RecommendedClubView distance={distance} />
      <DistanceView
        distance={displayDistance}
        onClickChange={handleClickChange}
        onLongPress={handleLongPress}
        onLongPressOut={handleLongPressOut}
        onDragRelease={handleDragRelease}
      />
    </View>
  );
};

export default DistanceAndClubView;
