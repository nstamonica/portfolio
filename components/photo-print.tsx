"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { about } from "@/lib/content";
import { DECK_VISIBILITY_EVENT } from "@/lib/deck";

/**
 * The blurred veil over the photo: the same soft preview Next.js shows while
 * an image loads (a tiny copy of the photo, smoothed with an SVG blur).
 */
function blurVeil({ blurDataURL, blurWidth, blurHeight }: typeof about.photo.image) {
  if (!blurDataURL) return undefined;
  const std = 20;
  const viewBox = blurWidth && blurHeight ? `viewBox='0 0 ${blurWidth * 40} ${blurHeight * 40}'` : "";
  const svg = `%3Csvg xmlns='http://www.w3.org/2000/svg' ${viewBox}%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='${std}'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='${std}'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='none' style='filter: url(%23b);' href='${blurDataURL}'/%3E%3C/svg%3E`;
  return `url("data:image/svg+xml;charset=utf-8,${svg}")`;
}

/**
 * The About photo, laid on the paper like a print. It arrives blurred and a
 * click (or tap) reveals it. It stays revealed while you're on the About
 * panel; leave the panel and come back, and it's blurred again.
 */
export function PhotoPrint() {
  const { photo } = about;
  const [revealed, setRevealed] = useState(false);
  const ref = useRef<HTMLElement>(null);

  // Blur again whenever the panel leaves the screen.
  useEffect(() => {
    const figure = ref.current;
    if (!figure) return;
    const panelId = figure.closest(".panel")?.id;

    // Laptops and desktops: the deck reports when a panel is covered or moved away.
    const onDeckVisibility = (event: Event) => {
      const { id, visible } = (event as CustomEvent<{ id: string; visible: boolean }>).detail;
      if (id === panelId && !visible) setRevealed(false);
    };
    window.addEventListener(DECK_VISIBILITY_EVENT, onDeckVisibility);

    // Phones and tablets: the photo scrolled fully out of view.
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) setRevealed(false);
    });
    io.observe(figure);

    return () => {
      window.removeEventListener(DECK_VISIBILITY_EVENT, onDeckVisibility);
      io.disconnect();
    };
  }, []);

  return (
    <figure ref={ref} className="about-photo" data-cursor={photo.cursor} data-revealed={revealed || undefined}>
      <button
        type="button"
        className="about-photo-button"
        aria-label={revealed ? undefined : `Reveal photo: ${photo.alt}`}
        aria-disabled={revealed || undefined}
        onClick={() => setRevealed(true)}
      >
        <Image
          src={photo.image}
          alt={photo.alt}
          placeholder="blur"
          sizes="(max-width: 767px) 76vw, 380px"
          className="about-photo-img"
        />
        <span className="about-photo-veil" aria-hidden="true" style={{ backgroundImage: blurVeil(photo.image) }} />
      </button>
      <figcaption className="about-caption">{photo.caption}</figcaption>
    </figure>
  );
}
