import { test } from "node:test";
import assert from "node:assert/strict";
import { analyticsCaseStudies, profile } from "../lib/portfolio-data.ts";
import { SITE_URL, buildLlmsTxt, personJsonLd, serializeJsonLd } from "../lib/seo.ts";

test("person JSON-LD identifies the owner with verifiable profiles", () => {
  const ld = personJsonLd();
  assert.equal(ld["@context"], "https://schema.org");
  const person = ld["@graph"].find((node) => node["@type"] === "Person");
  assert.ok(person);
  assert.equal(person.name, profile.name);
  assert.equal(person.url, SITE_URL);
  assert.ok(person.sameAs.includes(profile.linkedin));
  assert.ok(person.sameAs.some((url: string) => url.startsWith("https://github.com/")));
  assert.equal(person.worksFor.name, "BynD Bits");
  assert.ok(person.alumniOf.length >= 2);
});

test("serialized JSON-LD is valid JSON and cannot close the script tag", () => {
  const out = serializeJsonLd({ text: "</script><b>" });
  assert.ok(!out.includes("<"));
  assert.deepEqual(JSON.parse(out), { text: "</script><b>" });
});

test("llms.txt follows the format and links every indexable page", () => {
  const txt = buildLlmsTxt();
  assert.ok(txt.startsWith(`# ${profile.name}\n\n> `));
  for (const path of ["/code", "/analytics", profile.resumeHref]) assert.ok(txt.includes(`${SITE_URL}${path}`), path);
  for (const slug of Object.keys(analyticsCaseStudies)) {
    assert.ok(txt.includes(`${SITE_URL}/analytics/cases/${slug}`), slug);
  }
  assert.ok(!txt.includes(profile.phone), "phone stays off machine-readable files");
});

test("titles fit a search result and descriptions fit a snippet", async () => {
  const { SITE_TITLE, SITE_DESCRIPTION, RESEARCH_TITLE, RESEARCH_DESCRIPTION } = await import("../lib/seo.ts");
  const { researchStudies } = await import("../lib/research.ts");
  const titles = [SITE_TITLE, RESEARCH_TITLE, ...researchStudies.map((s) => s.seoTitle)];
  const descriptions = [SITE_DESCRIPTION, RESEARCH_DESCRIPTION, ...researchStudies.map((s) => s.seoDescription)];
  for (const t of titles) assert.ok(t.length <= 65, `title too long (${t.length}): ${t}`);
  for (const d of descriptions) assert.ok(d.length >= 110 && d.length <= 160, `description length ${d.length}: ${d}`);
  assert.match(SITE_TITLE, /AI safety/i, "the home title names the research");
});

test("the home graph links the person to each study as its author", async () => {
  const { researchStudies } = await import("../lib/research.ts");
  const graph = personJsonLd()["@graph"];
  const articles = graph.filter((n: { "@type": string }) => n["@type"] === "ScholarlyArticle");
  assert.equal(articles.length, researchStudies.length);
  for (const a of articles) assert.equal(a.author["@id"], `${SITE_URL}/#person`);
  const person = graph.find((n: { "@type": string }) => n["@type"] === "Person");
  for (const topic of ["LLM evaluation", "Pre-registration"]) assert.ok(person.knowsAbout.includes(topic), topic);
});

test("study pages carry Google Scholar citation tags", async () => {
  const { citationMeta } = await import("../lib/seo.ts");
  const { researchStudies } = await import("../lib/research.ts");
  for (const s of researchStudies) {
    const meta = citationMeta(s);
    assert.equal(meta.citation_author, "Garzon, Esteban");
    assert.match(meta.citation_publication_date, /^\d{4}\/\d{2}\/\d{2}$/);
    assert.equal(meta.citation_pdf_url, `${SITE_URL}${s.documents[0].href}`);
    assert.match(meta.citation_doi, /^10\.5281\/zenodo\.\d+$/);
  }
});
