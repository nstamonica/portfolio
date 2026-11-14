import { cx } from "@/lib/cx";

/** The "N" mark, same artwork as the favicon (app/icon.svg). */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false" className={cx("shrink-0", className)}>
      <defs>
        <linearGradient id="logo-mark-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1d4ed8" />
          <stop offset="0.55" stopColor="#6d28d9" />
          <stop offset="1" stopColor="#db2777" />
        </linearGradient>
        <radialGradient id="logo-mark-sheen" cx="0.3" cy="0.2" r="0.8">
          <stop offset="0" stopColor="#fff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="64" height="64" rx="15" fill="url(#logo-mark-fill)" />
      <rect width="64" height="64" rx="15" fill="url(#logo-mark-sheen)" />
      <path d="M20 45V19h4.2l15.6 18.6V19H44v26h-4.2L24.2 26.4V45z" fill="#fff" />
    </svg>
  );
}
