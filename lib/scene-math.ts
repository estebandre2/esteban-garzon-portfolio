// Pure helpers behind the scroll scenes. Kept framework-free so they can be unit tested.
import { riverCenter } from "./terrain.ts";

/** Horizontal position (0..1) where the hero river leaves the screen; every scene's flow line enters here. */
export const FLOW_X = riverCenter(1);

const gumbel = (t: number) => -Math.log(-Math.log(1 - 1 / t));

/** Normalized water level (0..1) for a flood of the given return period, 2..100 years (Gumbel distribution). */
export function floodLevel(returnPeriodYears: number): number {
  const t = Math.min(100, Math.max(2, returnPeriodYears));
  return (gumbel(t) - gumbel(2)) / (gumbel(100) - gumbel(2));
}

/** Ids of the guards whose threshold is at or below the current risk (0..1). */
export function activeGuards(risk: number, guards: { id: string; threshold: number }[]): string[] {
  return guards.filter((g) => g.threshold <= risk).map((g) => g.id);
}

export type FunnelDrop = { id: number; outcome: "graveyard" | "rejected" | "confirmed"; lane: number };

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Deterministic illustration of the discovery agent's funnel: some hypotheses die against the
 * graveyard of past failures, most fail validation, and between 1 and `maxReported` are confirmed.
 */
export function hypothesisFunnel(seed: number, total = 20, maxReported = 5): FunnelDrop[] {
  const rand = mulberry32(seed);
  const drops: FunnelDrop[] = Array.from({ length: total }, (_, id) => ({
    id,
    outcome: rand() < 0.3 ? "graveyard" : "rejected",
    lane: Math.floor(rand() * 5),
  }));
  const candidates = drops.filter((d) => d.outcome === "rejected");
  const confirmed = Math.min(candidates.length, 1 + Math.floor(rand() * maxReported));
  for (let k = 0; k < confirmed; k++) {
    const pick = candidates.splice(Math.floor(rand() * candidates.length), 1)[0];
    pick.outcome = "confirmed";
  }
  return drops;
}

const months = (ym: string) => {
  const [y, m] = ym.split("-").map(Number);
  return y * 12 + (m - 1);
};

/** SVG path of a career "hydrograph": one smooth flood peak per event, height and width scaled by its duration. */
export function hydrographPath(
  events: { start: string; end: string | null }[],
  width: number,
  height: number,
  now = "2026-11",
): string {
  const spans = events.map((e) => [months(e.start), months(e.end ?? now)] as const);
  const t0 = Math.min(...spans.map((s) => s[0]));
  const t1 = Math.max(...spans.map((s) => s[1]), t0 + 1);
  const longest = Math.max(...spans.map((s) => s[1] - s[0]), 1);
  const steps = 160;
  const points: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = t0 + ((t1 - t0) * i) / steps;
    let flow = 0;
    for (const [a, b] of spans) {
      const center = (a + b) / 2;
      const sigma = Math.max(2, (b - a) / 3);
      const peak = 0.25 + 0.6 * ((b - a) / longest);
      flow = Math.max(flow, peak * Math.exp(-((t - center) ** 2) / (2 * sigma * sigma)));
    }
    const x = (width * i) / steps;
    const y = height * (1 - Math.min(0.95, flow));
    points.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return points.join(" ");
}
