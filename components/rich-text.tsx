import { Fragment, type ReactNode } from "react";

// **bold** or [text](href), as described at the top of lib/content.ts.
const TOKEN = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;

/** Renders copy from content.ts: **marked** phrases in a heavier weight, [links](#panel) as links. */
export function RichText({ text }: { text: string }) {
  const out: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(TOKEN)) {
    const start = match.index ?? 0;
    if (start > last) out.push(<Fragment key={out.length}>{text.slice(last, start)}</Fragment>);
    if (match[1] !== undefined) {
      out.push(
        <strong key={out.length} className="font-bold">
          {match[1]}
        </strong>,
      );
    } else {
      const href = match[3];
      const external = /^https?:\/\//.test(href);
      out.push(
        <a
          key={out.length}
          href={href}
          className="link"
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {match[2]}
        </a>,
      );
    }
    last = start + match[0].length;
  }
  if (last < text.length) out.push(<Fragment key={out.length}>{text.slice(last)}</Fragment>);
  return <>{out}</>;
}

/** The same text without the markers, for search keywords. */
export const plain = (text: string) =>
  text.replace(/\*\*(.+?)\*\*/g, "$1").replace(/\[([^\]]+)\]\([^)\s]+\)/g, "$1");
