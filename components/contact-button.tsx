import styles from "./contact-button.module.css";

/** Fixed on every page so a visitor can always reach the contact station. */
export function ContactButton() {
  return (
    <a href="/#contact" className={styles.contact}>
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <path d="M3 5.5h14v9H3z M3.5 6l6.5 5 6.5-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
      Contact
    </a>
  );
}
