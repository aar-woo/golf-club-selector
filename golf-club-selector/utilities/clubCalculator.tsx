import ClubsEnum from "@/consts/ClubsEnum";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getRecClub = async (distance: number): Promise<ClubsEnum> => {
  let clubData;

  try {
    const clubStoredData = await AsyncStorage.getItem("club-distance-data");
    if (clubStoredData !== null) clubData = JSON.parse(clubStoredData);
  } catch (e) {
    console.error("Error fetching stored club distance data: ", e);
  }

  if (distance > clubData[ClubsEnum.DRIVER]) {
    return ClubsEnum.DRIVER;
  } else if (distance > clubData[ClubsEnum.THREE_WOOD]) {
    return ClubsEnum.THREE_WOOD;
  } else if (distance > clubData[ClubsEnum.FIVE_WOOD]) {
    return ClubsEnum.FIVE_WOOD;
  } else if (distance > clubData[ClubsEnum.THREE_IRON]) {
    return ClubsEnum.THREE_IRON;
  } else if (distance > clubData[ClubsEnum.FOUR_IRON]) {
    return ClubsEnum.FOUR_IRON;
  } else if (distance > clubData[ClubsEnum.FIVE_IRON]) {
    return ClubsEnum.FIVE_IRON;
  } else if (distance > clubData[ClubsEnum.SIX_IRON]) {
    return ClubsEnum.SIX_IRON;
  } else if (distance > clubData[ClubsEnum.SEVEN_IRON]) {
    return ClubsEnum.SEVEN_IRON;
  } else if (distance > clubData[ClubsEnum.EIGHT_IRON]) {
    return ClubsEnum.EIGHT_IRON;
  } else if (distance > clubData[ClubsEnum.NINE_IRON]) {
    return ClubsEnum.NINE_IRON;
  } else if (distance > clubData[ClubsEnum.PITCHING_WEDGE]) {
    return ClubsEnum.PITCHING_WEDGE;
  } else if (distance > clubData[ClubsEnum.GAP_WEDGE]) {
    return ClubsEnum.GAP_WEDGE;
  } else if (distance > clubData[ClubsEnum.SAND_WEDGE]) {
    return ClubsEnum.SAND_WEDGE;
  } else if (distance > clubData[ClubsEnum.LOB_WEDGE]) {
    return ClubsEnum.LOB_WEDGE;
  } else {
    return ClubsEnum.PUTTER;
  }
};

export default getRecClub;
