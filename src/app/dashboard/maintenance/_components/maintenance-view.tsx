"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { buttonVariants } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { ApiError, formatApiErrorMessage } from "@/lib/api/client";
import { submitMaintenanceRequest } from "@/lib/api/portal";
import { cn } from "@/lib/utils";
import type {
  MaintenancePlanTier,
  MaintenancePriority,
  MaintenanceRequest,
  MaintenanceRequestStatus,
  MaintenanceRequestType,
  MaintenanceState,
} from "@/types/portal";
import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  CircleDot,
  Clock,
  Gauge,
  Inbox,
  Loader2,
  PenLine,
  Plus,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";

interface Props {
  state: MaintenanceState;
}

const TIER_LABELS: Record<MaintenancePlanTier, string> = {
  included: "Included",
  priority: "Priority",
  platinum: "Platinum",
  none: "No plan",
};

const TIER_COLORS: Record<MaintenancePlanTier, string> = {
  included: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  priority:
    "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300",
  platinum:
    "bg-violet-100 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300",
  none: "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300",
};

const STATUS_LABELS: Record<MaintenanceRequestStatus, string> = {
  submitted: "Submitted",
  triaged: "Triaged",
  "in-progress": "In progress",
  "awaiting-customer": "Awaiting you",
  resolved: "Resolved",
  closed: "Closed",
};

const STATUS_COLORS: Record<MaintenanceRequestStatus, string> = {
  submitted:
    "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300",
  triaged:
    "bg-violet-100 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300",
  "in-progress":
    "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300",
  "awaiting-customer":
    "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300",
  resolved:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300",
  closed:
    "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
};

const PRIORITY_LABELS: Record<MaintenancePriority, string> = {
  low: "Low",
  normal: "Normal",
  high: "High",
  urgent: "Urgent",
};

const PRIORITY_COLORS: Record<MaintenancePriority, string> = {
  low: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  normal:
    "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300",
  high: "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300",
  urgent: "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300",
};

const TYPE_LABELS: Record<MaintenanceRequestType, string> = {
  update: "Update",
  bug: "Bug fix",
  content: "Content change",
  performance: "Performance",
  security: "Security",
  backup: "Backup",
  consult: "Consult",
};

const TYPE_ICONS: Record<
  MaintenanceRequestType,
  React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>
