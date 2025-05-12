import { ActivityTable } from "../components/activity-table";

interface Activity {
  date: string;
  distance: number;
  movingTime: string;
  elevationGain: number;
  kiloJoules: number;
  note?: string;
}

// Ukázková data – více aktivit ve stejný den (např. 2025-05-10 a 2025-05-22)
const activities: Activity[] = [
  {
    date: "2025-05-01",
    distance: 12.5,
    movingTime: "1:05",
    elevationGain: 210,
    kiloJoules: 850,
  },
  {
    date: "2025-05-03",
    distance: 8.2,
    movingTime: "0:45",
    elevationGain: 120,
    kiloJoules: 500,
  },
  {
    date: "2025-05-05",
    distance: 20.1,
    movingTime: "1:50",
    elevationGain: 340,
    kiloJoules: 1200,
  },
  {
    date: "2025-05-08",
    distance: 15.0,
    movingTime: "1:15",
    elevationGain: 180,
    kiloJoules: 900,
  },
  {
    date: "2025-05-10",
    distance: 9.7,
    movingTime: "0:55",
    elevationGain: 90,
    kiloJoules: 600,
    note: "Ranní běh",
  },
  {
    date: "2025-05-10",
    distance: 5.3,
    movingTime: "0:30",
    elevationGain: 40,
    kiloJoules: 300,
    note: "Večerní procházka",
  },
  {
    date: "2025-05-12",
    distance: 22.3,
    movingTime: "2:05",
    elevationGain: 410,
    kiloJoules: 1350,
  },
  {
    date: "2025-05-15",
    distance: 13.4,
    movingTime: "1:10",
    elevationGain: 200,
    kiloJoules: 800,
  },
  {
    date: "2025-05-17",
    distance: 7.8,
    movingTime: "0:40",
    elevationGain: 70,
    kiloJoules: 450,
  },
  {
    date: "2025-05-19",
    distance: 18.6,
    movingTime: "1:35",
    elevationGain: 300,
    kiloJoules: 1100,
  },
  {
    date: "2025-05-22",
    distance: 16.2,
    movingTime: "1:20",
    elevationGain: 220,
    kiloJoules: 950,
    note: "Kolo",
  },
  {
    date: "2025-05-22",
    distance: 4.5,
    movingTime: "0:25",
    elevationGain: 30,
    kiloJoules: 200,
    note: "Chůze",
  },
  {
    date: "2025-05-24",
    distance: 10.5,
    movingTime: "0:58",
    elevationGain: 110,
    kiloJoules: 650,
  },
  {
    date: "2025-05-26",
    distance: 21.0,
    movingTime: "1:55",
    elevationGain: 370,
    kiloJoules: 1250,
  },
  {
    date: "2025-05-29",
    distance: 14.8,
    movingTime: "1:08",
    elevationGain: 190,
    kiloJoules: 780,
  },
  {
    date: "2025-05-31",
    distance: 19.5,
    movingTime: "1:40",
    elevationGain: 320,
    kiloJoules: 1150,
  },
];

export default function Home(): JSX.Element {
  return (
    <section className="flex flex-col gap-4">
      <h1>TrainingTable</h1>
      <ActivityTable activities={activities} />
    </section>
  );
}
