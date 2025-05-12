import React from "react";

import { sumByKey } from "../../utils/activity-aggregates";
import { Activity } from "../../types/activity";

export const ElevationGainCell = ({
  value,
  isDaySummary,
  isWeekSummary,
  isMonthSummary,
  isFullSummary,
  summaryActivities,
}: {
  value?: number;
  isDaySummary?: boolean;
  isWeekSummary?: boolean;
  isMonthSummary?: boolean;
  isFullSummary?: boolean;
  summaryActivities?: Activity[];
}) => {
  if (
    (isDaySummary || isWeekSummary || isMonthSummary || isFullSummary) &&
    summaryActivities
  ) {
    const sum = sumByKey(summaryActivities, "elevationGain");

    return <span className="font-bold">{sum} m</span>;
  }

  return <span>{value != null ? `${value} m` : ""}</span>;
};
