"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import { civilProjects, stations } from "@/lib/portfolio-data";
import { Dimension } from "./dimension";
import { FlowLine } from "./flow-line";
import { SceneSection } from "./scene-section";
import styles from "./scenes.module.css";

// Intake cross-section, drawn stroke by stroke as the visitor scrolls: weir, trash rack, desander, conduit.
const SECTION_PATHS = [
  { d: "M10 210 L120 210 L150 170 L190 170 L215 210 L390 210", label: null },
  { d: "M120 210 L150 170 L190 170 L215 210 Z", label: { x: 150, y: 160, text: "Weir" } },
  { d: "M232 120 L232 205 M242 120 L242 205 M252 120 L252 205 M262 120 L262 205", label: { x: 228, y: 112, text: "Trash rack" } },
  { d: "M280 150 L360 150 L360 205 L280 205 Z M280 185 L360 185", label: { x: 284, y: 142, text: "Desander" } },
  { d: "M360 175 L396 175 M360 190 L396 190", label: { x: 330, y: 232, text: "Conduit →" } },
];
const WATER = "M10 196 C 60 192, 100 192, 128 196 L150 164 L190 164 L232 186 L280 186 L360 186";
const FORMULA = ["P", "=", "ρ", "·", "g", "·", "Q", "·", "H", "·", "η"];

function SectionStroke({ progress, d, index }: { progress: MotionValue<number>; d: string; index: number }) {
  const start = 0.12 + index * 0.06;
  const pathLength = useTransform(progress, [start, start + 0.18], [0, 1]);
  return <motion.path d={d} className={styles.intakeStroke} style={{ pathLength }} />;
}

function FormulaToken({ progress, token, index }: { progress: MotionValue<number>; token: string; index: number }) {
  const start = 0.3 + index * 0.018;
  const opacity = useTransform(progress, [start, start + 0.04], [0, 1]);
  const y = useTransform(progress, [start, start + 0.04], [8, 0]);
  return <motion.span style={{ opacity, y }}>{token}</motion.span>;
}

function IntakeVisual({ progress }: { progress: MotionValue<number> }) {
  const water = useTransform(progress, [0.42, 0.62], [0, 1]);
  const result = useTransform(progress, [0.52, 0.58], [0, 1]);

  return (
    <div className={styles.intakeVisual}>
      <svg viewBox="0 0 400 250" role="img" aria-label="Cross-section of a run-of-river intake: weir, trash rack, desander, and conduit">
        <path d="M0 230 L400 230" className={styles.intakeGround} />
        {SECTION_PATHS.map((p, i) => (
          <SectionStroke key={p.d} progress={progress} d={p.d} index={i} />
        ))}
        <motion.path d={WATER} className={styles.intakeWater} style={{ pathLength: water }} />
        {SECTION_PATHS.map((p) =>
          p.label ? (
            <text key={p.label.text} x={p.label.x} y={p.label.y} className={styles.intakeLabel}>
              {p.label.text}
            </text>
          ) : null,
        )}
      </svg>
      <p className={styles.formula}>
        <span className={styles.srOnly}>Hydropower: P equals rho times g times Q times H times eta; 9.5 megawatts installed at Toabunche.</span>
        <span aria-hidden="true" className={styles.formulaTokens}>
          {FORMULA.map((t, i) => (
            <FormulaToken key={i} progress={progress} token={t} index={i} />
          ))}
        </span>
        <motion.span aria-hidden="true" className={styles.formulaResult} style={{ opacity: result }}>
          = 9.5 MW <small>installed · Toabunche</small>
        </motion.span>
      </p>
    </div>
  );
}

export function IntakeScene() {
  return (
    <SceneSection
      station={stations[1]}
      sheet={2}
      title="It started with water and terrain."
      intro="Before software, I measured rivers, surveyed valleys, and sized plants. Hydrology taught me to design around the worst day on record, not the average one."
    >
      {(progress) => (
        <>
          <FlowLine progress={progress} variant="river" />
          <div className={styles.intakeGrid}>
            <div className={styles.civilList}>
              {civilProjects.map((project) => (
                <article key={project.title} className={styles.sheetCard}>
                  {project.figure !== "—" ? <Dimension value={project.figure} unit={project.unit} /> : null}
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <div className={styles.tags}>
                    {project.tools.map((tool) => (
                      <span key={tool}>{tool}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
            <IntakeVisual progress={progress} />
          </div>
        </>
      )}
    </SceneSection>
  );
}
