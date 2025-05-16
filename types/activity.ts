export interface Activity {
  date: string;
  distance?: number;
  movingTime?: number;
  elevationGain?: number;
  kiloJoules?: number;
  note?: string;
  type?: string;
  sportType?: string;
  averageSpeed?: number;
  maxSpeed?: number;
  averageCadence?: number;
  averageTemp?: number;
  averageWatts?: number;
  averageHeartrate?: number;
  maxHeartrate?: number;
  prCount?: number;
  kudosCount?: number;
  map?: object;
  [key: string]: any;
}
