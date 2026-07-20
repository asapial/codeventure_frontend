"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import { toast } from "sonner";

import { buttonVariants } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApiError, formatApiErrorMessage } from "@/lib/api/client";
import {
  postProjectComment,
  postProjectFile,
  respondProjectApproval,
  submitChangeRequest,
} from "@/lib/api/portal";
import { cn } from "@/lib/utils";
import type {
  PortalApproval,
  PortalChangeRequest,
  PortalMilestone,
  PortalProjectActivity,
  PortalProjectDetail,
  PortalProjectFile,
} from "@/types/portal";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Check,
  CheckCircle2,
  CircleDot,
  ClipboardList,
  Compass,
  FileText,
  FolderKanban,
  Gauge,
  ListChecks,
  Loader2,
  MessagesSquare,
  Paperclip,
  PenLine,
  Plus,
  Rocket,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Trash,
  TrendingUp,
  UserRound,
  UsersRound,
} from "lucide-react";

interface Props {
  project: PortalProjectDetail;
  initialTab: TabValue;
}

type TabValue =
  | "overview"
  | "milestones"
  | "approvals"
  | "files"
  | "change-requests"
  | "comments"
  | "activity";

const TAB_VALUES: TabValue[] = [
  "overview",
  "milestones",
  "approvals",
  "files",
  "change-requests",
  "comments",
  "activity",
];

const TABS: { value: TabValue; label: string; icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }> }[] = [
  { value: "overview", label: "Overview", icon: Compass },
  { value: "milestones", label: "Milestones", icon: ListChecks },
  { value: "approvals", label: "Approvals", icon: ShieldCheck },
  { value: "files", label: "Files", icon: Paperclip },
  { value: "change-requests", label: "Change requests", icon: ClipboardList },
  { value: "comments", label: "Comments", icon: MessagesSquare },
  { value: "activity", label: "Activity", icon: TrendingUp },
];

const PHASE_COLORS: Record<PortalProjectDetail["phase"], string> = {
  discovery: "bg-violet-100 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300",
  design: "bg-pink-100 text-pink-700 dark:bg-pink-950/60 dark:text-pink-300",
  build: "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300",
  review: "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300",
  launch: "bg-cyan-100 text-cyan-700 dark:bg-cyan-950/60 dark:text-cyan-300",
  support: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300",
};

const PHASE_LABELS: Record<PortalProjectDetail["phase"], string> = {
  discovery: "Discovery",
  design: "Design",
  build: "Build",
  review: "Review",
  launch: "Launch",
  support: "Support",
};

const HEALTH_COLORS: Record<PortalProjectDetail["health"], string> = {
  "on-track": "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300",
  "at-risk": "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300",
  "off-track": "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300",
  completed: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
};

const HEALTH_LABELS: Record<PortalProjectDetail["health"], string> = {
  "on-track": "On track",
  "at-risk": "At risk",
  "off-track": "Off track",
  completed: "Completed",
};

const HEALTH_ICON: Record<PortalProjectDetail["health"], React.ComponentType<{ className?: string }>> = {
  "on-track": CheckCircle2,
  "at-risk": AlertTriangle,
  "off-track": ShieldAlert,
  completed: Check,
};

const MILESTONE_COLORS: Record<PortalMilestone["status"], string> = {
  pending: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  "in-progress": "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300",
  review: "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300",
  complete: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300",
  blocked: "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300",
};

const MILESTONE_LABELS: Record<PortalMilestone["status"], string> = {
  pending: "Pending",
  "in-progress": "In progress",
  review: "In review",
  complete: "Complete",
  blocked: "Blocked",
};

const APPROVAL_STATUS_COLORS: Record<PortalApproval["status"], string> = {
  pending: "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300",
  approved: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300",
  rejected: "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300",
  expired: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
};

const APPROVAL_STATUS_LABELS: Record<PortalApproval["status"], string> = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
  expired: "Expired",
};

const CHANGE_REQUEST_COLORS: Record<PortalChangeRequest["status"], string> = {
  pending: "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300",
  approved: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300",
  rejected: "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300",
  withdrawn: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
};

