import { test } from "node:test";
import assert from "node:assert/strict";
import { buildTerrainFromGrid, sampleHeight, type HeightGrid } from "../lib/terrain.ts";

// West-east ramp from 0 m to 100 m, twice as wide as tall.
const ramp: HeightGrid = {
  cols: 5,
  rows: 3,
  min: 0,
  max: 100,
  step: 20,
  heights: [0, 25, 50, 75, 100, 0, 25, 50, 75, 100, 0, 25, 50, 75, 100].map((m) => m * 2),
};

test("buildTerrainFromGrid contours the survey at its own interval", () => {
  const t = buildTerrainFromGrid(ramp, 40, 40, 1);
  assert.deepEqual(
    t.levels.map((l) => l.elevation),
    [40, 60],
  );
});

test("buildTerrainFromGrid crops the wide survey to cover a square screen", () => {
  const t = buildTerrainFromGrid(ramp, 41, 41, 1);
  // A square viewport shows the central half of a 2:1 survey: 25 m at the left edge, 75 m at the right.
  assert.ok(Math.abs(sampleHeight(t, 0, 0.5) - 25) < 1, String(sampleHeight(t, 0, 0.5)));
  assert.ok(Math.abs(sampleHeight(t, 1, 0.5) - 75) < 1, String(sampleHeight(t, 1, 0.5)));
});

test("buildTerrainFromGrid marks index contours every five intervals", () => {
  const steep: HeightGrid = { ...ramp, max: 500, heights: ramp.heights.map((h) => h * 5) };
  const t = buildTerrainFromGrid(steep, 41, 41, 2);
  const index = t.levels.filter((l) => l.isIndex).map((l) => l.elevation);
  assert.deepEqual(index, [100, 200, 300, 400]);
});
