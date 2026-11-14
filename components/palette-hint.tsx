"use client";

import { openCommandPalette } from "@/lib/command-palette";
import { useIsApple } from "@/lib/use-is-apple";

/** Footer button on the dark close band. */
export function PaletteHint() {
  const apple = useIsApple();
  return (
    <button type="button" onClick={openCommandPalette} className="transition-colors hover:text-white">
      Press{" "}
      <kbd className="rounded border border-white/20 bg-white/10 px-1 py-px font-sans text-[11px] text-white/85">
        {apple ? "⌘K" : "Ctrl K"}
      </kbd>{" "}
      to search
    </button>
  );
}
