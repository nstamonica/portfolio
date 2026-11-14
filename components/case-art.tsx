import type { Glyph, Theme } from "@/lib/content";
import { cx } from "@/lib/cx";
import { glyphs } from "./icons";

type CaseArtProps = {
  tone: Theme;
  glyph: Glyph;
  size?: "square" | "project";
  className?: string;
};

/** Decorative cover art: a liquid-glass icon floating on a studio-lit gradient. */
export function CaseArt({ tone, glyph, size = "square", className }: CaseArtProps) {
  const Icon = glyphs[glyph];
  return (
    <div
      data-art=""
      data-tone={tone}
      data-size={size}
      className={cx("case-art", className)}
      aria-hidden="true"
    >
      <div className="case-art__orb" />
      <div className="case-art__shadow" />
      <div className="case-art__icon">
        <Icon />
      </div>
    </div>
  );
}
