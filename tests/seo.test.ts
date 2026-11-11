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
