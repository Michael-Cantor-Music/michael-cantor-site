"use client";

import { useEffect } from "react";

function extractColor(img: HTMLImageElement): { r: number; g: number; b: number } {
  const canvas = document.createElement("canvas");
  canvas.width = 50;
  canvas.height = 50;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0, 50, 50);
  const data = ctx.getImageData(0, 0, 50, 50).data;
  let r = 0, g = 0, b = 0, count = 0;
  for (let i = 0; i < data.length; i += 4) {
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
    count++;
  }
  return {
    r: Math.round(r / count),
    g: Math.round(g / count),
    b: Math.round(b / count),
  };
}

export default function ColorBackground({ imageUrl }: { imageUrl: string }) {
  useEffect(() => {
    if (!imageUrl) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const { r, g, b } = extractColor(img);
        // Lighten significantly so it's a soft background tint
        const lighten = (c: number) => Math.round(c + (255 - c) * 0.82);
        document.body.style.background = `rgb(${lighten(r)}, ${lighten(g)}, ${lighten(b)})`;
      } catch {
        // CORS blocked — keep default background
      }
    };
    img.src = imageUrl;

    return () => {
      document.body.style.background = "";
    };
  }, [imageUrl]);

  return null;
}
