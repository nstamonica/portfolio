"use client";

import { useEffect, useRef } from "react";
import { site } from "@/lib/content";
import { CURSOR_REFRESH_EVENT } from "@/lib/cursor";
import { DECK_VISIBILITY_EVENT } from "@/lib/deck";

/**
 * A small chip that trails the mouse. It reads "sta monica", and names
 * whatever it rests on when that element carries `data-cursor` (each tech
 * tile, the featured project, the About photo, the email). Mouse only;
 * hidden on touch screens.
 */
export function CursorChip() {
  const chipRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const chip = chipRef.current;
    const labelEl = labelRef.current;
    if (!chip || !labelEl) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let x = 0;
    let y = 0;
    let cx = 0;
    let cy = 0;
    let raf = 0;
    let shown = false;
    let label = site.wordmark;

    const place = () => {
      chip.style.transform = `translate3d(${(cx + 16).toFixed(1)}px, ${(cy + 14).toFixed(1)}px, 0)`;
    };

    const tick = () => {
      const k = reduced ? 1 : 0.2;
      cx += (x - cx) * k;
      cy += (y - cy) * k;
      place();
      raf = Math.abs(x - cx) + Math.abs(y - cy) > 0.2 ? requestAnimationFrame(tick) : 0;
    };

    const describe = (target: Element | null) => {
      const next = target?.closest("[data-cursor]")?.getAttribute("data-cursor") || site.wordmark;
      if (next !== label) {
        label = next;
        labelEl.textContent = next;
      }
      chip.dataset.dark = String(Boolean(target?.closest("[data-cursor-dark]")));
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      x = event.clientX;
      y = event.clientY;
      if (!shown) {
        shown = true;
        cx = x;
        cy = y;
        place();
        chip.dataset.shown = "true";
      }
      describe(event.target instanceof Element ? event.target : null);
      if (!raf) raf = requestAnimationFrame(tick);
    };

    // When the deck changes panel under a still mouse, or an element changes
    // its label (the photo, the email after copying), name what's there now.
    const onPanelChange = () => {
      if (shown) requestAnimationFrame(() => describe(document.elementFromPoint(x, y)));
    };

    const onLeave = () => {
      shown = false;
      chip.dataset.shown = "false";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener(DECK_VISIBILITY_EVENT, onPanelChange);
    window.addEventListener(CURSOR_REFRESH_EVENT, onPanelChange);
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener(DECK_VISIBILITY_EVENT, onPanelChange);
      window.removeEventListener(CURSOR_REFRESH_EVENT, onPanelChange);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={chipRef} className="cursor-chip" data-shown="false" aria-hidden="true">
      <span ref={labelRef}>{site.wordmark}</span>
    </div>
  );
}
