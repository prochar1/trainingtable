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
    const sum = sumByKey(summaryActivities, "distance") / 1000; // Convert to km

    return sum ? (
      <span className="font-bold">{sum.toFixed(1)} km</span>
    ) : (
      <span />
    );
  }

  value = value != null ? value / 1000 : undefined; // Convert to km

  return value ? <span>{value.toFixed(1)} km</span> : <span></span>;
};
