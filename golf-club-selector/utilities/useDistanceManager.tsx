import { useState, useRef, useEffect } from "react";
import DISTANCE_CONFIG, { InputDirection } from "@/consts/constants";

const { LONG_PRESS_INTERVAL, DRAG_INCREMENT } = DISTANCE_CONFIG;

const useDistanceManager = (
  initialDistance: number,
  currentDirection: InputDirection | null,
  markerUpdateHandler?: (
    distance: number,
    currentDirection: InputDirection | null,
    inputDirection: InputDirection
  ) => void
) => {
  const [distance, setDistance] = useState<number>(initialDistance);
  const [displayDistance, setDisplayDistance] =
    useState<number>(initialDistance);
  const tempDistanceRef = useRef<number>(distance);
  const counterRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setDistance(initialDistance);
    tempDistanceRef.current = initialDistance;
    setDisplayDistance(initialDistance);
  }, [initialDistance]);

  const updateDistance = (distance: number, direction: InputDirection) => {
    setDistance(distance);
    setDisplayDistance(distance);
    tempDistanceRef.current = distance;
    markerUpdateHandler &&
      markerUpdateHandler(distance, currentDirection, direction);
  };

  const handleClickChange = (direction: InputDirection) => {
    const newDistance =
      direction === "left" ? Math.max(0, distance - 1) : distance + 1;
    updateDistance(newDistance, direction);
  };

  const handleLongPress = (direction: InputDirection) => {
    counterRef.current = setInterval(() => {
      if (tempDistanceRef.current <= 0 && counterRef.current) {
        clearInterval(counterRef.current);
        return;
      }
      tempDistanceRef.current =
        direction === "left"
          ? Math.max(0, tempDistanceRef.current - 1)
          : tempDistanceRef.current + 1;
      setDisplayDistance(tempDistanceRef.current);
      markerUpdateHandler &&
        markerUpdateHandler(
          tempDistanceRef.current,
          currentDirection,
          direction
        );
    }, LONG_PRESS_INTERVAL);
  };

  const handleLongPressOut = () => {
    if (counterRef.current) {
      clearInterval(counterRef.current);
      setDistance(tempDistanceRef.current);
      setDisplayDistance(tempDistanceRef.current);
    }
  };

  const handleDragRelease = (direction: InputDirection) => {
    if (direction === "left") {
      if (distance <= 100) {
        updateDistance(0, direction);
      }
    } else {
    }
    const newDistance =
      direction === "left"
        ? Math.max(0, distance - DRAG_INCREMENT)
        : distance + DRAG_INCREMENT;
    updateDistance(newDistance, direction);
  };

  return {
    distance,
    tempDistanceRef,
    displayDistance,
    handleClickChange,
    handleLongPress,
    handleLongPressOut,
    handleDragRelease,
  };
};

export default useDistanceManager;
