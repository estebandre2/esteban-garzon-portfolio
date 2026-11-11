import {
  aiSystems,
  analyticsCaseStudies,
  analyticsFeatured,
  careerEvents,
  civilProjects,
  profile,
  techStack,
} from "./portfolio-data.ts";
import { researchStudies, type ResearchStudy } from "./research.ts";

export const SITE_URL = "https://www.estebangarzon.com";
export const GITHUB_URL = "https://github.com/estebandre2";
export const SITE_DESCRIPTION =
  "Civil engineer turned CTO: pre-registered AI-safety research on LLMs checking hydraulic designs, plus data pipelines and AI systems built for the flood.";

export const SITE_TITLE = "Esteban Garzon | AI Safety Research & Civil Engineering";
export const RESEARCH_TITLE = "AI Safety Research on Engineering Checks | Esteban Garzon";
export const RESEARCH_DESCRIPTION =
  "Pre-registered AI-safety studies of LLMs checking hydraulic designs, with papers, code and data, plus an M.Sc. forecasting thesis.";

// Next replaces a parent's openGraph object instead of merging it, so every page spreads this base.
export const baseOpenGraph = {
  siteName: "Esteban Garzon",
  locale: "en_US",
  type: "website" as const,
};

export function pageSocial(title: string, description: string, path: string) {
  return {
    // A page-level openGraph drops the root file-based image, so it is set again here.
    openGraph: { ...baseOpenGraph, title, description, url: path, images: ["/opengraph-image"] },
    twitter: { card: "summary_large_image" as const, title, description, images: ["/twitter-image"] },
  };
}

// Highwire tags that Google Scholar reads on a paper's landing page.
export function citationMeta(study: ResearchStudy) {
  return {
    citation_title: study.title,
    citation_author: "Garzon, Esteban",
    citation_publication_date: study.published.replaceAll("-", "/"),
    citation_pdf_url: `${SITE_URL}${study.documents[0].href}`,
    citation_doi: study.doi,
    citation_abstract_html_url: `${SITE_URL}/research/${study.slug}`,
    citation_language: "en",
  };
}

const abs = (path: string) => (path.startsWith("http") ? path : `${SITE_URL}${path}`);

// JSON inside <script> must not contain "<", or a string could close the tag.
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function personJsonLd() {
  const current = careerEvents
    .filter((e) => e.end === null && e.kind !== "education")
    .sort((a, b) => b.start.localeCompare(a.start))[0];
  const schools = [...new Set(careerEvents.filter((e) => e.kind === "education").map((e) => e.org))];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: profile.name,
        url: SITE_URL,
        image: `${SITE_URL}/opengraph-image`,
        jobTitle: current?.title ?? profile.role,
        description: profile.heroText,
        email: `mailto:${profile.email}`,
        address: { "@type": "PostalAddress", addressLocality: "Quito", addressCountry: "EC" },
        worksFor: { "@type": "Organization", name: current?.org ?? "BynD Bits" },
        alumniOf: schools.map((name) => ({ "@type": "CollegeOrUniversity", name })),
        knowsAbout: [
          "Hydrology",
          "Hydropower",
          "Solar energy",
          "Data engineering",
          "AI agents",
          "AI safety",
          "LLM evaluation",
          "Pre-registration",
          ...techStack,
        ],
        sameAs: [profile.linkedin, GITHUB_URL],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: profile.name,
        description: SITE_DESCRIPTION,
        inLanguage: "en",
        publisher: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profile`,
        url: SITE_URL,
        name: `${profile.name} | ${profile.role}`,
        mainEntity: { "@id": `${SITE_URL}/#person` },
        isPartOf: { "@id": `${SITE_URL}/#website` },
      },
      ...researchStudies.map((study) => ({
        "@type": "ScholarlyArticle",
        "@id": `${SITE_URL}/research/${study.slug}#article`,
        headline: study.title,
        url: `${SITE_URL}/research/${study.slug}`,
        datePublished: study.published,
        author: { "@id": `${SITE_URL}/#person` },
      })),
    ],
  };
}

// llms.txt (https://llmstxt.org): a Markdown summary for language models, generated from the same data as the site.
export function buildLlmsTxt(): string {
  const career = [...careerEvents]
    .sort((a, b) => b.start.localeCompare(a.start))
    .map((e) => `- ${e.title}, ${e.org} (${e.start} to ${e.end ?? "present"}): ${e.summary}`);
  const research = researchStudies.map(
    (s) =>
      `- [${s.title}](${SITE_URL}/research/${s.slug}) (${s.date}; [PDF](${SITE_URL}${s.documents[0].href})): ${s.summary} ${s.takeaway}`,
  );
  const civil = civilProjects.map((p) =>
    p.unit === "MW" ? `- ${p.title} (${p.figure} MW): ${p.summary}` : `- ${p.title}: ${p.summary}`,
  );
  const ai = aiSystems.map((s) => `- ${s.title}: ${s.summary} Guardrail: ${s.guardrail}`);
  const featured = analyticsFeatured.map((p) => `- [${p.title}](${abs(p.href)}): ${p.summary}`);
  const cases = Object.values(analyticsCaseStudies).map(
    (c) => `- [${c.title}](${SITE_URL}/analytics/cases/${c.slug}): ${c.summary}`,
  );

  return [
    `# ${profile.name}`,
    "",
    `> ${profile.role}. ${profile.heroText}`,
    "",
    `${profile.heroEyebrow}. Based in Quito, Ecuador. Design rule: build for the flood, not for the average day.`,
    "",
    "## Pages",
    "",
    `- [Portfolio](${SITE_URL}/): engineering, data, AI systems, AI safety, and career`,
    `- [Research](${SITE_URL}/research): AI-safety studies, the M.Sc. thesis, and competition work`,
    `- [Code Lab](${SITE_URL}/code): curated code samples and downloadable source bundles`,
    `- [Applied Analytics](${SITE_URL}/analytics): analytics, machine learning, and AI-safety projects`,
    `- [Resume (PDF)](${abs(profile.resumeHref)})`,
    "",
    "## Research",
    "",
    ...research,
    "",
    "## Career",
    "",
    ...career,
    "",
    "## Civil engineering projects",
    "",
    ...civil,
    "",
    "## AI systems",
    "",
    ...ai,
    "",
    "## Featured analytics work",
    "",
    ...featured,
    "",
    "## Case studies",
    "",
    ...cases,
    "",
    "## Contact",
    "",
    `- [LinkedIn](${profile.linkedin})`,
    `- [GitHub](${GITHUB_URL})`,
    `- Email: ${profile.email}`,
    "",
  ].join("\n");
}
