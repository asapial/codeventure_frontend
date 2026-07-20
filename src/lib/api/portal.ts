import { ApiError, ApiTransportError, apiFetch } from "./client";
import {
  customerDashboardSchema,
  maintenanceStateSchema,
  onboardingStateSchema,
  portalProjectDetailSchema,
  portalProjectIndexSchema,
  type CustomerDashboard,
  type MaintenanceState,
  type OnboardingState,
  type PortalProjectDetail,
  type PortalProjectIndex,
  type PortalProjectListQuery,
  type PostCommentInput,
  type PostFileInput,
  type RespondApprovalInput,
  type RespondApprovalResponse,
  type SubmitChangeRequestInput,
  type SubmitChangeRequestResponse,
  type SubmitMaintenanceRequestInput,
  type SubmitMaintenanceRequestResponse,
} from "@/types/portal";

/**
 * Portal-domain API helpers.
 *
 * Every helper forwards the session cookie because the backend resolves
 * `customerId` and `organizationId` from the authenticated session. Hooks
 * in the client layer are responsible for caching the responses via
 * `portalKeys`.
 */

// ---------------------------------------------------------------------------
// C1 — Dashboard
// ---------------------------------------------------------------------------

export async function fetchCustomerDashboard(): Promise<CustomerDashboard> {
  const result = await apiFetch("/dashboard/summary", {
    schema: customerDashboardSchema,
    forwardCookies: true,
  });
  if (!result.ok) throw new ApiError(result.status, result.error.error);
  return result.data;
}

// ---------------------------------------------------------------------------
// C2 — Onboarding
// ---------------------------------------------------------------------------

export async function fetchOnboarding(): Promise<OnboardingState> {
  const result = await apiFetch("/onboarding", {
    schema: onboardingStateSchema,
    forwardCookies: true,
  });
  if (!result.ok) throw new ApiError(result.status, result.error.error);
  return result.data;
}

export interface OnboardingUpdatePayload {
  contact?: Partial<OnboardingState["contact"]>;
  business?: Partial<OnboardingState["business"]>;
  brand?: Partial<OnboardingState["brand"]>;
}

export async function updateOnboarding(
  payload: OnboardingUpdatePayload,
): Promise<OnboardingState> {
  const result = await apiFetch("/onboarding", {
    method: "PUT",
    body: payload,
    schema: onboardingStateSchema,
    forwardCookies: true,
  });
  if (!result.ok) throw new ApiError(result.status, result.error.error);
  return result.data;
}

export async function inviteTeamMember(input: {
  email: string;
  role: string;
}): Promise<OnboardingState> {
  const result = await apiFetch("/onboarding/team/invitations", {
    method: "POST",
    body: input,
    schema: onboardingStateSchema,
    forwardCookies: true,
  });
  if (!result.ok) throw new ApiError(result.status, result.error.error);
  return result.data;
}

export async function revokeTeamInvitation(
  invitationId: string,
): Promise<OnboardingState> {
  const result = await apiFetch(
    `/onboarding/team/invitations/${encodeURIComponent(invitationId)}`,
    {
      method: "DELETE",
      schema: onboardingStateSchema,
      forwardCookies: true,
    },
  );
  if (!result.ok) throw new ApiError(result.status, result.error.error);
  return result.data;
}

// ---------------------------------------------------------------------------
// C3 / C4 — Projects
// ---------------------------------------------------------------------------

