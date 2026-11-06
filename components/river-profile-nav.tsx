"use client";

import { useEffect, useState } from "react";
import type { Station } from "@/lib/portfolio-data";
import styles from "./river-profile-nav.module.css";

/** Longitudinal river profile pinned to the right edge: one marker per station, the current one lit. */
export function RiverProfileNav({ stations }: { stations: Station[] }) {
  const [active, setActive] = useState(stations[0]?.id);

  useEffect(() => {
    // The current station is the last one whose top has passed the middle of the viewport.
    let frame = 0;
    const update = () => {
      frame = 0;
      const mid = window.innerHeight / 2;
      let current = stations[0]?.id;
      for (const s of stations) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= mid) current = s.id;
      }
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [stations]);

  const last = stations.length - 1;

  return (
    <nav className={styles.profile} aria-label="Stations">
      <svg className={styles.bed} viewBox="0 0 40 400" preserveAspectRatio="none" aria-hidden="true">
        <path d="M30 0 C 30 80, 14 120, 16 200 S 8 330, 10 400" />
      </svg>
      <ol>
        {stations.map((s, i) => (
          <li key={s.id} style={{ top: `${(i / last) * 100}%` }}>
            <a href={`#${s.id}`} className={s.id === active ? styles.active : undefined} aria-current={s.id === active ? "location" : undefined}>
              <span className={styles.dot} aria-hidden="true" />
              <span className={styles.label}>
                {s.code.replace("STA. ", "")} · {s.label}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
