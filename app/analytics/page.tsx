import type { Metadata } from "next";
import { AnalyticsLab } from "@/components/analytics-lab";
import { pageSocial } from "@/lib/seo";

const title = "Applied Analytics | Esteban Garzon";
const description =
  "Forecasting, business intelligence, data visualization, graph analysis, and analytics case work curated as a public-facing portfolio layer for Esteban Garzon.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/analytics",
  },
  ...pageSocial(title, description, "/analytics"),
};

export default function AnalyticsPage() {
  return <AnalyticsLab />;
}
