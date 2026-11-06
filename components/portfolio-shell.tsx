"use client";

import { motion } from "framer-motion";
import { CSSProperties, useEffect, useState } from "react";
import {
  profile,
  stations,
} from "@/lib/portfolio-data";
import styles from "./portfolio-shell.module.css";
import { WatershedHero } from "./watershed-hero";
import { RiverProfileNav } from "./river-profile-nav";
import { ConduitScene } from "./scenes/conduit-scene";
import { IntakeScene } from "./scenes/intake-scene";
import { PowerhouseScene } from "./scenes/powerhouse-scene";
import { SafetyScene } from "./scenes/safety-scene";
import { GaugingScene } from "./scenes/gauging-scene";
import { HydrographScene } from "./scenes/hydrograph-scene";
import { GridScene } from "./scenes/grid-scene";

function MagneticLink({
  href,
  children,
  variant = "primary",
  target,
  rel,
  download,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  target?: string;
  rel?: string;
  download?: boolean | string;
}) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  return (
    <motion.a
      href={href}
      target={target}
      rel={rel}
      download={download}
      className={variant === "primary" ? styles.primaryCta : styles.ghostCta}
      onMouseMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - (bounds.left + bounds.width / 2);
        const y = event.clientY - (bounds.top + bounds.height / 2);
        setOffset({ x: x * 0.08, y: y * 0.08 });
      }}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 280, damping: 18, mass: 0.35 }}
    >
      <span>{children}</span>
    </motion.a>
  );
}

export function PortfolioShell() {
  const [cursor, setCursor] = useState({ x: 50, y: 20 });

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 100;
      const y = (event.clientY / window.innerHeight) * 100;
      setCursor({ x, y });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <main
      className={styles.page}
      style={
        {
          "--cursor-x": `${cursor.x}%`,
          "--cursor-y": `${cursor.y}%`,
        } as CSSProperties
      }
    >
      <RiverProfileNav stations={stations} />
      <div className={styles.spotlight} />
      <div className={styles.gridGlow} />

      <header className={styles.topbar}>
        <a href="#top" className={styles.brand}>
          {profile.name}
        </a>

        <nav className={styles.nav}>
          <a href="#survey">Engineering</a>
          <a href="#pipelines">Data</a>
          <a href="#ai">AI Systems</a>
          <a href="#safety">Safety</a>
          <a href="#gauging">Analytics</a>
          <a href="#career">Career</a>
          <a href="/code">Code Lab</a>
          <a href="#contact">Contact</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </nav>
      </header>

      <WatershedHero eyebrow={profile.heroEyebrow} title={profile.heroTitle} text={profile.heroText}>
        <div className={styles.ctaRow}>
          <MagneticLink href="#survey">Explore work</MagneticLink>
          <MagneticLink href={profile.resumeHref} variant="ghost" target="_blank" rel="noreferrer" download>
            Download resume
          </MagneticLink>
          <MagneticLink href="/code" variant="ghost">
            Open Code Lab
          </MagneticLink>
          <MagneticLink href={profile.linkedin} variant="ghost" target="_blank" rel="noreferrer">
            LinkedIn
          </MagneticLink>
        </div>
      </WatershedHero>

      <IntakeScene />

      <ConduitScene />

      <PowerhouseScene />

      <SafetyScene />

      <GaugingScene />

      <HydrographScene />

      <GridScene />
    </main>
  );
}
