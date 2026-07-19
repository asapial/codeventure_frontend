import { z } from "zod";

/**
 * Blog post types. Mirrors the conventions used in `legal.ts`: a zod schema
 * alongside the inferred type so the same shape can be reused when the
 * content module is later swapped for a CMS-backed API.
 */
export const blogPostSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  excerpt: z.string().min(1),
  body: z.string().min(1),
  tag: z.string().min(1),
  publishedAt: z.string(), // ISO date
  readingMinutes: z.number().int().positive(),
  authorName: z.string().min(1),
  authorRole: z.string().min(1),
  /** Two Tailwind gradient classes used for the post's hero placeholder. */
  heroGradient: z.string().min(1),
  /** Single Tailwind class for the icon color, e.g. "text-blue-600". */
  heroAccent: z.string().min(1),
});
export type BlogPost = z.infer<typeof blogPostSchema>;

/** Lightweight projection used by the /blog index cards. */
export const blogPostSummarySchema = blogPostSchema.pick({
  slug: true,
  title: true,
  excerpt: true,
  tag: true,
  publishedAt: true,
  readingMinutes: true,
  authorName: true,
  authorRole: true,
  heroGradient: true,
  heroAccent: true,
});
export type BlogPostSummary = z.infer<typeof blogPostSummarySchema>;
