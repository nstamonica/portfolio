"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { DECK_QUERY, DECK_VISIBILITY_EVENT, registerDeck, revealTarget } from "@/lib/deck";

/*
 * The page deck. On laptops and desktops every panel fills the screen and
 * scrolling moves along one long track, as on brandondavid.dev: each panel
 * rests for a third of a screen of scrolling, then the next one slides up over
 * it, following the wheel or trackpad one to one, while the one underneath
 * blurs and fades away. Stop scrolling and the deck stops with you, even
 * halfway. The keys, in-page links and the ⌘K menu glide a whole panel at a
 * time. On phones, tablets and without JavaScript the same panels simply
 * scroll, sharpening into view as they arrive.
 *
 * Every panel stays in the DOM, so screen readers and Tab reach all of it;
 * focusing something in another panel brings that panel up.
 */

export function Deck({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const deckQuery = window.matchMedia(DECK_QUERY);
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let teardown: (() => void) | null = null;

    const apply = () => {
      teardown?.();
      teardown = deckQuery.matches ? enableDeck(root, motionQuery.matches) : enableFlow(root, motionQuery.matches);
    };

    apply();
    // Tells the inline head script that the deck took over (see app/layout.tsx).
    (window as Window & { __deckReady?: boolean }).__deckReady = true;
    deckQuery.addEventListener("change", apply);
    motionQuery.addEventListener("change", apply);
    return () => {
      deckQuery.removeEventListener("change", apply);
      motionQuery.removeEventListener("change", apply);
      teardown?.();
    };
  }, []);

  return (
    <div ref={ref} className="deck">
      {children}
    </div>
  );
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/* ---------- The feel of the deck ---------- */

/** How long each panel rests before the next one moves, as a share of the screen's height of scrolling. */
const HOLD = 1 / 3;
/** How quickly the deck catches up with the wheel, per second. Lower feels floatier. */
const FOLLOW = 7;
/** The covered panel blurs up to this many px, reached when the next panel is this far up… */
const BLUR_MAX = 12;
const BLUR_FULL_AT = 0.6;
/** …and fades out between these two points. Together they match brandondavid.dev. */
const FADE_FROM = 0.4;
const FADE_TO = 0.7;
/** The glide for keys, links and the ⌘K menu: it settles in about half a second with a hint of give. */
const STIFFNESS = 90;
const DAMPING = 2 * Math.sqrt(STIFFNESS) * 0.86;

/** The nearest scrollable region inside a panel that can still move in `dir`. */
function scrollableIn(start: EventTarget | null, dir: number) {
  let node = start instanceof Element ? start : null;
  while (node && !node.classList.contains("panel")) {
    if (node instanceof HTMLElement && node.hasAttribute("data-deck-scroll")) {
      const max = node.scrollHeight - node.clientHeight;
      if (max > 1 && ((dir > 0 && node.scrollTop < max - 1) || (dir < 0 && node.scrollTop > 0))) return node;
    }
    node = node.parentElement;
  }
  return null;
}

