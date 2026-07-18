import { z } from "zod";

/**
 * Quote draft types — mirrors the backend `POST /api/v1/quotes/drafts`
 * contract from Section 12.1 (P2 Request Quote).
 */

export const budgetRangeSchema = z.enum([
  "under_5k",
  "5k_15k",
  "15k_50k",
  "50k_150k",
  "over_150k",
]);
export type BudgetRange = z.infer<typeof budgetRangeSchema>;

export const timelineSchema = z.enum([
  "asap",
  "1_3_months",
  "3_6_months",
  "6_plus_months",
  "exploring",
]);
export type Timeline = z.infer<typeof timelineSchema>;

export const serviceSlugSchema = z.string().min(1).max(64);

export const contactInfoSchema = z.object({
  fullName: z.string().min(2, "Enter your full name").max(120),
  email: z.string().email("Enter a valid work email"),
  phone: z
    .string()
    .max(40)
    .regex(/^[+0-9()\-\s]*$/u, "Use digits, spaces, +, -, ( ) only")
    .optional()
    .or(z.literal("")),
  company: z.string().max(120).optional().or(z.literal("")),
});
export type ContactInfo = z.infer<typeof contactInfoSchema>;

export const projectInfoSchema = z.object({
  serviceSlugs: z
    .array(serviceSlugSchema)
    .min(1, "Pick at least one service")
    .max(6, "Pick up to 6 services"),
  summary: z
    .string()
    .min(20, "Tell us a bit more — at least 20 characters")
    .max(2000, "Keep it under 2000 characters"),
  goals: z.string().max(1000).optional().or(z.literal("")),
});
export type ProjectInfo = z.infer<typeof projectInfoSchema>;

export const budgetInfoSchema = z.object({
  budget: budgetRangeSchema,
  timeline: timelineSchema,
});
export type BudgetInfo = z.infer<typeof budgetInfoSchema>;

export const quoteDraftSchema = contactInfoSchema
  .merge(projectInfoSchema)
  .merge(budgetInfoSchema);
export type QuoteDraft = z.infer<typeof quoteDraftSchema>;

export const quoteDraftResponseSchema = z.object({
  id: z.string(),
  status: z.enum(["received", "in_review", "quoted", "declined"]),
  receivedAt: z.string(),
  estimatedResponseBy: z.string().optional(),
});
export type QuoteDraftResponse = z.infer<typeof quoteDraftResponseSchema>;

export const quoteServiceOptionSchema = z.object({
  slug: serviceSlugSchema,
  name: z.string(),
  category: z.enum(["design", "build", "operate"]),
});
export type QuoteServiceOption = z.infer<typeof quoteServiceOptionSchema>;

export const quoteServicesResponseSchema = z.object({
  services: z.array(quoteServiceOptionSchema),
});
export type QuoteServicesResponse = z.infer<typeof quoteServicesResponseSchema>;

export const BUDGET_LABELS: Record<BudgetRange, string> = {
  under_5k: "Under $5K",
  "5k_15k": "$5K – $15K",
  "15k_50k": "$15K – $50K",
  "50k_150k": "$50K – $150K",
  over_150k: "Over $150K",
};

export const TIMELINE_LABELS: Record<Timeline, string> = {
  asap: "ASAP",
  "1_3_months": "1–3 months",
  "3_6_months": "3–6 months",
  "6_plus_months": "6+ months",
  exploring: "Just exploring",
};