> = {
  update: Sparkles,
  bug: AlertTriangle,
  content: PenLine,
  performance: Gauge,
  security: ShieldCheck,
  backup: Clock,
  consult: Inbox,
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

export function MaintenanceView({ state }: Props) {
  const router = useRouter();
  const { subscription, recentReports, activeRequests, metrics } = state;
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [form, setForm] = useState({
    title: "",
    description: "",
    requestType: "update" as MaintenanceRequestType,
    priority: "normal" as MaintenancePriority,
  });

  const sortedActive = useMemo(
    () =>
      [...activeRequests].sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      ),
    [activeRequests],
  );
  const sortedRecent = useMemo(
    () =>
      [...recentReports].sort(
        (a, b) =>
          new Date(b.submittedAt).getTime() -
          new Date(a.submittedAt).getTime(),
      ),
    [recentReports],
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (form.title.trim().length < 3) {
      toast.error("Give your request a title (at least 3 characters).");
      return;
    }
    if (form.description.trim().length < 10) {
      toast.error("Add a bit more detail (at least 10 characters).");
      return;
    }
    setSubmitting(true);
    setStatusMessage("");
    try {
      await submitMaintenanceRequest({
        title: form.title.trim(),
        description: form.description.trim(),
        requestType: form.requestType,
        priority: form.priority,
      });
      toast.success("Request submitted — we’ll review and follow up shortly.");
      setStatusMessage("Request submitted successfully.");
      setForm({
        title: "",
        description: "",
        requestType: "update",
        priority: "normal",
      });
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
    <div className="space-y-6">
      <header className="rounded-2xl border border-blue-100 bg-gradient-to-br from-white to-blue-50/70 p-6 shadow-sm dark:border-blue-950 dark:from-card dark:to-blue-950/20">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-1 items-start gap-4">
            <span
              aria-hidden
              className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:flex"
            >
              <Wrench className="h-6 w-6" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                Help & Care
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-[-0.035em]">
                Maintenance
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Raise a new request, track open tickets, and review what we’ve
                shipped recently.
              </p>
            </div>
          </div>
          <SubscriptionCard subscription={subscription} metrics={metrics} />
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <RequestsSection
            title="Open requests"
            description="Tickets currently in flight or waiting on a response."
            requests={sortedActive}
            emptyTitle="No open requests"
            emptyDescription="You’re all caught up. Submit a new request below whenever you need a hand."
          />
          <RequestsSection
            title="Recent activity"
            description="Resolved and closed requests from the last few cycles."
            requests={sortedRecent}
            emptyTitle="No recent activity"
            emptyDescription="Once we close requests, they’ll show up here for your records."
          />
        </div>
        <aside className="rounded-2xl border border-blue-100 bg-white p-6 dark:border-blue-950 dark:bg-card">
          <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400">
            <Plus className="h-4 w-4" aria-hidden /> New request
          </h2>
          <p
            role="status"
            aria-live="polite"
            className="sr-only"
          >
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
                placeholder="Update homepage hero copy"
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
                rows={5}
                placeholder="What should change and why?"
                className="mt-1 w-full rounded-lg border border-blue-100 bg-background px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-blue-950"
              />
            </label>
            <label className="block text-xs font-medium text-muted-foreground">
              Type
              <select
                value={form.requestType}
                onChange={(e) =>
                  setForm((s) => ({
                    ...s,
                    requestType: e.target.value as MaintenanceRequestType,
                  }))
                }
                className="mt-1 w-full rounded-lg border border-blue-100 bg-background px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-blue-950"
              >
                {(Object.keys(TYPE_LABELS) as MaintenanceRequestType[]).map(
                  (type) => (
                    <option key={type} value={type}>
                      {TYPE_LABELS[type]}
                    </option>
                  ),
                )}
              </select>
            </label>
            <fieldset className="space-y-2">
              <legend className="text-xs font-medium text-muted-foreground">
                Priority
              </legend>
              <div
                role="radiogroup"
                aria-label="Request priority"
                className="flex flex-wrap gap-2"
              >
                {(Object.keys(PRIORITY_LABELS) as MaintenancePriority[]).map(
                  (level) => {
                    const active = form.priority === level;
                    return (
                      <button
                        type="button"
                        key={level}
                        role="radio"
                        aria-checked={active}
                        onClick={() =>
                          setForm((s) => ({ ...s, priority: level }))
                        }
                        className={cn(
                          "rounded-full border px-3 py-1 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                          active
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-blue-100 bg-background text-muted-foreground hover:bg-blue-50 dark:border-blue-950 dark:hover:bg-blue-950/30",
                        )}
                      >
                        {PRIORITY_LABELS[level]}
                      </button>
                    );
                  },
                )}
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
                <Plus className="h-3.5 w-3.5" aria-hidden />
              )}
              Submit request
            </button>
          </form>
        </aside>
      </div>
    </div>
  );
}

