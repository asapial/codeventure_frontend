import { apiFetch } from "./client";
import {
  projectIndexSchema,
  projectDetailSchema,
  type ProjectIndex,
  type ProjectDetail,
  type ProjectStatus,
} from "@/types/project";

export interface ProjectListQuery {
  status?: ProjectStatus | "all";
  search?: string;
  page?: number;
  perPage?: number;
}

/** GET /projects — paginated, filterable list. */
export async function fetchProjects(query: ProjectListQuery = {}): Promise<ProjectIndex> {
  const params = new URLSearchParams();
  if (query.status && query.status !== "all") params.set("status", query.status);
  if (query.search) params.set("q", query.search);
  if (query.page) params.set("page", String(query.page));
  if (query.perPage) params.set("perPage", String(query.perPage));

  const result = await apiFetch(`/projects?${params.toString()}`, {
    schema: projectIndexSchema,
    forwardCookies: true,
  });
  if (!result.ok) throw new Error(result.error.error.message);
  return result.data;
}

/** GET /projects/:slug — full project detail including deliverables. */
export async function fetchProjectBySlug(slug: string): Promise<ProjectDetail> {
  const result = await apiFetch(`/projects/${encodeURIComponent(slug)}`, {
    schema: projectDetailSchema,
    forwardCookies: true,
  });
  if (!result.ok) throw new Error(result.error.error.message);
  return result.data;
}