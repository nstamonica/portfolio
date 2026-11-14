import { projects, site, type Project } from "@/lib/content";
import { CaseArt } from "../case-art";
import { Emphasis } from "../emphasis";
import { ArrowUpRight, GitHub } from "../icons";
import { TiltCard } from "../tilt-card";

function ProjectEntry({ project }: { project: Project }) {
  return (
    <li id={`project-${project.slug}`} className="border-b border-hairline py-8 last:border-b-0 last:pb-0 md:py-10">
      <TiltCard className="group grid gap-7 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:items-center lg:gap-12">
        <CaseArt tone={project.theme} glyph={project.glyph} size="project" />

        <div data-tone={project.theme}>
          <h3 className="text-[clamp(1.5rem,2.6vw,2rem)] leading-tight font-semibold tracking-[-0.028em]">
            {project.name}
          </h3>
          <p className="mt-1.5 text-[14px] font-medium text-[var(--chip-fg)]">
            {project.kind} · <span className="tabular-nums">{project.period}</span>
          </p>
          <p className="mt-4 max-w-[60ch] text-[17px] leading-[1.55] text-ink-2">{project.summary}</p>
          <ul className="mt-5 max-w-[62ch] space-y-2">
            {project.points.map((point) => (
              <li key={point} className="point text-[15px] leading-[1.5] text-ink-2">
                <Emphasis text={point} />
              </li>
            ))}
          </ul>
          <ul aria-label="Built with" className="mt-6 flex flex-wrap gap-1.5">
            {project.stack.map((item) => (
              <li key={item} className="chip">
                {item}
              </li>
            ))}
          </ul>
          {project.links && project.links.length > 0 && (
            <div className="mt-7 flex flex-wrap gap-2">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-dark h-10 px-[18px] text-[14px]"
                >
                  {link.label}
                  <ArrowUpRight className="size-4" />
                </a>
              ))}
            </div>
          )}
        </div>
      </TiltCard>
    </li>
  );
}

export function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="card px-6 pt-8 pb-8 sm:px-8 md:px-10 md:pt-10 md:pb-10 xl:px-12"
    >
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        <div>
          <h2 id="projects-title" className="text-[clamp(2rem,3.4vw,2.625rem)] leading-tight font-semibold tracking-[-0.032em]">
            Projects
          </h2>
          <p className="mt-2 text-[17px] text-muted">Apps, tools and experiments I’ve built. More are on the way.</p>
        </div>
        <a
          href={site.github}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline h-10 px-4 text-[14px]"
        >
          <GitHub className="size-4" />
          More on GitHub
        </a>
      </div>

      <ul className="mt-8 border-t border-hairline">
        {projects.map((project) => (
          <ProjectEntry key={project.slug} project={project} />
        ))}
      </ul>
    </section>
  );
}
