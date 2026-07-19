"use client";

import Link from "next/link";
import { useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { cn } from "@/lib/utils";
import type { ProjectDetail, ProjectStatus } from "@/types/project";

interface Props {
  project: ProjectDetail;
}

type Tab = "overview" | "deliverables" | "activity";

const TABS: { value: Tab; label: string }[] = [
  { value: "overview", label: "Overview" },
  { value: "deliverables", label: "Deliverables" },
  { value: "activity", label: "Activity" },
];

function formatDate(value: string | undefined | null): string {
  if (!value) return "—";
  return new Date(value).toLocaleDateString();
}

function statusColor(status: ProjectStatus): string {
  switch (status) {
    case "launched":
      return "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300";
    case "in-progress":
    case "review":
      return "bg-blue-500/10 text-blue-700 dark:text-blue-300";
    case "paused":
    case "archived":
      return "bg-zinc-500/10 text-zinc-700 dark:text-zinc-300";
    default:
      return "bg-primary/10 text-primary";
  }
}

export function ProjectDetailView({ project }: Props) {
  const [tab, setTab] = useState<Tab>("overview");

  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <Link
          href="/dashboard/projects"
          className="text-xs text-muted-foreground underline-offset-4 hover:underline"
        >
          ← Back to projects
        </Link>
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={cn(
                "inline-flex rounded-full px-2 py-0.5 text-xs font-medium capitalize",
                statusColor(project.status),
              )}
            >
              {project.status.replace("-", " ")}
            </span>
            {project.package ? (
              <span className="text-xs text-muted-foreground">
                {project.package}
              </span>
            ) : null}
            {typeof project.progress === "number" ? (
              <span className="text-xs text-muted-foreground">
                {Math.round(project.progress * 100)}% complete
              </span>
            ) : null}
          </div>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">{project.name}</h1>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1fr_18rem]">
        <div className="min-w-0 space-y-6">
          <div
            role="tablist"
            aria-label="Project sections"
            className="flex gap-2 border-b border-border"
          >
            {TABS.map((t) => {
              const isActive = tab === t.value;
              return (
                <button
                  key={t.value}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setTab(t.value)}
                  className={cn(
                    "border-b-2 px-3 py-2 text-sm transition-colors",
                    isActive
                      ? "border-primary text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground",
                  )}
                >
                  {t.label}
                </button>
              );
            })}
          </div>

          {tab === "overview" ? (
            <section aria-labelledby="overview-heading" className="space-y-4">
              <h2 id="overview-heading" className="sr-only">
                Overview
              </h2>
              <p className="whitespace-pre-line text-sm text-muted-foreground">
                {project.description}
              </p>
              {project.team.length > 0 ? (
                <div>
                  <h3 className="text-sm font-semibold">Team</h3>
                  <ul className="mt-2 grid gap-2 sm:grid-cols-2">
                    {project.team.map((member) => (
                      <li
                        key={`${member.name}-${member.role}`}
                        className="flex items-center gap-3 rounded-lg border border-border bg-card p-3"
                      >
                        <div
                          className="h-8 w-8 rounded-full bg-primary/10"
                          aria-hidden="true"
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-medium">{member.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {member.role}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </section>
          ) : null}

          {tab === "deliverables" ? (
            <section aria-labelledby="deliverables-heading">
              <h2 id="deliverables-heading" className="sr-only">
                Deliverables
              </h2>
              {project.deliverables.length === 0 ? (
                <EmptyState
                  title="No deliverables yet"
                  description="Your deliverables will appear here once planning is finalized."
                />
              ) : (
                <ul className="divide-y divide-border rounded-lg border border-border bg-card">
                  {project.deliverables.map((d) => (
                    <li key={d.id} className="flex items-start gap-4 p-4">
                      <span
                        className={cn(
                          "inline-flex shrink-0 rounded-full px-2 py-0.5 text-xs font-medium capitalize",
                          statusColor(d.status as ProjectStatus),
                        )}
                      >
                        {d.status.replace("-", " ")}
                      </span>
                      <div className="min-w-0">
                        <p className="font-medium">{d.title}</p>
                        {d.description ? (
                          <p className="mt-1 text-sm text-muted-foreground">
                            {d.description}
                          </p>
                        ) : null}
                        {d.dueAt ? (
                          <p className="mt-1 text-xs text-muted-foreground">
                            Due {formatDate(d.dueAt)}
                          </p>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ) : null}

          {tab === "activity" ? (
            <section aria-labelledby="activity-heading">
              <h2 id="activity-heading" className="sr-only">
                Activity
              </h2>
              {project.activity.length === 0 ? (
                <EmptyState
                  title="No activity yet"
                  description="Updates from your team will surface here."
                />
              ) : (
                <ol className="space-y-3">
                  {project.activity.map((event) => (
                    <li
                      key={event.id}
                      className="flex items-start gap-4 rounded-lg border border-border bg-card p-4"
                    >
                      <time
                        dateTime={event.at}
                        className="w-28 shrink-0 text-xs uppercase tracking-wider text-muted-foreground"
                      >
                        {formatDate(event.at)}
                      </time>
                      <div className="min-w-0">
                        <p className="font-medium">{event.title}</p>
                        {event.description ? (
                          <p className="mt-1 text-sm text-muted-foreground">
                            {event.description}
                          </p>
                        ) : null}
                        {event.href ? (
                          <Link
                            href={event.href}
                            className="mt-2 inline-block text-xs text-primary underline-offset-4 hover:underline"
                          >
                            Open →
                          </Link>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ol>
              )}
            </section>
          ) : null}
        </div>

        <aside className="space-y-6" aria-label="Project sidebar">
          <section className="rounded-lg border border-border bg-card p-4">
            <h2 className="text-sm font-semibold">Key dates</h2>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Start</dt>
                <dd>{formatDate(project.startDate)}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Launch</dt>
                <dd>{formatDate(project.launchDate)}</dd>
              </div>
              {project.nextMilestone ? (
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Next milestone</dt>
                  <dd className="text-right">{project.nextMilestone.title}</dd>
                </div>
              ) : null}
            </dl>
          </section>

          <section className="rounded-lg border border-border bg-card p-4">
            <h2 className="text-sm font-semibold">Quick actions</h2>
            <div className="mt-3 flex flex-col gap-2">
              <Link
                href="/request-quote"
                className={cn(buttonVariants({ variant: "default", size: "sm" }))}
              >
                Raise a request
              </Link>
              <Link
                href="/dashboard/billing"
                className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
              >
                View billing
              </Link>
            </div>
          </section>
        </aside>
      </div>
    </article>
  );
}