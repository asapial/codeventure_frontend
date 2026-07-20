import Link from "next/link";
import { FolderKanban, RefreshCw } from "lucide-react";

import { EmptyState } from "@/components/ui/empty-state";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  reason?: string;
}

// Touched to invalidate stale TS cache after creation.
export function ProjectsListFallback({ reason }: Props) {
  return (
    <div className="space-y-6">
      <header className="flex flex-col items-start justify-between gap-5 rounded-2xl border border-blue-100 bg-gradient-to-br from-white to-blue-50/70 p-6 shadow-sm dark:border-blue-950 dark:from-card dark:to-blue-950/20 sm:flex-row sm:items-end">
        <div className="flex flex-1 items-start gap-4">
          <span
            aria-hidden="true"
            className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:flex"
          >
            <FolderKanban className="h-6 w-6" />
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
              Workspace
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-[-0.035em]">
              Projects
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Track every engagement we&rsquo;re working on with you.
            </p>
          </div>
        </div>
      </header>
      <EmptyState
        icon={<RefreshCw className="h-6 w-6" aria-hidden="true" />}
        title="We couldn't load your projects"
        description={
          reason ??
            "Something went wrong while reaching your workspace. Please try again in a moment."
        }
        action={
          <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
            <Link
              href="/dashboard/projects"
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
