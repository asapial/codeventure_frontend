import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { cn } from "@/lib/utils";
import type { AccountSummary } from "@/types/account";

interface Props {
  summary: AccountSummary;
}

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

export function AccountOverview({ summary }: Props) {
  const tiles = [
    {
      label: "Active projects",
      value: summary.activeProjects,
      href: "/account/projects",
    },
    {
      label: "Open invoices",
      value: summary.openInvoices,
      href: "/account/billing",
    },
    {
      label: "Unread messages",
      value: summary.unreadMessages,
      href: null,
    },
    {
      label: "Outstanding",
      value: summary.billing
        ? currencyFormat(summary.billing.currency, summary.billing.outstanding)
        : "—",
      href: "/account/billing",
    },
  ];

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Account overview
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Your active projects, billing, and recent activity at a glance.
          </p>
        </div>
        <Link
          href="/request-quote"
          className={cn(buttonVariants({ size: "sm" }))}
        >
          Start a new project
        </Link>
      </header>

      <section aria-label="Key metrics">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tiles.map((tile) => (
            <li key={tile.label}>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {tile.label}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-semibold">{tile.value}</p>
                  {tile.href ? (
                    <Link
                      href={tile.href}
                      className="mt-2 inline-block text-xs text-primary underline-offset-4 hover:underline"
                    >
                      View details →
                    </Link>
                  ) : null}
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="Recent activity">
        <h2 className="text-lg font-semibold tracking-tight">Recent activity</h2>
        {summary.recentActivity.length === 0 ? (
          <div className="mt-4">
            <EmptyState
              title="No recent activity"
              description="We’ll surface updates here as your projects move."
            />
          </div>
        ) : (
          <ol className="mt-4 space-y-3">
            {summary.recentActivity.map((event) => (
              <li
                key={event.id}
                className="flex items-start gap-4 rounded-lg border border-border bg-card p-4"
              >
                <time
                  dateTime={event.at}
                  className="w-28 shrink-0 text-xs uppercase tracking-wide text-muted-foreground"
                >
                  {new Date(event.at).toLocaleDateString()}
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
    </div>
  );
}