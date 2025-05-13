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

export const DateCell = ({
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
  // Nezobrazuj datum pro souhrnné řádky
  if (!value) return null;
  if (isDaySummary) return null;
  if (isMonthSummary) {
    const [, month] = value.split("-");
    const monthName = monthsCz[Number(month) - 1] || month;

    return <span>{monthName}</span>;
  }
  if (isWeekSummary) {
    const [, weekNumber] = value.split("-");

    return <span>{weekNumber.replace("W", "")}. týden</span>;
  }
  const [, month, day] = value.split("-");

  if (isFullSummary) return "Celkem";

  return (
    <span>
      {Number(day)}.{Number(month)}.
    </span>
  );
};
