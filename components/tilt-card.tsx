"use client";

import { useEffect, useRef, type ComponentPropsWithoutRef } from "react";

/**
 * Tracks the pointer over the element and exposes it as --tx / --ty (−50…50),
 * which the project art uses to tilt its glass icon toward the cursor.
 */
export function TiltCard({ children, ...props }: ComponentPropsWithoutRef<"div">) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce), (hover: none)").matches) return;

    let raf = 0;
    let px = 0;
    let py = 0;
    const apply = () => {
      raf = 0;
      const target = el.querySelector<HTMLElement>("[data-art]") ?? el;
      const r = target.getBoundingClientRect();
      const x = Math.max(-1, Math.min(1, ((px - r.left) / r.width) * 2 - 1));
      const y = Math.max(-1, Math.min(1, ((py - r.top) / r.height) * 2 - 1));
      el.style.setProperty("--tx", (x * 50).toFixed(2));
      el.style.setProperty("--ty", (-y * 50).toFixed(2));
    };
    const onMove = (event: PointerEvent) => {
      px = event.clientX;
      py = event.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      el.style.setProperty("--tx", "0");
      el.style.setProperty("--ty", "0");
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  );
}
