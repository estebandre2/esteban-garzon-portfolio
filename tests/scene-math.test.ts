import { test } from "node:test";
import assert from "node:assert/strict";
import { FLOW_X, activeGuards, floodLevel, hydrographPath, hypothesisFunnel } from "../lib/scene-math.ts";

const guards = [
  { id: "a", threshold: 0 },
  { id: "b", threshold: 0.25 },
  { id: "c", threshold: 0.5 },
  { id: "d", threshold: 0.75 },
];

test("floodLevel spans 0..1 between the 2- and 100-year floods", () => {
  assert.equal(floodLevel(2), 0);
  assert.equal(floodLevel(100), 1);
});

test("floodLevel follows the Gumbel reduced variate", () => {
  assert.ok(Math.abs(floodLevel(10) - 0.445) < 0.001, String(floodLevel(10)));
});

test("floodLevel clamps return periods outside 2..100", () => {
  assert.equal(floodLevel(500), 1);
  assert.equal(floodLevel(1), 0);
});

test("activeGuards closes gates as risk rises", () => {
  assert.equal(activeGuards(0, guards).length, 1);
  assert.equal(activeGuards(0.5, guards).length, 3);
  assert.equal(activeGuards(1, guards).length, 4);
});

test("hypothesisFunnel reports at most five of twenty", () => {
  const drops = hypothesisFunnel(7);
  assert.equal(drops.length, 20);
  assert.ok(drops.filter((d) => d.outcome === "confirmed").length <= 5);
  assert.ok(drops.filter((d) => d.outcome === "confirmed").length >= 1);
});

test("hypothesisFunnel is deterministic per seed", () => {
  assert.deepEqual(hypothesisFunnel(7), hypothesisFunnel(7));
});

test("hydrographPath returns a finite SVG path", () => {
  const path = hydrographPath(
    [
      { start: "2018-08", end: "2023-12" },
      { start: "2026-03", end: null },
    ],
    800,
    200,
  );
  assert.ok(path.startsWith("M"));
  assert.ok(!path.includes("NaN"));
});

test("FLOW_X matches the end of the hero river", () => {
  assert.ok(FLOW_X > 0.5 && FLOW_X < 0.7, String(FLOW_X));
});

test("timelineX maps the career span onto the chart width", async () => {
  const { timelineX } = await import("../lib/scene-math.ts");
  const events = [
    { start: "2018-08", end: "2023-12" },
    { start: "2026-03", end: null },
  ];
  assert.equal(timelineX("2018-08", events, 1000), 0);
  assert.equal(timelineX("2026-11", events, 1000), 1000);
});

test("hydrographPeaks puts one marker per event on the curve's span", async () => {
  const { hydrographPeaks } = await import("../lib/scene-math.ts");
  const events = [
    { start: "2018-08", end: "2023-12" },
    { start: "2026-03", end: null },
  ];
  const peaks = hydrographPeaks(events, 1000, 200);
  assert.equal(peaks.length, 2);
  for (const p of peaks) {
    assert.ok(p.x >= 0 && p.x <= 1000, String(p.x));
    assert.ok(p.y >= 0 && p.y <= 200, String(p.y));
  }
  assert.ok(peaks[0].y < peaks[1].y, "longer event peaks higher");
});
