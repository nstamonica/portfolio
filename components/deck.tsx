"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { DECK_QUERY, DECK_VISIBILITY_EVENT, registerDeck, revealTarget } from "@/lib/deck";

/*
 * The page deck. On laptops and desktops every panel fills the screen and the
 * wheel, keyboard or a swipe moves one panel at a time: the next panel slides
 * up over the current one on a spring while its content sharpens from a blur,
 * and the one underneath fades away. On phones, tablets and without
 * JavaScript the same panels simply scroll, sharpening into view as they
 * arrive.
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

  let height = window.innerHeight;
  let index = 0; // the panel the deck is heading to
  let pos = 0; // where the deck is drawn, in panels (animated)
  let vel = 0;
  let nudge = 0; // a small pull toward the next panel before a gesture commits
  let raf = 0;
  let lastTime = 0;
  const visible = panels.map(() => false);

  // Spring tuned to settle in about half a second with a hint of give.
  const STIFFNESS = 90;
  const DAMPING = 2 * Math.sqrt(STIFFNESS) * 0.86;

  const render = () => {
    for (let i = 0; i <= last; i++) {
      const panel = panels[i];
      const d = i - pos;
      let y = 0;
      let opacity = 1;
      let blur = 0;
      if (d > 0) {
        // Waiting below, or sliding up over the current panel.
        y = Math.min(d, 1.04) * height;
        blur = Math.min(d, 1) * 14;
      } else if (d < 0) {
        // Covered by the next panel: fade out underneath it.
        opacity = clamp(1 + d * 1.6, 0, 1);
      }
      panel.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
      panel.style.opacity = opacity.toFixed(3);
      const inner = inners[i];
      if (inner) inner.style.filter = !reduced && blur > 0.2 ? `blur(${blur.toFixed(1)}px)` : "";

      const isVisible = d > -0.625 && d < 1;
      if (isVisible !== visible[i]) {
        visible[i] = isVisible;
        panel.dataset.visible = String(isVisible);
        window.dispatchEvent(
          new CustomEvent(DECK_VISIBILITY_EVENT, { detail: { id: panel.id, visible: isVisible } }),
        );
      }
    }
  };

  const tick = (now: number) => {
    const dt = lastTime ? Math.min((now - lastTime) / 1000, 1 / 30) : 1 / 60;
    lastTime = now;
    const goal = index + nudge;
    // Two sub-steps keep the spring stable on slow frames.
    for (let step = 0; step < 2; step++) {
      const h = dt / 2;
      const accel = STIFFNESS * (goal - pos) - DAMPING * vel;
      vel += accel * h;
      pos += vel * h;
    }
    if (Math.abs(goal - pos) < 0.0005 && Math.abs(vel) < 0.003) {
      pos = goal;
      vel = 0;
      render();
      raf = 0;
      lastTime = 0;
      return;
    }
    render();
    raf = requestAnimationFrame(tick);
  };

  const kick = () => {
    if (reduced) {
      pos = index + nudge;
      vel = 0;
      render();
      return;
    }
    if (!raf) {
      lastTime = 0;
      raf = requestAnimationFrame(tick);
    }
  };

  const setActive = (i: number) => {
    panels.forEach((panel, n) => panel.classList.toggle("is-active", n === i));
  };

  const goTo = (target: number, { moveFocus = true } = {}) => {
    const next = clamp(target, 0, last);
    if (next !== index) {
      index = next;
      setActive(next);
      const hash = next === 0 ? "" : `#${panels[next].id}`;
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}${hash}`);
      // Keep keyboard focus with what's on screen, so Tab continues from here.
      const active = document.activeElement;
      if (moveFocus && !(active instanceof Node && panels[next].contains(active))) {
        panels[next].focus({ preventScroll: true });
      }
      if (reduced) inners[next]?.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200, easing: "ease-out" });
    }
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

  // Start on the panel the URL points at, without animating.
  const initial = idFromHash(window.location.hash);
  const startEl = initial ? document.getElementById(initial) : null;
  const startPanel = startEl?.closest<HTMLElement>(".panel");
  if (startPanel && panels.includes(startPanel)) {
    index = panels.indexOf(startPanel);
    pos = index;
    revealTarget(startEl);
  }
  setActive(index);
  render();

  /* ---------- Wheel and trackpad ---------- */

  const COMMIT = 40; // px of scrolling that moves one panel
  let accum = 0;
  let locked = false; // one panel per gesture
  let lockedAt = 0;
  let minAbs = Infinity;
  let gestureTimer = 0;

  const endGesture = () => {
    accum = 0;
    locked = false;
    minAbs = Infinity;
    if (nudge) {
      nudge = 0;
      kick();
    }
  };

  const onWheel = (event: WheelEvent) => {
    if (event.ctrlKey || event.defaultPrevented) return; // pinch-zoom, or already handled
    const scale = event.deltaMode === 1 ? 20 : event.deltaMode === 2 ? height : 1;
    const dy = event.deltaY * scale;
    if (Math.abs(event.deltaX * scale) > Math.abs(dy)) return; // sideways swipes
    if (event.target instanceof Element && event.target.closest("[role='dialog']")) return;
    if (scrollableIn(event.target, dy)) return; // let an inner list scroll first

    event.preventDefault();
    const now = performance.now();
    const abs = Math.abs(dy);
    window.clearTimeout(gestureTimer);
    gestureTimer = window.setTimeout(endGesture, 180);

    // Inside a trackpad's inertia tail the deltas only shrink; a clear new
    // push (much bigger than the smallest recent delta) starts a new gesture.
    if (locked && now - lockedAt > 260 && abs > Math.max(minAbs * 2.5, 24)) {
      locked = false;
      accum = 0;
    }
    minAbs = Math.min(minAbs, abs);
    if (locked) return;

    accum += dy;
    const dir = Math.sign(accum);
    const atEdge = (dir > 0 && index === last) || (dir < 0 && index === 0);
    if (Math.abs(accum) >= COMMIT && !atEdge) {
      locked = true;
      lockedAt = now;
      minAbs = abs;
      accum = 0;
      nudge = 0;
      goTo(index + dir);
      return;
    }
    // Follow the gesture a little before it commits (a gentle rubber band at the ends).
    nudge = clamp(accum / height, -1, 1) * (atEdge ? 0.12 : 0.3);
    kick();
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
    if ((event.key === "ArrowDown" || event.key === "ArrowUp") && scrollableIn(target, dir)) return;
    event.preventDefault();
    // Holding a key moves on once the current move is mostly done.
    if (event.repeat && Math.abs(pos - index) > 0.35) return;
    goTo(index + dir);
  };

  /* ---------- Touch (touchscreen laptops) ---------- */

  let touchStartY = 0;
  let touchPassThrough = false;

  const onTouchStart = (event: TouchEvent) => {
    touchStartY = event.touches[0]?.clientY ?? 0;
    touchPassThrough = false;
  };

  const onTouchMove = (event: TouchEvent) => {
    if (event.target instanceof Element && event.target.closest("[role='dialog']")) return;
    const dy = touchStartY - (event.touches[0]?.clientY ?? touchStartY);
    if (touchPassThrough || scrollableIn(event.target, dy)) {
      touchPassThrough = true;
      return;
    }
    event.preventDefault();
    nudge = clamp(dy / height, -0.3, 0.3);
    kick();
  };

  const onTouchEnd = (event: TouchEvent) => {
    const dy = touchStartY - (event.changedTouches[0]?.clientY ?? touchStartY);
    nudge = 0;
    if (!touchPassThrough && Math.abs(dy) > 50) goTo(index + Math.sign(dy));
    else kick();
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

  const onFocusIn = (event: FocusEvent) => {
    const panel = event.target instanceof Element ? event.target.closest<HTMLElement>(".panel") : null;
    const i = panel ? panels.indexOf(panel) : -1;
    if (i >= 0 && i !== index) goTo(i, { moveFocus: false });
  };

  const onHashChange = () => {
    goToId(idFromHash(window.location.hash));
  };

  const onResize = () => {
    height = window.innerHeight;
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
    window.clearTimeout(gestureTimer);
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
    panels.forEach((panel, i) => {
      panel.style.transform = "";
      panel.style.opacity = "";
      panel.classList.remove("is-active");
      delete panel.dataset.visible;
      if (inners[i]) inners[i].style.filter = "";
      window.dispatchEvent(new CustomEvent(DECK_VISIBILITY_EVENT, { detail: { id: panel.id, visible: true } }));
    });
    // Leave the normal page scrolled to where the deck was.
    if (index > 0) panels[index].scrollIntoView({ block: "start" });
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
