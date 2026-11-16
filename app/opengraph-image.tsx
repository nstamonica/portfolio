import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { intro, site } from "@/lib/content";

export const alt = `${site.name} — Software Engineering & Cybersecurity`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Fonts ship in assets/fonts (SIL Open Font License). Read once at build
// time, so the image is generated then and served as a static file.
const fonts = join(process.cwd(), "assets/fonts");
const serif = await readFile(join(fonts, "DMSerifDisplay-Regular.ttf"));
const sans = await readFile(join(fonts, "Inter-Regular.woff"));
const sansMedium = await readFile(join(fonts, "Inter-Medium.woff"));
// One rendered frame of the site's liquid shader (see the PNG's embedded note).
const liquid = `data:image/png;base64,${(await readFile(join(process.cwd(), "assets/og-liquid.png"))).toString("base64")}`;

// The link preview: the first screen of the site, with a still of the liquid
// inside the wordmark.
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          backgroundColor: "#eeeee0",
          color: "#111110",
          fontFamily: "Inter",
          padding: "86px 64px 0",
        }}
      >
        <div style={{ display: "flex", maxWidth: 840, fontSize: 38, fontWeight: 500, lineHeight: 1.3, textAlign: "right", letterSpacing: -1 }}>
          {intro.lines.join(" ")}
        </div>
        <div style={{ display: "flex", maxWidth: 720, marginTop: 20, fontSize: 22, fontWeight: 500, lineHeight: 1.45, textAlign: "right", color: "#5b5b53" }}>
          {intro.credentials}
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: -40,
            display: "flex",
            justifyContent: "center",
            whiteSpace: "nowrap",
            fontFamily: "DM Serif Display",
            fontSize: 246,
            lineHeight: 1,
            letterSpacing: -3,
            color: "transparent",
            backgroundImage: `url(${liquid})`,
            backgroundSize: "100% 100%",
            backgroundClip: "text",
          }}
        >
          {site.wordmark}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: sans, style: "normal", weight: 400 },
        { name: "Inter", data: sansMedium, style: "normal", weight: 500 },
        { name: "DM Serif Display", data: serif, style: "normal", weight: 400 },
      ],
    },
  );
}
