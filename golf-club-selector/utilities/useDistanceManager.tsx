import { useState, useRef, useEffect } from "react";

const useDistanceManager = (initialDistance: number) => {
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

  const updateDistance = (distance: number) => {
    setDistance(distance);
    setDisplayDistance(distance);
    tempDistanceRef.current = distance;
  };

  const handleClickChange = (direction: "left" | "right") => {
    const newDistance =
      direction === "left" ? Math.max(0, distance - 1) : distance + 1;
    updateDistance(newDistance);
  };

  const handleLongPress = (direction: "left" | "right") => {
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
    }, 40);
  };

  const handleLongPressOut = () => {
    if (counterRef.current) {
      clearInterval(counterRef.current);
      setDistance(tempDistanceRef.current);
      setDisplayDistance(tempDistanceRef.current);
    }
  };

  const handleDragRelease = (direction: "left" | "right") => {
    if (direction === "left") {
      if (distance <= 100) {
        updateDistance(0);
      }
    } else {
    }
    const newDistance =
      direction === "left" ? Math.max(0, distance - 100) : distance + 100;
    updateDistance(newDistance);
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
