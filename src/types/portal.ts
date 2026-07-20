import { z } from "zod";

/**
 * Portal-domain schemas — used by C1–C10 of the customer portal.
 *
 * The wire schema here mirrors the typed shapes produced by the backend
 * `src/modules/portal/*` modules. Where the backend serialises enums as
 * uppercase strings, we accept them case-insensitively so a `priority: "Normal"`
 * payload from a different client still validates cleanly.
 */

// ---------------------------------------------------------------------------
// C1 — Dashboard
// ---------------------------------------------------------------------------

export const priorityActionKindSchema = z.enum([
  "overdue-invoice",
  "approval-pending",
  "support-reply",
  "change-request-open",
]);
export type PriorityActionKind = z.infer<typeof priorityActionKindSchema>;

export const priorityActionSeveritySchema = z.enum([
  "info",
  "warning",
  "critical",
]);
export type PriorityActionSeverity = z.infer<typeof priorityActionSeveritySchema>;

export const priorityActionSchema = z.object({
  id: z.string(),
  kind: priorityActionKindSchema,
  title: z.string(),
  description: z.string(),
  cta: z.object({
    label: z.string(),
    href: z.string(),
  }),
  dueAt: z.string().datetime().nullable().optional(),
  severity: priorityActionSeveritySchema,
});
export type PriorityAction = z.infer<typeof priorityActionSchema>;

export const organizationSummarySchema = z.object({
  id: z.string(),
  name: z.string(),
  planName: z.string(),
  memberCount: z.number().int().nonnegative(),
  primaryDomain: z.string().nullable(),
});
export type OrganizationSummary = z.infer<typeof organizationSummarySchema>;

export const customerDashboardSchema = z.object({
  summary: z.object({
    activeProjects: z.number().int().nonnegative(),
    openInvoices: z.number().int().nonnegative(),
    unreadMessages: z.number().int().nonnegative(),
    outstandingBalance: z.number().nonnegative(),
    openTicketCount: z.number().int().nonnegative(),
    currency: z.string().length(3),
  }),
  organizationSummary: organizationSummarySchema.nullable(),
  priorityActions: z.array(priorityActionSchema).default([]),
  recentActivity: z
    .array(
      z.object({
        id: z.string(),
        at: z.string().datetime(),
        title: z.string(),
        description: z.string().nullable().optional(),
        href: z.string().nullable().optional(),
      }),
    )
    .default([]),
});
export type CustomerDashboard = z.infer<typeof customerDashboardSchema>;

// ---------------------------------------------------------------------------
// C2 — Onboarding
// ---------------------------------------------------------------------------

export const onboardingStepStatusSchema = z.enum([
  "not-started",
  "in-progress",
  "complete",
]);
export type OnboardingStepStatus = z.infer<typeof onboardingStepStatusSchema>;

export const onboardingStepSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  status: onboardingStepStatusSchema,
  order: z.number().int().nonnegative(),
});
export type OnboardingStep = z.infer<typeof onboardingStepSchema>;

export const onboardingContactSchema = z.object({
  fullName: z.string().nullable(),
  email: z.string().email().nullable(),
  phone: z.string().nullable(),
  timezone: z.string().nullable(),
});
export type OnboardingContact = z.infer<typeof onboardingContactSchema>;

export const onboardingBusinessSchema = z.object({
  legalName: z.string().nullable(),
  tradingName: z.string().nullable(),
  registrationNumber: z.string().nullable(),
  industry: z.string().nullable(),
});
export type OnboardingBusiness = z.infer<typeof onboardingBusinessSchema>;

export const onboardingBrandSchema = z.object({
  primaryColor: z.string().nullable(),
  secondaryColor: z.string().nullable(),
  voice: z.string().nullable(),
  logoUrl: z.string().url().nullable(),
});
export type OnboardingBrand = z.infer<typeof onboardingBrandSchema>;

