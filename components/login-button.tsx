// například v komponentě LoginButton.tsx
import Image from "next/image";

const STRAVA_CLIENT_ID = process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID;
const REDIRECT_URI =
  process.env.NEXT_PUBLIC_STRAVA_REDIRECT_URI ||
  "http://localhost:3000/api/strava-callback";

export function StravaLoginButton() {
  const authUrl = `https://www.strava.com/oauth/authorize?client_id=${STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(
    REDIRECT_URI,
  )}&approval_prompt=auto&scope=activity:read_all`;

  return (
    <a href={authUrl}>
      <Image
        alt="Strava logo"
        height={48}
        src="/btn_strava_connect_with_orange.svg"
        style={{ display: "inline", verticalAlign: "middle" }}
        width={238}
      />
    </a>
  );
}
