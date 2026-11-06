"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import { bridgeTools, translations, type Translation } from "@/lib/portfolio-data";
import { FlowLine } from "./flow-line";
import { SceneSection } from "./scene-section";
import styles from "./scenes.module.css";

const ROW_START = 0.28;
const ROW_STEP = 0.06;

/** One civil concept passing through the transition and coming out as its data/AI counterpart. */
function TranslationRow({ row, index, progress }: { row: Translation; index: number; progress: MotionValue<number> }) {
  const start = ROW_START + index * ROW_STEP;
  const civil = useTransform(progress, [start, start + 0.04], [0.35, 1]);
  const flow = useTransform(progress, [start + 0.02, start + 0.08], [0, 1]);
  const ai = useTransform(progress, [start + 0.06, start + 0.1], [0, 1]);
  const aiShift = useTransform(progress, [start + 0.06, start + 0.1], [10, 0]);
  const gradientId = `transition-${index}`;

  return (
    <tr className={styles.translationRow}>
      <motion.th scope="row" className={styles.civilTerm} style={{ opacity: civil }}>
        {row.civil}
      </motion.th>
      <td className={styles.transitionCell} aria-hidden="true">
        <svg viewBox="0 0 120 24" preserveAspectRatio="none">
          <defs>
            <linearGradient id={gradientId} x1="0" x2="1">
              <stop offset="0" stopColor="var(--amber)" />
              <stop offset="1" stopColor="var(--cyan)" />
            </linearGradient>
          </defs>
          {/* Open channel narrowing into a closed conduit. */}
          <motion.path d="M2 3 L46 3 C 70 3, 74 9, 100 9 L118 9 M2 21 L46 21 C 70 21, 74 15, 100 15 L118 15" stroke={`url(#${gradientId})`} style={{ pathLength: flow }} />
        </svg>
      </td>
      <motion.td className={styles.aiTerm} style={{ opacity: ai, x: aiShift }}>
        {row.ai}
        <span className={styles.translationWhy}>{row.why}</span>
      </motion.td>
    </tr>
  );
}

export function TransitionScene() {
  return (
    <SceneSection
      stationId="transition"
      title="Transition: when engineering became code."
      intro="In hydraulics, a transition joins an open channel to a closed conduit without losing energy. Mine started when I began writing my own engineering in Python."
    >
      {(progress) => (
        <>
          <FlowLine progress={progress} variant="river" />
          <p className={styles.bridgeLabel}>First tools · engineering written as software</p>
          <div className={styles.bridgeTools}>
            {bridgeTools.map((tool) => (
              <article key={tool.title} className={styles.sheetCard}>
                <h3>{tool.title}</h3>
                <p>{tool.summary}</p>
                <p className={styles.outcome}>{tool.proof}</p>
                <div className={styles.tags}>
                  {tool.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <table className={styles.translationTable}>
            <caption>The same ideas, carried from water into data and AI</caption>
            <thead>
              <tr>
                <th scope="col">In civil engineering</th>
                <th scope="col">
                  <span className={styles.srOnly}>Transition</span>
                </th>
                <th scope="col">In data and AI</th>
              </tr>
            </thead>
            <tbody>
              {translations.map((row, i) => (
                <TranslationRow key={row.civil} row={row} index={i} progress={progress} />
              ))}
            </tbody>
          </table>
        </>
      )}
    </SceneSection>
  );
}
