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

// Součet časů ve formátu "h:mm"
export function sumMovingTime(activities: Activity[]): string {
  const totalMinutes = activities.reduce((acc, a) => {
    if (!a.movingTime) return acc;
    const [h, m] = a.movingTime.split(":").map(Number);

    return acc + h * 60 + m;
  }, 0);
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;

  return `${h}:${String(m).padStart(2, "0")}`;
}
