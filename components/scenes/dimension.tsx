"use client";

import { motion } from "framer-motion";
import styles from "./scenes.module.css";
import { useSafeReducedMotion } from "./use-safe-reduced-motion";

/** Engineering dimension line (arrow ─ value ─ arrow) that stretches out when it enters the viewport. */
export function Dimension({ value, unit, label }: { value: string; unit: string; label?: string }) {
  const reduced = useSafeReducedMotion();

  return (
    <div className={styles.dimension}>
      <motion.span
        className={styles.dimensionLine}
        aria-hidden="true"
        initial={reduced ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
      />
      <span className={styles.dimensionValue}>
        {value}
        {unit ? <small> {unit}</small> : null}
      </span>
      {label ? <span className={styles.dimensionLabel}>{label}</span> : null}
    </div>
  );
}
