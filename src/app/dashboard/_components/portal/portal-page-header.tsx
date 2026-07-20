import Link from "next/link";
import * as React from "react";

import { cn } from "@/lib/utils";

export interface PortalBreadcrumb {
  label: string;
  href?: string;
}

export interface PortalPageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: PortalBreadcrumb[];
  /** Optional right-side slot for primary CTAs, tabs, or status pills. */
  actions?: React.ReactNode;
  /** Optional secondary slot rendered below the title block. */
  meta?: React.ReactNode;
  className?: string;
}

/**
 * Shared page header for portal screens (C1–C10). Keeps a consistent
 * gradient + breadcrumb treatment across the dashboard tree so that
 * `dashboard-overview` and the new portal pages feel like the same product.
 */
export function PortalPageHeader({
  eyebrow,
  title,
  description,
  breadcrumbs,
  actions,
  meta,
  className,
}: PortalPageHeaderProps) {
  return (
    <header
      className={cn(
        "flex flex-col items-start justify-between gap-5 rounded-2xl border border-blue-100 bg-gradient-to-br from-white to-blue-50/70 p-6 shadow-sm dark:border-blue-950 dark:from-card dark:to-blue-950/20 sm:flex-row sm:items-end",
        className,
      )}
    >
      <div className="flex-1 space-y-2">
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-1.5">
              {breadcrumbs.map((crumb, idx) => {
                const isLast = idx === breadcrumbs.length - 1;
                return (
                  <li
                    key={`${crumb.label}-${idx}`}
                    className="flex items-center gap-1.5"
                  >
                    {crumb.href && !isLast ? (
                      <Link
                        href={crumb.href}
                        className="font-medium text-blue-700 hover:underline dark:text-blue-300"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span
                        aria-current={isLast ? "page" : undefined}
                        className={cn(
                          "font-medium",
                          isLast ? "text-foreground" : "text-muted-foreground",
                        )}
                      >
                        {crumb.label}
                      </span>
                    )}
                    {!isLast ? (
                      <span aria-hidden="true" className="text-muted-foreground/60">
                        /
                      </span>
                    ) : null}
                  </li>
                );
              })}
            </ol>
          </nav>
        ) : null}

        {eyebrow ? (
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="text-3xl font-bold tracking-[-0.035em]">{title}</h1>
        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : null}
        {meta ? <div className="pt-2">{meta}</div> : null}
      </div>

      {actions ? (
        <div className="flex w-full flex-wrap items-center justify-start gap-2 sm:w-auto sm:justify-end">
          {actions}
        </div>
      ) : null}
    </header>
  );
}