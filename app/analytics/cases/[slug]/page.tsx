import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { analyticsCaseStudies } from "@/lib/portfolio-data";
import styles from "@/components/code-lab.module.css";
import { ContourBackdrop } from "@/components/contour-backdrop";
import { pageSocial } from "@/lib/seo";
import { SiteHeader } from "@/components/site-header";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return Object.keys(analyticsCaseStudies).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = analyticsCaseStudies[slug];

  if (!study) {
    return {
      title: "Analytics Case | Esteban Garzon",
    };
  }

  const title = `${study.title} | Esteban Garzon`;
  const path = `/analytics/cases/${study.slug}`;

  return {
    title,
    description: study.summary,
    alternates: {
      canonical: path,
    },
    ...pageSocial(title, study.summary, path),
  };
}

export default async function AnalyticsCasePage({ params }: PageProps) {
  const { slug } = await params;
  const study = analyticsCaseStudies[slug];

  if (!study) {
    notFound();
  }

  return (
    <main className={styles.page}>
      <ContourBackdrop className={styles.backdrop} />

      <SiteHeader />

      <section className={styles.hero}>
        <span className={styles.eyebrow}>{study.tag}</span>
        <h1>{study.title}</h1>
        <p>{study.summary}</p>
      </section>

      <section className={styles.dualSection}>
        <article className={styles.panelCard}>
          <div className={styles.panelHeading}>
            <span className={styles.eyebrow}>Overview</span>
            <h2>Why this case matters in the portfolio.</h2>
          </div>
          <div className={styles.requirementGrid}>
            <div className={styles.requirementCard}>
              <strong>Portfolio framing</strong>
              <p>{study.overview}</p>
            </div>
          </div>
        </article>

        <article className={styles.panelCard}>
          <div className={styles.panelHeading}>
            <span className={styles.eyebrow}>What It Shows</span>
            <h2>Signals this case adds to the analytics layer.</h2>
          </div>
          <div className={styles.workflowList}>
            {study.whatItShows.map((item, index) => (
              <div key={item} className={styles.workflowItem}>
                <span>{`0${index + 1}`.slice(-2)}</span>
                <div>
                  <strong>Capability signal</strong>
                  <p>{item}</p>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className={styles.resourceShelf}>
        <div className={styles.resourceHeading}>
          <span className={styles.eyebrow}>Focus Areas</span>
          <h2>A concise brief instead of a missing raw file.</h2>
          <p>
            This portfolio page preserves the original analytics item while presenting it in
            a cleaner, public-facing format that is easier to browse and safer to publish.
          </p>
        </div>

        <div className={styles.resourceGrid}>
          <article className={styles.resourceCard}>
            <span className={styles.resourceTag}>Focus</span>
            <h3>Core themes</h3>
            <div className={styles.resourcePoints}>
              {study.focusAreas.map((item) => (
                <div key={item} className={styles.resourcePoint}>
                  {item}
                </div>
              ))}
            </div>
          </article>

          <article className={styles.resourceCard}>
            <span className={styles.resourceTag}>Deliverables</span>
            <h3>What this artifact contributes</h3>
            <div className={styles.resourcePoints}>
              {study.deliverables.map((item) => (
                <div key={item} className={styles.resourcePoint}>
                  {item}
                </div>
              ))}
            </div>

            <div className={styles.resourceActions}>
              <a href="/analytics">Back to analytics archive</a>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
