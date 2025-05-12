export interface Activity {
  date: string;
  distance?: number;
  movingTime?: string;
  elevationGain?: number;
  kiloJoules?: number;
  note?: string;
  [key: string]: any;
}
