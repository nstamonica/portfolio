/** Fired on window to make the cursor chip re-read the label under the mouse. */
export const CURSOR_REFRESH_EVENT = "cursorchip:refresh";

/** Call after changing an element's `data-cursor`, so the chip shows it without waiting for the mouse to move. */
export function refreshCursorChip() {
  window.dispatchEvent(new Event(CURSOR_REFRESH_EVENT));
}
