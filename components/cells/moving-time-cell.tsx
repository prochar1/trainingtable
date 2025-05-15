import React from "react";

import { sumByKey } from "../../utils/activity-aggregates";
import { Activity } from "../../types/activity";

// Pomocná funkce pro převod sekund na H:m:s
function formatSecondsToHMS(seconds?: number): string {
  if (seconds == null || isNaN(seconds)) return "";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  return [h, m, s]
    .map((v, i) => (i === 0 ? v : String(v).padStart(2, "0")))
    .join(":");
}

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
    const sum = sumByKey(summaryActivities, "movingTime");

    return <span className="font-bold">{formatSecondsToHMS(sum)}</span>;
  }

  return <span>{value != null ? formatSecondsToHMS(value) : ""}</span>;
};
