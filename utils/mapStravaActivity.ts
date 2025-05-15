import { Activity } from "@/types/activity";

export function mapStravaActivity(strava: any): Activity {
  return {
    date: strava.start_date?.slice(0, 10) ?? "",
    distance: strava.distance,
    movingTime: strava.moving_time,
    elevationGain: strava.total_elevation_gain,
    kiloJoules: strava.kilojoules,
    note: strava.name || strava.description || "",
    // přidej další mapování podle potřeby
  };
}

export function mapStravaActivities(stravaArr: any[]): Activity[] {
  return stravaArr.map(mapStravaActivity);
}
