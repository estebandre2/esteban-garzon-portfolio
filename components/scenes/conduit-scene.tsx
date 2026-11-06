"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { projects, stations, techStack } from "@/lib/portfolio-data";
import { FlowLine } from "./flow-line";
import { SceneSection } from "./scene-section";
import styles from "./scenes.module.css";

// Manifold: one penstock splits into a branch per pipeline; pulses are records moving through it.
const TRUNK = "M200 0 L200 80";
const BRANCHES = [
  "M200 80 C 200 120, 80 110, 80 160",
  "M200 80 C 200 150, 320 170, 320 230",
  "M200 80 C 200 200, 80 240, 80 300",
  "M200 80 C 200 260, 320 310, 320 370",
];
const NODES = [
  [80, 160],
  [320, 230],
  [80, 300],
  [320, 370],
];

function Manifold({ progress, active }: { progress: MotionValue<number>; active: number }) {
  const drawn = useTransform(progress, [0.15, 0.45], [0, 1]);
  const pulse = useTransform(progress, [0, 1], [0, -900]);

  return (
    <div className={styles.manifold}>
      <svg viewBox="0 0 400 420" aria-hidden="true">
        <motion.path d={TRUNK} className={styles.pipeShell} style={{ pathLength: drawn }} />
        {BRANCHES.map((d) => (
          <motion.path key={d} d={d} className={styles.pipeShell} style={{ pathLength: drawn }} />
        ))}
        {[TRUNK, ...BRANCHES].map((d) => (
          <motion.path key={`p-${d}`} d={d} className={styles.pipePulse} style={{ strokeDashoffset: pulse }} />
        ))}
        {NODES.map(([x, y], i) => (
          <g key={i} className={i === active ? styles.nodeActive : styles.node}>
            <circle cx={x} cy={y} r={9} />
            <text x={x} y={y + 28} textAnchor="middle">
              {projects[i]?.tag}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export function ConduitScene() {
  const listRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const cards = Array.from(listRef.current?.querySelectorAll("article") ?? []);
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) setActive(cards.indexOf(hit.target as HTMLElement));
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return (
    <SceneSection
      station={stations[2]}
      sheet={3}
      title="Then the river became a pipeline."
      intro="The same discipline, moved into data: capture every source, keep the flow clean, and make sure nothing reaches a decision without being checked first."
    >
      {(progress) => (
        <>
          <FlowLine progress={progress} variant="pipe" />
          <ul className={styles.stackRow} aria-label="Core stack">
            {techStack.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <div className={styles.intakeGrid}>
            <div ref={listRef} className={styles.civilList}>
              {projects.map((project, i) => (
                <article key={project.title} className={`${styles.sheetCard} ${i === active ? styles.cardActive : ""}`}>
                  <span className={styles.annotation}>
                    Line {String(i + 1).padStart(2, "0")} · {project.tag}
                  </span>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <p className={styles.outcome}>{project.outcome}</p>
                  <div className={styles.tags}>
                    {project.stack.map((tool) => (
                      <span key={tool}>{tool}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
            <Manifold progress={progress} active={active} />
          </div>
        </>
      )}
    </SceneSection>
  );
}
