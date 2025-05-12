import {
  ClubDistancesData,
  DEFAULT_CLUB_DISTANCES,
} from "@/components/ClubDistanceSettings/ClubDistances";
import { Stack } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";

const ClubDistancesContext = createContext<{
  clubDistanceData: ClubDistancesData | [];
  setClubDistanceData: (data: ClubDistancesData | []) => void;
} | null>(null);

export const useClubDistancesContext = () => {
  const clubDistancesContext = useContext(ClubDistancesContext);

  if (clubDistancesContext === null) {
    throw new Error(
      "useDistanceContext must be used within a ClubDistancesContext.Provider"
    );
  }
  return clubDistancesContext;
};

export default function RootLayout() {
  const [clubDistanceData, setClubDistanceData] = useState<
    ClubDistancesData | []
  >(DEFAULT_CLUB_DISTANCES);

  return (
    <ClubDistancesContext.Provider
      value={{ clubDistanceData, setClubDistanceData }}
    >
      <Stack screenOptions={{ headerShown: false }} />
    </ClubDistancesContext.Provider>
  );
}
