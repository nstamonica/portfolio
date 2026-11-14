import { profile, site } from "@/lib/content";
import { ArrowUpRight, GitHub, LinkedIn, Mail } from "../icons";
import { LogoMark } from "../logo-mark";
import { PaletteButton } from "../palette-button";

// Keep the surname together when the name wraps ("Nathan / Sta Monica").
const displayName = site.name.replace(/ (?=\S+$)/, " ");

export function IdentityCard() {
  return (
    <section data-area="identity" aria-labelledby="identity-name" className="card flex flex-col">
      <div className="flex items-center justify-between gap-4">
        <LogoMark className="size-11 xl:size-10 tall:size-11 short:size-9" />
        <PaletteButton />
      </div>

      <div className="mt-8 xl:my-auto xl:pt-4 tall:pt-6 short:pt-2">
        <h1
          id="identity-name"
          className="text-[clamp(2.375rem,4.2vw,3rem)] leading-[1.02] font-semibold tracking-[-0.036em] text-balance xl:text-[2.5rem] tall:text-[3rem] short:text-[2.125rem]"
        >
          {displayName}
        </h1>
        <p className="mt-3 text-[16px] leading-snug font-medium tracking-[-0.014em] text-pretty text-link xl:mt-2 tall:mt-3 short:text-[15px]">
          {profile.headline}
        </p>
        <p className="mt-2 text-[14px] leading-relaxed text-pretty text-muted short:mt-1.5 short:text-[13px] short:leading-normal">
          {profile.previously}
        </p>
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-1.5 sm:gap-2 xl:mt-5 xl:gap-1.5 tall:mt-7 tall:gap-2 short:mt-4">
        <a
          href={site.resume}
          target="_blank"
          rel="noopener"
          className="btn btn-primary h-10 px-4 sm:px-[18px] xl:px-4 tall:px-[18px]"
        >
          Résumé
          <ArrowUpRight className="hidden size-4 sm:block" />
        </a>
        <a href={`mailto:${site.email}`} className="btn btn-dark h-10 px-4 sm:px-[18px] xl:px-4 tall:px-[18px]">
          <Mail className="size-4" />
          Email
        </a>
        <a
          href={site.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          title="GitHub"
          className="btn btn-outline size-10 p-0 xl:size-9 tall:size-10"
        >
          <GitHub className="size-[18px]" />
        </a>
        <a
          href={site.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          title="LinkedIn"
          className="btn btn-outline size-10 p-0 xl:size-9 tall:size-10"
        >
          <LinkedIn className="size-[17px]" />
        </a>
      </div>
    </section>
  );
}
