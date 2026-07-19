import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode | {
    label: string;
    onClick?: () => void;
    href?: string;
  };
  icon?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  title,
  description,
  action,
  icon,
  className,
}: EmptyStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "mx-auto flex max-w-xl flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-blue-200 bg-gradient-to-br from-card to-blue-50/50 p-10 text-center shadow-sm dark:border-blue-900 dark:to-blue-950/20",
        className,
      )}
    >
      {icon ? <div className="grid size-12 place-items-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">{icon}</div> : null}
      <h2 className="text-xl font-bold tracking-tight">{title}</h2>
      {description ? (
        <p className="text-sm text-muted-foreground">{description}</p>
      ) : null}
      {action ? (
        React.isValidElement(action) ? (
          <div className="mt-2">{action}</div>
        ) : typeof action === "object" && "href" in action && action.href ? (
          <a
            href={action.href}
            className="mt-2 inline-flex h-10 items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {action.label}
          </a>
        ) : typeof action === "object" && "label" in action ? (
          <Button type="button" className="mt-2" onClick={action.onClick}>
            {action.label}
          </Button>
        ) : null
      ) : null}
    </div>
  );
}
