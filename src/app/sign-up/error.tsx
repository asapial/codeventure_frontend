"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function SignUpError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Sign-up route error:", error);
  }, [error]);

  return (
    <div className="container mx-auto max-w-md px-4 py-24 text-center">
      <h1 className="text-2xl font-semibold">Could not load sign-up</h1>
      <p className="mt-3 text-muted-foreground">
        Something went wrong while preparing this page.
      </p>
      <Button type="button" className="mt-6" onClick={reset}>
        Try again
      </Button>
    </div>
  );
}