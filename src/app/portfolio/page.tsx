import type { Metadata } from "next";
import { fetchPortfolio } from "@/lib/api/portfolio";
import { PortfolioView } from "./_components/portfolio-view";
import { PortfolioFallback } from "./_components/portfolio-fallback";

export const metadata: Metadata = {
  title: "Portfolio — Selected work",
  description:
    "Recent web, eCommerce, and SEO engagements and the outcomes they produced.",
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: "Portfolio — CodeVenture",
    description: "Selected work and the outcomes we delivered.",
    url: "/portfolio",
    type: "website",
  },
};

interface PageProps {
  searchParams: Promise<{
    industry?: string;
    service?: string;
    q?: string;
  }>;
}

export default async function PortfolioPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const result = await fetchPortfolio();

  if (!result.ok) {
    return (
      <PortfolioFallback
        status={result.status}
        message={result.error.error.message}
      />
    );
  }

  return (
    <PortfolioView
      cases={result.data.cases}
      industries={result.data.industries}
      services={result.data.services}
      initialFilters={{
        industry: sp.industry ?? "",
        service: sp.service ?? "",
        q: sp.q ?? "",
      }}
    />
  );
}