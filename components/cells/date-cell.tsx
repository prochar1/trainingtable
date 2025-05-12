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
  if (isDaySummary || isWeekSummary || isMonthSummary || isFullSummary)
    return null;
  if (!value) return null;
  const [, month, day] = value.split("-");

  return (
    <span>
      {Number(day)}.{Number(month)}.
    </span>
  );
};
