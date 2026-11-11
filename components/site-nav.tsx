"use client";

import { useEffect, useId, useRef, useState } from "react";
import { profile } from "@/lib/portfolio-data";
import styles from "./site-nav.module.css";

type NavLink = { label: string; href: string; external?: boolean };
type NavItem = { label: string; href: string } | { label: string; links: NavLink[] };

// Grouped so the top bar stays one short row; Contact lives in the floating button, not here.
const NAV: NavItem[] = [
  { label: "Research", href: "/research" },
  {
    label: "Work",
    links: [
      { label: "Engineering", href: "#survey" },
      { label: "Data pipelines", href: "#pipelines" },
      { label: "AI systems", href: "#ai" },
      { label: "Safety", href: "#safety" },
      { label: "Analytics", href: "#gauging" },
    ],
  },
  {
    label: "Labs",
    links: [
      { label: "Code Lab", href: "/code" },
      { label: "Analytics Lab", href: "/analytics" },
    ],
  },
  {
    label: "About",
    links: [
      { label: "Career", href: "#career" },
      { label: "Resume (PDF)", href: profile.resumeHref },
      { label: "LinkedIn", href: profile.linkedin, external: true },
    ],
  },
];

function Dropdown({ label, links, open, onToggle, onClose, to }: { label: string; links: NavLink[]; open: boolean; onToggle: () => void; onClose: () => void; to: (href: string) => string }) {
  const id = useId();
  return (
    <div className={styles.group}>
      <button type="button" className={styles.trigger} aria-expanded={open} aria-controls={id} onClick={onToggle}>
        {label}
        <svg className={styles.chevron} viewBox="0 0 12 12" aria-hidden="true">
          <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
      <ul id={id} className={styles.panel} hidden={!open}>
        {links.map((link) => (
          <li key={link.href}>
            <a href={to(link.href)} onClick={onClose} {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}>
              {link.label}
              {link.external ? <span className={styles.srOnly}> (opens in a new tab)</span> : null}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteNav({ home = false }: { home?: boolean }) {
  const to = (href: string) => (!home && href.startsWith("#") ? `/${href}` : href);
  const [open, setOpen] = useState<string | null>(null);
  const ref = useRef<HTMLElement>(null);

  // Close on Escape (returning focus to the trigger) and on any click outside the bar.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const trigger = ref.current?.querySelector<HTMLButtonElement>('button[aria-expanded="true"]');
      setOpen(null);
      trigger?.focus();
    };
    const onPointer = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <nav ref={ref} className={styles.nav} aria-label="Main">
      {NAV.map((item) =>
        "href" in item ? (
          <a key={item.label} href={to(item.href)} className={styles.link}>
            {item.label}
          </a>
        ) : (
          <Dropdown
            key={item.label}
            label={item.label}
            links={item.links}
            open={open === item.label}
            onToggle={() => setOpen((o) => (o === item.label ? null : item.label))}
            onClose={() => setOpen(null)}
            to={to}
          />
        ),
      )}
    </nav>
  );
}