export const onboardingTeamInviteStatusSchema = z.enum([
  "pending",
  "accepted",
  "expired",
  "revoked",
]);
export type OnboardingTeamInviteStatus = z.infer<
  typeof onboardingTeamInviteStatusSchema
>;

export const onboardingTeamInviteSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  role: z.string(),
  status: onboardingTeamInviteStatusSchema,
  invitedAt: z.string().datetime(),
  expiresAt: z.string().datetime(),
  invitedBy: z.string().nullable().optional(),
});
export type OnboardingTeamInvite = z.infer<typeof onboardingTeamInviteSchema>;

export const onboardingTeamSchema = z.object({
  owner: z
    .object({
      id: z.string(),
      fullName: z.string(),
      email: z.string().email(),
      role: z.string(),
    })
    .nullable(),
  members: z
    .array(
      z.object({
        id: z.string(),
        fullName: z.string(),
        email: z.string().email(),
        role: z.string(),
      }),
    )
    .default([]),
  invites: z.array(onboardingTeamInviteSchema).default([]),
});
export type OnboardingTeam = z.infer<typeof onboardingTeamSchema>;

export const onboardingStateSchema = z.object({
  contact: onboardingContactSchema,
  business: onboardingBusinessSchema,
  brand: onboardingBrandSchema,
  team: onboardingTeamSchema,
  steps: z.array(onboardingStepSchema).default([]),
  completionPercent: z.number().min(0).max(100),
});
export type OnboardingState = z.infer<typeof onboardingStateSchema>;

// ---------------------------------------------------------------------------
// C3 / C4 — Projects
// ---------------------------------------------------------------------------

export const projectHealthSchema = z.enum([
  "on-track",
  "at-risk",
  "off-track",
  "completed",
]);
export type ProjectHealth = z.infer<typeof projectHealthSchema>;

export const projectPhaseSchema = z.enum([
  "discovery",
  "design",
  "build",
  "review",
  "launch",
  "support",
]);
export type ProjectPhase = z.infer<typeof projectPhaseSchema>;

export const portalProjectSummarySchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  phase: projectPhaseSchema,
  health: projectHealthSchema,
  progressPercent: z.number().min(0).max(100),
  packageName: z.string().nullable(),
  nextMilestone: z
    .object({
      title: z.string(),
      dueAt: z.string().datetime().nullable(),
    })
    .nullable(),
  updatedAt: z.string().datetime(),
  coverImageUrl: z.string().url().nullable(),
});
export type PortalProjectSummary = z.infer<typeof portalProjectSummarySchema>;

export const portalProjectIndexSchema = z.object({
  projects: z.array(portalProjectSummarySchema),
  phases: z.array(projectPhaseSchema).default([]),
  healths: z.array(projectHealthSchema).default([]),
  totals: z.object({
    active: z.number().int().nonnegative(),
    attention: z.number().int().nonnegative(),
  }),
});
export type PortalProjectIndex = z.infer<typeof portalProjectIndexSchema>;

export const portalProjectListQuerySchema = z.object({
  phase: projectPhaseSchema.optional(),
  health: projectHealthSchema.optional(),
  q: z.string().optional(),
  page: z.number().int().nonnegative().optional(),
  perPage: z.number().int().positive().max(100).optional(),
});
export type PortalProjectListQuery = z.infer<
  typeof portalProjectListQuerySchema
>;

export const portalMilestoneSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  status: z.enum(["pending", "in-progress", "review", "complete", "blocked"]),
  dueAt: z.string().datetime().nullable(),
  completedAt: z.string().datetime().nullable(),
});
export type PortalMilestone = z.infer<typeof portalMilestoneSchema>;

export const portalApprovalStatusSchema = z.enum([
  "pending",
  "approved",
  "rejected",
  "expired",
]);
export type PortalApprovalStatus = z.infer<typeof portalApprovalStatusSchema>;

export const portalApprovalSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  status: portalApprovalStatusSchema,
  dueAt: z.string().datetime().nullable(),
  requestedAt: z.string().datetime(),
  respondedAt: z.string().datetime().nullable(),
  version: z.number().int().nonnegative(),
  projectVersion: z.number().int().nonnegative(),
  requestedBy: z.string().nullable(),
});
export type PortalApproval = z.infer<typeof portalApprovalSchema>;

