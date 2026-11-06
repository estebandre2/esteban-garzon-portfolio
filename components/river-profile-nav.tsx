"use client";

import { useEffect, useState } from "react";
import type { Station } from "@/lib/portfolio-data";
import styles from "./river-profile-nav.module.css";

/** Longitudinal river profile pinned to the right edge: one marker per station, the current one lit. */
export function RiverProfileNav({ stations }: { stations: Station[] }) {
  const [active, setActive] = useState(stations[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id as Station["id"]);
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    stations.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
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