function SubscriptionCard({
  subscription,
  metrics,
}: {
  subscription: MaintenanceState["subscription"];
  metrics: MaintenanceState["metrics"];
}) {
  if (!subscription) {
    return (
      <div className="shrink-0 rounded-2xl border border-rose-200 bg-rose-50/60 px-5 py-4 text-right dark:border-rose-900 dark:bg-rose-950/30">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-rose-700 dark:text-rose-300">
          Plan
        </p>
        <p className="mt-1 text-2xl font-bold tracking-tight">No active plan</p>
        <p className="text-xs text-muted-foreground">
          Reach out to set up a maintenance plan.
        </p>
      </div>
    );
  }
  const pct =
    subscription.monthlyHours > 0
      ? Math.round(
          ((subscription.monthlyHours - subscription.remainingHours) /
            subscription.monthlyHours) *
            100,
        )
      : 0;
  return (
    <div className="shrink-0 rounded-2xl border border-blue-100 bg-white px-5 py-4 text-right dark:border-blue-950 dark:bg-card">
      <div className="flex items-center justify-end gap-2">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
            TIER_COLORS[subscription.tier],
          )}
        >
          <ShieldCheck className="h-3.5 w-3.5" aria-hidden />{" "}
          {TIER_LABELS[subscription.tier]}
        </span>
      </div>
      <p className="mt-2 text-2xl font-bold tracking-tight">
        {subscription.remainingHours}
        <span className="text-sm font-normal text-muted-foreground">
          {" "}
          / {subscription.monthlyHours} hrs left
        </span>
      </p>
      <p className="text-xs text-muted-foreground">
        {pct}% used · Resets {formatDate(subscription.nextResetAt)}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        {metrics.openCount} open{" "}
        {metrics.openCount === 1 ? "ticket" : "tickets"} ·{" "}
        {metrics.averageFirstResponseHours != null
          ? `Avg first reply ${metrics.averageFirstResponseHours.toFixed(1)}h`
          : "Awaiting first response"}
      </p>
    </div>
  );
}

function RequestsSection({
  title,
  description,
  requests,
  emptyTitle,
  emptyDescription,
}: {
  title: string;
  description: string;
  requests: MaintenanceRequest[];
  emptyTitle: string;
  emptyDescription: string;
}) {
  return (
    <section className="rounded-2xl border border-blue-100 bg-white p-6 dark:border-blue-950 dark:bg-card">
      <header className="flex flex-col gap-1">
        <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight">
          <CircleDot className="h-5 w-5 text-primary" aria-hidden /> {title}
        </h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </header>
      {requests.length === 0 ? (
        <div className="mt-4">
          <EmptyState
            icon={<CheckCircle2 className="h-6 w-6" aria-hidden />}
            title={emptyTitle}
            description={emptyDescription}
          />
        </div>
      ) : (
        <ul className="mt-4 space-y-3">
          {requests.map((r) => (
            <RequestRow key={r.id} request={r} />
          ))}
        </ul>
      )}
    </section>
  );
}

function RequestRow({ request }: { request: MaintenanceRequest }) {
  const Icon = TYPE_ICONS[request.requestType] ?? Inbox;
  return (
    <li className="flex flex-col gap-3 rounded-2xl border border-blue-100 bg-background/60 p-4 dark:border-blue-950 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex items-start gap-3">
        <span
          aria-hidden
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"
        >
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={cn(
                "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold",
                STATUS_COLORS[request.status],
              )}
            >
              {STATUS_LABELS[request.status]}
            </span>
            <span
              className={cn(
                "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold uppercase tracking-wide",
                PRIORITY_COLORS[request.priority],
              )}
            >
              {PRIORITY_LABELS[request.priority]}
            </span>
            <span className="text-xs text-muted-foreground">
              {TYPE_LABELS[request.requestType]}
            </span>
          </div>
          <h3 className="mt-1 font-semibold tracking-tight">
            {request.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
            {request.description}
          </p>
        </div>
      </div>
      <div className="shrink-0 text-right text-xs text-muted-foreground">
        <p>Submitted {formatRelative(request.submittedAt)}</p>
        <p className="mt-0.5">
          Updated {formatRelative(request.updatedAt)}
        </p>
        {request.acknowledgedAt ? (
          <p className="mt-0.5 text-emerald-600 dark:text-emerald-400">
            Acknowledged {formatDate(request.acknowledgedAt)}
          </p>
        ) : null}
        {request.resolvedAt ? (
          <p className="mt-0.5 inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-3 w-3" aria-hidden /> Resolved{" "}
            {formatDate(request.resolvedAt)}
          </p>
        ) : null}
        <a
          href={`mailto:support@codeventure.test?subject=${encodeURIComponent(request.title)}`}
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "mt-1 h-7 px-2 text-xs",
          )}
        >
          Reply
          <ArrowUpRight className="h-3 w-3" aria-hidden />
        </a>
      </div>
    </li>
  );
}