export const portalChangeRequestImpactSchema = z.enum(["low", "medium", "high"]);
export type PortalChangeRequestImpact = z.infer<
  typeof portalChangeRequestImpactSchema
>;

export const portalChangeRequestStatusSchema = z.enum([
  "pending",
  "approved",
  "rejected",
  "withdrawn",
]);
export type PortalChangeRequestStatus = z.infer<
  typeof portalChangeRequestStatusSchema
>;

export const portalChangeRequestSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  impact: portalChangeRequestImpactSchema,
  status: portalChangeRequestStatusSchema,
  submittedAt: z.string().datetime(),
  decidedAt: z.string().datetime().nullable(),
  submittedBy: z.string().nullable(),
});
export type PortalChangeRequest = z.infer<typeof portalChangeRequestSchema>;

export const portalProjectFileSchema = z.object({
  id: z.string(),
  name: z.string(),
  mimeType: z.string(),
  sizeBytes: z.number().int().nonnegative(),
  url: z.string().url(),
  uploadedAt: z.string().datetime(),
  uploadedBy: z.string().nullable(),
  category: z.string().nullable(),
});
export type PortalProjectFile = z.infer<typeof portalProjectFileSchema>;

export const portalProjectActivitySchema = z.object({
  id: z.string(),
  at: z.string().datetime(),
  title: z.string(),
  description: z.string().nullable(),
  href: z.string().nullable(),
  actor: z.string().nullable(),
  kind: z.string(),
});
export type PortalProjectActivity = z.infer<typeof portalProjectActivitySchema>;

export const portalProjectCommentSchema = z.object({
  id: z.string(),
  body: z.string(),
  createdAt: z.string().datetime(),
  author: z.object({
    name: z.string(),
    avatarUrl: z.string().url().nullable(),
    role: z.string(),
  }),
});
export type PortalProjectComment = z.infer<typeof portalProjectCommentSchema>;

export const portalProjectDetailSchema = portalProjectSummarySchema.extend({
  description: z.string(),
  startDate: z.string().datetime().nullable(),
  launchDate: z.string().datetime().nullable(),
  lead: z
    .object({
      name: z.string(),
      role: z.string(),
      avatarUrl: z.string().url().nullable(),
    })
    .nullable(),
  team: z
    .array(
      z.object({
        name: z.string(),
        role: z.string(),
        avatarUrl: z.string().url().nullable(),
      }),
    )
    .default([]),
  milestones: z.array(portalMilestoneSchema).default([]),
  approvals: z.array(portalApprovalSchema).default([]),
  changeRequests: z.array(portalChangeRequestSchema).default([]),
  files: z.array(portalProjectFileSchema).default([]),
  activity: z.array(portalProjectActivitySchema).default([]),
});
export type PortalProjectDetail = z.infer<typeof portalProjectDetailSchema>;

export const respondApprovalInputSchema = z.object({
  approvalId: z.string(),
  decision: z.enum(["approve", "reject"]),
  note: z.string().max(500).optional(),
  version: z.number().int().nonnegative(),
});
export type RespondApprovalInput = z.infer<typeof respondApprovalInputSchema>;

export const respondApprovalResponseSchema = z.object({
  approvalId: z.string(),
  status: portalApprovalStatusSchema,
  version: z.number().int().nonnegative(),
  respondedAt: z.string().datetime(),
});
export type RespondApprovalResponse = z.infer<
  typeof respondApprovalResponseSchema
>;

export const submitChangeRequestInputSchema = z.object({
  title: z.string().min(3).max(120),
  description: z.string().min(10).max(2000),
  impact: portalChangeRequestImpactSchema.default("medium"),
});
export type SubmitChangeRequestInput = z.infer<
  typeof submitChangeRequestInputSchema
>;

