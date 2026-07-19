"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function DashboardProjectsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Projects list error:", error);
  }, [error]);

  return (
    <div className="rounded-lg border border-border bg-card p-8 text-center">
      <h1 className="text-2xl font-semibold">Projects unavailable</h1>
      <p className="mt-3 text-muted-foreground">
        We couldn&rsquo;t load your projects right now.
      </p>
      <Button type="button" className="mt-6" onClick={reset}>
        Try again
      </Button>
    </div>
  );
}