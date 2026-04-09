const ARTIST_ID = process.env.SPOTIFY_ARTIST_ID ?? "2nyS5xoo0whI3q74gsRmHL";

async function getAccessToken(): Promise<string> {
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString("base64"),
    },
    body: "grant_type=client_credentials",
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`Token fetch failed: ${res.status}`);
  const data = await res.json();
  return data.access_token;
}

export interface Release {
  title: string;
  image: string;
  href: string;
}

export async function getArtistImage(): Promise<string> {
  try {
    const token = await getAccessToken();
    const res = await fetch(
      `https://api.spotify.com/v1/artists/${ARTIST_ID}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) return "";
    const data = await res.json();
    return data.images?.[0]?.url ?? "";
  } catch {
    return "";
  }
}

export interface Track {
  title: string;
  popularity: number;
  href: string;
  number: number;
}

export async function getLatestAlbumTracks(): Promise<Track[]> {
  try {
    const token = await getAccessToken();
    // Fetch the latest album
    const albumsRes = await fetch(
      `https://api.spotify.com/v1/artists/${ARTIST_ID}/albums?include_groups=single,album&market=US&limit=1`,
      { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" }
    );
    if (!albumsRes.ok) return [];
    const albumsData = await albumsRes.json();
    const album = albumsData.items?.[0];
    if (!album) return [];

    // Fetch tracks for that album
    const tracksRes = await fetch(
      `https://api.spotify.com/v1/albums/${album.id}/tracks?market=US&limit=50`,
      { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" }
    );
    if (!tracksRes.ok) return [];
    const tracksData = await tracksRes.json();
    const trackIds = (tracksData.items ?? []).map((t: { id: string }) => t.id).join(",");

    // Fetch full track details (includes popularity)
    const fullRes = await fetch(
      `https://api.spotify.com/v1/tracks?ids=${trackIds}&market=US`,
      { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" }
    );
    if (!fullRes.ok) return [];
    const fullData = await fullRes.json();

    return (fullData.tracks ?? []).map((t: {
      name: string;
      popularity: number;
      external_urls: { spotify: string };
      track_number: number;
    }) => ({
      title: t.name,
      popularity: t.popularity,
      href: t.external_urls.spotify,
      number: t.track_number,
    }));
  } catch {
    return [];
  }
}

export async function getLatestReleases(limit = 3): Promise<Release[]> {
  try {
    const token = await getAccessToken();
    const res = await fetch(
      `https://api.spotify.com/v1/artists/${ARTIST_ID}/albums?include_groups=single,album&market=US&limit=10`,
      {
        headers: { Authorization: `Bearer ${token}` },
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data.items ?? []).slice(0, limit).map((album: {
      name: string;
      images: { url: string }[];
      external_urls: { spotify: string };
    }) => ({
      title: album.name,
      image: album.images?.[0]?.url ?? "",
      href: album.external_urls.spotify,
    }));
  } catch {
    return [];
  }
}
