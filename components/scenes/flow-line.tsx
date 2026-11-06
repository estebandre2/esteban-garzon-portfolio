"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import { FLOW_X } from "@/lib/scene-math";
import styles from "./scenes.module.css";

export type FlowVariant = "river" | "pipe" | "bundle" | "cable";

// Paths in a 1000 x 1000 box stretched over the whole section. Every variant enters and leaves at FLOW_X.
const X = FLOW_X * 1000;
const PATHS: Record<FlowVariant, string[]> = {
  river: [`M${X} 0 C ${X + 60} 250, ${X - 70} 520, ${X + 20} 760 S ${X} 940, ${X} 1000`],
  pipe: [`M${X} 0 L${X} 1000`],
  bundle: [-36, -12, 12, 36].map(
    (dx) => `M${X} 0 L${X} 200 C ${X} 300, ${X + dx * 3} 320, ${X + dx * 3} 420 L${X + dx * 3} 640 C ${X + dx * 3} 740, ${X} 760, ${X} 860 L${X} 1000`,
  ),
  cable: [`M${X} 0 L${X} 1000`],
};

export function FlowLine({ progress, variant }: { progress: MotionValue<number>; variant: FlowVariant }) {
  const drawn = useTransform(progress, [0.05, 0.75], [0, 1]);
  const pulse = useTransform(progress, [0, 1], [0, -600]);
  const paths = PATHS[variant];

  return (
    <svg className={styles.flowLine} viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
      {paths.map((d) => (
        <path key={`axis-${d}`} d={d} className={styles.flowAxis} vectorEffect="non-scaling-stroke" />
      ))}
      {paths.map((d) => (
        <motion.path
          key={`water-${d}`}
          d={d}
          className={variant === "pipe" ? styles.flowPipe : styles.flowWater}
          style={{ pathLength: drawn }}
          vectorEffect="non-scaling-stroke"
        />
      ))}
      {variant !== "river"
        ? paths.map((d) => (
            <motion.path
              key={`pulse-${d}`}
              d={d}
              className={styles.flowPulse}
              style={{ strokeDashoffset: pulse }}
              vectorEffect="non-scaling-stroke"
            />
          ))
        : null}
    </svg>
  );
}
