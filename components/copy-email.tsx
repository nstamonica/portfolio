"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { site } from "@/lib/content";
import { refreshCursorChip } from "@/lib/cursor";

/**
 * The email address as plain text that copies itself when clicked. It is a
 * mailto link underneath, so without JavaScript (or without clipboard
 * access) it opens the mail app instead.
 */
export function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  // Let the cursor chip pick up the new label straight away.
  useEffect(() => {
    refreshCursorChip();
  }, [copied]);

  const copy = async (event: MouseEvent<HTMLAnchorElement>) => {
    if (!navigator.clipboard) return; // let the mailto link do its thing
    event.preventDefault();
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2400);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  return (
    <>
      <a
        href={`mailto:${site.email}`}
        onClick={copy}
        className="contact-email"
        data-cursor={copied ? "copied!" : "click to copy"}
      >
        {site.email}
      </a>
      <p className="copy-note" aria-live="polite">
        {copied ? "Copied to clipboard" : ""}
      </p>
    </>
  );
}
