"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from "react";
import { COMMAND_PALETTE_EVENT } from "@/lib/command-palette";
import { experience, projects, site } from "@/lib/content";
import { cx } from "@/lib/cx";
import { deckGoTo, revealTarget } from "@/lib/deck";
import { plain } from "./rich-text";
import {
  ArrowUpRight,
  Briefcase,
  Copy,
  FileText,
  GitHub,
  Hash,
  LinkedIn,
  Mail,
  Search,
  glyphs,
} from "./icons";

type Group = "Navigate" | "Experience" | "Projects" | "Contact & links";

type Command = {
  id: string;
  group: Group;
  label: string;
  detail?: string;
  keywords?: string;
  icon: ReactNode;
  external?: boolean;
  /** Moves the page, so focus should not jump back to where it was. */
  navigates?: boolean;
  run: () => void;
};

const SECTIONS = [
  { id: "intro", label: "Home", detail: "Back to the start" },
  { id: "experience", label: "Experience", detail: `${experience.length} roles in the Government of Canada` },
  { id: "projects", label: "Projects", detail: "Things I’ve built" },
  { id: "tech", label: "Tech", detail: "Languages, frameworks and platforms" },
  { id: "about", label: "About me", detail: "Who I am outside of work" },
  { id: "contact", label: "Contact", detail: "Get in touch" },
];

const prettyUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "");
const groupId = (group: string) => `cmdk-group-${group.toLowerCase().replace(/[^a-z]+/g, "-")}`;

/**
 * Spotlight-style command menu (⌘K / Ctrl K): jump to any section or case
 * study, copy the email address, or open external profiles.
 */
