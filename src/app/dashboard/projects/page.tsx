import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { fetchProjects } from "@/lib/api/projects";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ProjectStatus } from "@/types/project";

import { roleGate } from "../_components/role-gate";
import { ProjectsView } from "./_components/projects-view";

export const metadata: Metadata = {
  title: "Projects — CodeVenture",
  description: "Your CodeVenture projects.",
  alternates: { canonical: "/dashboard/projects" },
  robots: { index: false, follow: false },
};

interface Props {
  searchParams: Promise<{
    status?: string;
    q?: string;
  }>;
}

function isStatus(value: string | undefined): value is ProjectStatus {
  return (
    value === "draft" ||
    value === "planning" ||
    value === "in-progress" ||
    value === "review" ||
    value === "launched" ||
    value === "paused" ||
    value === "archived"
  );
}

export default async function DashboardProjectsPage({ searchParams }: Props) {
  await roleGate("/dashboard/projects");
  const params = await searchParams;
  const status = isStatus(params.status) ? params.status : undefined;
  const query = {
    status,
    search: params.q,
  };

  const result = await fetchProjects(query);

  return (
    <div className="space-y-6">
      <header className="flex flex-col items-start justify-between gap-5 rounded-2xl border border-blue-100 bg-gradient-to-br from-white to-blue-50/70 p-6 shadow-sm dark:border-blue-950 dark:from-card dark:to-blue-950/20 sm:flex-row sm:items-end">
        <div className="flex-1">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
            Workspace
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-[-0.035em]">Projects</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Every project you&rsquo;ve started with CodeVenture.
          </p>
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
      <ProjectsView initialResult={result} query={query} />
    </div>
  );
}