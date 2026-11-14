/* eslint-disable @next/next/no-img-element -- static SVG logos; next/image adds nothing for vector files */
import { securityTools, techStack } from "@/lib/content";

export function TechCard() {
  return (
    <section data-area="tech" id="tech" aria-labelledby="tech-title" className="card flex flex-col">
      <h2 id="tech-title" className="card-title">
        Tech
      </h2>
      <ul className="tech-grid mt-4 short:mt-3">
        {techStack.map((tech) => (
          <li key={tech.name} title={tech.name}>
            <img src={tech.logo} alt={tech.name} width={32} height={32} decoding="async" />
          </li>
        ))}
      </ul>

      <h3 className="mt-5 text-[13px] font-semibold text-ink-2 xl:mt-4 tall:mt-5 short:mt-3">Security tools</h3>
      <ul data-tone="crimson" className="mt-2 flex flex-wrap gap-1.5 short:mt-1.5">
        {securityTools.map((tool) => (
          <li key={tool} className="chip">
            {tool}
          </li>
        ))}
      </ul>
    </section>
  );
}
