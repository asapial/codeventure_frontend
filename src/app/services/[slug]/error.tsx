"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ServiceDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Service detail route error:", error);
  }, [error]);

  return (
    <div className="container mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-3xl font-semibold">We could not load this service</h1>
      <p className="mt-3 text-muted-foreground">Please try again shortly.</p>
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