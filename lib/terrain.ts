// Stylized watershed terrain: a river valley carved through noisy ridges,
// contoured with marching squares. All coordinates are normalized (u, v) in [0, 1].

export const ELEV_MIN = 1550;
export const ELEV_MAX = 3250;
export const CONTOUR_STEP = 100;
export const INDEX_EVERY = 5; // every 5th contour is an "index" (bold) line, as on real topo maps

export type ContourLevel = {
  elevation: number;
  isIndex: boolean;
  // Flat [u1, v1, u2, v2, ...] segments, sorted by reveal key.
  segments: Float32Array;
  // Reveal key per segment in [0, 1], ascending.
  keys: Float32Array;
};

export type Terrain = {
  cols: number;
  rows: number;
  aspect: number;
  heights: Float32Array; // meters, row-major
  levels: ContourLevel[];
};

/** A surveyed height grid (row 0 = north). Heights are stored in half-metres to keep the file small. */
export type HeightGrid = {
  cols: number;
  rows: number;
  min: number;
  max: number;
  step: number; // contour interval in metres
  heights: number[];
};

function hash(x: number, y: number, seed: number) {
  let h = (x * 374761393 + y * 668265263 + seed * 2147483647) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

function smooth(t: number) {
  return t * t * (3 - 2 * t);
}

function valueNoise(x: number, y: number, seed: number) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const tx = smooth(x - xi);
  const ty = smooth(y - yi);
  const a = hash(xi, yi, seed);
  const b = hash(xi + 1, yi, seed);
  const c = hash(xi, yi + 1, seed);
  const d = hash(xi + 1, yi + 1, seed);
  return a + (b - a) * tx + (c - a) * ty + (a - b - c + d) * tx * ty;
}

function fbm(x: number, y: number) {
  let sum = 0;
  let amp = 0.5;
  let freq = 1;
  for (let o = 0; o < 5; o++) {
    sum += amp * valueNoise(x * freq, y * freq, 17 + o);
    amp *= 0.5;
    freq *= 2.03;
  }
  return sum / 0.96875;
}

/** Horizontal position of the river centerline at height v. */
export function riverCenter(v: number) {
  return 0.63 + 0.1 * Math.sin(v * 3.1 + 0.6) + 0.035 * Math.sin(v * 8.2 + 1.3);
}

function normalizedHeight(u: number, v: number, aspect: number) {
  const n = fbm(u * aspect * 3.1, v * 3.1);
  const d = Math.abs(u - riverCenter(v)) * aspect;
  const walls = Math.pow(Math.min(1, d * 2.1), 1.3);
  const h = 0.05 + 0.6 * walls * (0.5 + 0.5 * n) + 0.2 * n + 0.15 * (1 - v);
  return Math.min(1, Math.max(0, h));
}

export function buildTerrain(cols: number, rows: number, aspect: number): Terrain {
  const heights = new Float32Array(cols * rows);
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const h = normalizedHeight(i / (cols - 1), j / (rows - 1), aspect);
      heights[j * cols + i] = ELEV_MIN + h * (ELEV_MAX - ELEV_MIN);
    }
  }

  return { cols, rows, aspect, heights, levels: contourLevels(heights, cols, rows, aspect, ELEV_MIN, ELEV_MAX, CONTOUR_STEP) };
}

function contourLevels(
  heights: Float32Array,
  cols: number,
  rows: number,
  aspect: number,
  min: number,
  max: number,
  step: number,
): ContourLevel[] {
  const levels: ContourLevel[] = [];
  const first = Math.floor(min / step) * step + step;
  for (let e = first; e < max; e += step) {
    levels.push(contourLevel(heights, cols, rows, aspect, e, step));
  }
  return levels;
}

/**
 * Resample a surveyed grid onto a cols x rows screen grid with "cover" cropping (centered),
 * then contour it at the survey's own interval.
 */
export function buildTerrainFromGrid(grid: HeightGrid, cols: number, rows: number, aspect: number): Terrain {
  const gridAspect = (grid.cols - 1) / (grid.rows - 1);
  // Fraction of the survey visible on each axis so the screen is fully covered.
  const spanU = Math.min(1, aspect / gridAspect);
  const spanV = Math.min(1, gridAspect / aspect);
  const u0 = (1 - spanU) / 2;
  const v0 = (1 - spanV) / 2;
  const src = (i: number, j: number) => grid.heights[j * grid.cols + i] / 2;

  const heights = new Float32Array(cols * rows);
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const x = (u0 + (i / (cols - 1)) * spanU) * (grid.cols - 1);
      const y = (v0 + (j / (rows - 1)) * spanV) * (grid.rows - 1);
      const gi = Math.min(grid.cols - 2, Math.floor(x));
      const gj = Math.min(grid.rows - 2, Math.floor(y));
      const fx = x - gi;
      const fy = y - gj;
      const top = src(gi, gj) * (1 - fx) + src(gi + 1, gj) * fx;
      const bot = src(gi, gj + 1) * (1 - fx) + src(gi + 1, gj + 1) * fx;
      heights[j * cols + i] = top * (1 - fy) + bot * fy;
    }
  }
  let min = Infinity;
  let max = -Infinity;
  for (const h of heights) {
    if (h < min) min = h;
    if (h > max) max = h;
  }
  return { cols, rows, aspect, heights, levels: contourLevels(heights, cols, rows, aspect, min, max, grid.step) };
}

