import { sumByKey } from "../../utils/activity-aggregates";
import { Activity } from "../../types/activity";

export const KiloJoulesCell = ({
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
    const sum = sumByKey(summaryActivities, "kiloJoules");

    return <span className="font-bold">{sum.toFixed(0)} kJ</span>;
  }

  return <span>{value != null ? `${value.toFixed(0)} kJ` : ""}</span>;
};
