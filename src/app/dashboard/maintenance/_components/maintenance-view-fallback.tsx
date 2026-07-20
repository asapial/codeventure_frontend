import Link from "next/link";

import { EmptyState } from "@/components/ui/empty-state";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { RefreshCw, Wrench } from "lucide-react";

interface Props {
  reason?: string;
}

export function MaintenanceViewFallback({ reason }: Props) {
  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-blue-100 bg-gradient-to-br from-white to-blue-50/70 p-6 shadow-sm dark:border-blue-950 dark:from-card dark:to-blue-950/20">
        <div className="flex items-start gap-4">
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
      </header>
      <EmptyState
        icon={<RefreshCw className="h-6 w-6" aria-hidden />}
        title="We couldn’t load your maintenance plan"
        description={
          reason ?? "Something went wrong while reaching your workspace. Please try again."
        }
        action={
          <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
            <Link
              href="/dashboard/maintenance"
              className={cn(buttonVariants({ variant: "default", size: "sm" }))}
            >
              Retry
            </Link>
            <Link
              href="/dashboard"
              className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
            >
              Back to dashboard
            </Link>
          </div>
        }
      />
    </div>
  );
}