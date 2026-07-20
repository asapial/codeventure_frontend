"use client";

import { AlertTriangle, Inbox, RefreshCw } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Skeleton
// ---------------------------------------------------------------------------

export interface PortalSkeletonProps {
  /** Number of stacked rows to render. Default 3. */
  rows?: number;
  /** Show a header band on top. Default true. */
  withHeader?: boolean;
  /** Tailwind class for the wrapper. */
  className?: string;
  /** Optional aria-label override. */
  ariaLabel?: string;
}

export function PortalSkeleton({
  rows = 3,
  withHeader = true,
  className,
  ariaLabel = "Loading content",
}: PortalSkeletonProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={ariaLabel}
      className={cn("space-y-4", className)}
    >
      {withHeader ? (
        <div className="rounded-2xl border border-blue-100 bg-card p-6 shadow-sm dark:border-blue-950">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="mt-3 h-8 w-2/3" />
          <Skeleton className="mt-3 h-4 w-1/2" />
        </div>
      ) : null}
      {Array.from({ length: rows }).map((_, idx) => (
        <div
          key={idx}
          className="rounded-2xl border border-blue-100 bg-card p-5 shadow-sm dark:border-blue-950"
        >
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="mt-3 h-3 w-2/3" />
          <Skeleton className="mt-5 h-3 w-full" />
          <Skeleton className="mt-2 h-3 w-5/6" />
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Error
// ---------------------------------------------------------------------------

export interface PortalErrorProps {
  title?: string;
  message: string;
  /** Called when the user clicks "Try again". */
  onRetry?: () => void;
  /** Optional request id to surface for support. */
  requestId?: string;
  className?: string;
}

export function PortalError({
  title = "Something went wrong",
  message,
  onRetry,
  requestId,
  className,
}: PortalErrorProps) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className={cn(
        "mx-auto flex max-w-xl flex-col items-center justify-center gap-3 rounded-2xl border border-rose-200 bg-rose-50/60 p-8 text-center shadow-sm dark:border-rose-900/60 dark:bg-rose-950/20",
        className,
      )}
    >
      <span className="grid size-12 place-items-center rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-300">
        <AlertTriangle className="size-5" aria-hidden="true" />
      </span>
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      <p className="text-sm text-muted-foreground">{message}</p>
      {requestId ? (
        <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          Request {requestId}
        </p>
      ) : null}
      {onRetry ? (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onRetry}
          className="mt-2"
        >
          <RefreshCw className="size-3.5" aria-hidden="true" /> Try again
        </Button>
      ) : null}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Empty
// ---------------------------------------------------------------------------

export interface PortalEmptyProps {
  title: string;
  description?: string;
  /** Optional CTA (button or link). */
  action?:
    | {
        label: string;
        onClick?: () => void;
        href?: string;
      }
    | React.ReactNode;
  className?: string;
  /** When true, swap the default inbox icon for an alert variant. */
  variant?: "default" | "info";
}

export function PortalEmpty({
  title,
  description,
  action,
  className,
  variant = "default",
}: PortalEmptyProps) {
  const icon = (
    <span className="grid size-12 place-items-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
      <Inbox className="size-5" aria-hidden="true" />
    </span>
  );

  // Reuse the shared EmptyState — it already supports both shapes of `action`.
  return (
    <EmptyState
      title={title}
      description={description}
      icon={icon}
      action={action as never}
      className={cn(variant === "info" && "bg-blue-50/40", className)}
    />
  );
}

// ---------------------------------------------------------------------------
// Convenience: combined loading shell
// ---------------------------------------------------------------------------

export interface PortalSectionLoadingProps extends PortalSkeletonProps {}

/**
 * Use as the loading boundary for a single portal section (e.g. activity feed,
 * project grid). Renders `PortalSkeleton` with sensible defaults.
 */
export function PortalSectionLoading(props: PortalSectionLoadingProps) {
  return <PortalSkeleton {...props} />;
}