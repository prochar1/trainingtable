import { cookies } from "next/headers";

import { mapStravaActivities } from "@/utils/mapStravaActivity";

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const access_token = cookieStore.get("strava_access_token")?.value;

  if (!access_token) {
    return new Response("Not authenticated", { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || "1";
  const per_page = searchParams.get("per_page") || "30";
  const after = searchParams.get("after");
  const before = searchParams.get("before");

  let url = `https://www.strava.com/api/v3/athlete/activities?per_page=${per_page}&page=${page}`;

  if (after) url += `&after=${after}`;
  if (before) url += `&before=${before}`;

  const activitiesRes = await fetch(url, {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  if (!activitiesRes.ok) {
    return new Response("Failed to fetch activities", { status: 500 });
  }

  const activities = await activitiesRes.json();

  return Response.json(mapStravaActivities(activities));
}
