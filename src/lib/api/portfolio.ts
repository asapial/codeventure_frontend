import { apiFetch, type ApiResult } from "./client";
import {
  caseStudyDetailSchema,
  portfolioListSchema,
  type CaseStudyDetail,
  type PortfolioList,
} from "@/types/portfolio";

/** GET /public/portfolio — full case-study grid with filter facets. */
export async function fetchPortfolio(): Promise<ApiResult<PortfolioList>> {
  return apiFetch("/public/portfolio", {
    schema: portfolioListSchema,
    next: { revalidate: 300, tags: ["public:portfolio:list"] },
  });
}

/** GET /public/portfolio/:slug — single case study. */
export async function fetchCaseStudyDetail(
  slug: string,
): Promise<ApiResult<CaseStudyDetail>> {
  return apiFetch(
    `/public/portfolio/${encodeURIComponent(slug)}`,
    {
      schema: caseStudyDetailSchema,
      next: { revalidate: 600, tags: [`public:portfolio:${slug}`] },
    },
  );
}

/** Backwards-compat: P1 already imports this. Returns featured subset. */
export async function fetchFeaturedPortfolio(): Promise<ApiResult<PortfolioList>> {
  const all = await fetchPortfolio();
  if (!all.ok) return all;
  return { ...all, data: { ...all.data, cases: all.data.cases.filter((c) => c.featured) } };
}
