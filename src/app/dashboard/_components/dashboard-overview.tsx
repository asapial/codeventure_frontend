import Link from "next/link";
import {
  AlertCircle,
  ArrowUpRight,
  BarChart3,
  ClipboardCheck,
  FileEdit,
  FolderKanban,
  Inbox,
  LifeBuoy,
  Mail,
  ReceiptText,
  Users,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { cn } from "@/lib/utils";
import type {
  CustomerDashboard,
  OrganizationSummary,
  PriorityAction,
} from "@/types/portal";

function currencyFormat(currency: string, value: number): string {
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return `${currency} ${value.toFixed(2)}`;
  }
}

const PRIORITY_ACTION_ICONS: Record<PriorityAction["kind"], typeof Inbox> = {
  "overdue-invoice": ReceiptText,
  "approval-pending": ClipboardCheck,
  "support-reply": LifeBuoy,
  "change-request-open": FileEdit,
};

const PRIORITY_ACTION_TONE: Record<PriorityAction["severity"], string> = {
  info: "text-blue-600 bg-blue-50 dark:bg-blue-950/60 dark:text-blue-400",
  warning:
    "text-amber-600 bg-amber-50 dark:bg-amber-950/50 dark:text-amber-300",
  critical:
    "text-rose-600 bg-rose-50 dark:bg-rose-950/50 dark:text-rose-300",
};

const PRIORITY_ACTION_LABELS: Record<PriorityAction["kind"], string> = {
  "overdue-invoice": "Billing",
  "approval-pending": "Approvals",
  "support-reply": "Support",
  "change-request-open": "Change requests",
};

function OrganizationCard({ org }: { org: OrganizationSummary }) {
  return (
    <Card className="overflow-hidden border-blue-100 dark:border-blue-950">
      <CardContent className="flex items-center gap-4 p-5">
        <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/20">
          <Users className="size-5" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
            Workspace
          </p>
          <h2 className="truncate text-lg font-semibold tracking-tight">
            {org.name}
          </h2>
          <p className="text-xs text-muted-foreground">
            {org.planName}
            {org.memberCount > 0
              ? ` · ${org.memberCount} member${org.memberCount === 1 ? "" : "s"}`
              : null}
            {org.primaryDomain ? ` · ${org.primaryDomain}` : null}
          </p>
        </div>
        <Link
          href="/dashboard/members"
          aria-label="Manage workspace members"
          className="text-muted-foreground transition-colors hover:text-blue-600"
        >
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </Link>
      </CardContent>
    </Card>
  );
}

function PriorityActionItem({ action }: { action: PriorityAction }) {
  const Icon = PRIORITY_ACTION_ICONS[action.kind];
  const tone = PRIORITY_ACTION_TONE[action.severity];
  const due = action.dueAt
    ? new Date(action.dueAt).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <li>
      <Link
        href={action.cta.href}
        className="group flex items-start gap-3 rounded-2xl border border-blue-100 bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md dark:border-blue-950 dark:hover:border-blue-800"
      >
        <span
          className={cn(
            "mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl",
            tone,
          )}
        >
          <Icon className="size-4" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
              {PRIORITY_ACTION_LABELS[action.kind]}
            </p>
            {due ? (
              <time
                dateTime={action.dueAt ?? undefined}
                className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground"
              >
                Due {due}
              </time>
            ) : null}
          </div>
          <p className="mt-1 text-sm font-semibold leading-snug">
            {action.title}
          </p>
          <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
            {action.description}
          </p>
          <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-blue-600 group-hover:underline dark:text-blue-400">
            {action.cta.label}
            <ArrowUpRight className="size-3" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </li>
  );
}

function PriorityActionsRail({ actions }: { actions: PriorityAction[] }) {
  return (
    <section
      aria-label="Priority actions"
      className="rounded-2xl border border-blue-100 bg-gradient-to-br from-white to-amber-50/40 p-5 shadow-sm dark:border-blue-950 dark:from-card dark:to-amber-950/10 sm:p-6"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-bold tracking-tight">
            <BarChart3
              className="size-4 text-amber-500"
              aria-hidden="true"
            />
            Priority actions
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Things that need your attention across the workspace.
          </p>
        </div>
        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-700 dark:bg-amber-950/50 dark:text-amber-300">
          {actions.length}
        </span>
      </div>
      {actions.length === 0 ? (
        <div className="mt-5">
          <EmptyState
            title="All caught up"
            description="Nothing urgent is waiting on you right now."
            icon={
              <span className="grid size-12 place-items-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300">
                <AlertCircle className="size-5" aria-hidden="true" />
              </span>
            }
            className="border-0 bg-muted/40 shadow-none"
          />
        </div>
      ) : (
        <ul className="mt-5 grid gap-3">
          {actions.map((action) => (
            <PriorityActionItem key={action.id} action={action} />
          ))}
        </ul>
      )}
    </section>
  );
}

