import type { Metadata } from "next";
import Image from "next/image";
import { ContourBackdrop } from "@/components/contour-backdrop";
import { SiteHeader } from "@/components/site-header";
import styles from "@/components/code-lab.module.css";
import r from "@/components/research.module.css";
import { featuredStudy, researchEntries } from "@/lib/research";
import { pageSocial } from "@/lib/seo";

const title = "Research | Esteban Garzon";
const description =
  "Pre-registered AI-safety studies on whether language models sign off on unsafe hydraulic designs, plus an M.Sc. forecasting thesis and a real-time structural-break model.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/research",
  },
  ...pageSocial(title, description, "/research"),
};

export default function ResearchPage() {
  return (
    <main className={styles.page}>
      <ContourBackdrop className={styles.backdrop} />
      <SiteHeader />

      <div className={r.wrap}>
        <section className={r.hero} aria-labelledby="research-title">
          <div className={r.heroText}>
            <p className={r.kicker}>Research</p>
            <h1 id="research-title" className={r.title}>
              Testing AI where a wrong number has consequences.
            </h1>
            <p className={r.lead}>
              Language models review dam, gate and pipeline calculations with code-computed ground truth. The
              hypotheses and analysis are fixed before the first trial; every number traces to public code and data.
            </p>
            <div className={r.actions}>
              <a className={r.btn} href={`/research/${featuredStudy.slug}`}>
                Read {featuredStudy.shortTitle}
              </a>
              <a className={r.btnGhost} href={featuredStudy.documents[0].href}>
                Download the paper
              </a>
            </div>
          </div>

          <figure className={`${r.figure} ${r.heroFigure}`}>
            <Image
              src={featuredStudy.figure.src}
              alt={featuredStudy.figure.alt}
              width={featuredStudy.figure.width}
              height={featuredStudy.figure.height}
              sizes="(max-width: 1023px) 100vw, 700px"
              priority
            />
          </figure>
        </section>

        <section className={r.section} aria-labelledby="studies-title">
          <div className={r.sectionHead}>
            <div>
              <p className={r.kicker}>Index</p>
              <h2 id="studies-title" className={r.h2}>
                Studies and models
              </h2>
            </div>
            <p className={r.sectionLead}>
              Two AI-safety studies with their papers, code and pre-registration, then the forecasting thesis and the
              competition model that came before them.
            </p>
          </div>

          <ol className={r.list}>
            {researchEntries.map((entry, i) => (
              <li key={entry.href} className={r.row}>
                <span className={r.rowIndex}>{String(i + 1).padStart(2, "0")}</span>
                <div className={r.rowMeta}>
                  <strong>{entry.tag}</strong>
                  <span>{entry.date}</span>
                </div>
                <div className={r.rowBody}>
                  <h3 className={r.rowTitle}>
                    <a href={entry.href}>{entry.title}</a>
                  </h3>
                  <p className={r.rowSummary}>{entry.summary}</p>
                </div>
                <div className={r.rowLinks}>
                  <span aria-hidden="true">{entry.hrefLabel} →</span>
                  {entry.repo ? (
                    <a href={entry.repo} target="_blank" rel="noreferrer">
                      Code on GitHub ↗<span className={r.srOnly}> (opens in a new tab)</span>
                    </a>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </main>
  );
}
