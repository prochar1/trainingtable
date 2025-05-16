import { CalendarDate } from "@internationalized/date";

import { Activity } from "@/types/activity";

export function getDaysInCurrentMonth(): string[] {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const days: string[] = [];
  const date = new Date(year, month, 1);

  while (date.getMonth() === month) {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    days.push(`${yyyy}-${mm}-${dd}`);
    date.setDate(date.getDate() + 1);
  }

  return days;
}

export function getAllDaysInRange(
  start: CalendarDate,
  end: CalendarDate,
): string[] {
  const days: string[] = [];
  let current = start;

  while (current.compare(end) <= 0) {
    days.push(current.toString()); // "YYYY-MM-DD"
    current = current.add({ days: 1 });
  }

  return days;
}

export const getYearMonth = (date: string) => date.slice(0, 7);

export function getLastDaysInMonths(days: string[]): Record<string, string> {
  return days.reduce((acc: Record<string, string>, date) => {
    const ym = getYearMonth(date);

    if (!acc[ym] || acc[ym] < date) {
      acc[ym] = date;
    }

    return acc;
  }, {});
}

export function getMonthActivitiesMap(
  activities: Activity[],
): Record<string, Activity[]> {
  const monthActivitiesMap: Record<string, Activity[]> = {};

  activities.forEach((a) => {
    const ym = getYearMonth(a.date);

    if (!monthActivitiesMap[ym]) monthActivitiesMap[ym] = [];
    monthActivitiesMap[ym].push(a);
  });

  return monthActivitiesMap;
}

export function getDaysInMonth(ym: string): string[] {
  const [year, month] = ym.split("-");
  const d = new Date(Number(year), Number(month), 0);
  const days: string[] = [];

  for (let i = 1; i <= d.getDate(); i++) {
    days.push(
      `${year}-${month.padStart(2, "0")}-${String(i).padStart(2, "0")}`,
    );
  }

  return days;
}

export function isFullMonthInDays(days: string[], ym: string) {
  const monthDays = getDaysInMonth(ym); // např. ["2024-05-01", ..., "2024-05-31"]

  return monthDays.every((d) => days.includes(d));
}

export function getWeekNumber(dateStr: string) {
  const date = new Date(dateStr);
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.valueOf() - firstDayOfYear.valueOf()) / 86400000;

  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

export function getMondayOfWeek(dateStr: string): string {
  const date = new Date(dateStr);
  const day = date.getDay();
  // getDay(): 0 = neděle, 1 = pondělí, ..., 6 = sobota
  const diff = day === 0 ? -6 : 1 - day; // pokud neděle, posun na pondělí zpět

  date.setDate(date.getDate() + diff);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd}`;
}

export function getWeekActivitiesMap(
  activities: Activity[],
): Record<string, Activity[]> {
  const map: Record<string, Activity[]> = {};

  activities.forEach((a) => {
    const monday = getMondayOfWeek(a.date);

    if (!map[monday]) map[monday] = [];
    map[monday].push(a);
  });

  return map;
}

export function isSundayOfWeek(date: string): boolean {
  const d = new Date(date);

  return d.getDay() === 0;
}

export function getISOWeekNumber(dateStr: string): number {
  const date = new Date(dateStr);

  date.setHours(0, 0, 0, 0);
  // Čtvrtek v aktuálním týdnu
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  const week1 = new Date(date.getFullYear(), 0, 4);

  return (
    1 +
    Math.round(
      ((date.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7,
    )
  );
}

export function calendarDateToUnix(date: CalendarDate) {
  return Math.floor(
    new Date(date.year, date.month - 1, date.day).getTime() / 1000,
  );
}

export function getCalendarDateDiffInDays(
  start: CalendarDate,
  end: CalendarDate,
): number {
  const startDate = new Date(start.year, start.month - 1, start.day);
  const endDate = new Date(end.year, end.month - 1, end.day);

  return (
    Math.abs(
      Math.floor(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
      ),
    ) + 1 // včetně obou dnů
  );
}

export function isRangeWithinDays(
  start: CalendarDate,
  end: CalendarDate,
  maxDays: number,
): boolean {
  return getCalendarDateDiffInDays(start, end) <= maxDays;
}
