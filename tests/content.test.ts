import { test } from "node:test";
import assert from "node:assert/strict";
import { aiSystems, bridgeTools, careerEvents, stations, translations } from "../lib/portfolio-data.ts";

test("content has 9 stations in order, with the transition between intake and conduit", () => {
  assert.deepEqual(
    stations.map((s) => s.id),
    ["top", "survey", "transition", "pipelines", "ai", "safety", "gauging", "career", "contact"],
  );
  assert.deepEqual(
    stations.map((s) => s.code),
    ["STA. 01", "STA. 02", "STA. 03", "STA. 04", "STA. 05", "STA. 06", "STA. 07", "STA. 08", "STA. 09"],
  );
});

test("the transition pairs every civil concept with its data/AI counterpart", () => {
  assert.ok(translations.length >= 5);
  for (const row of translations) {
    assert.ok(row.civil.length > 3 && row.ai.length > 3 && row.why.length > 20, row.civil);
  }
});

test("the transition shows the first tools that turned engineering into code", () => {
  assert.equal(bridgeTools.length, 3);
  for (const tool of bridgeTools) assert.ok(tool.proof.length > 20, tool.title);
});

test("career dates follow LinkedIn", () => {
  const byOrg = (org: string) => careerEvents.find((e) => e.org === org);
  assert.deepEqual([byOrg("BynD Bits")?.start, byOrg("BynD Bits")?.end], ["2026-03", null]);
  assert.deepEqual([byOrg("EcuAssist")?.start, byOrg("EcuAssist")?.end], ["2024-09", "2026-03"]);
  assert.deepEqual([byOrg("Gringconstruc")?.start, byOrg("Gringconstruc")?.end], ["2022-01", "2024-09"]);
  assert.equal(careerEvents.length, 6);
});

test("every AI system names a guardrail", () => {
  assert.ok(aiSystems.length >= 6);
  for (const system of aiSystems) assert.ok(system.guardrail.length > 20, system.title);
});
