"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { analyticsFeatured, resources } from "@/lib/portfolio-data";
import { FlowLine } from "./flow-line";
import { SceneSection } from "./scene-section";
import styles from "./scenes.module.css";

const FEATURED = analyticsFeatured.slice(0, 4);
const READINGS = [...FEATURED.map((p) => p.tag), ...resources.map((r) => r.tag)];
const TICKS = Array.from({ length: 11 }, (_, i) => i);

/** Staff gauge: the water level rises to the reading of the card currently in view. */
function StaffGauge({ level, label }: { level: number; label: string }) {
  return (
    <div className={styles.gauge} aria-hidden="true">
      <div className={styles.gaugeStaff}>
        {TICKS.map((t) => (
          <span key={t} style={{ bottom: `${t * 10}%` }}>
            {t % 2 === 0 ? `${(t / 2).toFixed(0)} m` : ""}
          </span>
        ))}
        <motion.div className={styles.gaugeWater} animate={{ height: `${level * 100}%` }} transition={{ type: "spring", stiffness: 70, damping: 16 }} />
      </div>
      <p className={styles.gaugeReading}>
        Reading
        <strong>{(level * 5).toFixed(1)} m</strong>
        {label}
      </p>
    </div>
  );
}

export function GaugingScene() {
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

  const level = (active + 1) / READINGS.length;

  return (
    <SceneSection
      stationId="gauging"
      title="Gauging station: measuring before deciding."
      intro="A gauging station turns a river into numbers you can trust. This is the analytics work: forecasting, evaluation, and reports built to be checked."
    >
      {(progress) => (
        <>
          <FlowLine progress={progress} variant="river" />
          <div className={styles.gaugingGrid}>
            <StaffGauge level={level} label={READINGS[active] ?? ""} />
            <div ref={listRef} className={styles.civilList}>
              {FEATURED.map((project, i) => (
                <article key={project.title} className={`${styles.sheetCard} ${i === active ? styles.cardActive : ""}`}>
                  <span className={styles.annotation}>{project.tag}</span>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <p className={styles.outcome}>{project.outcome}</p>
                  <a
                    className={styles.textLink}
                    href={project.href}
                    target={project.href.startsWith("http") || project.href.endsWith(".pdf") ? "_blank" : undefined}
                    rel="noreferrer"
                  >
                    {project.hrefLabel} →
                  </a>
                </article>
              ))}
              {resources.map((resource, i) => (
                <article
                  key={resource.title}
                  className={`${styles.sheetCard} ${FEATURED.length + i === active ? styles.cardActive : ""}`}
                >
                  <span className={styles.annotation}>{resource.tag}</span>
                  <h3>{resource.title}</h3>
                  <p>{resource.summary}</p>
                  <div className={styles.linkRow}>
                    <a className={styles.textLink} href={resource.downloadHref}>
                      Download source →
                    </a>
                    {resource.repoHref ? (
                      <a className={styles.textLink} href={resource.repoHref} target="_blank" rel="noreferrer">
                        Repository →
                      </a>
                    ) : null}
                  </div>
                </article>
              ))}
              <div className={styles.linkRow}>
                <a className={styles.labLink} href="/analytics">
                  Open Analytics Lab
                </a>
                <a className={styles.labLink} href="/code">
                  Open Code Lab
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </SceneSection>
  );
}
