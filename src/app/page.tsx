import MusicLinks from "@/components/MusicLinks";
import { getLatestReleases, getArtistImage } from "@/lib/spotify";

const MUSIC_LINKS = [
  {
    label: "Spotify",
    href: "https://open.spotify.com/artist/2nyS5xoo0whI3q74gsRmHL",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
      </svg>
    ),
  },
  {
    label: "Apple Music",
    href: "https://music.apple.com/us/artist/michael-cantor/1631765548",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.193.4-1.336.53-2.3 1.452-2.865 2.78-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.802.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03a12.5 12.5 0 001.57-.1c.822-.106 1.596-.35 2.296-.81a5.046 5.046 0 001.88-2.207c.186-.42.293-.87.37-1.324.113-.675.138-1.358.137-2.04-.002-3.8 0-7.595-.003-11.393zm-6.423 3.99v5.712c0 .417-.058.827-.244 1.206-.29.59-.76.962-1.388 1.14-.35.1-.706.157-1.07.173-.95.042-1.8-.6-1.965-1.488-.18-.966.46-1.89 1.47-2.1.36-.075.73-.127 1.09-.207.33-.07.51-.263.535-.6.003-.05.003-.1.003-.15V10.62a.504.504 0 00-.038-.2.325.325 0 00-.27-.214c-.106-.022-.216-.032-.324-.046l-3.556-.494a.665.665 0 00-.088-.006c-.226.012-.34.112-.367.34-.005.047-.008.095-.008.142v7.453c0 .36-.04.717-.192 1.053-.287.64-.77 1.065-1.434 1.268-.345.106-.7.17-1.063.193-.864.053-1.717-.5-1.925-1.37-.225-1.007.4-1.968 1.437-2.19.36-.078.73-.127 1.085-.21.32-.076.5-.27.527-.6.005-.05.005-.1.005-.148V7.395c0-.2.033-.393.105-.583.1-.257.27-.443.525-.528a2.2 2.2 0 01.508-.13l4.61-.645c.093-.013.19-.02.284-.023.2-.004.337.1.375.306.014.073.018.148.018.223v3.75l.002.348z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com/channel/UCHLDDkR-qNPVgtFQFGk4aDw",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/michaelrcantor",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@michaelcantor3",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@michaelrcantor",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
];

export default async function Home() {
  const [releases, profileImage] = await Promise.all([
    getLatestReleases(3),
    getArtistImage(),
  ]);
  return (
    <main className="min-h-screen flex flex-col items-center px-5 py-12 sm:py-16">
      <div className="w-full max-w-md">
        {/* Profile Section */}
        <div className="flex flex-col items-center text-center animate-fade-in">
          <div className="w-28 h-28 rounded-full overflow-hidden mb-4 ring-2 ring-[#E8E6DC]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={profileImage}
              alt="Michael Cantor"
              className="object-cover w-full h-full"
            />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-[#141413]">
            Michael Cantor
          </h1>
        </div>

        {/* Latest Releases */}
        <section className="mt-10 animate-fade-in-delay-1">
          <h2 className="section-label text-xs font-medium uppercase tracking-widest mb-4">
            Latest Releases
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {releases.map((release) => (
              <a
                key={release.title}
                href={release.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="aspect-square rounded-lg overflow-hidden bg-[#E8E6DC]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={release.image}
                    alt={release.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p className="text-xs text-[#141413] mt-2 text-center font-medium">
                  {release.title}
                </p>
              </a>
            ))}
          </div>
        </section>

        {/* Music Links */}
        <section className="mt-10 animate-fade-in-delay-2">
          <h2 className="section-label text-xs font-medium uppercase tracking-widest mb-4">
            Listen
          </h2>
          <MusicLinks links={MUSIC_LINKS} />
        </section>

        {/* Social Links */}
        <section className="mt-10 animate-fade-in-delay-3">
          <h2 className="section-label text-xs font-medium uppercase tracking-widest mb-4">
            Follow
          </h2>
          <div className="flex flex-col gap-3">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-card flex items-center gap-3 px-4 py-3.5 rounded-xl border"
              >
                <span className="text-[#D97757]">{link.icon}</span>
                <span className="text-sm font-medium text-[#141413]">{link.label}</span>
                <svg
                  className="w-4 h-4 ml-auto text-[#8C8B87]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-14 text-center">
          <a
            href="https://michaelcantormusic.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#8C8B87] hover:text-[#D97757] transition-colors"
          >
            michaelcantormusic.com
          </a>
        </footer>
      </div>
    </main>
  );
}
