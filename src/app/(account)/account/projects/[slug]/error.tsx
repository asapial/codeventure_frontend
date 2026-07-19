"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ProjectDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Project detail error:", error);
  }, [error]);

  return (
    <div className="rounded-lg border border-border bg-card p-8 text-center">
      <h1 className="text-2xl font-semibold">Project unavailable</h1>
      <p className="mt-3 text-muted-foreground">
        We couldn&rsquo;t load this project right now.
      </p>
      <div className="mt-6 flex justify-center gap-2">
        <Button type="button" onClick={reset}>
          Try again
        </Button>
        <Link
          href="/account/projects"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          Back to projects
        </Link>
      </div>
    </div>
  );
}