"use client";

import { forwardRef, useId, useState, type InputHTMLAttributes, type ReactNode } from "react";
import { Check, Eye, EyeOff, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface AuthFieldProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "size" | "aria-errormessage"
  > {
  label: string;
  icon?: ReactNode;
  /** Optional helper text rendered under the input when there is no error. */
  hint?: string;
  /** Right-aligned inline element (e.g. "Forgot?" link). */
  trailing?: ReactNode;
  /** Allow toggling password visibility. Pair with `type="password"`. */
  reveal?: boolean;
  /** Validate the current value with a predicate (e.g. confirm-match). */
  matcher?: (value: string) => boolean;
  /**
   * `null` is a valid ARIA value here (referring to "no error").
   * `string | undefined` collapses to `null` for the DOM attribute.
   */
  "aria-errormessage"?: string | null;
}

/**
 * Reusable form field for the auth pages.
 *
 * Renders a leading icon, an optional password-reveal toggle, inline error /
 * success states, and a focus ring that hugs both the icon and the input.
 */
export const AuthField = forwardRef<HTMLInputElement, AuthFieldProps>(
  function AuthField(
    {
      label,
      icon,
      hint,
      trailing,
      reveal = false,
      matcher,
      className,
      id,
      type = "text",
      value,
      defaultValue,
      onChange,
      "aria-invalid": ariaInvalid,
      "aria-errormessage": ariaErrorMessage,
      ...rest
    },
    ref,
  ) {
    const reactId = useId();
    const inputId = id ?? `auth-${reactId}`;
    const errorId = `${inputId}-error`;
    const hintId = `${inputId}-hint`;
    const normalizedErrorMessage =
      typeof ariaErrorMessage === "string" && ariaErrorMessage.length > 0
        ? ariaErrorMessage
        : undefined;
    const describedBy = [
      ariaInvalid ? errorId : hint ? hintId : undefined,
    ]
      .filter(Boolean)
      .join(" ");

    const [revealed, setRealed] = useState(false);
    const isPassword = type === "password";
    const effectiveType = reveal && isPassword && revealed ? "text" : type;

    const [inner, setInner] = useState<string>(
      (defaultValue as string | undefined) ??
        (typeof value === "string" ? value : ""),
    );

    const controlled = value !== undefined;
    const currentValue = controlled
      ? typeof value === "string"
        ? value
        : ""
      : inner;

    const matchOk = matcher ? matcher(currentValue) : false;
    const matchActive = matcher && currentValue.length > 0;

    return (
      <div className="space-y-1.5">
        <div className="flex items-center justify-between gap-2">
          <label
            htmlFor={inputId}
            className="text-sm font-medium leading-none text-foreground"
          >
            {label}
          </label>
          {trailing}
        </div>

        <div
          className={cn(
            "group/field relative flex h-11 items-center rounded-xl border bg-background/80 transition-all",
            "border-blue-100 hover:border-blue-200 focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-500/10",
            "dark:border-blue-950 dark:hover:border-blue-900 dark:focus-within:border-blue-700",
            ariaInvalid &&
              "border-destructive/70 hover:border-destructive focus-within:border-destructive focus-within:ring-destructive/10 dark:border-destructive",
            matchOk &&
              "border-emerald-400/70 focus-within:border-emerald-500 focus-within:ring-emerald-500/10",
          )}
        >
          {icon ? (
            <span
              className={cn(
                "pointer-events-none grid size-9 place-items-center text-muted-foreground transition-colors",
                "group-focus-within/field:text-blue-600 dark:group-focus-within/field:text-blue-400",
                ariaInvalid && "text-destructive",
                matchOk && "text-emerald-600",
              )}
            >
              {icon}
            </span>
          ) : null}

          <input
            ref={ref}
            id={inputId}
            type={effectiveType}
            aria-invalid={ariaInvalid || undefined}
            aria-errormessage={normalizedErrorMessage}
            aria-describedby={describedBy || undefined}
            value={controlled ? value : inner}
            onChange={(event) => {
              setInner(event.target.value);
              if (typeof onChange === "function") onChange(event);
            }}
            className={cn(
              "h-full w-full bg-transparent pr-10 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              icon ? "pl-1" : "pl-3.5",
              reveal && isPassword ? "pr-9" : "pr-3.5",
              className,
            )}
            {...rest}
          />

          {/* Right-aligned affordances (match indicator / reveal) */}
          <div className="absolute right-2 flex items-center gap-1 text-muted-foreground">
            {matchActive ? (
              matchOk ? (
                <Check
                  className="size-4 text-emerald-600"
                  aria-label="Matches"
                />
              ) : (
                <X className="size-4 text-destructive" aria-label="Does not match" />
              )
            ) : null}

            {reveal && isPassword ? (
              <button
                type="button"
                onClick={() => setRealed((v) => !v)}
                tabIndex={-1}
                aria-label={revealed ? "Hide password" : "Show password"}
                aria-pressed={revealed}
                className="grid size-7 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:hover:bg-blue-950/50 dark:hover:text-blue-300"
              >
                {revealed ? (
                  <EyeOff className="size-4" aria-hidden="true" />
                ) : (
                  <Eye className="size-4" aria-hidden="true" />
                )}
              </button>
            ) : null}
          </div>
        </div>

        {ariaInvalid ? (
          <p
            id={errorId}
            role="alert"
            className="flex items-center gap-1.5 text-xs text-destructive"
          >
            <X className="size-3" aria-hidden="true" />
            <span>{normalizedErrorMessage ?? hint ?? "Check this field."}</span>
          </p>
        ) : hint ? (
          <p id={hintId} className="text-xs text-muted-foreground">
            {hint}
          </p>
        ) : null}
      </div>
    );
  },
);
