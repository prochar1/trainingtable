import React from "react";

import { sumByKey } from "../../utils/activity-aggregates";
import { Activity } from "../../types/activity";

export const DistanceCell = ({
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
    const sum = sumByKey(summaryActivities, "distance");

    return <span className="font-bold">{sum.toFixed(1)} km</span>;
  }

  return <span>{value != null ? `${value.toFixed(1)} km` : ""}</span>;
};
