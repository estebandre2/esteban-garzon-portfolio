import { test } from "node:test";
import assert from "node:assert/strict";
import { aiSystems, careerEvents, stations } from "../lib/portfolio-data.ts";

test("content has 8 stations in order", () => {
  assert.deepEqual(
    stations.map((s) => s.id),
    ["top", "survey", "pipelines", "ai", "safety", "gauging", "career", "contact"],
  );
  assert.deepEqual(
    stations.map((s) => s.code),
    ["STA. 01", "STA. 02", "STA. 03", "STA. 04", "STA. 05", "STA. 06", "STA. 07", "STA. 08"],
  );
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
