import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const artistId = process.env.SPOTIFY_ARTIST_ID;

  if (!clientId || !clientSecret) {
    return NextResponse.json({ error: "Missing env vars", clientId: !!clientId, clientSecret: !!clientSecret });
  }

  try {
    const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
      },
      body: "grant_type=client_credentials",
      cache: "no-store",
    });
    const tokenData = await tokenRes.json();
    if (!tokenData.access_token) {
      return NextResponse.json({ error: "No access token", tokenData });
    }

    const artistRes = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
      cache: "no-store",
    });
    const artistData = await artistRes.json();

    return NextResponse.json({
      ok: true,
      hasImages: !!artistData.images?.length,
      imageCount: artistData.images?.length,
      firstImage: artistData.images?.[0]?.url,
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) });
  }
}
