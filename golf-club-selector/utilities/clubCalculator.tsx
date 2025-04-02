import GolfClubs from "@/consts/ClubsEnum";

const getRecClub = (distance: number): GolfClubs => {
  if (distance > 250) {
    return GolfClubs.DRIVER;
  } else if (distance > 200) {
    return GolfClubs.THREE_WOOD;
  } else if (distance > 180) {
    return GolfClubs.FIVE_WOOD;
  } else if (distance > 170) {
    return GolfClubs.THREE_IRON;
  } else if (distance > 160) {
    return GolfClubs.FOUR_IRON;
  } else if (distance > 150) {
    return GolfClubs.FIVE_IRON;
  } else if (distance > 140) {
    return GolfClubs.SIX_IRON;
  } else if (distance > 130) {
    return GolfClubs.SEVEN_IRON;
  } else if (distance > 120) {
    return GolfClubs.EIGHT_IRON;
  } else if (distance > 110) {
    return GolfClubs.NINE_IRON;
  } else if (distance > 90) {
    return GolfClubs.PITCHING_WEDGE;
  } else if (distance > 70) {
    return GolfClubs.GAP_WEDGE;
  } else if (distance > 50) {
    return GolfClubs.SAND_WEDGE;
  } else if (distance > 30) {
    return GolfClubs.LOB_WEDGE;
  } else {
    return GolfClubs.PUTTER;
  }
};

export default getRecClub;
