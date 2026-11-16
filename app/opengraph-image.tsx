import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/content";

export const alt = `${site.name}: “${site.wordmark}” in a giant serif, its letters filled with flowing blue and violet liquid`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Fonts ship in assets/fonts (SIL Open Font License). Read once at build
// time, so the image is generated then and served as a static file.
const fonts = join(process.cwd(), "assets/fonts");
const serif = await readFile(join(fonts, "DMSerifDisplay-Regular.ttf"));
const sansMedium = await readFile(join(fonts, "Inter-Medium.woff"));
// One rendered frame of the site's liquid shader, the size of the card (see the PNG's embedded note).
const liquid = `data:image/png;base64,${(await readFile(join(process.cwd(), "assets/og-liquid.png"))).toString("base64")}`;

// "sta" over "monica", sized so "monica" spans the card, letters whole.
const FONT = 340;
const LINE = 0.84;
const LEFT = 48;
const BOTTOM = 50;
const TOP = size.height - BOTTOM - 2 * LINE * FONT;

// The link preview (LinkedIn, iMessage, Slack…): a poster of the liquid
// wordmark on paper, with the name and focus tucked beside "sta".
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#eeeee0",
          color: "#111110",
          fontFamily: "Inter",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: LEFT,
            bottom: BOTTOM,
            display: "flex",
            whiteSpace: "pre",
            fontFamily: "DM Serif Display",
            fontSize: FONT,
            lineHeight: LINE,
            letterSpacing: -0.012 * FONT,
            color: "transparent",
            // One sheet of liquid behind the whole card, showing through the letters.
            backgroundImage: `url(${liquid})`,
            backgroundSize: `${size.width}px ${size.height}px`,
            backgroundPosition: `${-LEFT}px ${-TOP}px`,
            backgroundClip: "text",
          }}
        >
          {site.wordmark.split(" ").join("\n")}
        </div>
        <div
          style={{
            position: "absolute",
            top: 70,
            right: 62,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            textAlign: "right",
          }}
        >
          <div style={{ fontSize: 38, fontWeight: 500, lineHeight: 1.15, letterSpacing: -1.1 }}>{site.name}</div>
          <div
            style={{
              display: "flex",
              maxWidth: 420,
              marginTop: 12,
              fontSize: 24,
              fontWeight: 500,
              lineHeight: 1.4,
              letterSpacing: -0.4,
              color: "#5b5b53",
              textAlign: "right",
            }}
          >
            {site.focus}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: sansMedium, style: "normal", weight: 500 },
        { name: "DM Serif Display", data: serif, style: "normal", weight: 400 },
      ],
    },
  );
}
