"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ProjectIndex, ProjectStatus } from "@/types/project";

interface ProjectsQuery {
  status?: ProjectStatus;
  search?: string;
}

interface Props {
  initialResult: ProjectIndex;
  query: ProjectsQuery;
}

const STATUSES: { value: ProjectStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "draft", label: "Draft" },
  { value: "planning", label: "Planning" },
  { value: "in-progress", label: "In progress" },
  { value: "review", label: "Review" },
  { value: "launched", label: "Launched" },
  { value: "paused", label: "Paused" },
];

function statusHref(status: string, current: URLSearchParams): string {
  const next = new URLSearchParams(current);
  if (status === "all") next.delete("status");
  else next.set("status", status);
  const qs = next.toString();
  return qs ? `/dashboard/projects?${qs}` : "/dashboard/projects";
}

export function ProjectsView({ initialResult, query }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();
  const [search, setSearch] = useState(query.search ?? "");

  const activeStatus = query.status ?? "all";

  const { projects } = initialResult;

  function applySearch(value: string) {
    const next = new URLSearchParams(searchParams.toString());
    if (value.trim()) next.set("q", value.trim());
    else next.delete("q");
    startTransition(() => {
      router.replace(
        next.toString() ? `/dashboard/projects?${next}` : "/dashboard/projects",
      );
    });
  }

  return (
    <div className="space-y-6">
      <form
        role="search"
        className="flex gap-2 rounded-2xl border border-blue-100 bg-card p-3 shadow-sm dark:border-blue-950"
        onSubmit={(e) => {
          e.preventDefault();
          applySearch(search);
        }}
      >
        <Input
          type="search"
          name="q"
          placeholder="Search projects…"
          aria-label="Search projects"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type="submit"
          className={cn(buttonVariants({ variant: "default" }))}
          disabled={pending}
        >
          {pending ? "Searching…" : "Search"}
        </button>
      </form>

      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Project status"
      >
        {STATUSES.map((s) => {
          const isActive = activeStatus === s.value;
          return (
            <Link
              key={s.value}
              href={statusHref(s.value, searchParams)}
              role="tab"
              aria-selected={isActive}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all",
                isActive
                  ? "border-primary bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                  : "border-blue-100 bg-card text-muted-foreground hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 dark:border-blue-950 dark:hover:bg-blue-950/40",
              )}
            >
              {s.label}
            </Link>
          );
        })}
      </div>

      {projects.length === 0 ? (
        <EmptyState
          title="No projects yet"
          description={
            activeStatus === "all"
              ? "Once you start a project with us, it'll show up here."
              : "No projects match this filter."
          }
          action={
            activeStatus === "all"
              ? { label: "Start a project", href: "/request-quote" }
              : { label: "Clear filters", href: "/dashboard/projects" }
          }
        />
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <li key={project.id}>
              <Link
                href={`/dashboard/projects/${project.slug}`}
                className="group flex h-full flex-col gap-3 rounded-2xl border border-blue-100 bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl dark:border-blue-950 dark:hover:border-blue-800"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary capitalize">
                    {project.status.replace("-", " ")}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {project.package ?? "Custom"}
                  </span>
                </div>
                <h2 className="text-lg font-semibold leading-tight">
                  {project.name}
                </h2>
                {project.nextMilestone ? (
                  <p className="text-sm text-muted-foreground">
                    Next: {project.nextMilestone.title}
                    {project.nextMilestone.dueAt
                      ? ` — ${new Date(project.nextMilestone.dueAt).toLocaleDateString()}`
                      : null}
                  </p>
                ) : null}
                {typeof project.progress === "number" ? (
                  <div
                    className="h-1.5 w-full overflow-hidden rounded-full bg-muted"
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={Math.round(project.progress * 100)}
                  >
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400"
                      style={{ width: `${Math.round(project.progress * 100)}%` }}
                    />
                  </div>
                ) : null}
                <span className="mt-auto text-xs text-primary underline-offset-4 hover:underline">
                  View details →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}