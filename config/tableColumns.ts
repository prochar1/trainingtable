import { DayCell } from "../components/cells/day-cell";
import { DateCell } from "../components/cells/date-cell";
import { DistanceCell } from "../components/cells/distance-cell";
import { MovingTimeCell } from "../components/cells/moving-time-cell";
import { ElevationGainCell } from "../components/cells/elevation-gain-cell";
import { KiloJoulesCell } from "../components/cells/kilojoules-cell";
import { StravaIdCell } from "../components/cells/stravaid-cell";

import { AverageSpeedCell } from "@/components/cells/averagespeed-cell";

export const activityTableColumns = [
  "Day",
  "Date",
  "distance",
  "movingTime",
  "elevationGain",
  "kiloJoules",
  "type",
  "sportType",
  "averageSpeed",
  "maxSpeed",
  "averageCadence",
  "averageTemp",
  "averageWatts",
  "averageHeartrate",
  "maxHeartrate",
  "prCount",
  "kudosCount",
  "stravaId",
  // další sloupce...
] as const;

export const activityTableCellComponentMap = {
  Day: DayCell,
  Date: DateCell,
  distance: DistanceCell,
  movingTime: MovingTimeCell,
  elevationGain: ElevationGainCell,
  kiloJoules: KiloJoulesCell,
  stravaId: StravaIdCell,
  averageSpeed: AverageSpeedCell,
};
