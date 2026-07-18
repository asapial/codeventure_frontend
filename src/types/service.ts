import { z } from "zod";

/**
 * Service domain types — mirrors the backend contract for:
 *   GET /api/v1/public/services
 *   GET /api/v1/public/services/:slug
 */

export const serviceCategorySchema = z.enum(["design", "build", "operate"]);
export type ServiceCategory = z.infer<typeof serviceCategorySchema>;

export const CATEGORY_LABELS: Record<ServiceCategory, string> = {
  design: "Design",
  build: "Build",
  operate: "Operate",
};

export const serviceSummarySchema = z.object({
  id: z.string().uuid(),
  slug: z.string(),
  name: z.string(),
  summary: z.string(),
  category: serviceCategorySchema,
  startingPriceText: z.string().nullable().optional(),
  iconKey: z.string().nullable().optional(),
});
export type ServiceSummary = z.infer<typeof serviceSummarySchema>;

export const servicesListSchema = z.object({
  services: z.array(serviceSummarySchema),
});
export type ServicesList = z.infer<typeof servicesListSchema>;

export const serviceDeliverableSchema = z.object({
  title: z.string(),
  description: z.string(),
});
export type ServiceDeliverable = z.infer<typeof serviceDeliverableSchema>;

export const servicePricingTierSchema = z.object({
  name: z.string(),
  priceText: z.string(),
  description: z.string(),
  features: z.array(z.string()),
  highlighted: z.boolean().optional(),
});
export type ServicePricingTier = z.infer<typeof servicePricingTierSchema>;

export const serviceFaqSchema = z.object({
  question: z.string(),
  answer: z.string(),
});
export type ServiceFaq = z.infer<typeof serviceFaqSchema>;

export const relatedCaseStudySchema = z.object({
  slug: z.string(),
  title: z.string(),
  industry: z.string().nullable().optional(),
  summary: z.string().nullable().optional(),
  thumbnailUrl: z.string().url().nullable().optional(),
});
export type RelatedCaseStudy = z.infer<typeof relatedCaseStudySchema>;

export const serviceDetailSchema = serviceSummarySchema.extend({
  heroImageUrl: z.string().url().nullable().optional(),
  description: z.string(),
  deliverables: z.array(serviceDeliverableSchema).default([]),
  pricingTiers: z.array(servicePricingTierSchema).default([]),
  faqs: z.array(serviceFaqSchema).default([]),
  relatedCaseStudies: z.array(relatedCaseStudySchema).default([]),
});
export type ServiceDetail = z.infer<typeof serviceDetailSchema>;