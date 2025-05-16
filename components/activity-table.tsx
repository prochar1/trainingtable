"use client";

import React from "react";
import { CalendarDate } from "@internationalized/date";

import { filterActivitiesByRange } from "../utils/activity-aggregates";
import { Activity } from "../types/activity";
import { activityTableColumns } from "../config/tableColumns";
import {
  getAllDaysInRange,
  getYearMonth,
  getLastDaysInMonths,
  getMonthActivitiesMap,
  isFullMonthInDays,
  getWeekActivitiesMap,
  isSundayOfWeek,
  getMondayOfWeek,
} from "../utils/date";

import { ActivityTableRow } from "./activity-table-row";

interface ActivityTableProps {
  activities?: Activity[];
  range?: { start: CalendarDate; end: CalendarDate };
}

export const ActivityTable: React.FC<ActivityTableProps> = ({
  activities = [],
  range,
}) => {
  const filteredActivities = filterActivitiesByRange(activities, range ?? {});

  const days = range ? getAllDaysInRange(range.start, range.end) : [];

  const columns = activityTableColumns;
  const lastDaysInMonths = getLastDaysInMonths(days);
  const monthActivitiesMap = getMonthActivitiesMap(filteredActivities);
  const weekActivitiesMap = getWeekActivitiesMap(filteredActivities);

  return (
    <table className="min-w-full border border-gray-800">
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={col}
              className="px-2 py-1 bg-gray-800 capitalize text-left font-normal"
            >
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {days.map((date) => {
          const summaryDayActivities = filteredActivities.filter(
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
          const weekKey = getMondayOfWeek(date);

          if (isSunday) {
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
                  <th
                    key={col}
                    className="px-2 py-1 capitalize text-left font-normal"
                  >
                    {col}
                  </th>
                ))}
              </tr>,
            );
          }

          // Pokud je to poslední den v měsíci, přidej souhrnný řádek za měsíc
          if (isLastDayOfMonth && isFullMonthInDays(days, ym)) {
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
        <ActivityTableRow
          key="full-summary"
          activity={undefined}
          columns={columns}
          date="Celkem"
          isFullSummary={true}
          summaryActivities={filteredActivities}
        />
      </tbody>
    </table>
  );
};
