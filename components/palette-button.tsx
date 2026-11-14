"use client";

import { openCommandPalette } from "@/lib/command-palette";
import { useIsApple } from "@/lib/use-is-apple";
import { Search } from "./icons";

/** Small search pill that opens the ⌘K menu. */
export function PaletteButton() {
  const apple = useIsApple();
  return (
    <button
      type="button"
      onClick={openCommandPalette}
      aria-label="Search the site"
      aria-keyshortcuts="Meta+K Control+K"
      className="js-only inline-flex h-9 items-center gap-1.5 rounded-full border border-black/[0.08] bg-mist px-3 text-[12.5px] text-muted transition-colors hover:border-black/15 hover:text-ink"
    >
      <Search className="size-4" />
      <kbd className="hidden font-sans sm:inline">{apple ? "⌘K" : "Ctrl K"}</kbd>
    </button>
  );
}
