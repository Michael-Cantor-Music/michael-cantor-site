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
  const data = await res.json();
  return data.access_token;
}

export interface Release {
  title: string;
  image: string;
  href: string;
}

export async function getLatestReleases(limit = 3): Promise<Release[]> {
  const token = await getAccessToken();
  const res = await fetch(
    `https://api.spotify.com/v1/artists/${ARTIST_ID}/albums?include_groups=single,album&market=US&limit=10`,
    {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 3600 },
    }
  );
  const data = await res.json();
  return data.items.slice(0, limit).map((album: {
    name: string;
    images: { url: string }[];
    external_urls: { spotify: string };
  }) => ({
    title: album.name,
    image: album.images[0]?.url ?? "",
    href: album.external_urls.spotify,
  }));
}
