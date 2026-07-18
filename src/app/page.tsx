import type { Metadata } from "next";
import { fetchHomePage } from "@/lib/api/home";
import { LandingView } from "./_components/landing-view";
import { LandingViewFallback } from "./_components/landing-view-fallback";

export const metadata: Metadata = {
  title: "Web, eCommerce, and SEO delivery — built for outcomes",
  description:
    "CodeVenture designs, develops, and operates websites, eCommerce stores, and SEO programs for growing businesses. Request a quote in minutes.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "CodeVenture — Web, eCommerce, and SEO delivery",
    description:
      "Design, build, and operate websites, eCommerce, and SEO programs that produce measurable business outcomes.",
    url: "/",
    type: "website",
  },
};

const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "CodeVenture",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://codeventure.example",
  description:
    "CodeVenture designs, builds, and operates websites, eCommerce, and SEO programs.",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    url: "/contact",
  },
};

export default async function HomePage() {
  const result = await fetchHomePage();

  return (
    <>
      <script
        type="application/ld+json"
        // Server-rendered, no user input — safe to dangerouslySetInnerHTML.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSONLD) }}
      />
      {result.ok ? (
        <LandingView data={result.data} />
      ) : (
        <LandingViewFallback
          status={result.status}
          requestId={result.error.error.requestId}
          message={result.error.error.message}
        />
      )}
    </>
  );
}
