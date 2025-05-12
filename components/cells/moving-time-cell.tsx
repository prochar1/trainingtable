import React from "react";

import { sumMovingTime } from "../../utils/activity-aggregates";
import { Activity } from "../../types/activity";

export const MovingTimeCell = ({
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
    const sum = sumMovingTime(summaryActivities);

    return <span className="font-bold">{sum}</span>;
  }

  return <span>{value != null ? `${value}` : ""}</span>;
};