const CHANGE_REQUEST_LABELS: Record<PortalChangeRequest["status"], string> = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
  withdrawn: "Withdrawn",
};

const IMPACT_COLORS: Record<PortalChangeRequest["impact"], string> = {
  low: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  medium: "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300",
  high: "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300",
};

function formatDate(value: string | null | undefined): string {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatDateTime(value: string | null | undefined): string {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatRelative(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  const diffMs = date.getTime() - Date.now();
  const abs = Math.abs(diffMs);
  const minute = 60_000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const formatter = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });
  if (abs < hour) return formatter.format(Math.round(diffMs / minute), "minute");
  if (abs < day) return formatter.format(Math.round(diffMs / hour), "hour");
  if (abs < week) return formatter.format(Math.round(diffMs / day), "day");
  return formatter.format(Math.round(diffMs / week), "week");
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase() ?? "").join("") || "?";
}

export function ProjectDetailView({ project, initialTab }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const tabFromUrl = searchParams.get("tab");
  const activeTab: TabValue = (TAB_VALUES as string[]).includes(tabFromUrl ?? "")
    ? (tabFromUrl as TabValue)
    : initialTab;

  function setTab(next: TabValue) {
    const params = new URLSearchParams(searchParams.toString());
    if (next === "overview") params.delete("tab");
    else params.set("tab", next);
    const qs = params.toString();
    startTransition(() => {
      router.replace(`/dashboard/projects/${project.slug}${qs ? `?${qs}` : ""}`, {
        scroll: false,
      });
    });
  }

  return (
    <div className="space-y-6">
      <ProjectHeader project={project} />
      <Tabs
        value={activeTab}
        onValueChange={(value) => setTab(value as TabValue)}
        className="space-y-6"
      >
        <TabsList
          aria-label="Project sections"
          className="flex w-full flex-wrap gap-1 rounded-2xl border border-blue-100 bg-white p-1 dark:border-blue-950 dark:bg-card"
        >
          {TABS.map((t) => {
            const Icon = t.icon;
            return (
              <TabsTrigger
                key={t.value}
                value={t.value}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 sm:text-sm"
              >
                <Icon className="h-4 w-4" aria-hidden />
                <span>{t.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>
        <TabsContent value="overview" className="m-0">
          <OverviewPanel project={project} />
        </TabsContent>
        <TabsContent value="milestones" className="m-0">
          <MilestonesPanel milestones={project.milestones} />
        </TabsContent>
        <TabsContent value="approvals" className="m-0">
          <ApprovalsPanel slug={project.slug} approvals={project.approvals} />
        </TabsContent>
        <TabsContent value="files" className="m-0">
          <FilesPanel slug={project.slug} files={project.files} />
        </TabsContent>
        <TabsContent value="change-requests" className="m-0">
          <ChangeRequestsPanel
            slug={project.slug}
            changeRequests={project.changeRequests}
          />
        </TabsContent>
        <TabsContent value="comments" className="m-0">
          <CommentsPanel slug={project.slug} activity={project.activity} />
        </TabsContent>
        <TabsContent value="activity" className="m-0">
          <ActivityPanel activity={project.activity} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

/* ----------------------------- Header ----------------------------- */

function ProjectHeader({ project }: { project: PortalProjectDetail }) {
  const HealthIcon = HEALTH_ICON[project.health];
  const lead = project.lead ?? project.team?.[0] ?? null;
  return (
    <header className="rounded-2xl border border-blue-100 bg-gradient-to-br from-white to-blue-50/70 p-6 shadow-sm dark:border-blue-950 dark:from-card dark:to-blue-950/20">
      <div className="flex flex-col gap-4">
        <Link
          href="/dashboard/projects"
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "w-fit -ml-2 text-muted-foreground",
          )}
        >
          <ArrowLeft className="h-4 w-4" aria-hidden /> Back to projects
        </Link>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 flex-1 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
                  PHASE_COLORS[project.phase],
                )}
              >
                <CircleDot className="h-3.5 w-3.5" aria-hidden />{" "}
                {PHASE_LABELS[project.phase]}
              </span>
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
                  HEALTH_COLORS[project.health],
                )}
              >
                <HealthIcon className="h-3.5 w-3.5" aria-hidden />{" "}
                {HEALTH_LABELS[project.health]}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950/40 dark:text-blue-300">
                <Sparkles className="h-3.5 w-3.5" aria-hidden />{" "}
                {project.packageName}
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-[-0.035em]">
              {project.name}
            </h1>
            <p className="max-w-3xl text-sm text-muted-foreground">
              {project.description}
            </p>
          </div>
          <div className="shrink-0 rounded-2xl border border-blue-100 bg-white px-5 py-4 text-right dark:border-blue-950 dark:bg-card">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
              Progress
            </p>
            <p className="mt-1 text-3xl font-bold tracking-tight">
              {project.progressPercent}%
            </p>
            <p className="text-xs text-muted-foreground">
              {project.milestones.filter((m) => m.status === "complete").length}{" "}
              of {project.milestones.length} milestones complete
            </p>
          </div>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-blue-100 dark:bg-blue-950/60">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all"
            style={{ width: `${Math.min(100, Math.max(0, project.progressPercent))}%` }}
            aria-hidden
          />
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" aria-hidden /> Started{" "}
            {formatDate(project.startDate)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Rocket className="h-3.5 w-3.5" aria-hidden /> Launch{" "}
            {formatDate(project.launchDate)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Gauge className="h-3.5 w-3.5" aria-hidden /> Updated{" "}
            {formatRelative(project.updatedAt)}
          </span>
          {lead ? (
            <span className="inline-flex items-center gap-1.5">
              <UserRound className="h-3.5 w-3.5" aria-hidden /> Lead:{" "}
              <span className="font-medium text-foreground">{lead.name}</span>
            </span>
          ) : null}
        </div>
      </div>
    </header>
  );
}

/* ----------------------------- Overview ----------------------------- */

function OverviewPanel({ project }: { project: PortalProjectDetail }) {
  const nextMilestone = project.nextMilestone;
  const pendingApprovals = project.approvals.filter((a) => a.status === "pending");
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        <section className="rounded-2xl border border-blue-100 bg-white p-6 dark:border-blue-950 dark:bg-card">
          <h2 className="text-lg font-semibold tracking-tight">
            What we&rsquo;re working on
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {project.description}
          </p>
          <dl className="mt-5 grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                Phase
              </dt>
              <dd className="mt-1 font-medium">{PHASE_LABELS[project.phase]}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                Health
              </dt>
              <dd className="mt-1 font-medium">
                {HEALTH_LABELS[project.health]}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                Package
              </dt>
              <dd className="mt-1 font-medium">{project.packageName}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                Started
              </dt>
              <dd className="mt-1 font-medium">{formatDate(project.startDate)}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                Launch
              </dt>
              <dd className="mt-1 font-medium">
                {formatDate(project.launchDate)}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                Progress
              </dt>
              <dd className="mt-1 font-medium">{project.progressPercent}%</dd>
            </div>
          </dl>
        </section>

        {nextMilestone ? (
          <section className="rounded-2xl border border-blue-100 bg-white p-6 dark:border-blue-950 dark:bg-card">
            <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight">
              <ListChecks className="h-5 w-5 text-primary" aria-hidden /> Next
              milestone
            </h2>
            <p className="mt-2 font-medium">{nextMilestone.title}</p>
            <p className="mt-3 text-xs text-muted-foreground">
              Due {formatDate(nextMilestone.dueAt)}
            </p>
          </section>
        ) : null}

        {pendingApprovals.length > 0 ? (
          <section className="rounded-2xl border border-amber-200 bg-amber-50/60 p-6 dark:border-amber-900 dark:bg-amber-950/20">
            <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight text-amber-900 dark:text-amber-200">
              <ShieldAlert className="h-5 w-5" aria-hidden />{" "}
              {pendingApprovals.length} pending{" "}
              {pendingApprovals.length === 1 ? "approval" : "approvals"}
            </h2>
            <p className="mt-2 text-sm text-amber-900/80 dark:text-amber-200/80">
              We&rsquo;re waiting on your decision before we can keep moving.
              Head to the Approvals tab to respond.
            </p>
          </section>
        ) : null}
      </div>

      <aside className="space-y-6">
        <section className="rounded-2xl border border-blue-100 bg-white p-6 dark:border-blue-950 dark:bg-card">
          <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400">
            <UsersRound className="h-4 w-4" aria-hidden /> Team
          </h2>
          <ul className="mt-4 space-y-3">
            {project.team.length === 0 ? (
              <li className="text-sm text-muted-foreground">
                No team assigned yet.
              </li>
            ) : (
              project.team.map((member, idx) => (
                <li key={`${member.name}-${idx}`} className="flex items-center gap-3">
                  <Avatar name={member.name} url={member.avatarUrl} />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                      {member.name}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {member.role}
                    </p>
                  </div>
                </li>
              ))
            )}
          </ul>
        </section>

        <section className="rounded-2xl border border-blue-100 bg-white p-6 dark:border-blue-950 dark:bg-card">
          <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400">
            <FolderKanban className="h-4 w-4" aria-hidden /> Quick actions
          </h2>
          <div className="mt-4 grid gap-2">
            <Link
              href="/request-quote"
              className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
            >
              Start a new project
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
            <Link
              href="/dashboard/billing"
              className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
            >
              View billing
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
            <Link
              href="/dashboard/maintenance"
              className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
            >
              Open a support ticket
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>
        </section>
      </aside>
    </div>
  );
}

/* ----------------------------- Milestones ----------------------------- */

function MilestonesPanel({ milestones }: { milestones: PortalMilestone[] }) {
  if (milestones.length === 0) {
    return (
      <EmptyState
        icon={<ListChecks className="h-6 w-6" aria-hidden />}
        title="No milestones yet"
        description="We&rsquo;ll add milestones here as soon as we agree on the plan."
      />
    );
  }
  return (
    <ol className="space-y-3">
      {milestones.map((m) => (
        <li
          key={m.id}
          className="rounded-2xl border border-blue-100 bg-white p-5 dark:border-blue-950 dark:bg-card"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={cn(
                    "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold",
                    MILESTONE_COLORS[m.status],
                  )}
                >
                  {MILESTONE_LABELS[m.status]}
                </span>
                <h3 className="font-semibold tracking-tight">{m.title}</h3>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {m.description}
              </p>
            </div>
            <div className="shrink-0 text-xs text-muted-foreground sm:text-right">
              <p className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5" aria-hidden /> Due{" "}
                {formatDate(m.dueAt)}
              </p>
              {m.completedAt ? (
                <p className="mt-1 inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5" aria-hidden /> Completed{" "}
                  {formatDate(m.completedAt)}
                </p>
              ) : null}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ----------------------------- Approvals ----------------------------- */

function ApprovalsPanel({
  slug,
  approvals,
}: {
  slug: string;
  approvals: PortalApproval[];
}) {
  const router = useRouter();
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>("");

  async function respond(
    approval: PortalApproval,
    decision: "approve" | "reject",
    note: string,
  ) {
    setPendingId(approval.id);
    setStatusMessage("");
    try {
      await respondProjectApproval(slug, {
        approvalId: approval.id,
        decision,
        note: note.trim() || undefined,
        version: approval.version,
      });
      const ok =
        decision === "approve"
          ? "Approval recorded — we&rsquo;ll keep moving."
          : "Rejection sent — we&rsquo;ll follow up with next steps.";
      toast.success(ok);
      setStatusMessage(ok);
      router.refresh();
    } catch (err) {
      let copy: string;
      if (err instanceof ApiError && err.status === 409) {
        copy =
          "This approval was updated by someone else. We&rsquo;ll reload the latest version.";
      } else if (err instanceof ApiError && err.status === 403) {
        copy = "You don&rsquo;t have permission to act on this approval.";
      } else if (err instanceof ApiError) {
        copy = err.message || "Couldn&rsquo;t submit your response.";
      } else {
        copy = formatApiErrorMessage(err);
      }
      toast.error(copy);
      setStatusMessage(copy);
      router.refresh();
    } finally {
      setPendingId(null);
    }
  }

  if (approvals.length === 0) {
    return (
      <EmptyState
        icon={<ShieldCheck className="h-6 w-6" aria-hidden />}
        title="No approvals pending"
        description="You&rsquo;re all caught up. We&rsquo;ll surface anything new here as soon as it comes in."
      />
    );
  }

  return (
    <div className="space-y-3">
      <p role="status" aria-live="polite" className="sr-only">
        {statusMessage}
      </p>
      <ul className="space-y-3">
        {approvals.map((a) => (
          <ApprovalRow
            key={a.id}
            approval={a}
            pending={pendingId === a.id}
            onRespond={respond}
          />
        ))}
      </ul>
    </div>
  );
}

function ApprovalRow({
  approval,
  pending,
  onRespond,
}: {
  approval: PortalApproval;
  pending: boolean;
  onRespond: (
    a: PortalApproval,
    decision: "approve" | "reject",
    note: string,
  ) => Promise<void>;
}) {
  const [note, setNote] = useState("");
  const isPending = approval.status === "pending";
  return (
    <li className="rounded-2xl border border-blue-100 bg-white p-5 dark:border-blue-950 dark:bg-card">
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold",
              APPROVAL_STATUS_COLORS[approval.status],
            )}
          >
            {APPROVAL_STATUS_LABELS[approval.status]}
          </span>
          <h3 className="font-semibold tracking-tight">{approval.title}</h3>
        </div>
        <p className="text-sm text-muted-foreground">{approval.description}</p>
        <p className="text-xs text-muted-foreground">
          Requested {formatRelative(approval.requestedAt)} · Due{" "}
          {formatDate(approval.dueAt)}
          {approval.respondedAt
            ? ` · Responded ${formatDate(approval.respondedAt)}`
            : ""}
        </p>
        {isPending ? (
          <div className="mt-2 space-y-3">
            <label
              htmlFor={`approval-note-${approval.id}`}
              className="block text-xs font-medium text-muted-foreground"
            >
              Note (optional)
            </label>
            <textarea
              id={`approval-note-${approval.id}`}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={2}
              placeholder="Share any context for your decision"
              className="w-full rounded-lg border border-blue-100 bg-background px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 dark:border-blue-950"
            />
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                disabled={pending}
                onClick={() => onRespond(approval, "approve", note)}
                className={cn(
                  buttonVariants({ size: "sm" }),
                  "gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                )}
              >
                {pending ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
                ) : (
                  <Check className="h-3.5 w-3.5" aria-hidden />
                )}
                Approve
              </button>
              <button
                type="button"
                disabled={pending}
                onClick={() => onRespond(approval, "reject", note)}
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                )}
              >
                <Trash className="h-3.5 w-3.5" aria-hidden /> Reject
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </li>
  );
}

/* ----------------------------- Files ----------------------------- */

function FilesPanel({
  slug,
  files,
}: {
  slug: string;
  files: PortalProjectFile[];
}) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [form, setForm] = useState({
    name: "",
    url: "",
    category: "",
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!form.name.trim() || !form.url.trim()) {
      toast.error("Add a file name and link before submitting.");
      setStatusMessage("Add a file name and link before submitting.");
      return;
    }
    setSubmitting(true);
    setStatusMessage("");
    try {
      await postProjectFile(slug, {
        name: form.name.trim(),
        url: form.url.trim(),
        mimeType: "application/octet-stream",
        sizeBytes: 0,
        category: form.category.trim() || undefined,
      });
      toast.success("File added to the workspace.");
      setStatusMessage("File added to the workspace.");
      setForm({ name: "", url: "", category: "" });
      router.refresh();
    } catch (err) {
      const message = formatApiErrorMessage(err);
      toast.error(message);
      setStatusMessage(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        {files.length === 0 ? (
          <EmptyState
            icon={<Paperclip className="h-6 w-6" aria-hidden />}
            title="No files shared yet"
            description="Drop a link to assets, briefs, or anything you want us to keep nearby."
            action={
              <Link
                href="/dashboard/projects"
                className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
              >
                Back to projects
              </Link>
            }
          />
        ) : (
          <ul className="space-y-3">
            {files.map((f) => (
              <li
                key={f.id}
                className="flex flex-col gap-3 rounded-2xl border border-blue-100 bg-white p-5 dark:border-blue-950 dark:bg-card sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 items-start gap-3">
                  <span
                    aria-hidden
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"
                  >
                    <FileText className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-medium">{f.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {f.category ? `${f.category} · ` : ""}
                      {formatBytes(f.sizeBytes)} · Uploaded{" "}
                      {formatRelative(f.uploadedAt)}
                      {f.uploadedBy ? ` by ${f.uploadedBy}` : ""}
                    </p>
                  </div>
                </div>
                <a
                  href={f.url}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                >
                  Open
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
      <aside className="rounded-2xl border border-blue-100 bg-white p-6 dark:border-blue-950 dark:bg-card">
        <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400">
          <Plus className="h-4 w-4" aria-hidden /> Share a link
        </h2>
        <p role="status" aria-live="polite" className="sr-only">
          {statusMessage}
        </p>
        <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
          <label className="block text-xs font-medium text-muted-foreground">
            Name
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
              placeholder="Brand guidelines.pdf"
              className="mt-1 w-full rounded-lg border border-blue-100 bg-background px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-blue-950"
            />
          </label>
          <label className="block text-xs font-medium text-muted-foreground">
            Link
            <input
              type="url"
              value={form.url}
              onChange={(e) => setForm((s) => ({ ...s, url: e.target.value }))}
              placeholder="https://"
              className="mt-1 w-full rounded-lg border border-blue-100 bg-background px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-blue-950"
            />
          </label>
          <label className="block text-xs font-medium text-muted-foreground">
            Category (optional)
            <input
              type="text"
              value={form.category}
              onChange={(e) =>
                setForm((s) => ({ ...s, category: e.target.value }))
              }
              placeholder="Brief"
              className="mt-1 w-full rounded-lg border border-blue-100 bg-background px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-blue-950"
            />
          </label>
          <button
            type="submit"
            disabled={submitting}
            className={cn(buttonVariants({ size: "sm" }), "w-full gap-1.5")}
          >
            {submitting ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
            ) : (
              <Plus className="h-3.5 w-3.5" aria-hidden />
            )}
            Add to workspace
          </button>
        </form>
      </aside>
    </div>
  );
}

/* ----------------------------- Change requests ----------------------------- */

function ChangeRequestsPanel({
  slug,
  changeRequests,
}: {
  slug: string;
  changeRequests: PortalChangeRequest[];
}) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [form, setForm] = useState({
    title: "",
    description: "",
    impact: "medium" as PortalChangeRequest["impact"],
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      toast.error("Add a title and description before submitting.");
      setStatusMessage("Add a title and description before submitting.");
      return;
    }
    setSubmitting(true);
    setStatusMessage("");
    try {
      await submitChangeRequest(slug, {
        title: form.title.trim(),
        description: form.description.trim(),
        impact: form.impact,
      });
      toast.success("Change request submitted. We&rsquo;ll review and respond.");
      setStatusMessage("Change request submitted.");
      setForm({ title: "", description: "", impact: "medium" });
      router.refresh();
    } catch (err) {
      const message = formatApiErrorMessage(err);
      toast.error(message);
      setStatusMessage(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        {changeRequests.length === 0 ? (
          <EmptyState
            icon={<ClipboardList className="h-6 w-6" aria-hidden />}
            title="No change requests yet"
            description="Need to adjust scope or timing? Submit one and we&rsquo;ll respond in the timeline above."
          />
        ) : (
          <ul className="space-y-3">
            {changeRequests.map((cr) => (
              <li
                key={cr.id}
                className="rounded-2xl border border-blue-100 bg-white p-5 dark:border-blue-950 dark:bg-card"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold",
                      CHANGE_REQUEST_COLORS[cr.status],
                    )}
                  >
                    {CHANGE_REQUEST_LABELS[cr.status]}
                  </span>
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold uppercase tracking-wide",
                      IMPACT_COLORS[cr.impact],
                    )}
                  >
                    {cr.impact} impact
                  </span>
                  <h3 className="font-semibold tracking-tight">{cr.title}</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {cr.description}
                </p>
                <p className="mt-3 text-xs text-muted-foreground">
                  Submitted {formatRelative(cr.submittedAt)}
                  {cr.submittedBy ? ` by ${cr.submittedBy}` : ""}
                  {cr.decidedAt
                    ? ` · Decided ${formatRelative(cr.decidedAt)}`
                    : ""}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <aside className="rounded-2xl border border-blue-100 bg-white p-6 dark:border-blue-950 dark:bg-card">
        <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400">
          <PenLine className="h-4 w-4" aria-hidden /> Submit a request
        </h2>
        <p role="status" aria-live="polite" className="sr-only">
          {statusMessage}
        </p>
        <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
          <label className="block text-xs font-medium text-muted-foreground">
            Title
            <input
              type="text"
              value={form.title}
              onChange={(e) =>
                setForm((s) => ({ ...s, title: e.target.value }))
              }
              placeholder="Add a testimonials section"
              className="mt-1 w-full rounded-lg border border-blue-100 bg-background px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-blue-950"
            />
          </label>
          <label className="block text-xs font-medium text-muted-foreground">
            Description
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm((s) => ({ ...s, description: e.target.value }))
              }
              rows={4}
              placeholder="What should change and why?"
              className="mt-1 w-full rounded-lg border border-blue-100 bg-background px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-blue-950"
            />
          </label>
          <fieldset className="space-y-2">
            <legend className="text-xs font-medium text-muted-foreground">
              Impact
            </legend>
            <div
              role="radiogroup"
              aria-label="Change impact"
              className="flex flex-wrap gap-2"
            >
              {(["low", "medium", "high"] as const).map((level) => {
                const active = form.impact === level;
                return (
                  <button
                    type="button"
                    key={level}
                    role="radio"
                    aria-checked={active}
                    onClick={() => setForm((s) => ({ ...s, impact: level }))}
                    className={cn(
                      "rounded-full border px-3 py-1 text-xs font-semibold capitalize transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                      active
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-blue-100 bg-background text-muted-foreground hover:bg-blue-50 dark:border-blue-950 dark:hover:bg-blue-950/30",
                    )}
                  >
                    {level}
                  </button>
                );
              })}
            </div>
          </fieldset>
          <button
            type="submit"
            disabled={submitting}
            className={cn(buttonVariants({ size: "sm" }), "w-full gap-1.5")}
          >
            {submitting ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
            ) : (
              <PenLine className="h-3.5 w-3.5" aria-hidden />
            )}
            Submit request
          </button>
        </form>
      </aside>
    </div>
  );
}

/* ----------------------------- Comments ----------------------------- */

function CommentsPanel({
  slug,
  activity,
}: {
  slug: string;
  activity: PortalProjectActivity[];
}) {
  const router = useRouter();
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const commentEvents = useMemo(
    () =>
      activity.filter((event) => event.kind === "comment"),
    [activity],
  );
  const sorted = useMemo(
    () =>
      [...commentEvents].sort(
        (a, b) => new Date(b.at).getTime() - new Date(a.at).getTime(),
      ),
    [commentEvents],
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = body.trim();
    if (!trimmed) {
      toast.error("Add a message before posting.");
      return;
    }
    setSubmitting(true);
    setStatusMessage("");
    try {
      await postProjectComment(slug, { body: trimmed });
      toast.success("Comment posted.");
      setStatusMessage("Comment posted.");
      setBody("");
      router.refresh();
    } catch (err) {
      const message = formatApiErrorMessage(err);
      toast.error(message);
      setStatusMessage(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        {sorted.length === 0 ? (
          <EmptyState
            icon={<MessagesSquare className="h-6 w-6" aria-hidden />}
            title="No comments yet"
            description="Be the first to start the conversation. Anything you post will land in the activity feed too."
          />
        ) : (
          <ul className="space-y-3">
            {sorted.map((c) => (
              <li
                key={c.id}
                className="rounded-2xl border border-blue-100 bg-white p-5 dark:border-blue-950 dark:bg-card"
              >
                <div className="flex items-start gap-3">
                  <Avatar name={c.actor ?? "Someone"} url={null} />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">
                        {c.actor ?? "Someone"}
                      </span>
                      <span>· {formatRelative(c.at)}</span>
                    </div>
                    <p className="mt-2 whitespace-pre-wrap text-sm">
                      {c.description ?? c.title}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <aside className="rounded-2xl border border-blue-100 bg-white p-6 dark:border-blue-950 dark:bg-card">
        <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400">
          <PenLine className="h-4 w-4" aria-hidden /> Post a comment
        </h2>
        <p role="status" aria-live="polite" className="sr-only">
          {statusMessage}
        </p>
        <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="project-comment-body">
            Your comment
          </label>
          <textarea
            id="project-comment-body"
            onChange={(e) => setBody(e.target.value)}
            rows={5}
            placeholder="Share an update or question"
            className="w-full rounded-lg border border-blue-100 bg-background px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-blue-950"
          />
          <button
            type="submit"
            disabled={submitting || !body.trim()}
            className={cn(buttonVariants({ size: "sm" }), "w-full gap-1.5")}
          >
            {submitting ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
            ) : (
              <MessagesSquare className="h-3.5 w-3.5" aria-hidden />
            )}
            Post comment
          </button>
        </form>
      </aside>
    </div>
  );
}

/* ----------------------------- Activity ----------------------------- */

function ActivityPanel({ activity }: { activity: PortalProjectActivity[] }) {
  const sorted = useMemo(
    () =>
      [...activity].sort(
        (a, b) => new Date(b.at).getTime() - new Date(a.at).getTime(),
      ),
    [activity],
  );
  if (sorted.length === 0) {
    return (
      <EmptyState
        icon={<TrendingUp className="h-6 w-6" aria-hidden />}
        title="Nothing to show yet"
        description="Updates from your project will appear here as they happen."
      />
    );
  }
  return (
    <ol className="space-y-3">
      {sorted.map((event) => (
        <li
          key={event.id}
          className="rounded-2xl border border-blue-100 bg-white p-5 dark:border-blue-950 dark:bg-card"
        >
          <div className="flex items-start gap-3">
            <span
              aria-hidden
              className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
            >
              <CircleDot className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <h3 className="text-sm font-semibold tracking-tight">
                  {event.title}
                </h3>
                <span className="text-xs text-muted-foreground">
                  {formatDateTime(event.at)}
                </span>
              </div>
              {event.description ? (
                <p className="mt-1 text-sm text-muted-foreground">
                  {event.description}
                </p>
              ) : null}
              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                {event.actor ? (
                  <span>By {event.actor}</span>
                ) : null}
                {event.kind ? (
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                    {event.kind}
                  </span>
                ) : null}
                {event.href ? (
                  <Link
                    href={event.href}
                    className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
                  >
                    View <ArrowUpRight className="h-3 w-3" aria-hidden />
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ----------------------------- Helpers ----------------------------- */

function Avatar({
  name,
  url,
}: {
  name: string;
  url: string | null | undefined;
}) {
  if (url) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={url}
        alt=""
        className="h-9 w-9 shrink-0 rounded-full object-cover"
      />
    );
  }
  return (
    <span
      aria-hidden
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary"
    >
      {initials(name)}
    </span>
  );
}