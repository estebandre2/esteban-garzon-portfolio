import { ImageResponse } from "next/og";
import { researchStudies } from "@/lib/research";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Study card with its title and key result";

// Same tokens as app/opengraph-image.tsx and app/globals.css.
const bg = "#07111c";
const text = "#e8eef5";
const muted = "#91a6ba";
const cyan = "#78f2df";
const amber = "#ffb86f";
const ink = "#fff4e6";

export function generateStaticParams() {
  return researchStudies.map((s) => ({ slug: s.slug }));
}

const contours = [170, 250, 330, 410, 490, 570].map(
  (y, i) => `M0 ${y} C 300 ${y - 60 - i * 6}, 700 ${y + 70}, 1200 ${y - 30 + i * 4}`,
);

export default async function StudyImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = researchStudies.find((s) => s.slug === slug) ?? researchStudies[0];
  const key = study.keyNumbers[0];
  const [lead] = study.title.split(":");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px",
          background:
            "radial-gradient(circle at 16% 18%, rgba(255,184,111,0.16), transparent 34%), radial-gradient(circle at 84% 20%, rgba(120,242,223,0.16), transparent 30%)",
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

        <div style={{ display: "flex", fontSize: 24, letterSpacing: 4, color: cyan, textTransform: "uppercase" }}>
          AI safety research · Pre-registered · {study.date}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>{lead}</div>
          <div style={{ fontSize: 34, color: text, marginTop: 18, maxWidth: 1040, lineHeight: 1.3 }}>{study.question}</div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 24, maxWidth: 700 }}>
            <div style={{ fontSize: 72, color: ink, letterSpacing: -2 }}>{key.value}</div>
            <div style={{ fontSize: 26, color: muted, maxWidth: 380, lineHeight: 1.3 }}>{key.label}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", fontSize: 24, flexShrink: 0 }}>
            <div style={{ color: amber }}>Esteban Garzon</div>
            <div style={{ color: muted }}>estebangarzon.com/research</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
