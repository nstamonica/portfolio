import { projects } from "@/lib/content";
import { ArrowRight, glyphs } from "../icons";
import { TiltCard } from "../tilt-card";

/**
 * The card in the bento that leads down to the Projects section. It previews
 * the newest project (the first in content.ts) in that project's own colours.
 */
export function ProjectsCard() {
  const [featured, ...rest] = projects;
  if (!featured) return null;
  const Glyph = glyphs[featured.glyph];

  return (
    <TiltCard
      data-area="projects"
      data-tone={featured.theme}
      data-size="teaser"
      className="case-art group flex flex-col p-6 text-white md:p-7 xl:p-6 tall:p-7 short:p-[18px]"
    >
      {/* Art sits behind the text: z-index −1 inside the card's isolated stack,
          after the floor light in tree order. */}
      <div data-art="" aria-hidden="true" className="absolute inset-0" style={{ zIndex: -1 }}>
        <div className="case-art__orb" />
        <div className="case-art__shadow" />
        <div className="case-art__icon">
          <Glyph />
        </div>
      </div>

      <h2 className="text-[26px] leading-tight font-semibold tracking-[-0.026em] short:text-[24px]">
        {/* Stretched link: the whole card is the hit area and carries the focus ring. */}
        <a
          href="#projects"
          className="after:absolute after:inset-0 after:rounded-[24px] after:content-[''] focus-visible:outline-none md:after:rounded-[28px] focus-visible:after:outline-2 focus-visible:after:-outline-offset-4 focus-visible:after:outline-white focus-visible:after:outline-solid"
        >
          Projects
        </a>
      </h2>
      <p className="mt-2 text-[15px] leading-snug font-semibold tracking-[-0.012em]">{featured.name}</p>
      <p className="mt-0.5 max-w-[20ch] text-[14px] leading-snug text-white/80">{featured.tagline}</p>
      {rest.length > 0 && (
        <p className="mt-2 text-[13px] text-white/70">
          + {rest.length} more {rest.length === 1 ? "project" : "projects"}
        </p>
      )}

      <span
        aria-hidden="true"
        className="mt-auto grid size-10 place-items-center rounded-full border border-white/40 bg-white/15 transition-colors duration-300 group-hover:bg-white group-hover:text-[#33178a]"
      >
        <ArrowRight className="size-[18px]" />
      </span>
    </TiltCard>
  );
}
