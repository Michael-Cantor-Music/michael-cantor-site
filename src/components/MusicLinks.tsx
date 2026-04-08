"use client";

import { trackMusicLinkClick } from "@/lib/tiktok-pixel";

interface MusicLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export default function MusicLinks({ links }: { links: MusicLink[] }) {
  return (
    <div className="flex flex-col gap-3">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackMusicLinkClick(link.label)}
          className="link-card flex items-center gap-3 px-4 py-3.5 rounded-xl border"
        >
          <span className="text-[#FF6B00]">{link.icon}</span>
          <span className="text-sm font-medium text-[#141413]">{link.label}</span>
          <svg
            className="w-4 h-4 ml-auto text-[#8C8B87]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      ))}
    </div>
  );
}
