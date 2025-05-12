import React from "react";

import { Activity } from "../types/activity";
import { activityTableColumns } from "../config/tableColumns";
import { getDaysInCurrentMonth } from "../utils/date";

import { ActivityTableRow } from "./activity-table-row";

interface ActivityTableProps {
  activities?: Activity[];
}

export const ActivityTable: React.FC<ActivityTableProps> = ({
  activities = [],
}) => {
  const days = getDaysInCurrentMonth();
  const columns = activityTableColumns;

  return (
    <table className="min-w-full border border-gray-300">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col} className="border px-2 py-1 bg-gray-100 capitalize">
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {days.map((date) => {
          const summaryActivities = activities.filter((a) => a.date === date);

          if (summaryActivities.length === 0) {
            return (
              <ActivityTableRow
                key={date}
                activity={undefined}
                columns={columns}
                date={date}
              />
            );
          }

          const rows = summaryActivities.map((activity, idx) => (
            <ActivityTableRow
              key={date + idx}
              activity={activity}
              columns={columns}
              date={date}
            />
          ));

          // Pokud je více aktivit, přidej souhrnný řádek
          if (summaryActivities.length > 1) {
            rows.push(
              <ActivityTableRow
                key={date + "-summary"}
                activity={undefined}
                columns={columns}
                date={date}
                isDaySummary={true}
                summaryActivities={summaryActivities}
              />,
            );
          }

          return rows;
        })}

        {/* Souhrnný řádek za celý rozsah */}
        {activities.length > 0 && (
          <ActivityTableRow
            key="full-summary"
            activity={undefined}
            columns={columns}
            date="Celkem"
            isFullSummary={true}
            summaryActivities={activities}
          />
        )}
      </tbody>
    </table>
  );
};
