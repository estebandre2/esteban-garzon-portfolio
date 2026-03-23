"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import {
  codeLabSignals,
  codeLabTracks,
  codeSamples,
  profile,
  resources,
} from "@/lib/portfolio-data";
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
          <a href="/#resources">Resources</a>
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
          <h1>Selective code access, architecture context, and sanitized engineering proof.</h1>
          <p>
            This page intentionally exposes curated slices of the work rather than a
            full repository dump. The goal is to show engineering thinking,
            integration breadth, and problem-solving range without over-sharing
            operational details, credentials, or raw business data.
          </p>
        </motion.div>
      </section>

      <section className={styles.signalStrip}>
        {codeLabSignals.map((signal, index) => (
          <motion.article
            key={signal.label}
            className={styles.signalCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
          >
            <span>{signal.label}</span>
            <strong>{signal.value}</strong>
            <p>{signal.detail}</p>
          </motion.article>
        ))}
      </section>

      <section className={styles.trackGrid}>
        {codeLabTracks.map((track, index) => (
          <motion.article
            key={track.title}
            className={styles.trackCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
          >
            <h2>{track.title}</h2>
            <p>{track.summary}</p>
            <div className={styles.trackPoints}>
              {track.points.map((point) => (
                <div key={point} className={styles.trackPoint}>
                  {point}
                </div>
              ))}
            </div>
          </motion.article>
        ))}
      </section>

      <section className={styles.layout}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarTop}>
            <span className={styles.fileLabel}>Sample Index</span>
            <strong>{codeSamples.length} curated excerpts</strong>
          </div>

          {codeSamples.map((sample, index) => {
            const isActive = sample.id === activeSample.id;
            return (
              <button
                key={sample.id}
                type="button"
                className={`${styles.sampleButton} ${isActive ? styles.sampleButtonActive : ""}`}
                onClick={() => setActiveId(sample.id)}
              >
                <span className={styles.sampleIndex}>
                  {String(index + 1).padStart(2, "0")}
                </span>
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

      <section className={styles.resourceShelf}>
        <div className={styles.resourceHeading}>
          <span className={styles.eyebrow}>Public Bundles</span>
          <h2>Downloads that stay useful without exposing internals.</h2>
        </div>

        <div className={styles.resourceGrid}>
          {resources.map((resource, index) => (
            <motion.article
              key={resource.title}
              className={styles.resourceCard}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
            >
              <span className={styles.resourceTag}>{resource.tag}</span>
              <h3>{resource.title}</h3>
              <p>{resource.summary}</p>

              <div className={styles.resourcePoints}>
                {resource.points.map((point) => (
                  <div key={point} className={styles.resourcePoint}>
                    {point}
                  </div>
                ))}
              </div>

              <div className={styles.resourceActions}>
                <a href={resource.downloadHref}>Download package</a>
                {resource.repoHref ? (
                  <a href={resource.repoHref} target="_blank" rel="noreferrer">
                    Open repository
                  </a>
                ) : null}
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  );
}
