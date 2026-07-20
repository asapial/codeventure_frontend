import Link from "next/link";
import * as React from "react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ButtonVariant = NonNullable<Parameters<typeof buttonVariants>[0]>["variant"];
type ButtonSize = NonNullable<Parameters<typeof buttonVariants>[0]>["size"];

export interface PortalAction {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  /** Marks the action as disabled (still rendered for layout). */
  disabled?: boolean;
  /** Tooltip text shown via `title` (use `aria-label` for icon-only). */
  title?: string;
  /** Required when the action is icon-only. */
  ariaLabel?: string;
}

export interface PortalActionBarProps {
  /** Primary action rendered with emphasis. */
  primary?: PortalAction;
  /** Secondary actions rendered to the right of (or below) primary. */
  secondary?: PortalAction[];
  /** Tertiary actions rendered on the trailing edge (e.g. "Manage"). */
  trailing?: PortalAction[];
  /** Optional className for the bar wrapper. */
  className?: string;
  /** When true, the bar sticks to the top of its container on scroll. */
  sticky?: boolean;
  /** When true, render horizontally-aligned action buttons instead of stacked. */
  orientation?: "horizontal" | "stack";
  /** `as` tag override — defaults to a `div`. */
  as?: keyof React.JSX.IntrinsicElements;
}

function ActionButton({ action }: { action: PortalAction }) {
  const {
    label,
    href,
    onClick,
    variant = "default",
    size = "sm",
    icon,
    disabled,
    title,
    ariaLabel,
  } = action;

  const className = cn(
    buttonVariants({ variant, size }),
    "rounded-full gap-1.5",
    disabled && "pointer-events-none opacity-60",
  );

  const content = (
    <>
      {icon ? <span aria-hidden="true">{icon}</span> : null}
      <span>{label}</span>
    </>
  );

  if (href && !disabled) {
    return (
      <Link
        href={href}
        className={className}
        title={title}
        aria-label={ariaLabel ?? label}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={ariaLabel ?? label}
    >
      {content}
    </button>
  );
}

/**
 * Sticky-friendly action bar used by portal pages (C1–C10).
 *
 * - Primary CTA is placed first and emphasised by the `default` button variant.
 * - Secondary actions cluster to the right.
 * - Trailing actions (e.g. "Manage", "Export") live on the trailing edge.
 */
export function PortalActionBar({
  primary,
  secondary = [],
  trailing = [],
  className,
  sticky = false,
  orientation = "horizontal",
  as = "div",
}: PortalActionBarProps) {
  const Tag = as as React.ElementType;
  const horizontal = orientation === "horizontal";

  return (
    <Tag
      className={cn(
        "z-10 flex gap-2 rounded-2xl border border-blue-100 bg-card/95 p-3 shadow-sm backdrop-blur dark:border-blue-950",
        sticky && "sticky top-2",
        horizontal
          ? "flex-wrap items-center justify-between"
          : "flex-col items-stretch",
        className,
      )}
      role="toolbar"
      aria-label="Page actions"
    >
      <div
        className={cn(
          "flex gap-2",
          horizontal ? "flex-wrap items-center" : "flex-col",
        )}
      >
        {primary ? <ActionButton action={primary} /> : null}
        {secondary.map((a, i) => (
          <ActionButton key={`${a.label}-${i}`} action={a} />
        ))}
      </div>
      {trailing.length > 0 ? (
        <div
          className={cn(
            "flex gap-2",
            horizontal ? "flex-wrap items-center" : "flex-col",
            !horizontal && "border-t border-blue-100 pt-2 dark:border-blue-950",
          )}
        >
          {trailing.map((a, i) => (
            <ActionButton key={`${a.label}-${i}`} action={a} />
          ))}
        </div>
      ) : null}
    </Tag>
  );
}