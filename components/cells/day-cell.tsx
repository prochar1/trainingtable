import { getISOWeekNumber } from "@/utils/date";

const daysShortCz = ["ne", "po", "út", "st", "čt", "pá", "so"];

const monthsCz = [
  "Leden",
  "Únor",
  "Březen",
  "Duben",
  "Květen",
  "Červen",
  "Červenec",
  "Srpen",
  "Září",
  "Říjen",
  "Listopad",
  "Prosinec",
];

export const DayCell = ({
  value,
  isDaySummary,
  isWeekSummary,
  isMonthSummary,
  isFullSummary,
}: {
  value?: string;
  isDaySummary?: boolean;
  isWeekSummary?: boolean;
  isMonthSummary?: boolean;
  isFullSummary?: boolean;
}) => {
  // Nezobrazuj den pro souhrnné řádky
  if (isDaySummary) return null;

  if (!value) return null;

  if (isMonthSummary) {
    const [, month] = value.split("-");
    const monthName = monthsCz[Number(month) - 1] || month;

    return <span>{monthName}</span>;
  }
  if (isWeekSummary) {
    const weekNumber = value ? getISOWeekNumber(value) : 0;

    return <span>{weekNumber}. týden</span>;
  }

  if (isFullSummary) return "Celkem";

  const [year, month, day] = value.split("-");

  // const [year, month, day] = value.split("-");
  const dateObj = new Date(Number(year), Number(month) - 1, Number(day));
  const dayOfWeek = daysShortCz[dateObj.getDay()];

  return <span>{dayOfWeek}</span>;
};
