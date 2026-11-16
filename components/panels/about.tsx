import { about } from "@/lib/content";
import { PhotoPrint } from "../photo-print";
import { RichText } from "../rich-text";

/** One paragraph in Nathan's voice, beside a photo print. */
export function AboutPanel() {
  return (
    <section id="about" className="panel" aria-labelledby="about-title" tabIndex={-1}>
      <div className="panel-inner panel-body">
        <h2 id="about-title" className="sr-only">
          About me
        </h2>
        <div className="about">
          <PhotoPrint />
          <p className="about-text">
            <RichText text={about.paragraph} />
          </p>
        </div>
      </div>
    </section>
  );
}
