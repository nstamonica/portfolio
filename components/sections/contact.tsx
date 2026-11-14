import { site } from "@/lib/content";
import { CopyEmailButton } from "../copy-email-button";
import { Mail } from "../icons";
import { PaletteHint } from "../palette-hint";

/** The page's close: the liquid opens back up behind a call to get in touch. */
export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="contact-band text-white">
      <div className="container-page pt-28 pb-24 text-center md:pt-36 md:pb-28">
        <h2 id="contact-title" className="display-md mx-auto max-w-3xl text-balance">
          Let’s build something secure.
        </h2>
        <p className="lede mx-auto mt-5 max-w-xl text-white/80">
          {site.availability} in software engineering and cybersecurity. Whether it’s a role, a project or a
          question, my inbox is open.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a href={`mailto:${site.email}`} className="btn btn-light">
            <Mail className="size-4" />
            Email me
          </a>
          <CopyEmailButton />
        </div>
        <p className="mt-5 text-[14px] text-white/70">{site.email}</p>
      </div>

      <footer className="container-page">
        <div className="flex flex-col gap-4 border-t border-white/12 py-8 text-[13px] text-white/70 md:flex-row md:items-center md:justify-between">
          <p>
            © {site.copyrightYear} {site.name} · {site.location}
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <li>
              <a href={site.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
                GitHub
              </a>
            </li>
            <li>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={site.resume} target="_blank" rel="noopener" className="transition-colors hover:text-white">
                Résumé
              </a>
            </li>
            <li className="js-only">
              <PaletteHint />
            </li>
          </ul>
        </div>
      </footer>
    </section>
  );
}
