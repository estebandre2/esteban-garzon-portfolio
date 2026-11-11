import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { featuredStudy, researchEntries, researchStudies } from "../lib/research.ts";
import { analyticsCaseStudies } from "../lib/portfolio-data.ts";
import { SITE_URL, buildLlmsTxt } from "../lib/seo.ts";

const PUBLIC = new URL("../public", import.meta.url).pathname;

test("research lists both Safety Factor studies, the thesis and the structural-break model", () => {
  const hrefs = researchEntries.map((e) => e.href);
  assert.ok(hrefs.includes("/research/safety-factor-ii"));
  assert.ok(hrefs.includes("/research/safety-factor"));
  assert.ok(hrefs.includes("/analytics/cases/texas-construction-permits"));
  assert.ok(hrefs.includes("/analytics/cases/structural-break-detection"));
  assert.equal(new Set(hrefs).size, hrefs.length);
});

test("entries that point to case studies point to existing ones", () => {
  for (const entry of researchEntries) {
    if (!entry.href.startsWith("/analytics/cases/")) continue;
    assert.ok(analyticsCaseStudies[entry.href.replace("/analytics/cases/", "")], entry.href);
  }
});

test("every study page has its findings, figure and PDFs on disk", () => {
  assert.equal(researchStudies.length, 2);
  for (const study of researchStudies) {
    assert.ok(study.findings.length >= 3, study.slug);
    assert.ok(study.keyNumbers.length === 3, study.slug);
    assert.ok(existsSync(join(PUBLIC, study.figure.src)), study.figure.src);
    assert.ok(study.figure.alt.length > 30, study.slug);
    for (const doc of study.documents) assert.ok(existsSync(join(PUBLIC, doc.href)), doc.href);
  }
});

test("the landing feature is Study II and links to its page", () => {
  assert.equal(featuredStudy.slug, "safety-factor-ii");
  assert.ok(researchEntries.some((e) => e.href === `/research/${featuredStudy.slug}`));
});

test("llms.txt points language models to the research pages and papers", () => {
  const txt = buildLlmsTxt();
  assert.ok(txt.includes(`${SITE_URL}/research`));
  for (const study of researchStudies) {
    assert.ok(txt.includes(`${SITE_URL}/research/${study.slug}`), study.slug);
    assert.ok(txt.includes(`${SITE_URL}${study.documents[0].href}`), study.slug);
  }
});

test("published research links its GitHub repository", () => {
  const byHref = (href: string) => researchEntries.find((e) => e.href === href);
  for (const href of ["/research/safety-factor-ii", "/research/safety-factor", "/analytics/cases/texas-construction-permits"]) {
    assert.match(byHref(href)?.repo ?? "", /^https:\/\/github\.com\/estebandre2\//, href);
  }
});
