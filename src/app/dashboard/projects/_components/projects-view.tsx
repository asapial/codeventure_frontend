"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  FolderKanban,
  ListChecks,
  Loader2,
  Search,
  ShieldAlert,
} from "lucide-react";

import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  projectHealthSchema,
  projectPhaseSchema,
  type PortalProjectIndex,
  type PortalProjectListQuery,
  type PortalProjectSummary,
  type ProjectHealth,
  type ProjectPhase,
} from "@/types/portal";

interface Props {
  index: PortalProjectIndex;
  query: PortalProjectListQuery;
}

const PHASES: { value: ProjectPhase; label: string }[] = [
  { value: "discovery", label: "Discovery" },
  { value: "design", label: "Design" },
  { value: "build", label: "Build" },
  { value: "review", label: "Review" },
  { value: "launch", label: "Launch" },
  { value: "support", label: "Support" },
];

const HEALTHS: { value: ProjectHealth; label: string }[] = [
  { value: "on-track", label: "On track" },
  { value: "at-risk", label: "At risk" },
  { value: "off-track", label: "Off track" },
  { value: "completed", label: "Completed" },
];

const PHASE_COLORS: Record<ProjectPhase, string> = {
  discovery: "bg-violet-500/10 text-violet-700 dark:text-violet-300",
  design: "bg-pink-500/10 text-pink-700 dark:text-pink-300",
  build: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
  review: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  launch: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-300",
  support: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
};

const HEALTH_COLORS: Record<ProjectHealth, string> = {
  "on-track": "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  "at-risk": "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  "off-track": "bg-rose-500/10 text-rose-700 dark:text-rose-300",
  completed: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
};

const HEALTH_ICON: Record<ProjectHealth, typeof CheckCircle2> = {
  "on-track": CheckCircle2,
  "at-risk": AlertTriangle,
  "off-track": ShieldAlert,
  completed: ListChecks,
};

interface HrefPatch {
  phase?: ProjectPhase | null;
  health?: ProjectHealth | null;
  q?: string | null;
}

function buildHref(patch: HrefPatch, current: URLSearchParams): string {
  const next = new URLSearchParams(current);
  if (patch.phase) next.set("phase", patch.phase);
  else if (patch.phase === null) next.delete("phase");

  if (patch.health) next.set("health", patch.health);
  else if (patch.health === null) next.delete("health");

  if (patch.q !== undefined && patch.q !== null) {
    if (patch.q.trim().length === 0) next.delete("q");
    else next.set("q", patch.q.trim());
  } else if (patch.q === null) {
    next.delete("q");
  }

  const qs = next.toString();
  return qs ? `/dashboard/projects?${qs}` : "/dashboard/projects";
}

function formatDate(value: string | null | undefined): string {
  if (!value) return "—";
  return new Date(value).toLocaleDateString();
}

function phaseLabel(phase: ProjectPhase): string {
  return PHASES.find((p) => p.value === phase)?.label ?? phase;
}

function healthLabel(health: ProjectHealth): string {
  return HEALTHS.find((h) => h.value === health)?.label ?? health;
}

interface ProjectCardProps {
  project: PortalProjectSummary;
}

function ProjectCard({ project }: ProjectCardProps) {
  const HealthIcon = HEALTH_ICON[project.health];
  const phaseClass = PHASE_COLORS[project.phase];
  const healthClass = HEALTH_COLORS[project.health];
  return (
    <Link
      href={`/dashboard/projects/${project.slug}`}
      className="group flex h-full flex-col gap-3 rounded-2xl border border-blue-100 bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl dark:border-blue-950 dark:hover:border-blue-800"
    >
      <div className="flex items-center justify-between gap-2">
        <span
          className={cn(
            "inline-flex rounded-full px-2 py-0.5 text-xs font-medium capitalize",
            phaseClass,
          )}
        >
          {phaseLabel(project.phase)}
        </span>
        <span className="text-xs text-muted-foreground">
          {project.packageName ?? "Custom scope"}
        </span>
      </div>
      <h2 className="line-clamp-2 text-lg font-semibold leading-tight">
        {project.name}
      </h2>
      <div className="flex items-center gap-2 text-xs">
        <HealthIcon
          aria-hidden="true"
          className={cn("h-3.5 w-3.5", healthClass.replace("bg-", "text-"))}
        />
        <span
          className={cn(
            "inline-flex rounded-full px-2 py-0.5 text-xs font-medium",
            healthClass,
          )}
        >
          {healthLabel(project.health)}
        </span>
      </div>
      {project.nextMilestone ? (
        <p className="text-xs text-muted-foreground">
          Next: {project.nextMilestone.title}
          {project.nextMilestone.dueAt
            ? ` · ${formatDate(project.nextMilestone.dueAt)}`
            : ""}
        </p>
      ) : null}
      <div
        className="h-1.5 w-full overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={project.progressPercent}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400"
          style={{ width: `${project.progressPercent}%` }}
        />
      </div>
      <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground">
        <span>{project.progressPercent}% complete</span>
        <span className="text-primary underline-offset-4 group-hover:underline">
          Open workspace →
        </span>
      </div>
    </Link>
  );
}

