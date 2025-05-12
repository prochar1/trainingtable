const daysShortCz = ["ne", "po", "út", "st", "čt", "pá", "so"];

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
  if (isDaySummary || isWeekSummary || isMonthSummary || isFullSummary)
    return null;
  if (!value) return null;
  const [year, month, day] = value.split("-");
  const dateObj = new Date(Number(year), Number(month) - 1, Number(day));
  const dayOfWeek = daysShortCz[dateObj.getDay()];

  return <span>{dayOfWeek}</span>;
};
