import type { ReactNode } from "react";
import { featuredStudy } from "@/lib/research";
import styles from "./research.module.css";

/** Landing band directly under the hero: the latest study and its three key numbers in a ruled strip. */
export function FeaturedResearch({ actions }: { actions: ReactNode }) {
  return (
    <section id="research" className={styles.band} aria-labelledby="featured-research-title">
      <div className={styles.bandTop}>
        <div>
          <p className={`${styles.kicker} ${styles.bandKicker}`}>Latest research · Pre-registered · {featuredStudy.date}</p>
          <h2 id="featured-research-title" className={styles.bandTitle}>
            Will an AI sign off on an unsafe dam?
          </h2>
        </div>
        <div className={styles.bandText}>
          <p>
            Language models do not cave to pressure on hydraulic checks, but they can write a fluent, wrong
            calculation, and whether they do depends on a setting the user may not see. {featuredStudy.shortTitle}{" "}
            measures what catches it.
          </p>
          <div className={styles.actions}>{actions}</div>
        </div>
      </div>

      <dl className={styles.numbers}>
        {featuredStudy.keyNumbers.map((n) => (
          <div key={n.label} className={styles.number}>
            <dt>{n.value}</dt>
            <dd>
              {n.label}
              <small>{n.detail}</small>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
