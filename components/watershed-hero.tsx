"use client";

import { CSSProperties, ReactNode, useEffect, useRef } from "react";
import {
  buildTerrain,
  downhill,
  revealCount,
  riverCenter,
  sampleHeight,
  type Terrain,
} from "@/lib/terrain";
import styles from "./watershed-hero.module.css";

type Drop = {
  u: number;
  v: number;
  pu: number;
  pv: number;
  age: number;
  inRiver: boolean;
};

const NAME = "Esteban Garzon";
const FALL_TIME = 0.35; // seconds a raindrop spends falling before it lands
const DROP_LIFE = 5;
const LENS_RADIUS = 180; // px

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const meters = new Intl.NumberFormat("en-US");

export function WatershedHero({
  eyebrow,
  title,
  text,
  children,
}: {
  eyebrow: string;
  title: string;
  text: string;
  children?: ReactNode;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!section || !sticky || !canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const maxDrops = coarse ? 180 : 600;
    const dropRate = coarse ? 110 : 320; // drops per second at full scroll

    let width = 0;
    let height = 0;
    let terrain: Terrain | null = null;
    let drops: Drop[] = [];
    let spawnBudget = 0;
    let pointer: { x: number; y: number } | null = null;
    let visible = true;
    let frame = 0;
    let last = performance.now();
    const start = last;

    const build = () => {
      // Pull the hero up under the sticky top bar (its height changes when the nav wraps on phones).
      const bar = section.previousElementSibling as HTMLElement | null;
      if (bar) section.style.marginTop = `-${bar.offsetTop + bar.offsetHeight}px`;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      width = sticky.clientWidth;
      height = sticky.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const aspect = width / Math.max(1, height);
      const cols = coarse ? 90 : 150;
      const rows = Math.max(40, Math.min(140, Math.round(cols / aspect)));
      terrain = buildTerrain(cols, rows, aspect);
      drops = [];
    };

    const scrollProgress = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      return scrollable > 0 ? clamp01(-rect.top / scrollable) : 0;
    };

    const draw = (now: number) => {
      if (!terrain) return;
      const t = terrain;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const elapsed = now - start;
      const intro = reduced ? 1 : easeOutCubic(clamp01(elapsed / 2600));
      const p = scrollProgress();
      section.style.setProperty("--p", p.toFixed(3));

      ctx.clearRect(0, 0, width, height);
      ctx.save();
      // Slow "drone descent" toward the valley as the visitor scrolls.
      // Anchored at the river outlet so the river keeps meeting the next scene's flow line.
      const zoom = 1 + p * 0.08;
      const cx = riverCenter(1) * width;
      ctx.translate(cx, height);
      ctx.scale(zoom, zoom);
      ctx.translate(-cx, -height);

      const breathe = (u: number, li: number) =>
        reduced ? 0 : Math.sin(u * 7 + elapsed * 0.0007 + li * 0.45) * 0.0022;

      // Contours. Index contours (every 500 m) are bolder, as on survey sheets.
      t.levels.forEach((level, li) => {
        const n = revealCount(level.keys, intro * 1.02);
        if (!n) return;
        const s = level.segments;
        ctx.beginPath();
        for (let k = 0; k < n; k++) {
          const u1 = s[k * 4];
          const u2 = s[k * 4 + 2];
          ctx.moveTo(u1 * width, (s[k * 4 + 1] + breathe(u1, li)) * height);
          ctx.lineTo(u2 * width, (s[k * 4 + 3] + breathe(u2, li)) * height);
        }
        ctx.lineWidth = level.isIndex ? 1.15 : 0.7;
        ctx.strokeStyle = level.isIndex ? "rgba(150, 196, 226, 0.34)" : "rgba(130, 172, 204, 0.17)";
        ctx.stroke();
      });

      // Topographic lens: the contour under the cursor lights up across the map,
      // and nearby lines brighten.
      let lensElevation: number | null = null;
      if (pointer && !coarse) {
        const pu = pointer.x / width;
        const pv = pointer.y / height;
        lensElevation = sampleHeight(t, pu, pv);
        const nearest = t.levels.reduce((best, level) =>
          Math.abs(level.elevation - lensElevation!) < Math.abs(best.elevation - lensElevation!) ? level : best,
        );

        t.levels.forEach((level, li) => {
          const n = revealCount(level.keys, intro * 1.02);
          const s = level.segments;
          const isNearest = level === nearest;
          ctx.beginPath();
          for (let k = 0; k < n; k++) {
            const mx = ((s[k * 4] + s[k * 4 + 2]) / 2) * width;
            const my = ((s[k * 4 + 1] + s[k * 4 + 3]) / 2) * height;
            if (!isNearest && Math.hypot(mx - pointer!.x, my - pointer!.y) > LENS_RADIUS) continue;
            ctx.moveTo(s[k * 4] * width, (s[k * 4 + 1] + breathe(s[k * 4], li)) * height);
            ctx.lineTo(s[k * 4 + 2] * width, (s[k * 4 + 3] + breathe(s[k * 4 + 2], li)) * height);
          }
          ctx.lineWidth = isNearest ? 1.6 : 1;
          ctx.strokeStyle = isNearest ? "rgba(255, 184, 111, 0.75)" : "rgba(170, 220, 245, 0.45)";
          ctx.stroke();
        });
      }

      // River: dashed design axis first, then water fills it as the visitor scrolls.
      const fill = reduced ? 1 : smoothstep(0.04, 0.75, p);
      const riverPath = (to: number) => {
        ctx.beginPath();
        const steps = 140;
        for (let k = 0; k <= steps * to; k++) {
          const v = k / steps;
          const x = riverCenter(v) * width;
          if (k === 0) ctx.moveTo(x, v * height);
          else ctx.lineTo(x, v * height);
        }
      };
      riverPath(intro);
      ctx.setLineDash([6, 9]);
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = "rgba(120, 242, 223, 0.38)";
      ctx.stroke();
      ctx.setLineDash([]);

      if (fill > 0.001) {
        riverPath(fill);
        ctx.lineCap = "round";
        ctx.lineWidth = 3.2;
        ctx.strokeStyle = "rgba(120, 242, 223, 0.85)";
        ctx.shadowColor = "rgba(120, 242, 223, 0.7)";
        ctx.shadowBlur = 14;
        ctx.stroke();
        ctx.shadowBlur = 0;
        if (!reduced) {
          // Moving highlights read as current flowing downstream.
          ctx.setLineDash([2, 22]);
          ctx.lineDashOffset = -elapsed * 0.06;
          ctx.lineWidth = 2;
          ctx.strokeStyle = "rgba(235, 255, 252, 0.9)";
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }

      // Rain: drops fall, land, run downhill and join the river.
      if (!reduced) {
        // Accumulate fractional spawns so a small scroll means a light drizzle, not one drop per frame.
        spawnBudget += dropRate * Math.pow(smoothstep(0.02, 1, p), 1.2) * dt;
        for (; spawnBudget >= 1; spawnBudget--) {
          if (drops.length >= maxDrops) {
            spawnBudget = 0;
            break;
          }
          const u = Math.random();
          const v = Math.random() * 0.95;
          drops.push({ u, v, pu: u, pv: v, age: 0, inRiver: false });
        }

        ctx.lineCap = "round";
        drops = drops.filter((d) => {
          d.age += dt;
          if (d.age > DROP_LIFE || d.v > 1.02) return false;
          const x = d.u * width;
          const y = d.v * height;

          if (d.age < FALL_TIME) {
            const k = d.age / FALL_TIME;
            const top = y - 46 * (1 - k);
            ctx.beginPath();
            ctx.moveTo(x, top - 12);
            ctx.lineTo(x, top);
            ctx.lineWidth = 1;
            ctx.strokeStyle = `rgba(190, 235, 255, ${0.15 + 0.45 * k})`;
            ctx.stroke();
            return true;
          }

          d.pu = d.u;
          d.pv = d.v;
          const rc = riverCenter(d.v);
          if (d.inRiver || Math.abs(d.u - rc) * t.aspect < 0.018) {
            d.inRiver = true;
            d.v += 0.22 * dt;
            d.u = riverCenter(d.v);
          } else {
            const [dx, dy] = downhill(t, d.u, d.v);
            const bias = Math.sign(rc - d.u) * 0.45;
            const len = Math.hypot(dx + bias, dy) || 1;
            const speed = 0.12;
            d.u += (((dx + bias) / len) * speed * dt) / t.aspect;
            d.v += (dy / len) * speed * dt;
          }

          const life = d.age / DROP_LIFE;
          const alpha = (d.inRiver ? 0.6 : 0.9) * (1 - life * life);
          // Tail drawn along the direction of travel so runoff reads as streaks.
          const mx = (d.u - d.pu) * width;
          const my = (d.v - d.pv) * height;
          const ml = Math.hypot(mx, my) || 1;
          ctx.beginPath();
          ctx.moveTo(d.u * width - (mx / ml) * 14, d.v * height - (my / ml) * 14);
          ctx.lineTo(d.u * width, d.v * height);
          ctx.lineWidth = d.inRiver ? 2 : 1.5;
          ctx.strokeStyle = `rgba(120, 242, 223, ${alpha})`;
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(d.u * width, d.v * height, 1.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(214, 255, 248, ${alpha})`;
          ctx.fill();
          return true;
        });
      }

      ctx.restore();

      // Survey crosshair and elevation readout (drawn unzoomed so it tracks the cursor exactly).
      if (pointer && lensElevation !== null) {
        const { x, y } = pointer;
        ctx.strokeStyle = "rgba(255, 184, 111, 0.85)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x - 14, y);
        ctx.lineTo(x - 4, y);
        ctx.moveTo(x + 4, y);
        ctx.lineTo(x + 14, y);
        ctx.moveTo(x, y - 14);
        ctx.lineTo(x, y - 4);
        ctx.moveTo(x, y + 4);
        ctx.lineTo(x, y + 14);
        ctx.stroke();
        ctx.font = "600 12px ui-monospace, SFMono-Regular, Menlo, monospace";
        const flip = x + 170 > width;
        ctx.textAlign = flip ? "right" : "left";
        const lx = flip ? x - 18 : x + 18;
        ctx.fillStyle = "rgba(255, 220, 180, 0.95)";
        ctx.fillText(`EL. ${meters.format(Math.round(lensElevation / 10) * 10)} m`, lx, y - 8);
        ctx.fillStyle = "rgba(180, 205, 225, 0.7)";
        ctx.fillText("INTAG VALLEY · REF.", lx, y + 8);
        ctx.textAlign = "left";
      }
    };

    const loop = (now: number) => {
      frame = 0;
      draw(now);
      if (!reduced && visible) frame = requestAnimationFrame(loop);
    };
    const requestDraw = () => {
      if (!frame) frame = requestAnimationFrame(loop);
    };

    build();
    requestDraw();

    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    const observer = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        build();
        requestDraw();
      }, 120);
    });
    observer.observe(sticky);

    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        last = performance.now();
        requestDraw();
      }
    });
    visibility.observe(section);

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      pointer = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height ? { x, y } : null;
      if (reduced) requestDraw();
    };
    const onPointerLeave = () => {
      pointer = null;
      if (reduced) requestDraw();
    };
    const onScroll = () => {
      if (reduced) requestDraw();
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(resizeTimer);
      observer.disconnect();
      visibility.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.hero} id="top">
      <div ref={stickyRef} className={styles.sticky}>
        <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
        <div className={styles.vignette} aria-hidden="true" />

        <div className={styles.copy}>
          <p className={styles.nameTag}>
            <span className={styles.srOnly}>{NAME}</span>
            {NAME.split("").map((char, i) => (
              <span key={i} aria-hidden="true" style={{ "--i": i } as CSSProperties}>
                {char === " " ? " " : char}
              </span>
            ))}
            <em aria-hidden="true">EL. 2,350 m</em>
          </p>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h1>{title}</h1>
          <p className={styles.lede}>{text}</p>
          {children}
        </div>

        <p className={styles.caption}>
          <span>Design rule I never dropped</span>
          Build for the flood, not for the average day.
        </p>

        <aside className={styles.titleBlock} aria-hidden="true">
          <div>
            <span>Project</span>
            <strong>Watershed → Systems</strong>
          </div>
          <div>
            <span>Sheet</span>
            <strong>01 / 08</strong>
          </div>
          <div>
            <span>Scale</span>
            <strong>1:25 000</strong>
          </div>
          <div>
            <span>Drawn</span>
            <strong>E. Garzon · Rev. 2026</strong>
          </div>
          <small>Stylized terrain, after the Intag valley, Ecuador</small>
        </aside>

        <div className={styles.scrollCue} aria-hidden="true">
          <span />
          Scroll to let it rain
        </div>
      </div>
    </section>
  );
}
