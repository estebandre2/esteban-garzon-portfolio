"use client";

import { MotionValue, useMotionValue, useScroll } from "framer-motion";
import { CSSProperties, ReactNode, useRef } from "react";
import type { Station } from "@/lib/portfolio-data";
import styles from "./scenes.module.css";
import { useSafeReducedMotion } from "./use-safe-reduced-motion";

export const TOTAL_SHEETS = 8;

type SceneSectionProps = {
  station: Station;
  sheet: number;
  pinned?: boolean;
  heightVh?: number;
  title: string;
  intro?: string;
  children: (progress: MotionValue<number>, reduced: boolean) => ReactNode;
};

/**
 * One station of the watershed walk. Supplies scroll progress (0..1) to its scene.
 * Pinned scenes stick to the viewport while progress runs; reduced motion renders the final state.
 */
export function SceneSection({ station, sheet, pinned = false, heightVh = 220, title, intro, children }: SceneSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useSafeReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: pinned ? ["start start", "end end"] : ["start end", "end start"],
  });
  const complete = useMotionValue(1);
  const progress = reduced ? complete : scrollYProgress;
  const isPinned = pinned && !reduced;

  return (
    <section
      ref={ref}
      id={station.id}
      className={isPinned ? `${styles.scene} ${styles.pinnedScene}` : styles.scene}
      style={isPinned ? ({ "--pin-height": `${heightVh}vh` } as CSSProperties) : undefined}
      aria-labelledby={`${station.id}-title`}
    >
      <div className={isPinned ? styles.stickyStage : styles.stage}>
        <header className={styles.stationHeader}>
          <span className={styles.stationCode}>{station.code}</span>
          <span className={styles.stationRule} aria-hidden="true" />
          <span>{station.label}</span>
          <span className={styles.sheet}>
            Sheet {String(sheet).padStart(2, "0")} / {String(TOTAL_SHEETS).padStart(2, "0")}
          </span>
        </header>
        <div className={styles.sceneHeading}>
          <h2 id={`${station.id}-title`}>{title}</h2>
          {intro ? <p>{intro}</p> : null}
        </div>
        {children(progress, reduced)}
      </div>
    </section>
  );
}
