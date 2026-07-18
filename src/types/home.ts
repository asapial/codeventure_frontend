import { z } from "zod";

/**
 * Landing-page domain types — mirrors the backend `GET /api/v1/public/home`
 * contract. Kept permissive where the CMS could return rich text or arrays
 * of unknown shape; the contract package will tighten these once it exists.
 */

export const serviceSummarySchema = z.object({
  id: z.string().uuid(),
  slug: z.string(),
  name: z.string(),
  summary: z.string(),
  category: z.string(),
  startingPriceText: z.string().nullable().optional(),
});
export type ServiceSummary = z.infer<typeof serviceSummarySchema>;

export const caseStudySummarySchema = z.object({
  id: z.string().uuid(),
  slug: z.string(),
  title: z.string(),
  summary: z.string().nullable().optional(),
  thumbnailUrl: z.string().url().nullable().optional(),
  industry: z.string().nullable().optional(),
});
export type CaseStudySummary = z.infer<typeof caseStudySummarySchema>;

export const testimonialSummarySchema = z.object({
  id: z.string().uuid(),
  authorName: z.string(),
  authorRole: z.string().nullable().optional(),
  authorCompany: z.string().nullable().optional(),
  quote: z.string(),
});
export type TestimonialSummary = z.infer<typeof testimonialSummarySchema>;

export const trustSignalSchema = z.object({
  label: z.string(),
  value: z.string(),
});
export type TrustSignal = z.infer<typeof trustSignalSchema>;

export const outcomeMetricSchema = z.object({
  label: z.string(),
  value: z.string(),
  description: z.string().optional(),
});
export type OutcomeMetric = z.infer<typeof outcomeMetricSchema>;

export const homePageSchema = z.object({
  heroHeadline: z.string(),
  heroSubheadline: z.string(),
  primaryCta: z.object({
    label: z.string(),
    url: z.string(),
  }),
  secondaryCta: z.object({
    label: z.string(),
    url: z.string(),
  }),
  outcomeMetrics: z.array(outcomeMetricSchema).default([]),
  trustSignals: z.array(trustSignalSchema).default([]),
  featuredServices: z.array(serviceSummarySchema).default([]),
  featuredCases: z.array(caseStudySummarySchema).default([]),
  testimonials: z.array(testimonialSummarySchema).default([]),
});
export type HomePage = z.infer<typeof homePageSchema>;
