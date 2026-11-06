"use client";

import { MotionValue } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { hypothesisFunnel, type FunnelDrop } from "@/lib/scene-math";
import styles from "./scenes.module.css";

const LEVERS = ["Revenue lever", "Margin lever", "OPEX lever", "Risk lever", "Revenue lever"];
const START = 0.18;
const STAGGER = 0.018;
const TRAVEL = 0.22;

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

type Placed = { x: number; y: number; alpha: number; drop: FunnelDrop; done: boolean };

/** Position of every hypothesis for a given scroll progress. Pure, so the canvas and hit-testing agree. */
function layout(drops: FunnelDrop[], p: number, w: number, h: number): Placed[] {
  let slot = 0;
  return drops.map((drop, i) => {
    const t = clamp01((p - (START + i * STAGGER)) / TRAVEL);
    const laneX = (0.22 + drop.lane * 0.14) * w;
    if (drop.outcome === "graveyard") {
      const fall = clamp01(t * 2);
      const exit = clamp01((t - 0.5) * 2);
      return { drop, x: lerp(laneX, 8, exit), y: lerp(14, 0.3 * h, fall), alpha: t === 0 ? 0 : 1 - exit, done: t >= 1 };
    }
    if (drop.outcome === "rejected") {
      const fall = clamp01(t / 0.75);
      const fade = clamp01((t - 0.75) * 4);
      return { drop, x: laneX, y: lerp(14, 0.6 * h - 6, fall), alpha: t === 0 ? 0 : 1 - fade, done: t >= 1 };
    }
    const k = slot++;
    const restX = (0.3 + k * 0.1) * w;
    return { drop, x: lerp(laneX, restX, clamp01((t - 0.6) / 0.4)), y: lerp(14, 0.88 * h, t), alpha: t === 0 ? 0 : 1, done: t >= 1 };
  });
}

export function HypothesisCanvas({ progress, reduced, seed }: { progress: MotionValue<number>; reduced: boolean; seed: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drops = useMemo(() => hypothesisFunnel(seed), [seed]);
  const confirmed = drops.filter((d) => d.outcome === "confirmed");
  const [arrived, setArrived] = useState(reduced ? confirmed.length : 0);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    let w = 0;
    let h = 0;

    const draw = () => {
      const p = reduced ? 1 : progress.get();
      ctx.clearRect(0, 0, w, h);

      // Stages: graveyard exit, validation rack, reservoir.
      ctx.font = "600 10px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.fillStyle = "rgba(139, 163, 184, 0.9)";
      ctx.fillText("← GRAVEYARD OF PAST FAILURES", 10, 0.3 * h - 10);
      ctx.strokeStyle = "rgba(255, 184, 111, 0.6)";
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.moveTo(0, 0.6 * h);
      ctx.lineTo(w, 0.6 * h);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = "rgba(255, 184, 111, 0.9)";
      ctx.fillText("VALIDATION AGAINST RAW DATA", 10, 0.6 * h - 8);
      const res = ctx.createLinearGradient(0, 0.8 * h, 0, h);
      res.addColorStop(0, "rgba(120, 242, 223, 0.04)");
      res.addColorStop(1, "rgba(120, 242, 223, 0.22)");
      ctx.fillStyle = res;
      ctx.fillRect(0, 0.8 * h, w, 0.2 * h);
      ctx.fillStyle = "rgba(120, 242, 223, 0.9)";
      ctx.fillText("REPORTED · MAX 5", 10, 0.8 * h + 14);

      const placed = layout(drops, p, w, h);
      let count = 0;
      for (const item of placed) {
        if (item.alpha <= 0) continue;
        const isConfirmed = item.drop.outcome === "confirmed";
        if (isConfirmed && item.done) count++;
        ctx.beginPath();
        ctx.arc(item.x, item.y, isConfirmed && item.done ? 6 : 4, 0, Math.PI * 2);
        ctx.fillStyle = isConfirmed ? `rgba(120, 242, 223, ${item.alpha})` : `rgba(190, 210, 228, ${item.alpha * 0.8})`;
        ctx.shadowColor = isConfirmed ? "rgba(120, 242, 223, 0.9)" : "transparent";
        ctx.shadowBlur = isConfirmed ? 12 : 0;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      setArrived(count);
    };

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    // Redraws only when scroll progress changes: no idle animation loop.
    const unsubscribe = progress.on("change", draw);
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    return () => {
      unsubscribe();
      observer.disconnect();
    };
  }, [drops, progress, reduced]);

  const onCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const placed = layout(drops, reduced ? 1 : progress.get(), rect.width, rect.height);
    const hit = placed.find(
      (item) => item.drop.outcome === "confirmed" && item.done && Math.hypot(item.x - (event.clientX - rect.left), item.y - (event.clientY - rect.top)) < 18,
    );
    if (hit) setSelected(confirmed.indexOf(hit.drop));
  };

  return (
    <div className={styles.funnel}>
      <p className={styles.funnelCount} aria-live="polite">
        <strong>{drops.length}</strong> hypotheses → <strong>{arrived}</strong> confirmed
      </p>
      <canvas ref={canvasRef} className={styles.funnelCanvas} onClick={onCanvasClick} aria-hidden="true" />
      <div className={styles.insightButtons} role="group" aria-label="Inspect confirmed insights">
        {confirmed.map((drop, k) => (
          <button
            key={drop.id}
            type="button"
            disabled={k >= arrived}
            aria-pressed={selected === k}
            onClick={() => setSelected(k)}
          >
            Insight {k + 1}
          </button>
        ))}
      </div>
      <p className={styles.insightDetail} aria-live="polite">
        {selected === null
          ? "Tap a confirmed insight to see what it had to survive."
          : `Insight ${selected + 1} · ${LEVERS[selected % LEVERS.length]}: validated against raw rows, every figure computed in Python, reviewed by a person before it reached the report.`}
      </p>
    </div>
  );
}
