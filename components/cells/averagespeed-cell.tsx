import React from "react";

import { avgByKey } from "../../utils/activity-aggregates";
import { Activity } from "../../types/activity";

export const AverageSpeedCell = ({
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
    const avg = avgByKey(summaryActivities, "averageSpeed");
    const avgKmH = avg != null ? avg * 3.6 : undefined;

    return avgKmH ? (
      <span className="font-bold">{avgKmH.toFixed(1)} km/h</span>
    ) : (
      <span />
    );
  }

  const valueKmH = value != null ? value * 3.6 : undefined;

  return valueKmH ? <span>{valueKmH.toFixed(1)} km/h</span> : <span />;
};
