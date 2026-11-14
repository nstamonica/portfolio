export const COMMAND_PALETTE_EVENT = "command-palette:open";

/** Ask the global command palette (mounted in the root layout) to open. */
export function openCommandPalette() {
  window.dispatchEvent(new Event(COMMAND_PALETTE_EVENT));
}
