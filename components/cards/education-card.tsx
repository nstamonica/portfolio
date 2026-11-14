import { education } from "@/lib/content";
import { GraduationCap } from "../icons";

export function EducationCard() {
  return (
    <section
      data-area="education"
      id="education"
      aria-labelledby="education-title"
      className="card card-night flex flex-col"
    >
      <span className="grid size-11 place-items-center rounded-[13px] bg-white/10 ring-1 ring-white/15">
        <GraduationCap className="size-[22px]" />
      </span>
      <div className="mt-8 xl:mt-auto xl:pt-4">
        <h2
          id="education-title"
          className="text-[22px] leading-tight font-semibold tracking-[-0.022em] short:text-[19px]"
        >
          {education.school}
        </h2>
        <p className="mt-2 text-[14px] leading-snug text-white/75 short:mt-1.5 short:text-[13px]">{education.degree}</p>
        <p className="mt-3 text-[13px] text-white/60 tabular-nums">{education.period}</p>
      </div>
    </section>
  );
}
