"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import { aiSystems, stations } from "@/lib/portfolio-data";
import { FlowLine } from "./flow-line";
import { HypothesisCanvas } from "./hypothesis-canvas";
import { SceneSection } from "./scene-section";
import styles from "./scenes.module.css";

const BLADES = Array.from({ length: 8 }, (_, i) => i * 45);

function Turbine({ progress, reduced }: { progress: MotionValue<number>; reduced: boolean }) {
  // Scroll drives the runner, so it spins faster the faster you scroll.
  const rotate = useTransform(progress, [0, 1], [0, 1080]);
  return (
    <svg className={styles.turbine} viewBox="-60 -60 120 120" aria-hidden="true">
      <circle r="54" className={styles.turbineCasing} />
      <g className={reduced ? undefined : styles.turbineIdle}>
        <motion.g style={{ rotate }}>
          {BLADES.map((deg) => (
            <path key={deg} d="M0 -8 C 14 -20, 22 -34, 12 -48" transform={`rotate(${deg})`} className={styles.turbineBlade} />
          ))}
          <circle r="9" className={styles.turbineHub} />
        </motion.g>
      </g>
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" className={styles.lock}>
      <rect x="3" y="7" width="10" height="7" rx="1" />
      <path d="M5 7 V5 a3 3 0 0 1 6 0 V7" />
    </svg>
  );
}

export function PowerhouseScene() {
  return (
    <SceneSection
      station={stations[3]}
      sheet={4}
      title="The powerhouse: AI systems that have to tell the truth."
      intro="Agents generate energy only if what they report is real. Every system below ships with the guardrail that keeps it honest."
    >
      {(progress, reduced) => (
        <>
          <FlowLine progress={progress} variant="cable" />
          <div className={styles.intakeGrid}>
            <div className={styles.civilList}>
              {aiSystems.map((system) => (
                <article key={system.title} className={styles.sheetCard}>
                  <span className={styles.annotation}>{system.context}</span>
                  <h3>{system.title}</h3>
                  <p>{system.summary}</p>
                  <p className={styles.guardrail}>
                    <LockIcon />
                    <span>{system.guardrail}</span>
                  </p>
                  <div className={styles.tags}>
                    {system.stack.map((tool) => (
                      <span key={tool}>{tool}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
            <div className={styles.powerhouseVisual}>
              <div className={styles.turbineRow}>
                <Turbine progress={progress} reduced={reduced} />
                <p className={styles.annotation}>
                  Discovery agent
                  <br />
                  one run, live
                </p>
              </div>
              <HypothesisCanvas progress={progress} reduced={reduced} seed={2026} />
            </div>
          </div>
        </>
      )}
    </SceneSection>
  );
}
