import { Activity } from "@/types/activity";

export function mapStravaActivity(strava: any): Activity {
  return {
    date: strava.start_date?.slice(0, 10) ?? "",
    distance: strava.distance,
    movingTime: strava.moving_time,
    elevationGain: strava.total_elevation_gain,
    kiloJoules: strava.kilojoules,
    note: strava.name || strava.description || "",
    type: strava.type,
    sportType: strava.sport_type,
    averageSpeed: strava.average_speed,
    maxSpeed: strava.max_speed,
    averageCadence: strava.average_cadence,
    averageTemp: strava.average_temp,
    averageWatts: strava.average_watts,
    averageHeartrate: strava.average_heartrate,
    maxHeartrate: strava.max_heartrate,
    prCount: strava.pr_count,
    kudosCount: strava.kudos_count,
    stravaId: strava.id,
    // přidej další podle potřeby
  };
}

export function mapStravaActivities(stravaArr: any[]): Activity[] {
  return stravaArr.map(mapStravaActivity);
}
