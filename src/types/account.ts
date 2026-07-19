import { z } from "zod";

/**
 * Account-domain schemas — used by the P13 dashboard summary.
 */

export const billingSummarySchema = z.object({
  currency: z.string().length(3),
  outstanding: z.number().nonnegative(),
  nextInvoiceAt: z.string().datetime().nullable(),
});
export type BillingSummary = z.infer<typeof billingSummarySchema>;

export const activityEventSchema = z.object({
  id: z.string(),
  at: z.string().datetime(),
  title: z.string(),
  description: z.string().nullable().optional(),
  href: z.string().nullable().optional(),
});
export type ActivityEvent = z.infer<typeof activityEventSchema>;

export const accountSummarySchema = z.object({
  activeProjects: z.number().int().nonnegative(),
  openInvoices: z.number().int().nonnegative(),
  unreadMessages: z.number().int().nonnegative(),
  billing: billingSummarySchema.nullable(),
  recentActivity: z.array(activityEventSchema).default([]),
});
export type AccountSummary = z.infer<typeof accountSummarySchema>;