"use client";

import { openCommandPalette } from "@/lib/command-palette";
import { useIsApple } from "@/lib/use-is-apple";

/** Footer button that opens the ⌘K menu. */
export function PaletteHint() {
  const apple = useIsApple();
  return (
    <button type="button" onClick={openCommandPalette} className="palette-hint">
      Press <kbd>{apple ? "⌘K" : "Ctrl K"}</kbd> to search
    </button>
  );
}
