"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard route error:", error);
  }, [error]);

  return (
    <div className="rounded-lg border border-border bg-card p-8 text-center">
      <h1 className="text-2xl font-semibold">Dashboard unavailable</h1>
      <p className="mt-3 text-muted-foreground">
        We couldn&rsquo;t load your dashboard right now.
      </p>
      {error.digest ? (
        <p className="mt-2 text-xs text-muted-foreground">
          Reference: <span className="font-mono">{error.digest}</span>
        </p>
      ) : null}
      <Button type="button" className="mt-6" onClick={reset}>
        Try again
      </Button>
    </div>
  );
}