import type { Metadata } from "next";
import { profile } from "@/lib/portfolio-data";
import styles from "@/components/code-lab.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy | Esteban Garzon",
  description:
    "Privacy policy for estebangarzon.com, including contact information, analytics, downloads, and external portfolio links.",
  alternates: {
    canonical: "/privacy-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const policySections = [
  {
    title: "Information you choose to share",
    body:
      "This site does not require an account, login, payment, newsletter signup, or comment profile. If you contact me by email, phone, LinkedIn, or another linked channel, I may receive the details you choose to send, such as your name, contact information, company, message content, and any professional context you include.",
  },
  {
    title: "Site analytics",
    body:
      "The site uses Vercel Web Analytics to understand aggregate traffic and page performance. Vercel Web Analytics is designed to provide privacy-friendly usage data without third-party cookies. Analytics may include page views, referrers, device or browser information, approximate location signals, and similar technical events used to maintain and improve the site.",
  },
  {
    title: "Downloads and external links",
    body:
      "The portfolio includes downloadable files and links to external services such as GitHub, LinkedIn, and hosted project artifacts. When you open an external link or download a file, the destination service may process information under its own privacy practices. I am not responsible for the content, security, or policies of external websites.",
  },
  {
    title: "How information is used",
    body:
      "Information is used to respond to direct messages, maintain the portfolio, understand which pages and resources are useful, protect the site, troubleshoot technical issues, and improve the clarity of public professional materials.",
  },
  {
    title: "Sharing and selling",
    body:
      "I do not sell personal information collected through this portfolio. Information may be processed by infrastructure and service providers that help host, secure, analyze, or deliver the site. Information may also be disclosed if required to comply with legal obligations or protect rights, safety, and security.",
  },
  {
    title: "Retention and security",
    body:
      "Direct messages may be retained for as long as needed to manage the professional relationship, answer follow-up questions, or keep appropriate business records. I use reasonable safeguards, but no website, email system, or internet transmission can be guaranteed to be completely secure.",
  },
  {
    title: "International visitors",
    body:
      "This portfolio is available globally. By using the site or contacting me, you understand that information may be processed in the countries where I or my service providers operate.",
  },
  {
    title: "Your choices",
    body:
      "You can avoid sharing contact information by browsing the site without sending a message. You can also use browser controls to limit referrers, block scripts, or manage privacy preferences. For questions about information you have shared directly with me, contact me at the email below.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className={styles.page}>
      <div className={styles.backdrop} />

      <header className={styles.header}>
        <a href="/" className={styles.brand}>
          {profile.name}
        </a>

        <div className={styles.headerLinks}>
          <a href="/">Home</a>
          <a href="/code">Code Lab</a>
          <a href="/analytics">Analytics</a>
          <a href="/#contact">Contact</a>
        </div>
      </header>

      <section className={styles.hero}>
        <div>
          <span className={styles.eyebrow}>Privacy Policy</span>
          <h1>Clear handling of contact, analytics, downloads, and external portfolio links.</h1>
          <p>
            Last updated: June 29, 2026. This policy explains how
            estebangarzon.com handles information in a public professional
            portfolio context.
          </p>
        </div>
      </section>

      <section className={styles.signalStrip}>
        <article className={styles.signalCard}>
          <span>Account access</span>
          <strong>None</strong>
          <p>No login, payment flow, newsletter, or user account is required to browse this site.</p>
        </article>
        <article className={styles.signalCard}>
          <span>Analytics</span>
          <strong>Vercel</strong>
          <p>Traffic is measured with privacy-friendly web analytics for maintenance and improvement.</p>
        </article>
        <article className={styles.signalCard}>
          <span>Contact</span>
          <strong>Email</strong>
          <p>Messages are handled through the contact methods you choose to use.</p>
        </article>
      </section>

      <section className={styles.resourceShelf}>
        <div className={styles.resourceHeading}>
          <span className={styles.eyebrow}>Policy Details</span>
          <h2>What the portfolio collects, uses, and links to.</h2>
        </div>

        <div className={styles.resourceGrid}>
          {policySections.map((section) => (
            <article key={section.title} className={styles.resourceCard}>
              <span className={styles.resourceTag}>Privacy</span>
              <h3>{section.title}</h3>
              <p>{section.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.dualSection}>
        <article className={styles.panelCard}>
          <div className={styles.panelHeading}>
            <span className={styles.eyebrow}>Contact</span>
            <h2>Questions or privacy requests.</h2>
          </div>
          <div className={styles.requirementGrid}>
            <div className={styles.requirementCard}>
              <strong>Email</strong>
              <p>
                For privacy questions or requests about information you have
                shared directly, contact{" "}
                <a href={`mailto:${profile.email}`}>{profile.email}</a>.
              </p>
            </div>
          </div>
        </article>

        <article className={styles.panelCard}>
          <div className={styles.panelHeading}>
            <span className={styles.eyebrow}>Updates</span>
            <h2>This page may change as the portfolio evolves.</h2>
          </div>
          <div className={styles.requirementGrid}>
            <div className={styles.requirementCard}>
              <strong>Policy changes</strong>
              <p>
                If the site adds new contact forms, analytics tools, downloads,
                or services, this policy will be updated with a new effective
                date.
              </p>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
