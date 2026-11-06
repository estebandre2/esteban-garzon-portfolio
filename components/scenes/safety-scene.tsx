"use client";

import { MotionValue, motion, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { safetyGuards, stations } from "@/lib/portfolio-data";
import { activeGuards, floodLevel } from "@/lib/scene-math";
import { FlowLine } from "./flow-line";
import { SceneSection } from "./scene-section";
import styles from "./scenes.module.css";

// Slider position 0..100 maps logarithmically onto return periods of 2..100 years.
const toYears = (s: number) => Math.round(2 * Math.pow(50, s / 100));
const toSlider = (years: number) => (Math.log(years / 2) / Math.log(50)) * 100;
const TICKS = [2, 10, 50, 100];

// Dam cross-section geometry (viewBox 0 0 320 220).
const BED = 200;
const LOW = 150; // water surface for the 2-year flood
const DESIGN = 70; // water surface for the 100-year design flood
const CREST = 46;

function DamPanel({ years, onChange, reduced }: { years: number; onChange: (years: number) => void; reduced: boolean }) {
  const surface = LOW - (LOW - DESIGN) * floodLevel(years);
  return (
    <div className={styles.safetyPanel}>
      <p className={styles.annotation}>Hydraulic structure</p>
      <svg viewBox="0 0 320 220" role="img" aria-label={`Dam cross-section with the reservoir at the ${years}-year flood level, below the design flood line and the crest`}>
        <motion.rect x="0" width="170" height={BED} className={styles.reservoir} animate={{ y: surface, height: BED - surface }} transition={{ type: "spring", stiffness: 90, damping: 18 }} />
        <motion.path
          className={reduced ? styles.waveStatic : styles.wave}
          d="M-40 0 q 10 -4 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0"
          animate={{ y: surface }}
          transition={{ type: "spring", stiffness: 90, damping: 18 }}
        />
        <path d={`M150 ${BED} L170 ${CREST} L200 ${CREST} L270 ${BED} Z`} className={styles.damBody} />
        <path d={`M0 ${DESIGN} L170 ${DESIGN}`} className={styles.designLine} />
        <text x="4" y={DESIGN - 6} className={styles.svgNote}>Design flood · T = 100 yr</text>
        <path d={`M178 ${CREST} L178 ${DESIGN}`} className={styles.freeboard} />
        <text x="184" y={(CREST + DESIGN) / 2 + 3} className={styles.svgNote}>Freeboard</text>
        <path d={`M0 ${BED} L320 ${BED}`} className={styles.intakeGround} />
      </svg>
      <label className={styles.sliderLabel} htmlFor="flood-slider">
        Flood return period: <strong>{years}-year</strong>
      </label>
      <input
        id="flood-slider"
        type="range"
        min={0}
        max={100}
        step={1}
        value={toSlider(years)}
        aria-valuetext={`${years}-year flood`}
        onChange={(e) => onChange(toYears(Number(e.target.value)))}
        className={styles.slider}
      />
      <div className={styles.ticks} aria-hidden="true">
        {TICKS.map((t) => (
          <span key={t} style={{ left: `${toSlider(t)}%` }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function AgentPanel({ risk, onChange }: { risk: number; onChange: (risk: number) => void }) {
  const closed = activeGuards(risk, safetyGuards);
  const riskLabel = risk < 0.25 ? "Low" : risk < 0.5 ? "Moderate" : risk < 0.75 ? "High" : "Critical";
  return (
    <div className={styles.safetyPanel}>
      <p className={styles.annotation}>AI system</p>
      <ul className={styles.gates}>
        {safetyGuards.map((guard) => {
          const isClosed = closed.includes(guard.id);
          return (
            <li key={guard.id} className={isClosed ? styles.gateClosed : styles.gate}>
              <span className={styles.gateFrame} aria-hidden="true">
                <motion.span className={styles.gateLeaf} animate={{ scaleY: isClosed ? 1 : 0.12 }} transition={{ type: "spring", stiffness: 260, damping: 18 }} />
              </span>
              <span>
                <strong>{guard.title}</strong>
                <span className={styles.gateDetail}>{guard.detail}</span>
              </span>
              <span className={styles.gateState}>{isClosed ? "Closed" : "Open"}</span>
            </li>
          );
        })}
      </ul>
      <label className={styles.sliderLabel} htmlFor="risk-slider">
        Cost of a wrong answer: <strong>{riskLabel}</strong>
      </label>
      <input
        id="risk-slider"
        type="range"
        min={0}
        max={100}
        step={1}
        value={Math.round(risk * 100)}
        aria-valuetext={`${riskLabel} risk, ${closed.length} of ${safetyGuards.length} guards closed`}
        onChange={(e) => onChange(Number(e.target.value) / 100)}
        className={styles.slider}
      />
    </div>
  );
}

function SafetyControls({ progress, reduced }: { progress: MotionValue<number>; reduced: boolean }) {
  // Scroll drives both sliders until the visitor takes over one of them.
  const [years, setYears] = useState(reduced ? 100 : 2);
  const [risk, setRisk] = useState(reduced ? 1 : 0);
  const [touched, setTouched] = useState({ years: false, risk: false });

  useMotionValueEvent(progress, "change", (p) => {
    const driven = Math.min(1, Math.max(0, (p - 0.1) / 0.75));
    if (!touched.years) setYears(toYears(driven * 100));
    if (!touched.risk) setRisk(Math.round(driven * 100) / 100);
  });

  return (
    <div className={styles.safetyGrid}>
      <DamPanel
        years={years}
        reduced={reduced}
        onChange={(y) => {
          setTouched((t) => ({ ...t, years: true }));
          setYears(y);
        }}
      />
      <AgentPanel
        risk={risk}
        onChange={(r) => {
          setTouched((t) => ({ ...t, risk: true }));
          setRisk(r);
        }}
      />
    </div>
  );
}

export function SafetyScene() {
  return (
    <SceneSection
      station={stations[4]}
      sheet={5}
      pinned
      heightVh={210}
      title="Safety factor: design for the flood, not the average day."
      intro="A dam is sized for the 100-year flood and still keeps freeboard. I size AI systems the same way: the more a wrong answer costs, the more gates close."
    >
      {(progress, reduced) => (
        <>
          <FlowLine progress={progress} variant="pipe" />
          <SafetyControls progress={progress} reduced={reduced} />
          <p className={styles.closingLine}>I design software with the same discipline used to design a dam.</p>
        </>
      )}
    </SceneSection>
  );
}
