import { z } from "zod";

/**
 * Legal document types (P21). Mirrors the backend Prisma `LegalDocumentType`
 * enum but uses kebab-case on the wire so it lines up with the URL slugs.
 */
export const legalDocumentTypeSchema = z.enum([
  "privacy-policy",
  "terms-of-service",
  "acceptable-use",
  "cookie-policy",
  "data-processing-agreement",
]);
export type LegalDocumentType = z.infer<typeof legalDocumentTypeSchema>;

export const legalDocumentStatusSchema = z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]);

/** Public response from GET /public/legal/:slug. */
export const publicLegalDocumentSchema = z.object({
  slug: z.string(),
  type: legalDocumentTypeSchema,
  title: z.string(),
  status: legalDocumentStatusSchema,
  publishedAt: z.string().datetime().nullable(),
  version: z.number().int().positive(),
  effectiveAt: z.string().datetime(),
  requiresReconsent: z.boolean(),
  body: z.string(),
});
export type PublicLegalDocument = z.infer<typeof publicLegalDocumentSchema>;