function idFromHash(hash: string) {
  try {
    return decodeURIComponent(hash.replace(/^#/, ""));
  } catch {
    return "";
  }
}

function enableDeck(root: HTMLElement, reduced: boolean) {
  const html = document.documentElement;
  const panels = Array.from(root.querySelectorAll<HTMLElement>(":scope > .panel"));
  const inners = panels.map((panel) => panel.querySelector<HTMLElement>(".panel-inner"));
  const last = panels.length - 1;
  if (last < 0) return () => {};

  html.classList.add("deck-on");

  /* ---------- The track ----------
   * The deck is drawn at `pos`, counted in panels: 2.5 is halfway from the
   * third panel to the fourth. The wheel and touch move `scroll`, a point on
   * an imaginary track where each panel holds still for `hold` px of
   * scrolling and the next one then slides up over a screen's height of it. */

  let height = 0;
  let hold = 0;
  let span = 0; // one panel's share of the track: its rest, then the slide to the next
  let maxScroll = 0;
  const measure = () => {
    height = window.innerHeight;
    hold = Math.round(height * HOLD);
    span = hold + height;
    maxScroll = last * span;
  };
  measure();

  /** The deck position for a point on the track. A panel rests across the middle of its hold. */
  const posAt = (s: number) => {
    const u = clamp(s, 0, maxScroll) + hold / 2;
    const k = Math.floor(u / span);
    const into = u - k * span - hold;
    return Math.min(last, into <= 0 ? k : k + into / height);
  };

  /** The point on the track for a deck position; a whole panel sits mid-rest. */
  const scrollAt = (p: number) => {
    const k = Math.floor(p + 1e-6);
    const f = p - k;
    return f < 1e-4 ? k * span : k * span + hold / 2 + f * height;
  };

  let scroll = 0; // where the wheel has taken the track
  let pos = 0; // where the deck is drawn
  let vel = 0; // in panels per second
  let goal: number | null = null; // the panel a key, link or focus is gliding to
  let active = -1;
  let raf = 0;
  let lastTime = 0;
  const visible = panels.map(() => false);

  /** The panel in charge: it holds the URL, the "is-active" class and keyboard focus. */
  const setActive = (i: number, moveFocus: boolean) => {
    if (i === active) return;
    const first = active < 0;
    active = i;
    panels.forEach((panel, n) => panel.classList.toggle("is-active", n === i));
    if (first) return;
    const hash = i === 0 ? "" : `#${panels[i].id}`;
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}${hash}`);
    // Keep keyboard focus with what's on screen, so Tab continues from here.
    const focused = document.activeElement;
    if (moveFocus && !(focused instanceof Node && panels[i].contains(focused))) {
      panels[i].focus({ preventScroll: true });
    }
  };

  const render = () => {
    for (let i = 0; i <= last; i++) {
      const panel = panels[i];
      const d = i - pos;
      let y = 0;
      let opacity = 1;
      let blur = 0;
      if (d > 0) {
        // Waiting below, or sliding up over the panel in front of it.
        y = Math.min(d, 1.04) * height;
      } else if (d < 0) {
        const t = -d;
        if (reduced) {
          // Plain opaque panels: the next one simply covers it.
          opacity = t < 1 ? 1 : 0;
        } else {
          // Covered: it blurs and fades beneath the see-through panel sliding over it.
          opacity = clamp((FADE_TO - t) / (FADE_TO - FADE_FROM), 0, 1);
          blur = opacity > 0 ? Math.min(t / BLUR_FULL_AT, 1) * BLUR_MAX : 0;
        }
      }
      panel.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
      panel.style.opacity = opacity.toFixed(3);
      panel.style.filter = blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : "";

      const isVisible = d < 1 && opacity > 0;
      if (isVisible !== visible[i]) {
        visible[i] = isVisible;
        panel.dataset.visible = String(isVisible);
        window.dispatchEvent(
          new CustomEvent(DECK_VISIBILITY_EVENT, { detail: { id: panel.id, visible: isVisible } }),
        );
      }
    }
    setActive(goal ?? Math.round(pos), true);
  };

  const tick = (now: number) => {
    const dt = lastTime ? Math.min((now - lastTime) / 1000, 1 / 30) : 1 / 60;
    lastTime = now;
    let done: boolean;
    if (goal === null) {
      // Follow the wheel: ease toward the point on the track, never past it.
      const want = posAt(scroll);
      const before = pos;
      pos += (want - pos) * (1 - Math.exp(-FOLLOW * dt));
      vel = (pos - before) / dt;
      done = Math.abs(want - pos) < 0.0004;
      if (done) pos = want;
    } else {
      // Glide to a whole panel on a spring. Two sub-steps keep it stable on slow frames.
      for (let step = 0; step < 2; step++) {
        const h = dt / 2;
        vel += (STIFFNESS * (goal - pos) - DAMPING * vel) * h;
        pos += vel * h;
      }
      done = Math.abs(goal - pos) < 0.0005 && Math.abs(vel) < 0.003;
      if (done) {
        pos = goal;
        goal = null;
      }
    }
    render();
    if (done) {
      vel = 0;
      raf = 0;
      lastTime = 0;
    } else {
      raf = requestAnimationFrame(tick);
    }
  };

  const kick = () => {
    if (reduced) {
      pos = goal ?? posAt(scroll);
      goal = null;
      vel = 0;
      render();
      return;
    }
    if (!raf) {
      lastTime = 0;
      raf = requestAnimationFrame(tick);
    }
  };

  /** Glide to a whole panel (keys, links, focus, the ⌘K menu). */
  const goTo = (target: number, { moveFocus = true } = {}) => {
    const next = clamp(target, 0, last);
    if (reduced && next !== active) {
      inners[next]?.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200, easing: "ease-out" });
    }
    goal = next;
    scroll = scrollAt(next);
    setActive(next, moveFocus);
    kick();
  };

  /** Show whatever the id points at: a panel, or a role/project inside one. */
  const goToId = (id: string, options?: { moveFocus?: boolean }) => {
    const el = id ? document.getElementById(id) : panels[0];
    const panel = el?.closest<HTMLElement>(".panel");
    const i = panel ? panels.indexOf(panel) : -1;
    if (i < 0) return false;
    revealTarget(el);
    goTo(i, options);
    return true;
  };

  /** Move along the track (wheel, trackpad, touch). */
  const scrollBy = (delta: number) => {
    if (goal !== null) {
      // Take over a glide from wherever the deck is drawn right now.
      scroll = scrollAt(pos);
      goal = null;
    }
    scroll = clamp(scroll + delta, 0, maxScroll);
    kick();
  };

  /** Resting on a panel, rather than partway to the next. */
  const resting = () => goal === null && Number.isInteger(posAt(scroll));

  // Start on the panel the URL points at, without animating.
  const initial = idFromHash(window.location.hash);
  const startEl = initial ? document.getElementById(initial) : null;
  const startPanel = startEl?.closest<HTMLElement>(".panel");
  const start = startPanel ? Math.max(0, panels.indexOf(startPanel)) : 0;
  if (start > 0) revealTarget(startEl);
  pos = start;
  scroll = scrollAt(start);
  setActive(start, false);
  render();

  /* ---------- Wheel and trackpad ---------- */

  const onWheel = (event: WheelEvent) => {
    if (event.ctrlKey || event.defaultPrevented) return; // pinch-zoom, or already handled
    const scale = event.deltaMode === 1 ? 33 : event.deltaMode === 2 ? height : 1;
    const dy = event.deltaY * scale;
    if (Math.abs(event.deltaX * scale) > Math.abs(dy)) return; // sideways swipes
    if (event.target instanceof Element && event.target.closest("[role='dialog']")) return;
    // Resting on a panel, a list inside it scrolls before the deck moves.
    if (resting() && scrollableIn(event.target, dy)) return;
    event.preventDefault();
    scrollBy(dy);
  };

  /* ---------- Keyboard ---------- */

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
    const target = event.target instanceof HTMLElement ? event.target : null;
    if (target?.closest("input, textarea, select, [contenteditable='true'], [role='dialog']")) return;

    let dir = 0;
    switch (event.key) {
      case "ArrowDown":
      case "PageDown":
        dir = 1;
        break;
      case "ArrowUp":
      case "PageUp":
        dir = -1;
        break;
      case " ":
        if (target?.closest("button, a, summary")) return;
        dir = event.shiftKey ? -1 : 1;
        break;
      case "Home":
        event.preventDefault();
        goTo(0);
        return;
      case "End":
        event.preventDefault();
        goTo(last);
        return;
      default:
        return;
    }
    if ((event.key === "ArrowDown" || event.key === "ArrowUp") && resting() && scrollableIn(target, dir)) return;
    event.preventDefault();
    // Holding a key moves on once the current glide is mostly done.
    if (event.repeat && goal !== null && Math.abs(pos - goal) > 0.35) return;
    // From partway between two panels, a key finishes the move in its direction.
    const from = goal ?? pos;
    goTo(dir > 0 ? Math.floor(from + 0.001) + 1 : Math.ceil(from - 0.001) - 1);
  };

  /* ---------- Touch (touchscreen laptops) ---------- */

  let touchY = 0;
  let touchTime = 0;
  let touchVel = 0; // px per ms
  let touchDecided = false;
  let touchPassThrough = false;

  const onTouchStart = (event: TouchEvent) => {
    touchY = event.touches[0]?.clientY ?? 0;
    touchTime = performance.now();
    touchVel = 0;
    touchDecided = false;
    touchPassThrough = false;
  };

  const onTouchMove = (event: TouchEvent) => {
    if (event.target instanceof Element && event.target.closest("[role='dialog']")) return;
    const y = event.touches[0]?.clientY ?? touchY;
    const dy = touchY - y;
    if (!touchDecided) {
      touchDecided = true;
      touchPassThrough = resting() && Boolean(scrollableIn(event.target, dy));
    }
    if (touchPassThrough) return;
    event.preventDefault();
    const now = performance.now();
    if (now > touchTime) touchVel = 0.7 * (dy / (now - touchTime)) + 0.3 * touchVel;
    touchY = y;
    touchTime = now;
    scrollBy(dy);
  };

  const onTouchEnd = () => {
    // A flick carries on a little, like a native scroll.
    if (touchDecided && !touchPassThrough && performance.now() - touchTime < 100) {
      scrollBy(clamp(touchVel * 280, -height, height));
    }
  };

  /* ---------- Links, focus, history, resize ---------- */

  const onClick = (event: MouseEvent) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }
    const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href^='#']") : null;
    if (!link) return;
    if (goToId(idFromHash(link.getAttribute("href") ?? ""))) event.preventDefault();
  };

  // Tabbing (or clicking) into a panel that isn't fully on screen brings it up.
  // Panels themselves only take focus from the deck, so those are ignored.
  const onFocusIn = (event: FocusEvent) => {
    const panel = event.target instanceof Element ? event.target.closest<HTMLElement>(".panel") : null;
    if (!panel || event.target === panel) return;
    const i = panels.indexOf(panel);
    if (i >= 0 && (i !== active || !resting())) goTo(i, { moveFocus: false });
  };

  const onHashChange = () => {
    goToId(idFromHash(window.location.hash));
  };

  const onResize = () => {
    const p = goal ?? posAt(scroll);
    measure();
    scroll = scrollAt(p);
    render();
  };

  // The deck never scrolls itself; undo any scroll a browser applies anyway.
  const onRootScroll = () => {
    if (root.scrollTop || root.scrollLeft) root.scrollTo(0, 0);
  };
  onRootScroll();

  const unregister = registerDeck({ goTo: (id) => goToId(id) });

  window.addEventListener("wheel", onWheel, { passive: false });
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("touchstart", onTouchStart, { passive: true });
  window.addEventListener("touchmove", onTouchMove, { passive: false });
  window.addEventListener("touchend", onTouchEnd);
  window.addEventListener("hashchange", onHashChange);
  window.addEventListener("resize", onResize);
  root.addEventListener("scroll", onRootScroll);
  document.addEventListener("click", onClick);
  document.addEventListener("focusin", onFocusIn);

  return () => {
    root.removeEventListener("scroll", onRootScroll);
    unregister();
    cancelAnimationFrame(raf);
    window.removeEventListener("wheel", onWheel);
    window.removeEventListener("keydown", onKeyDown);
    window.removeEventListener("touchstart", onTouchStart);
    window.removeEventListener("touchmove", onTouchMove);
    window.removeEventListener("touchend", onTouchEnd);
    window.removeEventListener("hashchange", onHashChange);
    window.removeEventListener("resize", onResize);
    document.removeEventListener("click", onClick);
    document.removeEventListener("focusin", onFocusIn);
    html.classList.remove("deck-on");
    panels.forEach((panel) => {
      panel.style.transform = "";
      panel.style.opacity = "";
      panel.style.filter = "";
      panel.classList.remove("is-active");
      delete panel.dataset.visible;
      window.dispatchEvent(new CustomEvent(DECK_VISIBILITY_EVENT, { detail: { id: panel.id, visible: true } }));
    });
    // Leave the normal page scrolled to where the deck was.
    const at = Math.round(pos);
    if (at > 0) panels[at].scrollIntoView({ block: "start" });
  };
}

/** Phones, tablets and narrow windows: normal scrolling, panels sharpen into view. */
function enableFlow(root: HTMLElement, reduced: boolean) {
  // Links to a collapsed role or project open it on arrival.
  const onClick = (event: MouseEvent) => {
    const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href^='#']") : null;
    if (link) revealTarget(document.getElementById(idFromHash(link.getAttribute("href") ?? "")));
  };
  const onHashChange = () => revealTarget(document.getElementById(idFromHash(window.location.hash)));
  document.addEventListener("click", onClick);
  window.addEventListener("hashchange", onHashChange);
  onHashChange();

  const inners = Array.from(root.querySelectorAll<HTMLElement>(":scope > .panel > .panel-inner"));
  let io: IntersectionObserver | null = null;
  if (!reduced && "IntersectionObserver" in window) {
    io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          io?.unobserve(entry.target);
        }
      },
      { threshold: 0.12 },
    );
    for (const inner of inners) {
      // Only panels still below the fold wait to be revealed.
      if (inner.getBoundingClientRect().top > window.innerHeight * 0.9) {
        inner.classList.add("reveal");
        io.observe(inner);
      }
    }
  }

  return () => {
    document.removeEventListener("click", onClick);
    window.removeEventListener("hashchange", onHashChange);
    io?.disconnect();
    for (const inner of inners) inner.classList.remove("reveal", "is-in");
  };
}
