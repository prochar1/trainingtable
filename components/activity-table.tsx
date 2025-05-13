"use client";
import React, { useState } from "react";
import { DateRangePicker } from "@heroui/date-picker";
import { CalendarDate } from "@internationalized/date";
import { cs } from "date-fns/locale";

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
  const now = new Date();
  const firstDay = new CalendarDate(now.getFullYear(), now.getMonth() + 1, 1);
  const lastDay = new CalendarDate(
    now.getFullYear(),
    now.getMonth() + 1,
    new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate(),
  );

  const [range, setRange] = useState({
    start: firstDay,
    end: lastDay,
  });

  const filteredActivities = activities.filter((a) => {
    const d = new Date(a.date);
    const start = range.start?.toDate?.("UTC") ?? null;
    const end = range.end?.toDate?.("UTC") ?? null;

    if (start && d < start) return false;
    if (end && d > end) return false;

    return true;
  });

  const days = getAllDaysRange(filteredActivities);
  const columns = activityTableColumns;
  const lastDaysInMonths = getLastDaysInMonths(days);
  const monthActivitiesMap = getMonthActivitiesMap(filteredActivities);
  const weekActivitiesMap = getWeekActivitiesMap(filteredActivities);

  return (
    <div>
      <DateRangePicker
        aria-label="Výběr rozsahu dat"
        className="max-w-xs mb-4"
        label="Nastavení data"
        value={range}
        visibleMonths={2}
        onChange={(value) => {
          if (value) {
            setRange(value);
          }
        }}
      />
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
          {filteredActivities.length > 0 && (
            <ActivityTableRow
              key="full-summary"
              activity={undefined}
              columns={columns}
              date="Celkem"
              isFullSummary={true}
              summaryActivities={filteredActivities}
            />
          )}
        </tbody>
      </table>
    </div>
  );
};
