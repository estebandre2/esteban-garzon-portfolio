"use client";

import { useEffect, useRef } from "react";
import { buildTerrainFromGrid, type HeightGrid } from "@/lib/terrain";

/** Static, faint contour map of the Tahuín survey behind the inner pages: same terrain as the homepage, no motion. */
export function ContourBackdrop({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    let grid: HeightGrid | null = null;
    let cancelled = false;

    const draw = () => {
      if (!grid) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const cols = 140;
      const rows = Math.max(40, Math.round(cols / (w / h)));
      const terrain = buildTerrainFromGrid(grid, cols, rows, w / h);
      for (const level of terrain.levels) {
        const s = level.segments;
        ctx.beginPath();
        for (let k = 0; k < s.length; k += 4) {
          ctx.moveTo(s[k] * w, s[k + 1] * h);
          ctx.lineTo(s[k + 2] * w, s[k + 3] * h);
        }
        ctx.lineWidth = level.isIndex ? 1 : 0.6;
        ctx.strokeStyle = level.isIndex ? "rgba(150, 196, 226, 0.16)" : "rgba(130, 172, 204, 0.08)";
        ctx.stroke();
      }
    };

    fetch("/terrain/tahuin.json")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: HeightGrid | null) => {
        if (cancelled || !data || !Array.isArray(data.heights) || data.heights.length !== data.cols * data.rows) return;
        grid = data;
        draw();
      })
      .catch(() => undefined);

    let timer: ReturnType<typeof setTimeout> | undefined;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(draw, 150);
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelled = true;
      clearTimeout(timer);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
