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
  if (isDaySummary || isWeekSummary || isMonthSummary || isFullSummary)
    return null;

  const [, month, day] = value.split("-");

  return (
    <span>
      {Number(day)}.{Number(month)}.
    </span>
  );
};
