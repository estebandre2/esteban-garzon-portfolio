import { ImageResponse } from "next/og";
import { profile } from "@/lib/portfolio-data";

export const alt = `${profile.name}: civil engineer turned CTO, from watersheds to AI systems`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Colors mirror the tokens in app/globals.css (--bg, --text, --muted, --cyan, --amber, --line).
const bg = "#07111c";
const text = "#e8eef5";
const muted = "#91a6ba";
const cyan = "#78f2df";
const amber = "#ffb86f";

const contours = [150, 230, 310, 390, 470, 550].map(
  (y, i) => `M0 ${y} C 300 ${y - 60 - i * 6}, 700 ${y + 70}, 1200 ${y - 30 + i * 4}`,
);

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: `radial-gradient(circle at 16% 18%, rgba(255,184,111,0.16), transparent 34%), radial-gradient(circle at 84% 20%, rgba(120,242,223,0.16), transparent 30%)`,
          backgroundColor: bg,
          color: text,
          position: "relative",
        }}
      >
        <svg width="1200" height="630" viewBox="0 0 1200 630" style={{ position: "absolute", top: 0, left: 0 }}>
          {contours.map((d) => (
            <path key={d} d={d} fill="none" stroke="rgba(164,191,213,0.14)" strokeWidth="2" />
          ))}
        </svg>

        <div style={{ display: "flex", fontSize: 28, letterSpacing: 4, color: cyan, textTransform: "uppercase" }}>
          Civil engineer · Data engineer · CTO
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 104, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>{profile.name}</div>
          <div style={{ fontSize: 46, color: text, marginTop: 20 }}>From watersheds to AI systems.</div>
          <div style={{ fontSize: 30, color: muted, marginTop: 18, maxWidth: 940, lineHeight: 1.35 }}>
            Hydropower and solar projects, data pipelines, and AI agents built to hold up in production.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 28 }}>
          <div style={{ color: amber }}>Build for the flood, not for the average day.</div>
          <div style={{ color: muted }}>estebangarzon.com</div>
        </div>
      </div>
    ),
    size,
  );
}
