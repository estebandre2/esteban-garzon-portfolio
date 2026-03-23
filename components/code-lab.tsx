"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { codeSamples, profile } from "@/lib/portfolio-data";
import styles from "./code-lab.module.css";

export function CodeLab() {
  const [activeId, setActiveId] = useState(codeSamples[0]?.id ?? "");

  const activeSample = useMemo(
    () => codeSamples.find((sample) => sample.id === activeId) ?? codeSamples[0],
    [activeId]
  );

  return (
    <main className={styles.page}>
      <div className={styles.backdrop} />

      <header className={styles.header}>
        <a href="/" className={styles.brand}>
          {profile.name}
        </a>

        <div className={styles.headerLinks}>
          <a href="/">Home</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
      </header>

      <section className={styles.hero}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.eyebrow}>Code Lab</span>
          <h1>Selective code access, architecture context, and implementation notes.</h1>
          <p>
            This page intentionally exposes curated slices of the work rather than a
            full repository dump. The goal is to show engineering thinking,
            structure, and problem-solving without over-sharing operational details.
          </p>
        </motion.div>
      </section>

      <section className={styles.layout}>
        <aside className={styles.sidebar}>
          {codeSamples.map((sample, index) => {
            const isActive = sample.id === activeSample.id;
            return (
              <button
                key={sample.id}
                type="button"
                className={`${styles.sampleButton} ${isActive ? styles.sampleButtonActive : ""}`}
                onClick={() => setActiveId(sample.id)}
              >
                <span className={styles.sampleIndex}>0{index + 1}</span>
                <strong>{sample.title}</strong>
                <small>{sample.category}</small>
              </button>
            );
          })}
        </aside>

        <motion.section
          key={activeSample.id}
          className={styles.viewer}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className={styles.viewerMeta}>
            <div>
              <span className={styles.fileLabel}>Source</span>
              <h2>{activeSample.title}</h2>
              <p>{activeSample.summary}</p>
            </div>
            <div className={styles.filePill}>{activeSample.file}</div>
          </div>

          <div className={styles.notesGrid}>
            {activeSample.notes.map((note) => (
              <div key={note} className={styles.noteCard}>
                {note}
              </div>
            ))}
          </div>

          <div className={styles.codeFrame}>
            <div className={styles.codeTop}>
              <span />
              <span />
              <span />
              <strong>Read-only excerpt</strong>
            </div>
            <pre className={styles.codeBlock}>
              <code>{activeSample.snippet}</code>
            </pre>
          </div>
        </motion.section>
      </section>
    </main>
  );
}
