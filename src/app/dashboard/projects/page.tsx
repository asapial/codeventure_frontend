import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, FolderKanban } from "lucide-react";

import { ApiError } from "@/lib/api/client";
import { fetchProjects } from "@/lib/api/portal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  projectHealthSchema,
  projectPhaseSchema,
  type PortalProjectIndex,
  type PortalProjectListQuery,
} from "@/types/portal";

import { roleGate } from "../_components/role-gate";
import { ProjectsView } from "./_components/projects-view";
import { ProjectsListFallback } from "./_components/projects-list-fallback";

export const metadata: Metadata = {
  title: "Projects — CodeVenture",
  description: "Every project CodeVenture is working on for your workspace.",
  alternates: { canonical: "/dashboard/projects" },
  robots: { index: false, follow: false },
};

interface Props {
  searchParams: Promise<{
    phase?: string;
    health?: string;
    q?: string;
  }>;
}

function parseQuery(
  raw: Awaited<Props["searchParams"]>,
): PortalProjectListQuery {
  const query: PortalProjectListQuery = {};
  const phase = projectPhaseSchema.safeParse(raw.phase);
  if (phase.success) query.phase = phase.data;
  const health = projectHealthSchema.safeParse(raw.health);
  if (health.success) query.health = health.data;
  if (raw.q && raw.q.trim().length > 0) query.q = raw.q.trim();
  return query;
}

export default async function DashboardProjectsPage({ searchParams }: Props) {
  await roleGate("/dashboard/projects");
  const rawSearchParams = await searchParams;
  const query = parseQuery(rawSearchParams);

  let index: PortalProjectIndex;
  try {
    index = await fetchProjects(query);
  } catch (err) {
    if (err instanceof ApiError) {
      return (
        <ProjectsListFallback
          reason={
            err.status === 401
              ? "Please sign in again to view your projects."
              : err.status === 403
                ? "Your workspace isn't provisioned for project tracking yet."
                : "We couldn't load your projects. Please try again shortly."
          }
        />
      );
    }
    throw err;
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col items-start justify-between gap-5 rounded-2xl border border-blue-100 bg-gradient-to-br from-white to-blue-50/70 p-6 shadow-sm dark:border-blue-950 dark:from-card dark:to-blue-950/20 sm:flex-row sm:items-end">
        <div className="flex flex-1 items-start gap-4">
          <span
            aria-hidden="true"
            className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:flex"
          >
            <FolderKanban className="h-6 w-6" />
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
              Workspace
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-[-0.035em]">
              Projects
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {index.totals.active === 0
                ? "Once you start a project, it'll show up here."
                : `${index.totals.active} active ${
                    index.totals.active === 1 ? "project" : "projects"
                  }${
                    index.totals.attention > 0
                      ? ` · ${index.totals.attention} need${
                          index.totals.attention === 1 ? "s" : ""
                        } attention`
                      : ""
                  }.`}
            </p>
          </div>
        </div>
        <Link
          href="/request-quote"
          className={cn(
            buttonVariants({ size: "sm" }),
            "shrink-0 rounded-full",
          )}
        >
          Start a new project <ArrowUpRight aria-hidden="true" />
        </Link>
      </header>
      <ProjectsView index={index} query={query} />
    </div>
  );
}