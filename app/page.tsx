"use client";

import { useEffect, useState } from "react";

import { ActivityTable } from "@/components/activity-table";
import { StravaLoginButton } from "@/components/login-button";
import { Activity } from "@/types/activity";

export default function Home(): JSX.Element {
  const [activities, setActivities] = useState<Activity[] | null>(null);
  const [loading, setLoading] = useState(true);

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
      {loading && <div>Načítám aktivity...</div>}
      {!loading && activities && activities.length > 0 && (
        <ActivityTable activities={activities} />
      )}
      {!loading && activities && activities.length === 0 && (
        <div>Žádné aktivity nenalezeny nebo nejste přihlášeni.</div>
      )}
    </section>
  );
}
