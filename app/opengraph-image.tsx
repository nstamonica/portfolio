import { ImageResponse } from "next/og";
import { site } from "@/lib/content";

export const alt = `${site.name} — Software Engineering & Cybersecurity`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const glow = (color: string, left: number, top: number, diameter: number) => (
  <div
    style={{
      position: "absolute",
      left,
      top,
      width: diameter,
      height: diameter,
      borderRadius: diameter,
      backgroundImage: `radial-gradient(circle, ${color} 0%, rgba(4,5,13,0) 70%)`,
    }}
  />
);

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
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#04050d",
          color: "white",
        }}
      >
        {glow("rgba(37,99,235,0.85)", -160, 40, 760)}
        {glow("rgba(124,58,237,0.8)", 620, -220, 760)}
        {glow("rgba(219,39,119,0.55)", 700, 300, 620)}
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 6, opacity: 0.85 }}>
          SOFTWARE ENGINEERING · CYBERSECURITY
        </div>
        <div style={{ display: "flex", fontSize: 104, fontWeight: 700, letterSpacing: -4, marginTop: 26 }}>
          {site.name}
        </div>
        <div style={{ display: "flex", fontSize: 30, opacity: 0.85, marginTop: 26 }}>
          Computer Science & Cybersecurity @ Carleton University
        </div>
        <div style={{ display: "flex", fontSize: 24, opacity: 0.65, marginTop: 14 }}>
          Previously @ RCMP · Shared Services Canada · CSC · CRA
        </div>
      </div>
    ),
    size,
  );
}
