import { headings, projects, type Project } from "@/lib/content";
import { cx } from "@/lib/cx";
import { ArrowUpRight, ChevronDown, GitHub, glyphs } from "../icons";

function ProjectLinks({ project, className, withRepo }: { project: Project; className: string; withRepo?: boolean }) {
  const links = [
    ...(withRepo && project.repo ? [{ label: "View on GitHub", href: project.repo }] : []),
    ...(project.links ?? []),
  ];
  if (!links.length) return null;
  return (
    <ul className={className}>
      {links.map((link) => (
        <li key={link.href}>
          <a href={link.href} target="_blank" rel="noopener noreferrer">
            {link.label}
            <ArrowUpRight className="size-4" />
          </a>
        </li>
      ))}
    </ul>
  );
}

/** The newest project as the big card; any others follow in a list beside it. */
export function ProjectsPanel() {
  const [featured, ...rest] = projects;
  if (!featured) return null;
  const Glyph = glyphs[featured.glyph];

  return (
    <section id="projects" className="panel" aria-labelledby="projects-title" tabIndex={-1}>
      <div className="panel-inner panel-body">
        <h2 id="projects-title" className="panel-title">
          {headings.projects}
        </h2>

        <div className={cx("projects", rest.length > 0 && "has-list")}>
          <article
            id={`project-${featured.slug}`}
            className="feature-card"
            data-tone={featured.theme}
            data-cursor={featured.repo ? "View on GitHub" : featured.name}
            data-cursor-dark
            aria-labelledby={`project-${featured.slug}-name`}
          >
            <header className="feature-head">
              <Glyph className="feature-glyph" />
              <h3 id={`project-${featured.slug}-name`} className="feature-name">
                {featured.name}
              </h3>
              <span className="feature-badge">{featured.kind}</span>
              {/* Its hit area covers the whole card (see .feature-repo in globals.css). */}
              {featured.repo && (
                <a
                  href={featured.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="feature-repo"
                  aria-label={`${featured.name} on GitHub (opens in a new tab)`}
                >
                  <GitHub className="size-4" />
                  GitHub
                  <ArrowUpRight className="feature-repo-arrow size-4" />
                </a>
              )}
            </header>
            <p className="feature-summary">{featured.summary}</p>
            <ul className="feature-points">
              {featured.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <footer className="feature-foot">
              <ul className="feature-stack" aria-label="Built with">
                {featured.stack.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="feature-period">{featured.period}</p>
            </footer>
            <ProjectLinks project={featured} className="feature-links" />
          </article>

          {rest.length > 0 && (
            <div className="project-list" data-deck-scroll>
              {rest.map((project) => (
                <details
                  key={project.slug}
                  id={`project-${project.slug}`}
                  name="projects"
                  className="project-item"
                  data-tone={project.theme}
                >
                  <summary className="project-item-summary">
                    <span className="project-item-head">
                      <span className="project-item-name">
                        <span className="tone-dot" aria-hidden="true" />
                        {project.name}
                      </span>
                      <span className="project-item-tagline">{project.tagline}</span>
                    </span>
                    <span className="project-item-period">{project.period}</span>
                    <ChevronDown className="role-chevron" />
                  </summary>
                  <div className="project-item-body">
                    <p>{project.summary}</p>
                    <ul className="role-points">
                      {project.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                    <ul className="tags" aria-label="Built with">
                      {project.stack.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <ProjectLinks project={project} className="project-item-links" withRepo />
                  </div>
                </details>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
