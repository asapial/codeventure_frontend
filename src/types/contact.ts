import { z } from "zod";

/**
 * Contact-page domain types — mirrors the backend
 *   GET  /public/contact
 *   POST /contact/messages
 */

export const officeSchema = z.object({
  name: z.string(),
  addressLines: z.array(z.string()).default([]),
  city: z.string(),
  country: z.string(),
  phone: z.string().nullable().optional(),
  email: z.string().email().nullable().optional(),
  hours: z.string().nullable().optional(),
});
export type Office = z.infer<typeof officeSchema>;

export const socialLinkSchema = z.object({
  platform: z.string(), // "twitter" | "linkedin" | "github" | ...
  url: z.string().url(),
});
export type SocialLink = z.infer<typeof socialLinkSchema>;

export const contactDetailsSchema = z.object({
  headline: z.string(),
  intro: z.string(),
  offices: z.array(officeSchema).default([]),
  social: z.array(socialLinkSchema).default([]),
  supportEmail: z.string().email().nullable().optional(),
  salesEmail: z.string().email().nullable().optional(),
  responseTime: z.string().nullable().optional(),
});
export type ContactDetails = z.infer<typeof contactDetailsSchema>;

/**
 * Form schema — the client submission payload.
 * Subject is constrained to a small allow-list to keep triage triage-friendly.
 */
export const TOPIC_VALUES = [
  "general",
  "sales",
  "support",
  "partnership",
  "press",
  "careers",
] as const;
export const topicSchema = z.enum(TOPIC_VALUES);

export const contactMessageSchema = z.object({
  name: z.string().min(2, "Please enter your full name.").max(120),
  email: z.string().email("Please enter a valid email address."),
  company: z.string().max(160).optional().or(z.literal("")),
  topic: topicSchema,
  subject: z
    .string()
    .min(4, "Subject must be at least 4 characters.")
    .max(160),
  message: z
    .string()
    .min(20, "Please write at least 20 characters so we can help.")
    .max(4000),
  // Honeypot — bots fill it, humans don't.
  website: z.string().max(0).optional().or(z.literal("")),
});
export type ContactMessage = z.infer<typeof contactMessageSchema>;

export const contactTopicLabels: Record<z.infer<typeof topicSchema>, string> = {
  general: "General inquiry",
  sales: "Sales / quote",
  support: "Existing project support",
  partnership: "Partnership",
  press: "Press / media",
  careers: "Careers",
};

export const contactSubmissionResponseSchema = z.object({
  id: z.string(),
  receivedAt: z.string().datetime().optional(),
});
export type ContactSubmissionResponse = z.infer<
  typeof contactSubmissionResponseSchema
>;
