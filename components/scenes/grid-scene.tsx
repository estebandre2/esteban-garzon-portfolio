"use client";

import { MotionValue, motion, useMotionValueEvent, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { profile } from "@/lib/portfolio-data";
import { FlowLine } from "./flow-line";
import { SceneSection } from "./scene-section";
import styles from "./scenes.module.css";

// A line-drawn city (viewBox 0 0 600 220): buildings as [x, width, height], windows lit in order as energy arrives.
const BUILDINGS: [number, number, number][] = [
  [20, 60, 90],
  [90, 46, 140],
  [146, 70, 110],
  [226, 54, 170],
  [290, 80, 125],
  [380, 50, 155],
  [440, 72, 100],
  [522, 58, 135],
];
const BASE = 210;
const WINDOWS = BUILDINGS.flatMap(([x, w, h], b) => {
  const cells: { x: number; y: number; key: string }[] = [];
  for (let row = 0; row < Math.floor((h - 20) / 18); row++) {
    for (let col = 0; col < Math.floor((w - 12) / 14); col++) {
      cells.push({ x: x + 8 + col * 14, y: BASE - h + 12 + row * 18, key: `${b}-${row}-${col}` });
    }
  }
  return cells;
});
// Deterministic shuffle so the city lights up in a scattered but repeatable order.
const ORDER = WINDOWS.map((_, i) => (i * 37) % WINDOWS.length);

function City({ progress, reduced }: { progress: MotionValue<number>; reduced: boolean }) {
  const [lit, setLit] = useState(reduced ? WINDOWS.length : 0);
  // Last section: its progress tops out near 0.6 at the end of the page, so everything completes by 0.5.
  useEffect(() => {
    if (reduced) setLit(WINDOWS.length);
  }, [reduced]);
  const line = useTransform(progress, [0.05, 0.3], [0, 1]);
  useMotionValueEvent(progress, "change", (p) => {
    if (!reduced) setLit(Math.round(Math.min(1, Math.max(0, (p - 0.18) / 0.32)) * WINDOWS.length));
  });

  return (
    <svg className={styles.city} viewBox="0 0 600 220" aria-hidden="true">
      <motion.path d="M300 0 L300 30 M280 30 L320 30 L300 60 Z M300 60 L300 80" className={styles.tower} style={{ pathLength: line }} />
      <motion.path d="M300 30 C 220 60, 160 60, 100 70 M300 30 C 380 60, 440 60, 500 66" className={styles.cableLine} style={{ pathLength: line }} />
      {BUILDINGS.map(([x, w, h]) => (
        <motion.path key={x} d={`M${x} ${BASE} L${x} ${BASE - h} L${x + w} ${BASE - h} L${x + w} ${BASE}`} className={styles.building} style={{ pathLength: line }} />
      ))}
      {WINDOWS.map((cell, i) => (
        <rect key={cell.key} x={cell.x} y={cell.y} width="7" height="9" className={ORDER[i] < lit ? styles.windowLit : styles.window} />
      ))}
      <path d={`M0 ${BASE} L600 ${BASE}`} className={styles.intakeGround} />
    </svg>
  );
}

export function GridScene() {
  return (
    <SceneSection
      stationId="contact"
      title="Grid: where the energy reaches people."
      intro="Every station upstream exists for this one. If you are building AI systems that have to be right, not just fluent, I would like to help."
    >
      {(progress, reduced) => (
        <>
          <FlowLine progress={progress} variant="cable" />
          <div className={styles.gridLayout}>
            <City progress={progress} reduced={reduced} />
            <div className={styles.contactBlock}>
              <a className={styles.contactPrimary} href={`mailto:${profile.email}`}>
                Email me
              </a>
              <a className={styles.labLink} href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a className={styles.labLink} href={profile.resumeHref} target="_blank" rel="noreferrer" download>
                Download resume
              </a>
              <a className={styles.labLink} href="/code">
                Code Lab
              </a>
              <p className={styles.annotation}>
                {profile.email} · Quito, Ecuador · remote-first
              </p>
            </div>
          </div>
        </>
      )}
    </SceneSection>
  );
}
