import { Fragment } from "react";

/** Renders **marked** phrases from content.ts in a slightly heavier weight. */
export function Emphasis({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-semibold text-ink">
            {part}
          </strong>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

/** The same text without the markers, for search keywords. */
export const plain = (text: string) => text.replace(/\*\*/g, "");