export const submitChangeRequestResponseSchema = z.object({
  changeRequestId: z.string(),
  impact: portalChangeRequestImpactSchema,
  status: portalChangeRequestStatusSchema,
  submittedAt: z.string().datetime(),
});
export type SubmitChangeRequestResponse = z.infer<
  typeof submitChangeRequestResponseSchema
>;

export const postCommentInputSchema = z.object({
  body: z.string().min(1).max(2000),
});
export type PostCommentInput = z.infer<typeof postCommentInputSchema>;

export const postFileInputSchema = z.object({
  name: z.string(),
  mimeType: z.string(),
  sizeBytes: z.number().int().nonnegative(),
  url: z.string().url(),
  category: z.string().optional(),
});
export type PostFileInput = z.infer<typeof postFileInputSchema>;

// ---------------------------------------------------------------------------
// C5 — Maintenance
// ---------------------------------------------------------------------------

export const maintenancePlanTierSchema = z.enum([
  "included",
  "priority",
  "platinum",
  "none",
]);
export type MaintenancePlanTier = z.infer<typeof maintenancePlanTierSchema>;

export const maintenanceSubscriptionSchema = z.object({
  tier: maintenancePlanTierSchema,
  monthlyHours: z.number().int().nonnegative(),
  remainingHours: z.number().int().nonnegative(),
  cycleStart: z.string().datetime().nullable(),
  cycleEnd: z.string().datetime().nullable(),
  nextResetAt: z.string().datetime().nullable(),
});
export type MaintenanceSubscription = z.infer<
  typeof maintenanceSubscriptionSchema
>;

export const maintenanceRequestStatusSchema = z.enum([
  "submitted",
  "triaged",
  "in-progress",
  "awaiting-customer",
  "resolved",
  "closed",
]);
export type MaintenanceRequestStatus = z.infer<
  typeof maintenanceRequestStatusSchema
>;

export const maintenancePrioritySchema = z.enum([
  "low",
  "normal",
  "high",
  "urgent",
]);
export type MaintenancePriority = z.infer<typeof maintenancePrioritySchema>;

export const maintenanceRequestTypeSchema = z.enum([
  "update",
  "bug",
  "content",
  "performance",
  "security",
  "backup",
  "consult",
]);
export type MaintenanceRequestType = z.infer<
  typeof maintenanceRequestTypeSchema
>;

export const maintenanceRequestSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  requestType: maintenanceRequestTypeSchema,
  priority: maintenancePrioritySchema,
  status: maintenanceRequestStatusSchema,
  submittedAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  acknowledgedAt: z.string().datetime().nullable(),
  resolvedAt: z.string().datetime().nullable(),
});
export type MaintenanceRequest = z.infer<typeof maintenanceRequestSchema>;

export const submitMaintenanceRequestInputSchema = z.object({
  title: z.string().min(3).max(120),
  description: z.string().min(10).max(4000),
  requestType: maintenanceRequestTypeSchema,
  priority: maintenancePrioritySchema.default("normal"),
});
export type SubmitMaintenanceRequestInput = z.infer<
  typeof submitMaintenanceRequestInputSchema
>;

export const submitMaintenanceRequestResponseSchema = z.object({
  requestId: z.string(),
  status: maintenanceRequestStatusSchema,
  submittedAt: z.string().datetime(),
});
export type SubmitMaintenanceRequestResponse = z.infer<
  typeof submitMaintenanceRequestResponseSchema
>;

export const maintenanceStateSchema = z.object({
  subscription: maintenanceSubscriptionSchema.nullable(),
  recentReports: z.array(maintenanceRequestSchema).default([]),
  activeRequests: z.array(maintenanceRequestSchema).default([]),
  metrics: z.object({
    openCount: z.number().int().nonnegative(),
    averageFirstResponseHours: z.number().nonnegative().nullable(),
    averageResolutionHours: z.number().nonnegative().nullable(),
  }),
});
export type MaintenanceState = z.infer<typeof maintenanceStateSchema>;
