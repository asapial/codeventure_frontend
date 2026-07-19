import { z } from "zod";

/**
 * Project-domain schemas — used by P14 (list) and P15 (detail).
 */

export const projectStatusSchema = z.enum([
  "draft",
  "planning",
  "in-progress",
  "review",
  "launched",
  "paused",
  "archived",
]);
export type ProjectStatus = z.infer<typeof projectStatusSchema>;

export const projectSummarySchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  status: projectStatusSchema,
  package: z.string().nullable().optional(),
  progress: z.number().min(0).max(1).nullable().optional(),
  updatedAt: z.string().datetime(),
  nextMilestone: z
    .object({
      title: z.string(),
      dueAt: z.string().datetime().nullable().optional(),
    })
    .nullable()
    .optional(),
  coverImageUrl: z.string().url().nullable().optional(),
});
export type ProjectSummary = z.infer<typeof projectSummarySchema>;

export const projectIndexSchema = z.object({
  projects: z.array(projectSummarySchema),
  statuses: z.array(projectStatusSchema).default([]),
});
export type ProjectIndex = z.infer<typeof projectIndexSchema>;

export const deliverableSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  status: z.enum(["pending", "in-progress", "review", "complete", "blocked"]),
  dueAt: z.string().datetime().nullable().optional(),
});
export type Deliverable = z.infer<typeof deliverableSchema>;

export const projectDetailSchema = projectSummarySchema.extend({
  description: z.string(),
  startDate: z.string().datetime().nullable().optional(),
  launchDate: z.string().datetime().nullable().optional(),
  team: z
    .array(
      z.object({
        name: z.string(),
        role: z.string(),
        avatarUrl: z.string().url().nullable().optional(),
      }),
    )
    .default([]),
  deliverables: z.array(deliverableSchema).default([]),
  activity: z.array(activityEventSchemaShape()).default([]),
});

function activityEventSchemaShape() {
  // Imported via runtime import to avoid a circular top-level dep.
  return z.object({
    id: z.string(),
    at: z.string().datetime(),
    title: z.string(),
    description: z.string().nullable().optional(),
    href: z.string().nullable().optional(),
  });
}

export type ProjectDetail = z.infer<typeof projectDetailSchema>;