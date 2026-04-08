declare global {
  interface Window {
    ttq: {
      track: (event: string, params?: Record<string, string>) => void;
      page: () => void;
    };
  }
}

export function trackMusicLinkClick(platform: string) {
  if (typeof window !== "undefined" && window.ttq) {
    window.ttq.track("ClickButton", {
      content_name: platform,
      content_type: "music_streaming",
    });
  }
}
