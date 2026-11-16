import { intro, site } from "@/lib/content";
import { LiquidCanvas } from "../liquid-canvas";

/** First screen: one line on what Nathan does, over the liquid wordmark. */
export function IntroPanel() {
  return (
    <section id="intro" className="panel panel-intro" aria-label="Introduction" tabIndex={-1}>
      <div className="panel-inner intro">
        {/* First in the DOM so the page starts with its h1; the grid sets it at the bottom. */}
        <div className="wordmark">
          <h1 className="wordmark-text">
            <span className="sr-only">Nathan </span>
            {/* One line on wide screens; on phones each word gets its own line. */}
            {site.wordmark.split(" ").map((word, i) => (
              <span key={i}>
                {i > 0 && " "}
                <span className="wordmark-word">{word}</span>
              </span>
            ))}
          </h1>
          <LiquidCanvas className="wordmark-liquid" />
        </div>

        <div className="intro-copy">
          <p className="intro-line">{intro.line}</p>
        </div>
      </div>
    </section>
  );
}
