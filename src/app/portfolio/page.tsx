import type { Metadata } from "next";
import { portfolioList } from "@/content/portfolio";
import { PortfolioView } from "./_components/portfolio-view";

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

  return (
    <PortfolioView
      cases={portfolioList.cases}
      industries={portfolioList.industries}
      services={portfolioList.services}
      initialFilters={{
        industry: sp.industry ?? "",
        service: sp.service ?? "",
        q: sp.q ?? "",
      }}
    />
  );
}