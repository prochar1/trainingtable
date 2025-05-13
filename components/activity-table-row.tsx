import React from "react";

import { Activity } from "../types/activity";
import {
  activityTableCellComponentMap,
  activityTableColumns,
} from "../config/tableColumns";

type ActivityTableColumn = (typeof activityTableColumns)[number];

interface ActivityTableRowProps {
  date: string;
  activity?: Activity;
  columns: readonly ActivityTableColumn[];
  isDaySummary?: boolean;
  isWeekSummary?: boolean; // přidáno
  isMonthSummary?: boolean;
  isFullSummary?: boolean;
  summaryActivities?: Activity[];
}

// Mapa názvů sloupců na komponenty
const cellComponentMap = activityTableCellComponentMap;

export const ActivityTableRow: React.FC<ActivityTableRowProps> = ({
  date,
  activity,
  columns,
  isDaySummary = false,
  isWeekSummary = false,
  isMonthSummary = false,
  isFullSummary = false,
  summaryActivities,
}) => (
  <tr
    className={
      isFullSummary
        ? "bg-red-800 font-bold"
        : isMonthSummary
          ? "bg-blue-800 font-bold"
          : isWeekSummary
            ? "bg-green-800 font-bold"
            : isDaySummary
              ? "bg-yellow-800 font-bold"
              : ""
    }
  >
    {columns.map((col) => {
      const CellComponent =
        cellComponentMap[col as keyof typeof cellComponentMap];
      let value: any =
        col === "Date" || col === "Day" ? String(date) : activity?.[col];

      return (
        <td key={col} className="border px-2 py-1">
          {CellComponent ? (
            <CellComponent
              isDaySummary={isDaySummary}
              isFullSummary={isFullSummary}
              isMonthSummary={isMonthSummary}
              isWeekSummary={isWeekSummary}
              summaryActivities={summaryActivities}
              value={value}
            />
          ) : (
            value || ""
          )}
        </td>
      );
    })}
  </tr>
);
