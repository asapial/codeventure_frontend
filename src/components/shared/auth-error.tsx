"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowLeft, RotateCcw } from "lucide-react";
import type { AuthVariant } from "@/components/shared/auth-shell";
import { Button } from "@/components/ui/button";

interface AuthErrorProps {
  variant: AuthVariant;
  error: Error & { digest?: string };
  reset: () => void;
}

export function AuthError({ variant, error, reset }: AuthErrorProps) {
  const isSignIn = variant === "sign-in";
  const title = isSignIn ? "Could not load sign-in" : "Could not load sign-up";
  const description = isSignIn
    ? "Something went wrong while preparing the sign-in page. Try again, or reach out if the problem persists."
    : "Something went wrong while preparing the sign-up page. Try again — your progress will be saved where possible.";
  const switchHref = isSignIn ? "/sign-up" : "/sign-in";
  const switchLabel = isSignIn ? "Create an account" : "Sign in instead";

  useEffect(() => {
    console.error(`${variant} route error:`, error);
  }, [error, variant]);

  return (
    <div className="relative isolate min-h-[calc(100svh-4.5rem)] overflow-hidden bg-background">
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_30%_-10%,rgba(37,99,235,.18),transparent_45%)]" />
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_90%_110%,rgba(99,102,241,.15),transparent_40%)]" />

      <div className="mx-auto flex min-h-[calc(100svh-4.5rem)] max-w-md flex-col items-center justify-center px-6 py-16 text-center">
        <div className="grid size-14 place-items-center rounded-2xl bg-destructive/10 text-destructive">
          <AlertTriangle className="size-7" aria-hidden="true" />
        </div>
        <h1 className="mt-6 text-3xl font-bold tracking-[-0.035em]">{title}</h1>
        <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
          {description}
        </p>
        {error.digest ? (
          <p className="mt-2 text-xs text-muted-foreground">
            Reference: <span className="font-mono">{error.digest}</span>
          </p>
        ) : null}

        <div className="mt-7 flex flex-col gap-2 sm:flex-row">
          <Button
            type="button"
            onClick={reset}
            className="h-11 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 font-bold text-white shadow-lg shadow-blue-600/25 hover:from-blue-700 hover:via-indigo-700 hover:to-violet-700"
          >
            <RotateCcw className="size-4" aria-hidden="true" />
            Try again
          </Button>
          <Link
            href={switchHref}
            className="inline-flex h-11 items-center justify-center rounded-xl border border-input bg-background px-5 text-sm font-semibold text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {switchLabel}
          </Link>
        </div>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-lg text-xs font-semibold text-muted-foreground transition-colors hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          Back to CodeVenture
        </Link>
      </div>
    </div>
  );
}
