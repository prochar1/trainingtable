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

export function getAllDaysRange(activities: Activity[]): string[] {
  if (!activities.length) return [];
  const sorted = [...activities].sort((a, b) => a.date.localeCompare(b.date));
  const start = sorted[0].date;
  const end = sorted[sorted.length - 1].date;

  const days: string[] = [];
  let current = new Date(start);
  const last = new Date(end);

  while (current <= last) {
    const y = current.getFullYear();
    const m = String(current.getMonth() + 1).padStart(2, "0");
    const d = String(current.getDate()).padStart(2, "0");

    days.push(`${y}-${m}-${d}`);
    current.setDate(current.getDate() + 1);
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

export function getWeekActivitiesMap(
  activities: Activity[],
): Record<string, Activity[]> {
  const map: Record<string, Activity[]> = {};

  activities.forEach((a) => {
    const weekKey = `${a.date.slice(0, 4)}-W${getWeekNumber(a.date)}`;

    if (!map[weekKey]) map[weekKey] = [];
    map[weekKey].push(a);
  });

  return map;
}

export function isSundayOfWeek(date: string): boolean {
  const d = new Date(date);

  return d.getDay() === 0;
}
