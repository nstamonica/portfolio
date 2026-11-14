import { experience } from "@/lib/content";
import { Emphasis } from "../emphasis";

export function ExperienceCard() {
  return (
    <section
      data-area="experience"
      id="experience"
      aria-labelledby="experience-title"
      className="card flex flex-col pr-3 md:pr-4"
    >
      <div className="flex items-baseline justify-between gap-4 pr-3 md:pr-3">
        <h2 id="experience-title" className="card-title">
          Experience
        </h2>
        <span className="text-[13px] text-subtle">{experience.length} roles</span>
      </div>

      {/* Scrolls inside the card on desktop; a plain list everywhere else. */}
      <div
        data-scroller=""
        tabIndex={0}
        role="region"
        aria-label="Experience timeline"
        className="scroller experience-scroll relative mt-5 min-h-0 flex-1 rounded-lg pr-3 md:pr-3"
      >
        <ol>
          {experience.map((role) => (
            <li key={role.slug} id={`exp-${role.slug}`} data-tone={role.theme} className="timeline-item">
              <h3 className="text-[15.5px] leading-snug font-semibold tracking-[-0.014em] text-ink">
                {role.role}
              </h3>
              <p className="mt-0.5 text-[13px] font-medium text-[var(--chip-fg)]">
                {role.org} · <span className="whitespace-nowrap tabular-nums">{role.period}</span>
              </p>
              <ul className="mt-2.5 space-y-1.5">
                {role.points.map((point) => (
                  <li key={point} className="point text-[13.5px] leading-[1.5] text-ink-2">
                    <Emphasis text={point} />
                  </li>
                ))}
              </ul>
              <ul aria-label={`Tools used at ${role.org}`} className="mt-3 flex flex-wrap gap-1.5">
                {role.tags.map((tag) => (
                  <li key={tag} className="chip">
                    {tag}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
