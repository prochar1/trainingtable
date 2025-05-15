import { CalendarDate } from "@internationalized/date";

import { Activity } from "../types/activity";

// Součet číselné hodnoty pro daný klíč
export function sumByKey(activities: Activity[], key: keyof Activity): number {
  return activities.reduce((acc, a) => acc + (Number(a[key]) || 0), 0);
}

// Průměr číselné hodnoty pro daný klíč
export function avgByKey(activities: Activity[], key: keyof Activity): number {
  if (!activities.length) return 0;

  return sumByKey(activities, key) / activities.length;
}

export function filterActivitiesByRange(
  activities: Activity[],
  range: { start?: CalendarDate; end?: CalendarDate },
): Activity[] {
  return activities.filter((a) => {
    const d = new Date(a.date);
    const start = range.start?.toDate?.("UTC") ?? null;
    const end = range.end?.toDate?.("UTC") ?? null;

    if (start && d < start) return false;
    if (end && d > end) return false;

    return true;
  });
}
