/**
 * A tiny bridge to the page deck (components/deck.tsx), so other parts of the
 * page, such as the ⌘K menu, can move it without knowing how it works.
 */

/** Media query for the full-screen panel deck. Phones and tablets scroll normally. */
export const DECK_QUERY = "(min-width: 1024px) and (min-height: 560px) and (hover: hover) and (pointer: fine)";

/** Fired on window when a panel enters or leaves the screen: detail is { id, visible }. */
export const DECK_VISIBILITY_EVENT = "deck:visibility";

type DeckApi = { goTo: (id: string) => boolean };

let api: DeckApi | null = null;

export function registerDeck(next: DeckApi) {
  api = next;
  return () => {
    if (api === next) api = null;
  };
}

/**
 * Show the panel that contains the element with this id (opening it when it
 * is a collapsible role or project). Returns false when the deck is off, in
 * which case the caller scrolls normally.
 */
export function deckGoTo(id: string) {
  return api?.goTo(id) ?? false;
}

/** Opens a collapsed role or project so a link to it lands on its details. */
export function revealTarget(el: Element | null) {
  if (el instanceof HTMLDetailsElement) el.open = true;
}