function buildProjectsQueryString(query: PortalProjectListQuery): string {
  const params = new URLSearchParams();
  if (query.phase) params.set("phase", query.phase);
  if (query.health) params.set("health", query.health);
  if (query.q && query.q.trim().length > 0) params.set("q", query.q.trim());
  if (typeof query.page === "number") params.set("page", String(query.page));
  if (typeof query.perPage === "number") {
    params.set("perPage", String(query.perPage));
  }
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

export async function fetchProjects(
  query: PortalProjectListQuery = {},
): Promise<PortalProjectIndex> {
  const result = await apiFetch(`/projects${buildProjectsQueryString(query)}`, {
    schema: portalProjectIndexSchema,
    forwardCookies: true,
  });
  if (!result.ok) throw new ApiError(result.status, result.error.error);
  return result.data;
}

export async function fetchProjectBySlug(
  slug: string,
): Promise<PortalProjectDetail> {
  const result = await apiFetch(
    `/projects/${encodeURIComponent(slug)}`,
    {
      schema: portalProjectDetailSchema,
      forwardCookies: true,
    },
  );
  if (!result.ok) throw new ApiError(result.status, result.error.error);
  return result.data;
}

export async function fetchProjectActivity(
  slug: string,
  cursor?: string,
): Promise<{ events: PortalProjectDetail["activity"]; nextCursor: string | null }> {
  const qs = cursor ? `?cursor=${encodeURIComponent(cursor)}` : "";
  const result = await apiFetch(
    `/projects/${encodeURIComponent(slug)}/activity${qs}`,
    {
      schema: undefined,
      forwardCookies: true,
    },
  );
  if (!result.ok) throw new ApiError(result.status, result.error.error);
  // Backend returns `{ events: [...], nextCursor }` — let the caller validate.
  return result.data as {
    events: PortalProjectDetail["activity"];
    nextCursor: string | null;
  };
}

export async function postProjectComment(
  slug: string,
  input: PostCommentInput,
): Promise<{ commentId: string; createdAt: string }> {
  const result = await apiFetch(
    `/projects/${encodeURIComponent(slug)}/comments`,
    {
      method: "POST",
      body: input,
      forwardCookies: true,
    },
  );
  if (!result.ok) throw new ApiError(result.status, result.error.error);
  return result.data as { commentId: string; createdAt: string };
}

export async function postProjectFile(
  slug: string,
  input: PostFileInput,
): Promise<{ fileId: string; url: string }> {
  const result = await apiFetch(
    `/projects/${encodeURIComponent(slug)}/files`,
    {
      method: "POST",
      body: input,
      forwardCookies: true,
    },
  );
  if (!result.ok) throw new ApiError(result.status, result.error.error);
  return result.data as { fileId: string; url: string };
}

export async function respondProjectApproval(
  slug: string,
  input: RespondApprovalInput,
): Promise<RespondApprovalResponse> {
  const result = await apiFetch(
    `/projects/${encodeURIComponent(slug)}/approvals/${encodeURIComponent(
      input.approvalId,
    )}/respond`,
    {
      method: "POST",
      body: {
        decision: input.decision,
        note: input.note,
        version: input.version,
      },
      forwardCookies: true,
    },
  );
  if (!result.ok) {
    throw new ApiError(result.status, result.error.error);
  }
  return result.data as RespondApprovalResponse;
}

export async function submitChangeRequest(
  slug: string,
  input: SubmitChangeRequestInput,
): Promise<SubmitChangeRequestResponse> {
  const result = await apiFetch(
    `/projects/${encodeURIComponent(slug)}/change-requests`,
    {
      method: "POST",
      body: input,
      forwardCookies: true,
    },
  );
  if (!result.ok) throw new ApiError(result.status, result.error.error);
  return result.data as SubmitChangeRequestResponse;
}

// ---------------------------------------------------------------------------
// C5 — Maintenance
// ---------------------------------------------------------------------------

export async function fetchMaintenance(): Promise<MaintenanceState> {
  const result = await apiFetch("/maintenance", {
    schema: maintenanceStateSchema,
    forwardCookies: true,
  });
  if (!result.ok) throw new ApiError(result.status, result.error.error);
  return result.data;
}

export async function submitMaintenanceRequest(
  input: SubmitMaintenanceRequestInput,
): Promise<SubmitMaintenanceRequestResponse> {
  const result = await apiFetch("/maintenance/requests", {
    method: "POST",
    body: input,
    forwardCookies: true,
  });
  if (!result.ok) throw new ApiError(result.status, result.error.error);
  return result.data as SubmitMaintenanceRequestResponse;
}

export { ApiTransportError };
