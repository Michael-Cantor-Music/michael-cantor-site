"use client";

import { useEffect } from "react";

function extractColor(img: HTMLImageElement): { r: number; g: number; b: number } {
  const canvas = document.createElement("canvas");
  canvas.width = 50;
  canvas.height = 50;
  const ctx = canvas.getContext("2d")!;
  // Sample left and right thirds at 65–85% height, avoiding the center (dark doors)
  const srcY = img.height * 0.65;
  const srcH = img.height * 0.2;
  const thirdW = img.width / 3;

  // Left third
  ctx.drawImage(img, 0, srcY, thirdW, srcH, 0, 0, 25, 50);
  // Right third
  ctx.drawImage(img, thirdW * 2, srcY, thirdW, srcH, 25, 0, 25, 50);

  const data = ctx.getImageData(0, 0, 50, 50).data;
  let r = 0, g = 0, b = 0, count = 0;
  for (let i = 0; i < data.length; i += 4) {
    const pr = data[i], pg = data[i + 1], pb = data[i + 2];
    const brightness = pr + pg + pb;
    if (brightness > 60) { // skip very dark pixels
      r += pr; g += pg; b += pb; count++;
    }
  }
  if (count === 0) return { r: 180, g: 155, b: 110 };
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
        const lighten = (c: number) => Math.round(c + (255 - c) * 0.65);
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
