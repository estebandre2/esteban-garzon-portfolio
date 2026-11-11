import { profile } from "@/lib/portfolio-data";
import styles from "./portfolio-shell.module.css";
import { SiteNav } from "./site-nav";

/** The landing's top bar, shared by every page so the menu is the same everywhere. */
export function SiteHeader({ home = false }: { home?: boolean }) {
  return (
    <header className={home ? styles.topbar : `${styles.topbar} ${styles.topbarInner}`}>
      <a href={home ? "#top" : "/"} className={styles.brand}>
        {profile.name}
      </a>
      <SiteNav home={home} />
    </header>
  );
}
