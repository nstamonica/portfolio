import { contact, site } from "@/lib/content";
import { CopyEmail } from "../copy-email";
import { PaletteHint } from "../palette-hint";

/**
 * The close, laid out like brandondavid.dev's: a line in the wordmark's
 * serif, then Nathan's name, the email (click to copy) and his links.
 */
export function ContactPanel() {
  return (
    <section id="contact" className="panel" aria-labelledby="contact-title" tabIndex={-1}>
      <div className="panel-inner contact">
        <div className="contact-main">
          <h2 id="contact-title" className="contact-heading">
            {contact.heading}
          </h2>
          <p className="contact-lede">{contact.lede}</p>

          <div className="contact-card">
            <p className="contact-name">{site.name}</p>
            <CopyEmail />
          </div>

          <ul className="contact-links">
            <li>
              <a href={site.resume} target="_blank" rel="noopener" className="link" data-cursor="resume, PDF">
                Resume
              </a>
            </li>
            <li>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="link">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={site.github} target="_blank" rel="noopener noreferrer" className="link">
                GitHub
              </a>
            </li>
          </ul>
        </div>

        <footer className="contact-foot">
          <p>
            © {site.copyrightYear} {site.name} · {site.location}
          </p>
          <p className="palette-hint-row js-only">
            <PaletteHint />
          </p>
        </footer>
      </div>
    </section>
  );
}
