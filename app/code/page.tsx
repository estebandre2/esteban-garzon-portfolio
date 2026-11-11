import type { Metadata } from "next";
import { CodeLab } from "@/components/code-lab";
import { pageSocial } from "@/lib/seo";

const title = "Code Lab | Esteban Garzon";
const description =
  "Curated code samples, integration patterns, and sanitized public source bundles covering ETL, APIs, telemetry pipelines, Microsoft Graph, RFMS, Moraware, and Excel automation.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/code",
  },
  ...pageSocial(title, description, "/code"),
};

export default function CodePage() {
  return <CodeLab />;
}
