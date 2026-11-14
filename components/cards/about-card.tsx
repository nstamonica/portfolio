import { about, site } from "@/lib/content";
import { factIcons } from "../icons";

export function AboutCard() {
  return (
    <section data-area="about" id="about" aria-labelledby="about-title" className="card flex flex-col">
      <h2 id="about-title" className="card-title">
        About me
      </h2>
      <div className="mt-4 max-w-[64ch] space-y-3 text-[15px] leading-[1.55] text-pretty text-ink-2 xl:mt-3 xl:space-y-2.5 tall:mt-4 tall:space-y-3 short:mt-2 short:space-y-2 short:text-[14px] short:leading-normal">
        <p>
          {about.greeting} {about.focus}
        </p>
        <p>{about.interestsLead}</p>
      </div>

      <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2 xl:mt-3 xl:gap-y-2 tall:mt-4 tall:gap-y-3 short:mt-2.5 short:gap-y-1.5">
        {about.facts.map((fact) => {
          const Icon = factIcons[fact.icon];
          return (
            <li
              key={fact.text}
              className="flex items-center gap-3 text-[14.5px] leading-snug text-pretty text-ink short:text-[14px]"
            >
              <span data-tone={fact.tone} className="fact-icon">
                <Icon />
              </span>
              {fact.text}
            </li>
          );
        })}
      </ul>

      <p className="mt-6 xl:mt-auto xl:pt-4 tall:pt-6 short:pt-3">
        <span className="status-pill">{site.availability}</span>
      </p>
    </section>
  );
}
