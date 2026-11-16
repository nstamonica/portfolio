import type { CSSProperties } from "react";
import { headings, techStack, type Tech } from "@/lib/content";

// Three rows that slide in alternating directions at slightly different speeds.
const ROW_SECONDS = [52, 60, 56];

function rowsOf(list: Tech[]) {
  const size = Math.ceil(list.length / 3);
  return [list.slice(0, size), list.slice(size, size * 2), list.slice(size * 2)].filter((row) => row.length);
}

/** Sliding rows of app-icon tiles, one per language, framework or platform. */
export function TechPanel() {
  const rows = rowsOf(techStack);

  return (
    <section id="tech" className="panel" aria-labelledby="tech-title" tabIndex={-1}>
      <div className="panel-inner panel-body panel-body--wide">
        <h2 id="tech-title" className="panel-title">
          {headings.tech}
        </h2>

        {/* The moving tiles are decorative copies; this list is what assistive tech reads. */}
        <ul className="sr-only">
          {techStack.map((tech) => (
            <li key={tech.name}>{tech.name}</li>
          ))}
        </ul>

        <div className="marquee" aria-hidden="true">
          {rows.map((row, r) => (
            <div
              key={r}
              className="marquee-row"
              data-reverse={r % 2 === 1 || undefined}
              style={{ "--marquee-duration": `${ROW_SECONDS[r] ?? 56}s` } as CSSProperties}
            >
              <div className="marquee-track">
                {/* Three copies so the loop never shows a gap, even on very wide screens. */}
                {[0, 1, 2].map((copy) =>
                  row.map((tech) => (
                    <span
                      key={`${copy}-${tech.name}`}
                      className="tile"
                      data-dark={tech.dark || undefined}
                      data-copy={copy > 0 || undefined}
                      data-cursor={tech.name}
                      style={{ "--tile": tech.color, "--logo": `url(${tech.logo})` } as CSSProperties}
                    >
                      <span className="tile-logo" />
                    </span>
                  )),
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
