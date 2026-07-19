import { z } from "zod";

/**
 * About-page domain types — mirrors the backend `GET /public/about`.
 */

export const teamMemberSchema = z.object({
  name: z.string(),
  role: z.string(),
  bio: z.string().optional(),
  photoUrl: z.string().url().nullable().optional(),
});
export type TeamMember = z.infer<typeof teamMemberSchema>;

export const valueSchema = z.object({
  title: z.string(),
  description: z.string(),
});
export type Value = z.infer<typeof valueSchema>;

export const certificationSchema = z.object({
  name: z.string(),
  issuer: z.string(),
  year: z.number().int().optional(),
  url: z.string().url().optional(),
});
export type Certification = z.infer<typeof certificationSchema>;

export const milestoneSchema = z.object({
  year: z.number().int(),
  title: z.string(),
  description: z.string().optional(),
});
export type Milestone = z.infer<typeof milestoneSchema>;

export const aboutPageSchema = z.object({
  headline: z.string(),
  intro: z.string(),
  mission: z.string().nullable().optional(),
  values: z.array(valueSchema).default([]),
  milestones: z.array(milestoneSchema).default([]),
  team: z.array(teamMemberSchema).default([]),
  certifications: z.array(certificationSchema).default([]),
});
export type AboutPage = z.infer<typeof aboutPageSchema>;