export function ProjectsView({ index, query }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();
  const [search, setSearch] = useState(query.q ?? "");

  const hasPhase = !!query.phase && projectPhaseSchema.safeParse(query.phase).success;
  const hasHealth =
    !!query.health && projectHealthSchema.safeParse(query.health).success;
  const hasAnyFilter = hasPhase || hasHealth || !!query.q;

  function replaceSearchParams(params: URLSearchParams) {
    const qs = params.toString();
    startTransition(() => {
      router.replace(
        qs ? `/dashboard/projects?${qs}` : "/dashboard/projects",
      );
    });
  }

  function applySearch(value: string) {
    const next = new URLSearchParams(searchParams.toString());
    if (value.trim().length === 0) next.delete("q");
    else next.set("q", value.trim());
    replaceSearchParams(next);
  }

  function clearAll() {
    const next = new URLSearchParams(searchParams.toString());
    next.delete("phase");
    next.delete("health");
    next.delete("q");
    replaceSearchParams(next);
    setSearch("");
  }

  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <article className="rounded-2xl border border-blue-100 bg-card p-4 shadow-sm dark:border-blue-950">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <FolderKanban className="h-4 w-4" aria-hidden="true" />
            Active projects
          </div>
          <p className="mt-2 text-3xl font-bold tracking-tight">
            {index.totals.active}
          </p>
        </article>
        <article className="rounded-2xl border border-blue-100 bg-card p-4 shadow-sm dark:border-blue-950">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <AlertTriangle className="h-4 w-4" aria-hidden="true" />
            Needs attention
          </div>
          <p className="mt-2 text-3xl font-bold tracking-tight text-amber-600 dark:text-amber-300">
            {index.totals.attention}
          </p>
        </article>
        <article className="rounded-2xl border border-blue-100 bg-card p-4 shadow-sm dark:border-blue-950">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <ListChecks className="h-4 w-4" aria-hidden="true" />
            Phases covered
          </div>
          <p className="mt-2 text-3xl font-bold tracking-tight">
            {index.phases.length}
          </p>
          <p className="text-xs text-muted-foreground">
            of {PHASES.length} workflow stages
          </p>
        </article>
      </section>

      <form
        role="search"
        className="flex flex-col gap-2 rounded-2xl border border-blue-100 bg-card p-3 shadow-sm dark:border-blue-950 sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          applySearch(search);
        }}
      >
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            type="search"
            name="q"
            placeholder="Search projects by name, slug, or owner…"
            aria-label="Search projects"
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className={cn(buttonVariants({ variant: "default" }), "shrink-0")}
          disabled={pending}
        >
          {pending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Searching…
            </>
          ) : (
            "Search"
          )}
        </button>
      </form>

      <section
        className="space-y-3"
        aria-label="Filter projects by phase"
      >
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
            Phase
          </h2>
          {hasAnyFilter ? (
            <button
              type="button"
              onClick={clearAll}
              className="text-xs font-medium text-primary underline-offset-4 hover:underline"
            >
              Clear filters
            </button>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-2" role="tablist">
          <Link
            href={buildHref({ phase: null }, searchParams)}
            role="tab"
            aria-selected={!hasPhase}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all",
              !hasPhase
                ? "border-primary bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                : "border-blue-100 bg-card text-muted-foreground hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 dark:border-blue-950 dark:hover:bg-blue-950/40",
            )}
          >
            All phases
          </Link>
          {PHASES.map((p) => {
            const isActive = query.phase === p.value;
            return (
              <Link
                key={p.value}
                href={buildHref({ phase: p.value }, searchParams)}
                role="tab"
                aria-selected={isActive}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-xs font-semibold capitalize transition-all",
                  isActive
                    ? "border-primary bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                    : "border-blue-100 bg-card text-muted-foreground hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 dark:border-blue-950 dark:hover:bg-blue-950/40",
                )}
              >
                {p.label}
              </Link>
            );
          })}
        </div>
      </section>

      <section className="space-y-3" aria-label="Filter projects by health">
        <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
          Health
        </h2>
        <div className="flex flex-wrap gap-2" role="tablist">
          <Link
            href={buildHref({ health: null }, searchParams)}
            role="tab"
            aria-selected={!hasHealth}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all",
              !hasHealth
                ? "border-primary bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                : "border-blue-100 bg-card text-muted-foreground hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 dark:border-blue-950 dark:hover:bg-blue-950/40",
            )}
          >
            Any
          </Link>
          {HEALTHS.map((h) => {
            const isActive = query.health === h.value;
            return (
              <Link
                key={h.value}
                href={buildHref({ health: h.value }, searchParams)}
                role="tab"
                aria-selected={isActive}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-xs font-semibold capitalize transition-all",
                  isActive
                    ? "border-primary bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                    : "border-blue-100 bg-card text-muted-foreground hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 dark:border-blue-950 dark:hover:bg-blue-950/40",
                )}
              >
                {h.label}
              </Link>
            );
          })}
        </div>
      </section>

      {hasAnyFilter ? (
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span>Active filters:</span>
          {query.phase ? (
            <Badge variant="secondary" className="capitalize">
              Phase: {phaseLabel(query.phase)}
            </Badge>
          ) : null}
          {query.health ? (
            <Badge variant="secondary" className="capitalize">
              Health: {healthLabel(query.health)}
            </Badge>
          ) : null}
          {query.q ? (
            <Badge variant="secondary">Search: &ldquo;{query.q}&rdquo;</Badge>
          ) : null}
        </div>
      ) : null}

      {index.projects.length === 0 ? (
        <EmptyState
          title="No projects match those filters"
          description={
            hasAnyFilter
              ? "Try widening your phase or health filter, or clearing search."
              : "Once you start a project with us, it'll show up here."
          }
          action={
            hasAnyFilter
              ? { label: "Clear filters", onClick: clearAll }
              : { label: "Start a project", href: "/request-quote" }
          }
        />
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {index.projects.map((project) => (
            <li key={project.id}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}