export function CommandPalette() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState<{ message: string; key: number } | null>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);
  const [restoreOnClose, setRestoreOnClose] = useState(true);

  const show = useCallback(() => {
    restoreFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setQuery("");
    setActive(0);
    setRestoreOnClose(true);
    setOpen(true);
  }, []);

  /**
   * Close the menu. A command that moves the page passes restore=false:
   * focusing the old element would pull the deck back to its panel.
   */
  const hide = useCallback((restore = true) => {
    setRestoreOnClose(restore);
    setOpen(false);
  }, []);

  // Return focus to whatever was focused before the menu opened.
  useEffect(() => {
    if (open) return;
    if (restoreOnClose) restoreFocus.current?.focus({ preventScroll: true });
    restoreFocus.current = null;
  }, [open, restoreOnClose]);

  // A fresh object per message restarts the dismiss timer, even for repeats.
  const flash = useCallback((message: string) => setToast({ message, key: Date.now() }), []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  // Global shortcut, plus open requests from the nav and footer.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (open) hide();
        else show();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(COMMAND_PALETTE_EVENT, show);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(COMMAND_PALETTE_EVENT, show);
    };
  }, [open, show, hide]);

  // Lock page scroll while open.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [open]);

  const goToSection = useCallback(
    (id: string) => {
      const href = id === "intro" ? "/" : `/#${id}`;
      if (pathname !== "/") {
        router.push(href);
        return;
      }
      // Same page: wait for the scroll lock to release, then move there.
      requestAnimationFrame(() => {
        // On laptops and desktops the deck brings the right panel up.
        if (deckGoTo(id)) return;
        const target = document.getElementById(id);
        if (!target) return;
        revealTarget(target);
        const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        target.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
        window.history.pushState(null, "", href);
      });
    },
    [pathname, router],
  );

  const commands = useMemo<Command[]>(() => {
    const copyEmail = () => {
      if (!navigator.clipboard) {
        flash(site.email);
        return;
      }
      navigator.clipboard.writeText(site.email).then(
        () => flash("Email address copied"),
        () => flash(site.email),
      );
    };

    const sections: Command[] = SECTIONS.map((s) => ({
      id: `section-${s.id}`,
      group: "Navigate",
      label: s.label,
      detail: s.detail,
      icon: <Hash className="size-[18px]" />,
      navigates: true,
      run: () => goToSection(s.id),
    }));

    const roles: Command[] = experience.map((role) => ({
      id: `exp-${role.slug}`,
      group: "Experience",
      label: role.org,
      detail: `${role.role} · ${role.period}`,
      keywords: `${role.tags.join(" ")} ${role.points.map(plain).join(" ")}`,
      icon: <Briefcase className="size-[18px]" />,
      navigates: true,
      run: () => goToSection(`exp-${role.slug}`),
    }));

    const work: Command[] = projects.map((project) => {
      const Icon = glyphs[project.glyph];
      return {
        id: `project-${project.slug}`,
        group: "Projects",
        label: project.name,
        detail: project.kind,
        keywords: `${project.summary} ${project.stack.join(" ")}`,
        icon: <Icon className="size-[18px]" />,
        navigates: true,
        run: () => goToSection(`project-${project.slug}`),
      };
    });

    const links: Command[] = [
      {
        id: "copy-email",
        group: "Contact & links",
        label: "Copy email address",
        detail: site.email,
        keywords: "contact mail clipboard",
        icon: <Copy className="size-[18px]" />,
        run: copyEmail,
      },
      {
        id: "email",
        group: "Contact & links",
        label: "Send an email",
        detail: site.email,
        keywords: "contact mail",
        icon: <Mail className="size-[18px]" />,
        external: true,
        run: () => {
          window.location.href = `mailto:${site.email}`;
        },
      },
      {
        id: "resume",
        group: "Contact & links",
        label: "View resume",
        detail: "PDF",
        keywords: "resume cv",
        icon: <FileText className="size-[18px]" />,
        external: true,
        run: () => window.open(site.resume, "_blank", "noopener"),
      },
      {
        id: "github",
        group: "Contact & links",
        label: "GitHub",
        detail: prettyUrl(site.github),
        keywords: "code repositories projects",
        icon: <GitHub className="size-[18px]" />,
        external: true,
        run: () => window.open(site.github, "_blank", "noopener,noreferrer"),
      },
      {
        id: "linkedin",
        group: "Contact & links",
        label: "LinkedIn",
        detail: prettyUrl(site.linkedin),
        keywords: "profile network",
        icon: <LinkedIn className="size-[18px]" />,
        external: true,
        run: () => window.open(site.linkedin, "_blank", "noopener,noreferrer"),
      },
    ];

    return [...sections, ...roles, ...work, ...links];
  }, [flash, goToSection]);

  const results = useMemo(() => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (terms.length === 0) return commands;
    return commands.filter((c) => {
      const haystack = `${c.label} ${c.detail ?? ""} ${c.keywords ?? ""} ${c.group}`.toLowerCase();
      return terms.every((term) => haystack.includes(term));
    });
  }, [commands, query]);

  const grouped = useMemo(() => {
    const map = new Map<Group, { command: Command; index: number }[]>();
    results.forEach((command, index) => {
      const list = map.get(command.group) ?? [];
      list.push({ command, index });
      map.set(command.group, list);
    });
    return [...map.entries()];
  }, [results]);

  const activeIndex = Math.min(active, Math.max(results.length - 1, 0));
  const activeCommand = results[activeIndex];

  useEffect(() => {
    if (!open || !activeCommand) return;
    document.getElementById(`cmdk-${activeCommand.id}`)?.scrollIntoView({ block: "nearest" });
  }, [open, activeCommand]);

  const runCommand = (command: Command) => {
    hide(!command.navigates);
    command.run();
  };

  const onKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    const count = results.length;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (count) setActive((activeIndex + 1) % count);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (count) setActive((activeIndex - 1 + count) % count);
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (activeCommand) runCommand(activeCommand);
    } else if (event.key === "Escape") {
      event.preventDefault();
      hide();
    } else if (event.key === "Tab") {
      // Keep focus inside the dialog.
      event.preventDefault();
    }
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh]">
          <div
            aria-hidden="true"
            onClick={() => hide()}
            className="overlay-in absolute inset-0 bg-ink/25"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            className="panel-in relative w-full max-w-[640px] overflow-hidden rounded-[22px] border border-ink/10 bg-paper shadow-[0_40px_100px_-24px_rgb(17_17_16/0.45)]"
          >
            <div className="flex items-center gap-3 border-b border-ink/10 px-5">
              <Search className="size-5 shrink-0 text-muted" />
              <input
                autoFocus
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActive(0);
                }}
                onKeyDown={onKeyDown}
                placeholder="Search experience, projects and links…"
                aria-label="Search commands"
                role="combobox"
                aria-expanded="true"
                aria-controls="cmdk-list"
                aria-autocomplete="list"
                aria-activedescendant={activeCommand ? `cmdk-${activeCommand.id}` : undefined}
                spellCheck={false}
                autoComplete="off"
                className="h-14 w-full bg-transparent text-[17px] text-ink outline-none placeholder:text-muted"
              />
              <kbd className="hidden rounded-md border border-ink/15 px-1.5 py-0.5 font-sans text-[12px] text-muted sm:block">
                esc
              </kbd>
            </div>

            <div
              id="cmdk-list"
              role="listbox"
              aria-label="Results"
              className="max-h-[min(56vh,440px)] overflow-y-auto overscroll-contain p-2"
            >
              {results.length === 0 ? (
                <p className="px-3 py-10 text-center text-[15px] text-muted">
                  No results for “{query}”
                </p>
              ) : (
                grouped.map(([group, items]) => (
                  <div key={group} role="group" aria-labelledby={groupId(group)} className="pb-1">
                    <div
                      id={groupId(group)}
                      className="px-3 pt-3 pb-1.5 text-[12.5px] font-semibold text-muted"
                    >
                      {group}
                    </div>
                    {items.map(({ command, index }) => {
                      const selected = index === activeIndex;
                      return (
                        <div
                          key={command.id}
                          id={`cmdk-${command.id}`}
                          role="option"
                          aria-selected={selected}
                          onPointerMove={() => {
                            if (!selected) setActive(index);
                          }}
                          onClick={() => runCommand(command)}
                          className={cx(
                            "flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5",
                            selected ? "bg-ink text-paper" : "text-ink",
                          )}
                        >
                          <span
                            className={cx(
                              "grid size-9 shrink-0 place-items-center rounded-[10px]",
                              selected ? "bg-paper/15" : "bg-ink/[0.06] text-ink-2",
                            )}
                          >
                            {command.icon}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[15px] font-semibold">{command.label}</span>
                            {command.detail && (
                              <span
                                className={cx(
                                  "block truncate text-[13px]",
                                  selected ? "text-paper/75" : "text-muted",
                                )}
                              >
                                {command.detail}
                              </span>
                            )}
                          </span>
                          {command.external ? (
                            <ArrowUpRight className="size-4 shrink-0 opacity-70" />
                          ) : (
                            <span className={cx("text-[12px]", selected ? "text-paper/80" : "text-muted")}>
                              ↵
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            <div className="flex items-center justify-between border-t border-ink/10 px-5 py-3 text-[12px] text-muted">
              <span className="flex items-center gap-4">
                <span>↑↓ navigate</span>
                <span>↵ select</span>
                <span>esc close</span>
              </span>
              <span className="hidden sm:inline">{site.name}</span>
            </div>
          </div>
        </div>
      )}

      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-6 z-[110] flex justify-center px-4"
      >
        {toast && (
          <span
            key={toast.key}
            className="panel-in rounded-full bg-ink px-4 py-2 text-[13px] text-paper shadow-lg"
          >
            {toast.message}
          </span>
        )}
      </div>
    </>
  );
}
