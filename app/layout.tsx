import type { Metadata } from "next";
import { Bricolage_Grotesque, Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { ContactButton } from "@/components/contact-button";
import { SITE_DESCRIPTION, SITE_TITLE, baseOpenGraph } from "@/lib/seo";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    "Esteban Garzon",
    "CTO",
    "Civil Engineering",
    "Hydrology",
    "Data Engineer",
    "ETL",
    "AI Agents",
    "AI Safety",
    "Business Intelligence",
    "Python",
    "Portfolio",
  ],
  authors: [{ name: "Esteban Garzon" }],
  creator: "Esteban Garzon",
  metadataBase: new URL("https://www.estebangarzon.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    ...baseOpenGraph,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable}`}>
        {children}
        <ContactButton />
        <Analytics />
      </body>
    </html>
  );
}
