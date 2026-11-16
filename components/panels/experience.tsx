import { experience, headings } from "@/lib/content";
import { ChevronDown } from "../icons";
import { RichText } from "../rich-text";

/**
 * All four roles on one panel. Each shows its headline result; opening one
 * (a native <details>, so it works without JavaScript) shows every point and
 * the tools used. Opening a role closes the others.
 */
export function ExperiencePanel() {
  return (
    <section id="experience" className="panel" aria-labelledby="experience-title" tabIndex={-1}>
      <div className="panel-inner panel-body">
        <h2 id="experience-title" className="panel-title">
          {headings.experience}
        </h2>

        <div className="roles" data-deck-scroll>
          {experience.map((role) => (
            <details key={role.slug} id={`exp-${role.slug}`} name="roles" className="role" data-tone={role.theme}>
              <summary className="role-summary">
                <span className="role-period">{role.period}</span>
                <span className="role-head">
                  <span className="role-title">{role.role}</span>
                  <span className="role-org">
                    <span className="tone-dot" aria-hidden="true" />
                    {role.org}
                  </span>
                </span>
                <span className="role-highlight">
                  <RichText text={role.highlight} />
                </span>
                <ChevronDown className="role-chevron" />
              </summary>

              <div className="role-body">
                <ul className="role-points">
                  {role.points.map((point) => (
                    <li key={point}>
                      <RichText text={point} />
                    </li>
                  ))}
                </ul>
                <ul className="tags" aria-label={`Tools used at ${role.org}`}>
                  {role.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