function contourLevel(
  heights: Float32Array,
  cols: number,
  rows: number,
  aspect: number,
  elevation: number,
  step: number,
): ContourLevel {
  const raw: number[] = [];
  const du = 1 / (cols - 1);
  const dv = 1 / (rows - 1);
  const lerp = (a: number, b: number) => (elevation - a) / (b - a);

  for (let j = 0; j < rows - 1; j++) {
    for (let i = 0; i < cols - 1; i++) {
      const tl = heights[j * cols + i];
      const tr = heights[j * cols + i + 1];
      const br = heights[(j + 1) * cols + i + 1];
      const bl = heights[(j + 1) * cols + i];
      const code =
        (tl >= elevation ? 8 : 0) | (tr >= elevation ? 4 : 0) | (br >= elevation ? 2 : 0) | (bl >= elevation ? 1 : 0);
      if (code === 0 || code === 15) continue;

      const u0 = i * du;
      const v0 = j * dv;
      // Edge crossing points: top, right, bottom, left.
      const top = () => [u0 + lerp(tl, tr) * du, v0];
      const right = () => [u0 + du, v0 + lerp(tr, br) * dv];
      const bottom = () => [u0 + lerp(bl, br) * du, v0 + dv];
      const left = () => [u0, v0 + lerp(tl, bl) * dv];

      const pairs: Array<[() => number[], () => number[]]> = [];
      switch (code) {
        case 1: case 14: pairs.push([left, bottom]); break;
        case 2: case 13: pairs.push([bottom, right]); break;
        case 3: case 12: pairs.push([left, right]); break;
        case 4: case 11: pairs.push([top, right]); break;
        case 5: pairs.push([left, top], [bottom, right]); break;
        case 6: case 9: pairs.push([top, bottom]); break;
        case 7: case 8: pairs.push([left, top]); break;
        case 10: pairs.push([left, bottom], [top, right]); break;
      }
      for (const [a, b] of pairs) {
        const p = a();
        const q = b();
        raw.push(p[0], p[1], q[0], q[1]);
      }
    }
  }

  // Reveal outward from the river, top to bottom, like water spreading.
  const count = raw.length / 4;
  const order = new Array<number>(count);
  const rawKeys = new Float32Array(count);
  for (let s = 0; s < count; s++) {
    const mu = (raw[s * 4] + raw[s * 4 + 2]) / 2;
    const mv = (raw[s * 4 + 1] + raw[s * 4 + 3]) / 2;
    rawKeys[s] = Math.min(1, mv * 0.45 + Math.abs(mu - riverCenter(mv)) * aspect * 0.75);
    order[s] = s;
  }
  order.sort((a, b) => rawKeys[a] - rawKeys[b]);

  const segments = new Float32Array(raw.length);
  const keys = new Float32Array(count);
  order.forEach((src, dst) => {
    segments.set(raw.slice(src * 4, src * 4 + 4), dst * 4);
    keys[dst] = rawKeys[src];
  });

  return { elevation, isIndex: elevation % (step * INDEX_EVERY) === 0, segments, keys };
}

/** Bilinear elevation in meters at (u, v). */
export function sampleHeight(t: Terrain, u: number, v: number) {
  const x = Math.min(t.cols - 1.001, Math.max(0, u * (t.cols - 1)));
  const y = Math.min(t.rows - 1.001, Math.max(0, v * (t.rows - 1)));
  const i = Math.floor(x);
  const j = Math.floor(y);
  const fx = x - i;
  const fy = y - j;
  const h = t.heights;
  const c = t.cols;
  const top = h[j * c + i] * (1 - fx) + h[j * c + i + 1] * fx;
  const bot = h[(j + 1) * c + i] * (1 - fx) + h[(j + 1) * c + i + 1] * fx;
  return top * (1 - fy) + bot * fy;
}

/** Downhill direction (normalized vector in u/v space) at (u, v). */
export function downhill(t: Terrain, u: number, v: number): [number, number] {
  const e = 1 / t.cols;
  const gx = (sampleHeight(t, u + e, v) - sampleHeight(t, u - e, v)) / t.aspect;
  const gy = sampleHeight(t, u, v + e) - sampleHeight(t, u, v - e);
  const len = Math.hypot(gx, gy) || 1;
  return [-gx / len, -gy / len];
}

/** Index of the first segment whose key exceeds `threshold`. */
export function revealCount(keys: Float32Array, threshold: number) {
  let lo = 0;
  let hi = keys.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (keys[mid] <= threshold) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}
