import { z } from "zod";

/**
 * Portfolio / case-study domain types.
 *   GET /api/v1/public/portfolio            — full grid
 *   GET /api/v1/public/portfolio/:slug      — single case study
 */

export const caseStudySummarySchema = z.object({
  id: z.string().uuid(),
  slug: z.string(),
  title: z.string(),
  summary: z.string().nullable().optional(),
  thumbnailUrl: z.string().url().nullable().optional(),
  thumbnailAlt: z.string().nullable().optional(),
  industry: z.string().nullable().optional(),
  serviceSlugs: z.array(z.string()).default([]),
  publishedAt: z.string().nullable().optional(),
  featured: z.boolean().optional(),
});
export type CaseStudySummary = z.infer<typeof caseStudySummarySchema>;

export const portfolioListSchema = z.object({
  cases: z.array(caseStudySummarySchema),
  industries: z.array(z.string()).default([]),
  services: z.array(z.string()).default([]),
});
export type PortfolioList = z.infer<typeof portfolioListSchema>;

export const caseStudySectionSchema = z.object({
  heading: z.string(),
  body: z.string(),
  imageUrl: z.string().url().nullable().optional(),
  imageAlt: z.string().nullable().optional(),
});
export type CaseStudySection = z.infer<typeof caseStudySectionSchema>;

export const caseStudyMetricSchema = z.object({
  label: z.string(),
  value: z.string(),
  context: z.string().optional(),
});
export type CaseStudyMetric = z.infer<typeof caseStudyMetricSchema>;

export const caseStudyGalleryItemSchema = z.object({
  url: z.string().url(),
  alt: z.string(),
  caption: z.string().optional(),
});
export type CaseStudyGalleryItem = z.infer<typeof caseStudyGalleryItemSchema>;

export const caseStudyTestimonialSchema = z.object({
  quote: z.string(),
  authorName: z.string(),
  authorRole: z.string().nullable().optional(),
  authorCompany: z.string().nullable().optional(),
});
export type CaseStudyTestimonial = z.infer<typeof caseStudyTestimonialSchema>;

export const caseStudyDetailSchema = caseStudySummarySchema.extend({
  clientName: z.string().nullable().optional(),
  heroImageUrl: z.string().url().nullable().optional(),
  heroImageAlt: z.string().nullable().optional(),
  problem: z.string(),
  approach: z.string(),
  outcome: z.string(),
  metrics: z.array(caseStudyMetricSchema).default([]),
  sections: z.array(caseStudySectionSchema).default([]),
  gallery: z.array(caseStudyGalleryItemSchema).default([]),
  testimonial: caseStudyTestimonialSchema.nullable().optional(),
  relatedSlugs: z.array(z.string()).default([]),
});
export type CaseStudyDetail = z.infer<typeof caseStudyDetailSchema>;