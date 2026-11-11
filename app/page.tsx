import { PortfolioShell } from "@/components/portfolio-shell";
import { personJsonLd, serializeJsonLd } from "@/lib/seo";

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(personJsonLd()) }} />
      <PortfolioShell />
    </>
  );
}