/**
 * Workspace overview shown at `/dashboard`.
 *
 * Consumes the `CustomerDashboard` shape from the portal backend, surfacing:
 *  - 4 KPI tiles (active projects, open invoices, support tickets, balance)
 *  - Organization summary header card (workspace + plan)
 *  - Priority actions rail (overdue invoices, approvals, support replies, change requests)
 *  - Recent activity feed
 */
export function DashboardOverview({ dashboard }: { dashboard: CustomerDashboard }) {
  const { summary, organizationSummary, priorityActions, recentActivity } =
    dashboard;

  const tiles = [
    {
      label: "Active projects",
      value: summary.activeProjects,
      href: "/dashboard/projects",
      icon: FolderKanban,
      accent:
        "text-blue-600 bg-blue-50 dark:bg-blue-950/60 dark:text-blue-400",
    },
    {
      label: "Open invoices",
      value: summary.openInvoices,
      href: "/dashboard/billing",
      icon: ReceiptText,
      accent:
        "text-violet-600 bg-violet-50 dark:bg-violet-950/50 dark:text-violet-400",
    },
    {
      label: "Open tickets",
      value: summary.openTicketCount,
      href: "/dashboard/support",
      icon: LifeBuoy,
      accent:
        "text-cyan-600 bg-cyan-50 dark:bg-cyan-950/50 dark:text-cyan-400",
    },
    {
      label: "Outstanding",
      value: currencyFormat(summary.currency, summary.outstandingBalance),
      href: "/dashboard/billing",
      icon: BarChart3,
      accent:
        "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 dark:text-emerald-400",
    },
  ];

  return (
    <div className="space-y-8">
      <header className="flex flex-col items-start justify-between gap-5 rounded-2xl border border-blue-100 bg-gradient-to-br from-white to-blue-50/70 p-6 shadow-sm dark:border-blue-950 dark:from-card dark:to-blue-950/20 sm:flex-row sm:items-end">
        <div className="flex-1">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
            Client workspace
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-[-0.035em]">
            Dashboard overview
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your projects, billing, and latest activity in one clear view.
          </p>
        </div>
        <Link
          href="/request-quote"
          className={cn(buttonVariants({ size: "sm" }), "shrink-0 rounded-full")}
        >
          Start a new project <ArrowUpRight aria-hidden="true" />
        </Link>
      </header>

      {organizationSummary ? (
        <OrganizationCard org={organizationSummary} />
      ) : null}

      <section aria-label="Key metrics">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tiles.map(({ label, value, href, icon: Icon, accent }) => (
            <li key={label}>
              <Card className="h-full transition-all hover:-translate-y-0.5 hover:shadow-lg">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <span
                      className={cn(
                        "grid size-10 place-items-center rounded-xl",
                        accent,
                      )}
                    >
                      <Icon className="size-4.5" aria-hidden="true" />
                    </span>
                    {href ? (
                      <Link
                        href={href}
                        aria-label={`View ${label}`}
                        className="text-muted-foreground hover:text-blue-600"
                      >
                        <ArrowUpRight
                          className="size-4"
                          aria-hidden="true"
                        />
                      </Link>
                    ) : null}
                  </div>
                  <p className="mt-5 text-2xl font-bold tracking-tight">
                    {value}
                  </p>
                  <p className="mt-1 text-xs font-medium text-muted-foreground">
                    {label}
                  </p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PriorityActionsRail actions={priorityActions} />
        </div>

        <section
          aria-label="Recent activity"
          className="rounded-2xl border border-blue-100 bg-card p-5 shadow-sm dark:border-blue-950 sm:p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold tracking-tight">
                Recent activity
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                The latest movement across your workspace.
              </p>
            </div>
            <span className="size-2 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,.12)]" />
          </div>
          {recentActivity.length === 0 ? (
            <div className="mt-5">
              <EmptyState
                title="No recent activity"
                description="Updates will appear here as your projects move forward."
                className="border-0 bg-muted/40 shadow-none"
              />
            </div>
          ) : (
            <ol className="mt-5 space-y-4">
              {recentActivity.slice(0, 8).map((event) => (
                <li key={event.id} className="flex gap-3">
                  <span className="mt-1.5 size-2 shrink-0 rounded-full bg-blue-500" />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                      <p className="text-sm font-semibold">{event.title}</p>
                      <time
                        dateTime={event.at}
                        className="text-[10px] uppercase tracking-wider text-muted-foreground"
                      >
                        {new Date(event.at).toLocaleDateString()}
                      </time>
                    </div>
                    {event.description ? (
                      <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                        {event.description}
                      </p>
                    ) : null}
                    {event.href ? (
                      <Link
                        href={event.href}
                        className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline"
                      >
                        Open{" "}
                        <ArrowUpRight
                          className="size-3"
                          aria-hidden="true"
                        />
                      </Link>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
          )}
        </section>
      </div>
    </div>
  );
}