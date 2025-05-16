"use client";

import { useEffect, useState } from "react";
import { I18nProvider } from "@react-aria/i18n";
import { CalendarDate } from "@internationalized/date";
import { DateRangePicker } from "@heroui/date-picker";
// import { differenceInCalendarDays } from "date-fns"; // nebo napiš vlastní funkci

import { ActivityTable } from "@/components/activity-table";
import { StravaLoginButton } from "@/components/login-button";
import { Activity } from "@/types/activity";
import { calendarDateToUnix, isRangeWithinDays } from "@/utils/date";
import { fetchAllActivitiesInRange } from "@/utils/activity-aggregates";

export default function Home(): JSX.Element {
  const [activities, setActivities] = useState<Activity[] | null>(null);
  const [loading, setLoading] = useState(true);

  const now = new Date();
  const firstDay = new CalendarDate(now.getFullYear(), now.getMonth() + 1, 1);
  const lastDay = new CalendarDate(
    now.getFullYear(),
    now.getMonth() + 1,
    new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate(),
  );

  const [range, setRange] = useState({
    start: firstDay,
    end: lastDay,
  });

  useEffect(() => {
    setLoading(true);
    const after = calendarDateToUnix(range.start);
    // Přičti jeden den k end, aby byl rozsah včetně posledního dne
    const before = calendarDateToUnix(range.end) + 24 * 3600;

    fetchAllActivitiesInRange(after, before)
      .then((data) => {
        setActivities(data);
        setLoading(false);
      })
      .catch(() => {
        setActivities([]);
        setLoading(false);
      });
  }, [range]);

  return (
    <section className="flex flex-col gap-4">
      <h1>TrainingTable</h1>
      <StravaLoginButton />
      <I18nProvider locale="cz-CS">
        <DateRangePicker
          aria-label="Výběr rozsahu dat"
          className="max-w-xs mb-4"
          firstDayOfWeek="mon"
          label="Nastavení data"
          value={range}
          visibleMonths={2}
          onChange={(value) => {
            if (value) {
              if (!isRangeWithinDays(value.start, value.end, 366)) {
                alert("Lze vybrat maximálně 366 dní.");

                return;
              }
              setRange(value);
            }
          }}
        />
      </I18nProvider>
      {loading && <div>Načítám aktivity...</div>}
      {!loading && activities && activities.length > 0 && (
        <ActivityTable activities={activities} range={range} />
      )}
      {!loading && activities && activities.length === 0 && (
        <div>Žádné aktivity nenalezeny nebo nejste přihlášeni.</div>
      )}
    </section>
  );
}
