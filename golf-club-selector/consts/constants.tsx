const DISTANCE_CONFIG = {
  INITIAL_DISTANCE: 100,
  LONG_PRESS_INTERVAL: 40,
  DRAG_INCREMENT: 100,
} as const;

export const YARD_TO_METER_CONVERSION_FACTOR = 0.9144;

export type InputDirection = "left" | "right";

export default DISTANCE_CONFIG;
