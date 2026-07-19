import { apiFetch } from "./client";
import {
  caseStudyDetailSchema,
  portfolioListSchema,
  type CaseStudyDetail,
  type PortfolioList,
} from "@/types/portfolio";

/** GET /public/portfolio — full case-study grid with filter facets. */
export async function fetchPortfolio(): Promise<PortfolioList> {
  const result = await apiFetch("/public/portfolio", {
    schema: portfolioListSchema,
    next: { revalidate: 300, tags: ["public:portfolio:list"] },
  });
  if (!result.ok) throw new Error(result.error.error.message);
  return result.data;
}

/** GET /public/portfolio/:slug — single case study. */
export async function fetchCaseStudyDetail(
  slug: string,
): Promise<CaseStudyDetail> {
  const result = await apiFetch(
    `/public/portfolio/${encodeURIComponent(slug)}`,
    {
      schema: caseStudyDetailSchema,
      next: { revalidate: 600, tags: [`public:portfolio:${slug}`] },
    },
  );
  if (!result.ok) throw new Error(result.error.error.message);
  return result.data;
}

/** Backwards-compat: P1 already imports this. Returns featured subset. */
export async function fetchFeaturedPortfolio(): Promise<PortfolioList> {
  const all = await fetchPortfolio();
  return {
    ...all,
    cases: all.cases.filter((c) => c.featured),
  };
}
