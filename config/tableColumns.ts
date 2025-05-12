import { DayCell } from "../components/cells/day-cell";
import { DateCell } from "../components/cells/date-cell";
import { DistanceCell } from "../components/cells/distance-cell";
import { MovingTimeCell } from "../components/cells/moving-time-cell";
import { ElevationGainCell } from "../components/cells/elevation-gain-cell";
import { KiloJoulesCell } from "../components/cells/kilojoules-cell";

export const activityTableColumns = [
  "Day",
  "Date",
  "distance",
  "movingTime",
  "elevationGain",
  "kiloJoules",
] as const;

export const activityTableCellComponentMap = {
  Day: DayCell,
  Date: DateCell,
  distance: DistanceCell,
  movingTime: MovingTimeCell,
  elevationGain: ElevationGainCell,
  kiloJoules: KiloJoulesCell,
};
