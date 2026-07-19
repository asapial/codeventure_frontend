import type { Metadata } from "next";

import { fetchProjects } from "@/lib/api/projects";
import type { ProjectStatus } from "@/types/project";

import { ProjectsView } from "./_components/projects-view";

export const metadata: Metadata = {
  title: "Projects — CodeVenture",
  description: "Your CodeVenture projects.",
  alternates: { canonical: "/account/projects" },
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

export default async function ProjectsPage({ searchParams }: Props) {
  const params = await searchParams;
  const status = isStatus(params.status) ? params.status : undefined;
  const query = {
    status,
    search: params.q,
  };

  const result = await fetchProjects(query);

  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-blue-100 bg-gradient-to-br from-white to-blue-50/70 p-6 shadow-sm dark:border-blue-950 dark:from-card dark:to-blue-950/20">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">Workspace</p>
          <h1 className="mt-2 text-3xl font-bold tracking-[-0.035em]">Projects</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Every project you&rsquo;ve started with CodeVenture.
          </p>
        </div>
      </header>
      <ProjectsView initialResult={result} query={query} />
    </div>
  );
}
