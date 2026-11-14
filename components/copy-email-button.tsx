"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/content";
import { cx } from "@/lib/cx";
import { Check, Copy } from "./icons";

export function CopyEmailButton({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (e.g. insecure context) — fall back to the mail client.
      window.location.href = `mailto:${site.email}`;
    }
  };

  return (
    <button type="button" onClick={copy} className={cx("btn btn-glass js-only", className)}>
      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      <span aria-live="polite">{copied ? "Copied" : "Copy email"}</span>
    </button>
  );
}
