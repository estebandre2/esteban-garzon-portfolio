"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import { useState } from "react";
import { careerEvents, type CareerEvent } from "@/lib/portfolio-data";
import { hydrographPath, hydrographPeaks, timelineX } from "@/lib/scene-math";
import { FlowLine } from "./flow-line";
import { SceneSection } from "./scene-section";
import styles from "./scenes.module.css";

const W = 1000;
const H = 240;
const PATH = hydrographPath(careerEvents, W, H);
// Peaks closer than ~5% of the width would overlap as tap targets: lift the later one above the curve.
const PEAKS = hydrographPeaks(careerEvents, W, H).map((p, i, all) =>
  i > 0 && Math.abs(p.x - all[i - 1].x) < W * 0.05 ? { ...p, y: Math.max(12, p.y - 40) } : p,
);
const YEARS = [2018, 2020, 2022, 2024, 2026];
const KIND_LABEL: Record<CareerEvent["kind"], string> = {
  civil: "Civil engineering",
  data: "Data engineering",
  ai: "AI systems",
  education: "Education",
};

const fmt = (ym: string | null) => {
  if (!ym) return "Present";
  const [y, m] = ym.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
};

function Chart({ progress }: { progress: MotionValue<number> }) {
  const drawn = useTransform(progress, [0.1, 0.55], [0, 1]);
  const [focus, setFocus] = useState<number | null>(null);

  return (
    <div className={styles.hydrograph}>
      <div className={styles.chartArea}>
      <svg viewBox={`0 0 ${W} ${H + 30}`} aria-hidden="true">
        {YEARS.map((y) => {
          const x = timelineX(`${y}-01`, careerEvents, W);
          return (
            <g key={y}>
              <path d={`M${x} 0 L${x} ${H}`} className={styles.chartGrid} />
              <text x={x + 4} y={H + 20} className={styles.svgNote}>
                {y}
              </text>
            </g>
          );
        })}
        <motion.path d={PATH} className={styles.hydroLine} style={{ pathLength: drawn }} />
      </svg>
      {careerEvents.map((event, i) => (
        <button
          key={event.title}
          type="button"
          className={`${styles.peak} ${styles[`peak_${event.kind}`]}`}
          style={{ left: `${(PEAKS[i].x / W) * 100}%`, top: `${(PEAKS[i].y / (H + 30)) * 100}%` }}
          onMouseEnter={() => setFocus(i)}
          onMouseLeave={() => setFocus(null)}
          onFocus={() => setFocus(i)}
          onBlur={() => setFocus(null)}
          aria-describedby={`career-${i}`}
        >
          <span className={styles.srOnly}>{event.title}</span>
        </button>
      ))}
      </div>
      <p className={styles.peakDetail} aria-hidden="true">
        {focus === null
          ? "Hover or focus a peak to read it."
          : `${careerEvents[focus].title} · ${careerEvents[focus].org} — ${careerEvents[focus].summary}`}
      </p>
    </div>
  );
}

export function HydrographScene() {
  return (
    <SceneSection
      stationId="career"
      title="Hydrograph: a career measured in floods."
      intro="Each peak is a stretch of work. The channel never changed: water, then data, then AI, always designed for the peak."
    >
      {(progress) => (
        <>
          <FlowLine progress={progress} variant="river" />
          <Chart progress={progress} />
          <ol className={styles.careerList}>
            {careerEvents.map((event, i) => (
              <li key={event.title} id={`career-${i}`} className={styles[`peak_${event.kind}`]}>
                <span className={styles.annotation}>
                  {fmt(event.start)} – {fmt(event.end)} · {KIND_LABEL[event.kind]}
                </span>
                <strong>
                  {event.title} · {event.org}
                </strong>
                <span>{event.summary}</span>
              </li>
            ))}
          </ol>
        </>
      )}
    </SceneSection>
  );
}
