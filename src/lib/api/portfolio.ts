import { apiFetch } from "./client";
import { caseStudySummarySchema, type CaseStudySummary } from "@/types/home";
import { z } from "zod";

export const portfolioListSchema = z.array(caseStudySummarySchema);

export async function fetchFeaturedPortfolio(): Promise<
  Awaited<ReturnType<typeof apiFetch<CaseStudySummary[]>>>
> {
  return apiFetch<CaseStudySummary[]>("/public/portfolio", {
    schema: portfolioListSchema,
    next: { revalidate: 300, tags: ["public:portfolio:featured"] },
  });
}
