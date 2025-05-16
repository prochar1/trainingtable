"use client";

import { useEffect, useState } from "react";
import { I18nProvider } from "@react-aria/i18n";
import { CalendarDate } from "@internationalized/date";
import { DateRangePicker } from "@heroui/date-picker";

import { ActivityTable } from "@/components/activity-table";
import { StravaLoginButton } from "@/components/login-button";
import { Activity } from "@/types/activity";

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
    fetch("/api/strava-activities")
      .then((res) => {
        if (res.status === 401) return [];

        return res.json();
      })
      .then((data) => {
        setActivities(data);
        setLoading(false);
      })
      .catch(() => {
        setActivities([]);
        setLoading(false);
      });
  }, []);

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
