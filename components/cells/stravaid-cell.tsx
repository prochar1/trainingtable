import React from "react";

import { Activity } from "@/types/activity";

export const StravaIdCell = ({ activity }: { activity: Activity }) => {
  console.log("StravaIdCell", activity);
  if (!activity?.stravaId) return null;
  const stravaUrl = `https://www.strava.com/activities/${activity.stravaId}`;

  return (
    <a
      href={stravaUrl}
      rel="noopener noreferrer"
      style={{ color: "#fc4c02", fontWeight: 600, textDecoration: "underline" }}
      target="_blank"
      title="Otevřít aktivitu na Stravě"
      onClick={(e) => e.stopPropagation()}
    >
      Strava
    </a>
  );
};
