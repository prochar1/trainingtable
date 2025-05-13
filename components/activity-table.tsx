import React from "react";

import { Activity } from "../types/activity";
import { activityTableColumns } from "../config/tableColumns";
import {
  getAllDaysRange,
  getYearMonth,
  getLastDaysInMonths,
  getMonthActivitiesMap,
  isFullMonthInDays,
  getWeekNumber,
  getWeekActivitiesMap,
  isSundayOfWeek,
} from "../utils/date";

import { ActivityTableRow } from "./activity-table-row";

interface ActivityTableProps {
  activities?: Activity[];
}

export const ActivityTable: React.FC<ActivityTableProps> = ({
  activities = [],
}) => {
  const days = getAllDaysRange(activities);
  const columns = activityTableColumns;
  const lastDaysInMonths = getLastDaysInMonths(days);
  const monthActivitiesMap = getMonthActivitiesMap(activities);
  const weekActivitiesMap = getWeekActivitiesMap(activities);

  return (
    <table className="min-w-full">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col} className="border px-2 py-1 bg-gray-800 capitalize">
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {days.map((date) => {
          const summaryDayActivities = activities.filter(
            (a) => a.date === date,
          );
          const ym = getYearMonth(date);
          const isLastDayOfMonth = lastDaysInMonths[ym] === date;

          const rows =
            summaryDayActivities.length === 0
              ? [
                  <ActivityTableRow
                    key={date}
                    activity={undefined}
                    columns={columns}
                    date={date}
                  />,
                ]
              : summaryDayActivities.map((activity, idx) => (
                  <ActivityTableRow
                    key={date + idx}
                    activity={activity}
                    columns={columns}
                    date={date}
                  />
                ));

          // Pokud je více aktivit, přidej souhrnný řádek za den
          if (summaryDayActivities.length > 1) {
            rows.push(
              <ActivityTableRow
                key={date + "-summary"}
                activity={undefined}
                columns={columns}
                date={date}
                isDaySummary={true}
                summaryActivities={summaryDayActivities}
              />,
            );
          }

          // Týdenní summary: pokud je neděle nebo poslední den v datech
          const isSunday = isSundayOfWeek(date);
          const weekKey = `${date.slice(0, 4)}-W${getWeekNumber(date)}`;

          if (isSunday && weekActivitiesMap[weekKey]?.length) {
            // Najdi všechny dny tohoto týdne v days
            const weekDays = days.filter(
              (d) =>
                getWeekNumber(d) === getWeekNumber(date) &&
                d.slice(0, 4) === date.slice(0, 4),
            );

            // Zobraz summary jen pokud jsou v tabulce všechny dny týdne
            if (weekDays.length === 7) {
              rows.push(
                <ActivityTableRow
                  key={weekKey + "-week-summary"}
                  activity={undefined}
                  columns={columns}
                  date={weekKey}
                  isWeekSummary={true}
                  summaryActivities={weekActivitiesMap[weekKey]}
                />,
                <tr key={weekKey + "-header"} className="bg-gray-800">
                  {columns.map((col) => (
                    <th key={col} className="border px-2 py-1 capitalize">
                      {col}
                    </th>
                  ))}
                </tr>,
              );
            }
          }

          // Pokud je to poslední den v měsíci, přidej souhrnný řádek za měsíc
          if (
            isLastDayOfMonth &&
            monthActivitiesMap[ym]?.length &&
            isFullMonthInDays(days, ym)
          ) {
            rows.push(
              <ActivityTableRow
                key={ym + "-month-summary"}
                activity={undefined}
                columns={columns}
                date={ym}
                isMonthSummary={true}
                summaryActivities={monthActivitiesMap[ym]}
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
