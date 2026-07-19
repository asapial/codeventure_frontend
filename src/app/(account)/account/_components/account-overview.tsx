import Link from "next/link";
import { ArrowUpRight, CircleDollarSign, FolderKanban, Mail, ReceiptText } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { cn } from "@/lib/utils";
import type { AccountSummary } from "@/types/account";

function currencyFormat(currency: string, value: number): string {
  try { return new Intl.NumberFormat(undefined, { style: "currency", currency, maximumFractionDigits: 2 }).format(value); }
  catch { return `${currency} ${value.toFixed(2)}`; }
}

export function AccountOverview({ summary }: { summary: AccountSummary }) {
  const tiles = [
    { label: "Active projects", value: summary.activeProjects, href: "/account/projects", icon: FolderKanban, accent: "text-blue-600 bg-blue-50 dark:bg-blue-950/60 dark:text-blue-400" },
    { label: "Open invoices", value: summary.openInvoices, href: "/account/billing", icon: ReceiptText, accent: "text-violet-600 bg-violet-50 dark:bg-violet-950/50 dark:text-violet-400" },
    { label: "Unread messages", value: summary.unreadMessages, href: null, icon: Mail, accent: "text-cyan-600 bg-cyan-50 dark:bg-cyan-950/50 dark:text-cyan-400" },
    { label: "Outstanding", value: summary.billing ? currencyFormat(summary.billing.currency, summary.billing.outstanding) : "—", href: "/account/billing", icon: CircleDollarSign, accent: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 dark:text-emerald-400" },
  ];

  return (
    <div className="space-y-8">
      <header className="flex flex-col justify-between gap-5 rounded-2xl border border-blue-100 bg-gradient-to-br from-white to-blue-50/70 p-6 shadow-sm dark:border-blue-950 dark:from-card dark:to-blue-950/20 sm:flex-row sm:items-end">
        <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">Client workspace</p><h1 className="mt-2 text-3xl font-bold tracking-[-0.035em]">Account overview</h1><p className="mt-2 text-sm text-muted-foreground">Your projects, billing, and latest activity in one clear view.</p></div>
        <Link href="/request-quote" className={cn(buttonVariants({ size: "sm" }), "rounded-full")}>Start a new project <ArrowUpRight aria-hidden="true" /></Link>
      </header>

      <section aria-label="Key metrics">
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {tiles.map(({ label, value, href, icon: Icon, accent }) => (
            <li key={label}><Card className="h-full transition-all hover:-translate-y-0.5 hover:shadow-lg"><CardContent className="p-5"><div className="flex items-start justify-between"><span className={cn("grid size-10 place-items-center rounded-xl", accent)}><Icon className="size-4.5" aria-hidden="true" /></span>{href ? <Link href={href} aria-label={`View ${label}`} className="text-muted-foreground hover:text-blue-600"><ArrowUpRight className="size-4" aria-hidden="true" /></Link> : null}</div><p className="mt-5 text-2xl font-bold tracking-tight">{value}</p><p className="mt-1 text-xs font-medium text-muted-foreground">{label}</p></CardContent></Card></li>
          ))}
        </ul>
      </section>

      <section aria-label="Recent activity" className="rounded-2xl border border-blue-100 bg-card p-5 shadow-sm dark:border-blue-950 sm:p-6">
        <div className="flex items-center justify-between"><div><h2 className="text-lg font-bold tracking-tight">Recent activity</h2><p className="mt-1 text-xs text-muted-foreground">The latest movement across your workspace.</p></div><span className="size-2 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,.12)]" /></div>
        {summary.recentActivity.length === 0 ? <div className="mt-5"><EmptyState title="No recent activity" description="Updates will appear here as your projects move forward." className="border-0 bg-muted/40 shadow-none" /></div> : (
          <ol className="mt-5 divide-y divide-border/70">{summary.recentActivity.map((event) => <li key={event.id} className="flex gap-4 py-4 first:pt-0 last:pb-0"><span className="mt-1.5 size-2 shrink-0 rounded-full bg-blue-500" /><div className="min-w-0 flex-1"><div className="flex flex-col justify-between gap-1 sm:flex-row"><p className="font-semibold">{event.title}</p><time dateTime={event.at} className="text-[10px] uppercase tracking-wider text-muted-foreground">{new Date(event.at).toLocaleDateString()}</time></div>{event.description ? <p className="mt-1 text-sm text-muted-foreground">{event.description}</p> : null}{event.href ? <Link href={event.href} className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-blue-600">Open <ArrowUpRight className="size-3" aria-hidden="true" /></Link> : null}</div></li>)}</ol>
        )}
      </section>
    </div>
  );
}
