import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ContourBackdrop } from "@/components/contour-backdrop";
import { SiteHeader } from "@/components/site-header";
import styles from "@/components/code-lab.module.css";
import r from "@/components/research.module.css";
import { researchStudies } from "@/lib/research";
import { SITE_URL, citationMeta, pageSocial, serializeJsonLd } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const findStudy = (slug: string) => researchStudies.find((s) => s.slug === slug);
const external = (href: string) => href.startsWith("http");

export function generateStaticParams() {
  return researchStudies.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const study = findStudy((await params).slug);
  if (!study) return {};

  const path = `/research/${study.slug}`;
  const image = `${path}/opengraph-image`;
  const social = pageSocial(study.seoTitle, study.seoDescription, path);
  return {
    title: study.seoTitle,
    description: study.seoDescription,
    alternates: { canonical: path },
    ...social,
    openGraph: {
      ...social.openGraph,
      type: "article",
      publishedTime: study.published,
      modifiedTime: study.modified,
      images: [{ url: image, width: 1200, height: 630, alt: study.title }],
    },
    twitter: { ...social.twitter, images: [image] },
    other: citationMeta(study),
  };
}

export default async function StudyPage({ params }: PageProps) {
  const study = findStudy((await params).slug);
  if (!study) notFound();

  const index = researchStudies.indexOf(study);
  const next = researchStudies[(index + 1) % researchStudies.length];
  const [paper, ...extraDocs] = study.documents;
  const repo = study.links.find((l) => l.href.includes("github.com") && !l.href.includes("/blob/"));
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    "@id": `${SITE_URL}/research/${study.slug}#article`,
    headline: study.title,
    abstract: study.summary,
    datePublished: study.published,
    dateModified: study.modified,
    url: `${SITE_URL}/research/${study.slug}`,
    image: `${SITE_URL}${study.figure.src}`,
    author: { "@id": `${SITE_URL}/#person`, "@type": "Person", name: "Esteban Garzon", url: SITE_URL },
    encoding: study.documents.map((d) => ({ "@type": "MediaObject", contentUrl: `${SITE_URL}${d.href}`, encodingFormat: "application/pdf" })),
    isBasedOn: repo?.href,
    identifier: { "@type": "PropertyValue", propertyID: "DOI", value: study.doi },
    sameAs: `https://doi.org/${study.doi}`,
  };

  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(articleLd) }} />
      <ContourBackdrop className={styles.backdrop} />
      <SiteHeader />

      <article className={r.wrap}>
        <section className={r.hero} aria-labelledby="study-title">
          <div className={r.heroText}>
            <p className={r.kicker}>{study.tag}</p>
            <h1 id="study-title" className={r.title}>
              {study.title}
            </h1>
            <p className={r.meta}>Esteban Garzon · {study.date}</p>
            <p className={r.lead}>{study.question}</p>
            <div className={r.actions}>
              <a className={r.btn} href={paper.href}>
                Download the paper
              </a>
              {repo ? (
                <a className={r.btnGhost} href={repo.href} target="_blank" rel="noreferrer">
                  Open the code ↗<span className={r.srOnly}> (opens in a new tab)</span>
                </a>
              ) : null}
            </div>
          </div>

          <figure className={`${r.figure} ${r.heroFigure}`}>
            <Image
              src={study.figure.src}
              alt={study.figure.alt}
              width={study.figure.width}
              height={study.figure.height}
              sizes="(max-width: 1023px) 100vw, 700px"
              priority
            />
          </figure>
        </section>

        {study.correction ? (
          <p className={r.correction} role="note">
            {study.correction}
          </p>
        ) : null}

        <dl className={r.datasheet} aria-label="Study details">
          {study.facts.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>

        <section className={r.section} aria-labelledby="results-title">
          <div className={r.sectionHead}>
            <div>
              <p className={r.kicker}>Results</p>
              <h2 id="results-title" className={r.h2}>
                Key numbers
              </h2>
            </div>
            <p className={r.sectionLead}>{study.summary}</p>
          </div>
          <dl className={r.numbers}>
            {study.keyNumbers.map((n) => (
              <div key={n.label} className={r.number}>
                <dt>{n.value}</dt>
                <dd>
                  {n.label}
                  <small>{n.detail}</small>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className={r.section} aria-labelledby="findings-title">
          <div className={r.sectionHead}>
            <div>
              <p className={r.kicker}>Findings</p>
              <h2 id="findings-title" className={r.h2}>
                What the data shows
              </h2>
            </div>
          </div>
          <ol className={r.findings}>
            {study.findings.map((f, i) => (
              <li key={f.title} className={r.finding}>
                <span className={r.findingIndex}>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{f.title}</h3>
                  <p>{f.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className={r.section} aria-labelledby="takeaway-title">
          <h2 className={r.kicker} id="takeaway-title">
            Why it matters
          </h2>
          <p className={r.takeaway}>{study.takeaway}</p>
        </section>

        <section className={r.section} aria-labelledby="method-title">
          <div className={r.sectionHead}>
            <div>
              <p className={r.kicker}>Method</p>
              <h2 id="method-title" className={r.h2}>
                Design and limitations
              </h2>
            </div>
          </div>
          <div className={r.columns}>
            <div>
              <h3 className={r.columnTitle}>How it was measured</h3>
              <ul className={r.ruled}>
                {study.design.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className={r.columnTitle}>What it does not show</h3>
              <ul className={r.ruled}>
                {study.limitations.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <h3 className={`${r.columnTitle} ${r.columnTitleSpaced}`}>Files</h3>
              <ul className={r.ruled}>
                {[...extraDocs, ...study.links].map((l) => (
                  <li key={l.href}>
                    <a className={r.textLink} href={l.href} {...(external(l.href) ? { target: "_blank", rel: "noreferrer" } : {})}>
                      {l.label}
                      {external(l.href) ? <span className={r.srOnly}> (opens in a new tab)</span> : null}
                    </a>
                    {" · "}
                    {l.note}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <nav className={r.pager} aria-label="More research">
          <a className={r.textLink} href="/research">
            ← All research
          </a>
          <a className={r.textLink} href={`/research/${next.slug}`}>
            {next.shortTitle} →
          </a>
        </nav>
      </article>
    </main>
  );
}
